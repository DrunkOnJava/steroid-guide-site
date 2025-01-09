/**
 * @fileoverview Script to generate sitemap.xml for the Steroid Guide site
 * @project     Steroid Guide Site
 * @module      scripts/generate-sitemap
 *
 * @description
 * Generates a sitemap.xml file by:
 * 1. Extracting routes from App.tsx
 * 2. Creating sitemap entries for each route
 * 3. Writing the sitemap.xml file to the build output directory
 */

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import path from "path";

// Base URL of the site (should be configured based on environment)
const SITE_URL = "https://steroidguide.com";

// Routes from App.tsx (keep in sync with router configuration)
const ROUTES = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/introduction", changefreq: "weekly", priority: 0.8 },
  { url: "/cycle-overview", changefreq: "weekly", priority: 0.8 },
  { url: "/compounds", changefreq: "weekly", priority: 0.8 },
  { url: "/training-nutrition", changefreq: "weekly", priority: 0.8 },
  { url: "/glossary", changefreq: "weekly", priority: 0.7 },
  { url: "/safety", changefreq: "weekly", priority: 0.9 },
  { url: "/schedule", changefreq: "daily", priority: 0.8 },
  // Note: Excluding /components as it's a demo page
];

async function generateSitemap() {
  try {
    // Create a sitemap stream
    const stream = new SitemapStream({ hostname: SITE_URL });

    // Pipe the routes into the stream
    const data = Readable.from(ROUTES).pipe(stream);

    // Convert stream to XML string and format it
    const sitemap = await streamToPromise(data);

    // Format XML with proper indentation
    const formattedXml = sitemap
      .toString()
      .replace(/></g, ">\n<")
      .replace(/<url>/g, "  <url>")
      .replace(/<loc>/g, "    <loc>")
      .replace(/<changefreq>/g, "    <changefreq>")
      .replace(/<priority>/g, "    <priority>")
      .replace(/<\/url>/g, "  </url>");

    // Ensure dist directory exists
    const distDir = path.join(process.cwd(), "dist");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write formatted sitemap to dist directory
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), formattedXml);

    console.log("✅ Successfully generated sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

// Execute the generation
generateSitemap();
