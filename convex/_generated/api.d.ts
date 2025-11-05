/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { FunctionReference } from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: {
  projects: {
    create: FunctionReference<"mutation", "public", any, any>;
    list: FunctionReference<"query", "public", any, any>;
    get: FunctionReference<"query", "public", any, any>;
    update: FunctionReference<"mutation", "public", any, any>;
    remove: FunctionReference<"mutation", "public", any, any>;
    search: FunctionReference<"query", "public", any, any>;
    stats: FunctionReference<"query", "public", any, any>;
  };
  components: {
    create: FunctionReference<"mutation", "public", any, any>;
    list: FunctionReference<"query", "public", any, any>;
    get: FunctionReference<"query", "public", any, any>;
    search: FunctionReference<"query", "public", any, any>;
  };
  designTokens: {
    list: FunctionReference<"query", "public", any, any>;
    mostUsed: FunctionReference<"query", "public", any, any>;
  };
  capture: {
    captureScreenshot: FunctionReference<"action", "public", any, any>;
    captureHTML: FunctionReference<"action", "public", any, any>;
    analyzeWebsite: FunctionReference<"action", "public", any, any>;
    captureWebsite: FunctionReference<"action", "public", any, any>;
  };
  queue: {
    processNext: FunctionReference<"action", "public", any, any>;
    status: FunctionReference<"query", "public", any, any>;
  };
  analysisResults: {
    getByProject: FunctionReference<"query", "public", any, any>;
    getByType: FunctionReference<"query", "public", any, any>;
  };
};

export declare const internal: {
  projects: {
    create: FunctionReference<"mutation", "internal", any, any>;
    list: FunctionReference<"query", "internal", any, any>;
    get: FunctionReference<"query", "internal", any, any>;
    update: FunctionReference<"mutation", "internal", any, any>;
    remove: FunctionReference<"mutation", "internal", any, any>;
    search: FunctionReference<"query", "internal", any, any>;
    stats: FunctionReference<"query", "internal", any, any>;
  };
  components: {
    create: FunctionReference<"mutation", "internal", any, any>;
    list: FunctionReference<"query", "internal", any, any>;
    get: FunctionReference<"query", "internal", any, any>;
    search: FunctionReference<"query", "internal", any, any>;
  };
  designTokens: {
    list: FunctionReference<"query", "internal", any, any>;
    mostUsed: FunctionReference<"query", "internal", any, any>;
  };
  capture: {
    captureScreenshot: FunctionReference<"action", "internal", any, any>;
    captureHTML: FunctionReference<"action", "internal", any, any>;
    analyzeWebsite: FunctionReference<"action", "internal", any, any>;
    captureWebsite: FunctionReference<"action", "internal", any, any>;
  };
  queue: {
    processNext: FunctionReference<"action", "internal", any, any>;
    getNextPending: FunctionReference<"query", "internal", any, any>;
    updateStatus: FunctionReference<"mutation", "internal", any, any>;
    addTask: FunctionReference<"mutation", "internal", any, any>;
    status: FunctionReference<"query", "internal", any, any>;
  };
  analysisResults: {
    create: FunctionReference<"mutation", "internal", any, any>;
    getByProject: FunctionReference<"query", "internal", any, any>;
    getByType: FunctionReference<"query", "internal", any, any>;
  };
};
