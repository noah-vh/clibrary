"use client";

import { useMutation as useConvexMutation, useQuery as useConvexQuery } from "convex/react";

// Safe wrapper for useMutation that handles when Convex isn't configured
export function useMutation(mutation: any): any {
  try {
    return useConvexMutation(mutation);
  } catch (error) {
    // Convex not configured, return a no-op function
    return async () => {
      console.warn("Convex is not configured. This operation will be skipped.");
      return null;
    };
  }
}

// Safe wrapper for useQuery that handles when Convex isn't configured
export function useQuery(query: any, args?: any): any {
  try {
    return useConvexQuery(query as any, args as any);
  } catch (error) {
    // Convex not configured, return undefined
    return undefined;
  }
}
