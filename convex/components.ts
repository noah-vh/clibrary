import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a component
export const create = mutation({
  args: {
    name: v.string(),
    category: v.union(
      v.literal("primitive"),
      v.literal("composition"),
      v.literal("layout"),
      v.literal("template")
    ),
    description: v.string(),
    sourceProjects: v.array(v.id("projects")),
    code: v.object({
      react: v.optional(v.string()),
      html: v.optional(v.string()),
    }),
    tags: v.array(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("components", {
      ...args,
      variants: 1,
    });
  },
});

// List components
export const list = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx: any, args: any) => {
    let query = ctx.db.query("components");

    if (args.category && args.category !== "all") {
      query = query.withIndex("by_category", (q: any) =>
        q.eq("category", args.category as any)
      );
    }

    return await query.take(args.limit || 100);
  },
});

// Get component with source projects
export const get = query({
  args: { id: v.id("components") },
  handler: async (ctx: any, args: any) => {
    const component = await ctx.db.get(args.id);
    if (!component) return null;

    // Fetch source projects
    const sourceProjects = await Promise.all(
      component.sourceProjects.map((id: any) => ctx.db.get(id))
    );

    return {
      ...component,
      sources: sourceProjects.filter(Boolean),
    };
  },
});

// Search components
export const search = query({
  args: { query: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("components")
      .withSearchIndex("search_name", (q: any) =>
        q.search("name", args.query)
      )
      .take(20);
  },
});
