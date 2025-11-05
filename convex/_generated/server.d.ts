/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

/**
 * Define a query in this Convex app's public API.
 *
 * This function will be allowed to read your Convex database and will be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to add it to your app's API.
 */
export declare const query: any;

/**
 * Define a query that is only accessible from other Convex functions (but not from the client).
 *
 * This function will be allowed to read from your Convex database. It will not be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to add it to your app's API.
 */
export declare const internalQuery: any;

/**
 * Define a mutation in this Convex app's public API.
 *
 * This function will be allowed to modify your Convex database and will be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to add it to your app's API.
 */
export declare const mutation: any;

/**
 * Define a mutation that is only accessible from other Convex functions (but not from the client).
 *
 * This function will be allowed to modify your Convex database. It will not be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to add it to your app's API.
 */
export declare const internalMutation: any;

/**
 * Define an action in this Convex app's public API.
 *
 * An action is a function which can execute any JavaScript code, including non-deterministic
 * code and code with side-effects, like calling third-party services.
 * They can be run in Convex's JavaScript environment or in Node.js using the "use node" directive.
 * They can interact with the database indirectly by calling queries and mutations using the {@link ActionCtx}.
 *
 * @param func - The action. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to add it to your app's API.
 */
export declare const action: any;

/**
 * Define an action that is only accessible from other Convex functions (but not from the client).
 *
 * @param func - The action. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to add it to your app's API.
 */
export declare const internalAction: any;

/**
 * Define an HTTP action.
 *
 * This function will be used to respond to HTTP requests received by a Convex
 * deployment if the requests matches the path and method where this action
 * is routed. Be sure to route your action in `convex/http.js`.
 *
 * @param func - The function. It receives an `ActionCtx` as its first argument, and a `Request` object as its second.
 * @returns The wrapped HTTP action.
 */
export declare const httpAction: any;
