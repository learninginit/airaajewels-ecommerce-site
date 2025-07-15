// Analytics and Error Monitoring Setup
// This script sets up comprehensive monitoring for the Airaa Jewels ecommerce site

// Import gtag and Sentry
import { gtag } from "gtag"
import * as Sentry from "@sentry/browser"

// Google Analytics 4 Configuration
const GA4_CONFIG = {
  measurementId: "G-XXXXXXXXXX", // Replace with your GA4 Measurement ID
  config: {
    page_title: "Airaa Jewels - Elegant Jewelry Store",
    page_location: window.location.href,
    send_page_view: true,
    custom_map: {
      custom_parameter_1: "user_type",
      custom_parameter_2: "product_category",
    },
  },
}

// Error Monitoring with Sentry
const SENTRY_CONFIG = {
  dsn: "https://your-sentry-dsn@sentry.io/project-id", // Replace with your Sentry DSN
  environment: process.env.NODE_ENV || "production",
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter out non-critical errors
    if (event.exception) {
      const error = event.exception.values[0]
      if (error.type === "ChunkLoadError" || error.type === "ResizeObserver loop limit exceeded") {
        return null
      }
    }
    return event
  },
}

// Performance Monitoring
const PERFORMANCE_CONFIG = {
  // Core Web Vitals tracking
  trackCLS: true,
  trackFID: true,
  trackFCP: true,
  trackLCP: true,
  trackTTFB: true,

  // Custom performance metrics
  trackCartOperations: true,
  trackCheckoutFlow: true,
  trackSearchPerformance: true,
  trackImageLoading: true,
}

// E-commerce Event Tracking
const ECOMMERCE_EVENTS = {
  // Product events
  view_item: (productId, productName, category, price) => ({
    event: "view_item",
    ecommerce: {
      currency: "INR",
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
          quantity: 1,
        },
      ],
    },
  }),

  add_to_cart: (productId, productName, category, price, quantity) => ({
    event: "add_to_cart",
    ecommerce: {
      currency: "INR",
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
          quantity: quantity,
        },
      ],
    },
  }),

  purchase: (transactionId, items, totalValue, couponCode) => ({
    event: "purchase",
    ecommerce: {
      transaction_id: transactionId,
      value: totalValue,
      currency: "INR",
      coupon: couponCode,
      items: items,
    },
  }),

  // Rental specific events
  rent_item: (productId, productName, days, rentPrice, securityDeposit) => ({
    event: "rent_item",
    ecommerce: {
      currency: "INR",
      value: rentPrice * days + securityDeposit,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: "Rental",
          price: rentPrice,
          quantity: days,
        },
      ],
    },
  }),
}

// User Behavior Tracking
const USER_BEHAVIOR_TRACKING = {
  // Track user journey
  trackPageViews: true,
  trackScrollDepth: true,
  trackTimeOnPage: true,
  trackClickEvents: true,

  // Track specific interactions
  trackWishlistActions: true,
  trackFilterUsage: true,
  trackSearchQueries: true,
  trackCouponUsage: true,

  // Track authentication events
  trackLoginAttempts: true,
  trackRegistrations: true,
  trackProfileUpdates: true,
}

// Real-time Monitoring Dashboard
const MONITORING_DASHBOARD = {
  // Key metrics to track
  metrics: [
    "page_load_time",
    "cart_abandonment_rate",
    "checkout_completion_rate",
    "search_success_rate",
    "error_rate",
    "user_engagement_time",
    "conversion_rate",
    "rental_conversion_rate",
  ],

  // Alerts configuration
  alerts: {
    high_error_rate: { threshold: 5, timeWindow: "5m" },
    slow_page_load: { threshold: 3000, timeWindow: "1m" },
    cart_abandonment_spike: { threshold: 80, timeWindow: "10m" },
    payment_failures: { threshold: 10, timeWindow: "5m" },
  },
}

