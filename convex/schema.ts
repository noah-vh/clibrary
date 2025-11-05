import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    originalUrl: v.string(),
    thumbnail: v.optional(v.string()),
    tags: v.array(v.string()),
    industry: v.string(),
    designStyle: v.string(),
    techStack: v.array(v.string()),
    status: v.union(
      v.literal("queued"),
      v.literal("planned"),
      v.literal("in-progress"),
      v.literal("capturing"),
      v.literal("analyzing"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("failed")
    ),
    priority: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )),
    notes: v.optional(v.string()),
    repository: v.optional(v.string()),
    componentCount: v.optional(v.number()),
    learnings: v.optional(v.array(v.string())),

    // Captured data
    screenshots: v.optional(v.array(v.object({
      url: v.string(),
      viewport: v.string(),
      storageId: v.optional(v.string())
    }))),
    htmlSnapshot: v.optional(v.string()),
    cssFiles: v.optional(v.array(v.string())),

    // Metadata
    capturedAt: v.optional(v.number()),
    analyzedAt: v.optional(v.number()),
    error: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["status", "industry"]
    }),

  components: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("primitive"),
      v.literal("composition"),
      v.literal("layout"),
      v.literal("template")
    ),
    description: v.string(),
    preview: v.optional(v.string()),
    sourceProjects: v.array(v.id("projects")),
    variants: v.number(),

    // Code
    code: v.object({
      react: v.optional(v.string()),
      vue: v.optional(v.string()),
      html: v.optional(v.string()),
      css: v.optional(v.string())
    }),

    tags: v.array(v.string()),
    dependencies: v.optional(v.array(v.string())),
    installation: v.optional(v.string()),
    usage: v.optional(v.string()),

    // AI Analysis
    complexity: v.optional(v.string()),
    accessibility: v.optional(v.object({
      score: v.number(),
      issues: v.array(v.string())
    })),
  })
    .index("by_category", ["category"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["category"]
    }),

  designTokens: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("color"),
      v.literal("typography"),
      v.literal("spacing"),
      v.literal("effects")
    ),
    value: v.string(),
    usage: v.number(),
    projects: v.array(v.id("projects")),
    description: v.optional(v.string()),
    cssVariable: v.optional(v.string()),
  })
    .index("by_category", ["category"])
    .index("by_usage", ["usage"]),

  captureQueue: defineTable({
    projectId: v.id("projects"),
    url: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    taskType: v.union(
      v.literal("screenshot"),
      v.literal("html"),
      v.literal("css"),
      v.literal("analyze")
    ),
    attempts: v.number(),
    error: v.optional(v.string()),
    result: v.optional(v.any()),
  })
    .index("by_status", ["status"])
    .index("by_project", ["projectId"]),

  analysisResults: defineTable({
    projectId: v.id("projects"),
    type: v.union(
      v.literal("components"),
      v.literal("colors"),
      v.literal("typography"),
      v.literal("layout")
    ),
    data: v.any(),
    confidence: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_type", ["type"]),
});
