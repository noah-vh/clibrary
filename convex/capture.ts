import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import * as cheerio from "cheerio";

// Capture website screenshot using external API
export const captureScreenshot = action({
  args: {
    projectId: v.id("projects"),
    url: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    try {
      // Update status
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        status: "capturing",
      });

      // Use screenshotone.com API or similar service
      // For demo, we'll use a free screenshot API
      const screenshotUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(args.url)}&viewport_width=1920&viewport_height=1080&format=jpg&access_key=demo`;

      const response = await fetch(screenshotUrl);

      if (!response.ok) {
        throw new Error(`Screenshot API failed: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:image/jpeg;base64,${base64}`;

      // Update project with screenshot
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        thumbnail: dataUrl,
        screenshots: [{
          url: dataUrl,
          viewport: "1920x1080",
        }],
      });

      return { success: true, screenshotUrl: dataUrl };
    } catch (error) {
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        status: "failed",
        error: error instanceof Error ? error.message : "Screenshot capture failed",
      });

      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
});

// Capture HTML and CSS
export const captureHTML = action({
  args: {
    projectId: v.id("projects"),
    url: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    try {
      // Fetch the HTML
      const response = await fetch(args.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch HTML: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract CSS links
      const cssLinks: string[] = [];
      $('link[rel="stylesheet"]').each((_, elem) => {
        const href = $(elem).attr('href');
        if (href) {
          // Make absolute URLs
          const absoluteUrl = new URL(href, args.url).href;
          cssLinks.push(absoluteUrl);
        }
      });

      // Extract inline styles
      const inlineStyles: string[] = [];
      $('style').each((_, elem) => {
        const content = $(elem).html();
        if (content) {
          inlineStyles.push(content);
        }
      });

      // Update project
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        htmlSnapshot: html,
        cssFiles: cssLinks,
      });

      return {
        success: true,
        htmlLength: html.length,
        cssLinks: cssLinks.length,
        inlineStyles: inlineStyles.length,
      };
    } catch (error) {
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        error: error instanceof Error ? error.message : "HTML capture failed",
      });

      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
});

// Analyze captured data
export const analyzeWebsite = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const project = await ctx.runQuery(internal.projects.get, {
        id: args.projectId,
      });

      if (!project || !project.htmlSnapshot) {
        throw new Error("No HTML snapshot available for analysis");
      }

      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        status: "analyzing",
      });

      const $ = cheerio.load(project.htmlSnapshot);

      // Extract tech stack
      const techStack: string[] = [];

      // Check meta tags
      $('meta').each((_, elem) => {
        const name = $(elem).attr('name');
        const content = $(elem).attr('content');

        if (name === 'generator' && content) {
          techStack.push(content);
        }
      });

      // Check for common frameworks
      const html = project.htmlSnapshot.toLowerCase();
      if (html.includes('next.js') || html.includes('__next')) techStack.push('Next.js');
      if (html.includes('react')) techStack.push('React');
      if (html.includes('vue')) techStack.push('Vue');
      if (html.includes('angular')) techStack.push('Angular');
      if (html.includes('tailwind') || $('[class*="tw-"]').length > 0) techStack.push('Tailwind CSS');

      // Extract colors
      const colors = new Set<string>();
      $('[style]').each((_, elem) => {
        const style = $(elem).attr('style');
        if (style) {
          const colorMatches = style.match(/(#[0-9a-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/gi);
          if (colorMatches) {
            colorMatches.forEach(color => colors.add(color));
          }
        }
      });

      // Detect components
      const componentTypes = {
        buttons: $('button, [role="button"], a.btn').length,
        forms: $('form').length,
        inputs: $('input, textarea, select').length,
        cards: $('[class*="card"]').length,
        navbars: $('nav, [role="navigation"]').length,
        headers: $('header').length,
        footers: $('footer').length,
      };

      const componentCount = Object.values(componentTypes).reduce((a, b) => a + b, 0);

      // Update project with analysis
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        status: "complete",
        techStack: [...new Set(techStack)],
        componentCount,
        capturedAt: Date.now(),
        analyzedAt: Date.now(),
      });

      // Store analysis results
      await ctx.runMutation(internal.analysisResults.create, {
        projectId: args.projectId,
        type: "components",
        data: componentTypes,
        confidence: 0.8,
      });

      await ctx.runMutation(internal.analysisResults.create, {
        projectId: args.projectId,
        type: "colors",
        data: Array.from(colors).slice(0, 10),
        confidence: 0.9,
      });

      return {
        success: true,
        techStack,
        componentCount,
        colors: Array.from(colors).slice(0, 10),
      };
    } catch (error) {
      await ctx.runMutation(internal.projects.update, {
        id: args.projectId,
        status: "failed",
        error: error instanceof Error ? error.message : "Analysis failed",
      });

      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
});

// Full capture pipeline
export const captureWebsite = action({
  args: {
    projectId: v.id("projects"),
    url: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    // Step 1: Capture screenshot
    const screenshotResult = await ctx.runAction(internal.capture.captureScreenshot, args);

    if (!screenshotResult.success) {
      return screenshotResult;
    }

    // Step 2: Capture HTML/CSS
    const htmlResult = await ctx.runAction(internal.capture.captureHTML, args);

    if (!htmlResult.success) {
      return htmlResult;
    }

    // Step 3: Analyze
    const analysisResult = await ctx.runAction(internal.capture.analyzeWebsite, args);

    return analysisResult;
  },
});