// A/B Testing Configuration
const AB_TESTING_CONFIG = {
  experiments: [
    {
      name: "checkout_flow_optimization",
      variants: ["single_page", "multi_step"],
      traffic_allocation: 50,
      success_metric: "checkout_completion_rate",
    },
    {
      name: "product_page_layout",
      variants: ["gallery_left", "gallery_right"],
      traffic_allocation: 50,
      success_metric: "add_to_cart_rate",
    },
    {
      name: "rental_pricing_display",
      variants: ["daily_rate", "total_cost"],
      traffic_allocation: 50,
      success_metric: "rental_conversion_rate",
    },
  ],
}

// Security Monitoring
const SECURITY_MONITORING = {
  // Track suspicious activities
  trackFailedLogins: true,
  trackUnusualPurchasePatterns: true,
  trackBotTraffic: true,
  trackCSRFAttempts: true,

  // Rate limiting monitoring
  trackAPIRateLimits: true,
  trackBruteForceAttempts: true,

  // Data protection
  trackPIIAccess: true,
  trackDataExports: true,
}

// Business Intelligence Tracking
const BUSINESS_INTELLIGENCE = {
  // Revenue tracking
  trackDailyRevenue: true,
  trackProductPerformance: true,
  trackCategoryTrends: true,
  trackSeasonalPatterns: true,

  // Customer insights
  trackCustomerLifetimeValue: true,
  trackRetentionRates: true,
  trackReferralSources: true,
  trackGeographicDistribution: true,

  // Inventory insights
  trackStockLevels: true,
  trackPopularProducts: true,
  trackRentalUtilization: true,
  trackReturnRates: true,
}

// Implementation Functions
function initializeMonitoring() {
  console.log("🔍 Initializing comprehensive monitoring for Airaa Jewels...")

  // Initialize Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("config", GA4_CONFIG.measurementId, GA4_CONFIG.config)
    console.log("✅ Google Analytics 4 initialized")
  }

  // Initialize error monitoring
  if (typeof Sentry !== "undefined") {
    Sentry.init(SENTRY_CONFIG)
    console.log("✅ Sentry error monitoring initialized")
  }

  // Set up performance monitoring
  setupPerformanceMonitoring()

  // Set up custom event tracking
  setupCustomEventTracking()

  console.log("🎉 Monitoring setup complete!")
}

function setupPerformanceMonitoring() {
  // Core Web Vitals
  if ("web-vitals" in window) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }

  // Custom performance metrics
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "navigation") {
        console.log("Page Load Time:", entry.loadEventEnd - entry.loadEventStart)
      }
    }
  })

  observer.observe({ entryTypes: ["navigation", "resource"] })
}

function setupCustomEventTracking() {
  // Track cart operations
  document.addEventListener("cart-updated", (event) => {
    const { action, product, quantity } = event.detail
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: "ecommerce",
        event_label: product.name,
        value: product.price * quantity,
      })
    }
  })

  // Track search queries
  document.addEventListener("search-performed", (event) => {
    const { query, results } = event.detail
    if (typeof gtag !== "undefined") {
      gtag("event", "search", {
        search_term: query,
        event_category: "engagement",
        custom_parameter_1: results > 0 ? "success" : "no_results",
      })
    }
  })

  // Track rental events
  document.addEventListener("rental-added", (event) => {
    const { product, days, totalCost } = event.detail
    if (typeof gtag !== "undefined") {
      gtag("event", "rent_item", {
        event_category: "rental",
        event_label: product.name,
        value: totalCost,
        custom_parameter_2: "rental",
      })
    }
  })
}

// Export configuration for use in the application
export {
  GA4_CONFIG,
  SENTRY_CONFIG,
  PERFORMANCE_CONFIG,
  ECOMMERCE_EVENTS,
  USER_BEHAVIOR_TRACKING,
  MONITORING_DASHBOARD,
  AB_TESTING_CONFIG,
  SECURITY_MONITORING,
  BUSINESS_INTELLIGENCE,
  initializeMonitoring,
}

// Auto-initialize if running in browser
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMonitoring)
  } else {
    initializeMonitoring()
  }
}

console.log("📊 Monitoring configuration loaded successfully!")
