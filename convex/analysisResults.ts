import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Create analysis result (internal only)
export const create = internalMutation({
  args: {
    projectId: v.id("projects"),
    type: v.union(
      v.literal("components"),
      v.literal("colors"),
      v.literal("typography"),
      v.literal("layout")
    ),
    data: v.any(),
    confidence: v.number(),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("analysisResults", args);
  },
});

// Get analysis results for a project
export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("analysisResults")
      .withIndex("by_project", (q: any) => q.eq("projectId", args.projectId))
      .collect();
  },
});

// Get analysis results by type
export const getByType = query({
  args: {
    projectId: v.id("projects"),
    type: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("analysisResults")
      .withIndex("by_project", (q: any) => q.eq("projectId", args.projectId))
      .filter((q: any) => q.eq(q.field("type"), args.type))
      .first();
  },
});
