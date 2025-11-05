/* eslint-disable */
/**
 * Generated `dataModel` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { GenericId } from "convex/values";

/**
 * The names of all tables defined in your Convex schema.
 */
export type TableNames =
  | "projects"
  | "components"
  | "designTokens"
  | "captureQueue"
  | "analysisResults";

/**
 * The type of a document stored in Convex.
 */
export type Doc<TableName extends TableNames> = any;

/**
 * An identifier for a document in Convex.
 */
export type Id<TableName extends TableNames> = GenericId<TableName>;

/**
 * The data model for your Convex schema.
 */
export type DataModel = any;
