/**
 * Service Worker for Steroid Guide Site
 * Provides offline functionality and caches critical resources
 */

const CACHE_NAME = "steroid-guide-cache-v1";
const OFFLINE_URL = "/offline.html";

// Resources to cache immediately on install
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/vite.svg",
  "/content/01_introduction.md",
  "/content/02_cycle_overview.md",
  "/content/03_pharmacological_profiles.md",
  "/content/04_training_nutrition.md",
  "/content/05_glossary.md",
  "/content/06_safety_considerations.md",
];

// Install event - precache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle API requests differently
  if (event.request.url.includes("/api/")) {
    handleApiRequest(event);
    return;
  }

  // For GET requests, try cache first, then network
  if (event.request.method === "GET") {
    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response and update cache in background
            event.waitUntil(updateCache(event.request));
            return cachedResponse;
          }

          return fetchAndCache(event.request);
        })
        .catch(() => {
          // If both cache and network fail, show offline page
          return caches.match(OFFLINE_URL);
        })
    );
  }
});

// Helper function to fetch and cache response
async function fetchAndCache(request) {
  const response = await fetch(request);

  // Only cache successful responses
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }

  return response;
}

// Helper function to update cache in background
async function updateCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(request);

  if (response.ok) {
    await cache.put(request, response);
  }
}

// Handle API requests with network-first strategy
function handleApiRequest(event) {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful API responses
        if (response.ok) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(async () => {
        // If network fails, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If no cached response, return error
        return new Response(JSON.stringify({ error: "Network error" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      })
  );
}

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
