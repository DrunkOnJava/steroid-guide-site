/**
 * @fileoverview Theme constants and color configuration
 * @project     Steroid Guide Site
 * @module      styles/theme
 */

export const colors = {
  // Brand colors
  primary: {
    50: "#ebf5ff",
    100: "#e1effe",
    200: "#c3ddfd",
    300: "#a4cafe",
    400: "#76a9fa",
    500: "#3f83f8",
    600: "#1c64f2",
    700: "#1a56db",
    800: "#1e429f",
    900: "#233876",
  },
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Phase colors
  phase: {
    loading: {
      light: "bg-blue-50",
      dark: "dark:bg-blue-950/50",
    },
    maintenance: {
      light: "bg-blue-50",
      dark: "dark:bg-blue-950/50",
    },
    pct: {
      light: "bg-purple-50",
      dark: "dark:bg-purple-950/50",
    },
    bridge: {
      light: "bg-green-50",
      dark: "dark:bg-green-950/50",
    },
    custom: {
      light: "bg-gray-50",
      dark: "dark:bg-gray-950/50",
    },
  },

  // Compound type colors
  compound: {
    anabolic: {
      light: "bg-blue-100",
      dark: "dark:bg-blue-900/50",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    peptide: {
      light: "bg-purple-100",
      dark: "dark:bg-purple-900/50",
      text: "text-purple-800",
      border: "border-purple-200",
    },
    sarm: {
      light: "bg-green-100",
      dark: "dark:bg-green-900/50",
      text: "text-green-800",
      border: "border-green-200",
    },
    ancillary: {
      light: "bg-yellow-100",
      dark: "dark:bg-yellow-900/50",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    custom: {
      light: "bg-gray-100",
      dark: "dark:bg-gray-900/50",
      text: "text-gray-800",
      border: "border-gray-200",
    },
  },

  // Status colors
  status: {
    success: {
      light: "bg-green-50",
      dark: "dark:bg-green-900/50",
      text: "text-green-800",
      border: "border-green-200",
    },
    warning: {
      light: "bg-yellow-50",
      dark: "dark:bg-yellow-900/50",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    error: {
      light: "bg-red-50",
      dark: "dark:bg-red-900/50",
      text: "text-red-800",
      border: "border-red-200",
    },
    info: {
      light: "bg-blue-50",
      dark: "dark:bg-blue-900/50",
      text: "text-blue-800",
      border: "border-blue-200",
    },
  },

  // UI colors
  ui: {
    background: {
      primary: "bg-white dark:bg-gray-900",
      secondary: "bg-gray-50 dark:bg-gray-800",
      tertiary: "bg-gray-100 dark:bg-gray-700",
    },
    text: {
      primary: "text-gray-900 dark:text-white",
      secondary: "text-gray-600 dark:text-gray-300",
      tertiary: "text-gray-500 dark:text-gray-400",
    },
    border: {
      primary: "border-gray-200 dark:border-gray-700",
      secondary: "border-gray-100 dark:border-gray-800",
    },
  },
};

export const spacing = {
  page: {
    x: "px-4 sm:px-6 lg:px-8",
    y: "py-8",
  },
  section: {
    x: "px-4 sm:px-6",
    y: "py-6",
  },
  card: {
    x: "px-4",
    y: "py-4",
  },
};

export const borderRadius = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export const shadows = {
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const transitions = {
  default: "transition-all duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
};
