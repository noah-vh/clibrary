import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { internal } from "./_generated/api";

// Process next item in queue
export const processNext = action({
  handler: async (ctx: any) => {
    // Get next pending task
    const task = await ctx.runQuery(internal.queue.getNextPending);

    if (!task) {
      return { success: false, message: "No pending tasks" };
    }

    // Update task status
    await ctx.runMutation(internal.queue.updateStatus, {
      id: task._id,
      status: "processing",
    });

    try {
      const project = await ctx.runQuery(internal.projects.get, {
        id: task.projectId,
      });

      if (!project) {
        throw new Error("Project not found");
      }

      let result;

      // Execute task based on type
      switch (task.taskType) {
        case "screenshot":
          result = await ctx.runAction(internal.capture.captureScreenshot, {
            projectId: task.projectId,
            url: task.url,
          });
          break;

        case "html":
          result = await ctx.runAction(internal.capture.captureHTML, {
            projectId: task.projectId,
            url: task.url,
          });
          break;

        case "analyze":
          result = await ctx.runAction(internal.capture.analyzeWebsite, {
            projectId: task.projectId,
          });
          break;

        default:
          throw new Error(`Unknown task type: ${task.taskType}`);
      }

      // Update task as completed
      await ctx.runMutation(internal.queue.updateStatus, {
        id: task._id,
        status: "completed",
        result,
      });

      // Queue next tasks if this was successful
      if (result.success) {
        if (task.taskType === "screenshot") {
          // Queue HTML capture
          await ctx.runMutation(internal.queue.addTask, {
            projectId: task.projectId,
            url: task.url,
            taskType: "html",
          });
        } else if (task.taskType === "html") {
          // Queue analysis
          await ctx.runMutation(internal.queue.addTask, {
            projectId: task.projectId,
            url: task.url,
            taskType: "analyze",
          });
        }
      }

      return { success: true, result };
    } catch (error) {
      await ctx.runMutation(internal.queue.updateStatus, {
        id: task._id,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

// Get next pending task (internal)
export const getNextPending = query({
  handler: async (ctx: any) => {
    return await ctx.db
      .query("captureQueue")
      .withIndex("by_status", (q: any) => q.eq("status", "pending"))
      .first();
  },
});

// Update task status (internal)
export const updateStatus = mutation({
  args: {
    id: v.id("captureQueue"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    result: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates as any);
  },
});

// Add task to queue (internal)
export const addTask = mutation({
  args: {
    projectId: v.id("projects"),
    url: v.string(),
    taskType: v.union(
      v.literal("screenshot"),
      v.literal("html"),
      v.literal("css"),
      v.literal("analyze")
    ),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("captureQueue", {
      ...args,
      status: "pending",
      attempts: 0,
    });
  },
});

// Get queue status
export const status = query({
  handler: async (ctx: any) => {
    const all = await ctx.db.query("captureQueue").collect();

    return {
      total: all.length,
      pending: all.filter((t: any) => t.status === "pending").length,
      processing: all.filter((t: any) => t.status === "processing").length,
      completed: all.filter((t: any) => t.status === "completed").length,
      failed: all.filter((t: any) => t.status === "failed").length,
    };
  },
});
