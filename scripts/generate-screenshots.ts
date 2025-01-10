[object Promise]import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";

// Create screenshots directory if it doesn't exist
const screenshotsDir = resolve(process.cwd(), "screenshots");
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir);
}

// Routes to capture (based on sitemap.xml)
const routes = [
  "/",
  "/introduction",
  "/cycle-overview",
  "/compounds",
  "/training-nutrition",
  "/glossary",
  "/safety",
  "/schedule",
];

async function captureScreenshots() {
  console.log("Starting screenshot capture process...");
  console.log("Screenshots will be saved to:", screenshotsDir);

  const browser = await puppeteer.launch({ headless: true });
  let successful = 0;
  let failed = 0;

  try {
    for (const route of routes) {
      const url = `http://localhost:5173${route}`;
      const filename = route === "/" ? "home" : route.slice(1);
      const outputPath = resolve(screenshotsDir, `${filename}.png`);

      console.log(`\nCapturing ${url}`);

      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate and wait for network to be idle
        await page.goto(url, { waitUntil: "networkidle0" });

        // Wait for React to finish rendering
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Capture full page screenshot
        await page.screenshot({
          path: outputPath,
          fullPage: true,
        });

        await page.close();
        console.log(`Saved screenshot to: ${outputPath}`);
        successful++;
      } catch (error) {
        console.error(`Error capturing ${url}:`, error);
        failed++;
      }
    }
  } finally {
    await browser.close();
  }

  console.log("\nScreenshot generation complete!");
  console.log(`Successfully captured: ${successful}`);
  console.log(`Failed to capture: ${failed}`);
  console.log(`Screenshots saved in: ${screenshotsDir}`);
}

// Start the screenshot capture process
console.log("Checking development server...");
console.log("Make sure the development server is running (npm run dev)");

captureScreenshots().catch((error) => {
  console.error("Fatal error during screenshot capture:", error);
  process.exit(1);
});
