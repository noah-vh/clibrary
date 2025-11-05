import { v } from "convex/values";
import { query } from "./_generated/server";

// List design tokens
export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    let query = ctx.db.query("designTokens");

    if (args.category && args.category !== "all") {
      query = query.withIndex("by_category", (q: any) =>
        q.eq("category", args.category as any)
      );
    }

    const tokens = await query.collect();

    // Fetch project names for each token
    const tokensWithProjects = await Promise.all(
      tokens.map(async (token: any) => {
        const projects = await Promise.all(
          token.projects.map((id: any) => ctx.db.get(id))
        );
        return {
          ...token,
          projectDetails: projects.filter(Boolean),
        };
      })
    );

    return tokensWithProjects;
  },
});

// Get most used tokens
export const mostUsed = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("designTokens")
      .withIndex("by_usage")
      .order("desc")
      .take(args.limit || 10);
  },
});
