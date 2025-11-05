import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new project
export const create = mutation({
  args: {
    name: v.string(),
    originalUrl: v.string(),
    tags: v.optional(v.array(v.string())),
    industry: v.optional(v.string()),
    designStyle: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    notes: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      originalUrl: args.originalUrl,
      tags: args.tags || [],
      industry: args.industry || "general",
      designStyle: args.designStyle || "modern",
      techStack: [],
      status: "queued",
      priority: args.priority || "medium",
      notes: args.notes,
    });

    // Queue initial capture tasks
    await ctx.db.insert("captureQueue", {
      projectId,
      url: args.originalUrl,
      status: "pending",
      taskType: "screenshot",
      attempts: 0,
    });

    return projectId;
  },
});

// Get all projects
export const list = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx: any, args: any) => {
    let query = ctx.db.query("projects");

    if (args.status && args.status !== "all") {
      query = query.withIndex("by_status", (q: any) =>
        q.eq("status", args.status as any)
      );
    }

    const projects = await query
      .order("desc")
      .take(args.limit || 100);

    return projects;
  },
});

// Get project by ID
export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.get(args.id);
  },
});

// Update project
export const update = mutation({
  args: {
    id: v.id("projects"),
    status: v.optional(v.union(
      v.literal("queued"),
      v.literal("planned"),
      v.literal("in-progress"),
      v.literal("capturing"),
      v.literal("analyzing"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("failed")
    )),
    thumbnail: v.optional(v.string()),
    screenshots: v.optional(v.any()),
    htmlSnapshot: v.optional(v.string()),
    cssFiles: v.optional(v.array(v.string())),
    componentCount: v.optional(v.number()),
    learnings: v.optional(v.array(v.string())),
    error: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates as any);
    return id;
  },
});

// Delete project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    await ctx.db.delete(args.id);
  },
});

// Search projects
export const search = query({
  args: {
    query: v.string(),
    status: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const results = await ctx.db
      .query("projects")
      .withSearchIndex("search_name", (q: any) =>
        q.search("name", args.query)
      )
      .take(20);

    if (args.status && args.status !== "all") {
      return results.filter((p: any) => p.status === args.status);
    }

    return results;
  },
});

// Get stats
export const stats = query({
  handler: async (ctx: any) => {
    const allProjects = await ctx.db.query("projects").collect();

    return {
      total: allProjects.length,
      complete: allProjects.filter((p: any) => p.status === "complete").length,
      inProgress: allProjects.filter((p: any) => p.status === "in-progress").length,
      queued: allProjects.filter((p: any) => p.status === "queued").length,
      failed: allProjects.filter((p: any) => p.status === "failed").length,
    };
  },
});
