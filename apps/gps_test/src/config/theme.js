/**
 * Theme Configuration - Colas GPS Test
 *
 * Centralized theme following configuration-first architecture.
 * No hardcoded colors or values in components.
 */

export const theme = {
  // Colas Brand Colors
  colors: {
    // Primary brand colors
    colasYellow: '#FEEE32',      // Main brand yellow (background) - CORRECT
    colasYellowLight: '#FEF589', // Light yellow (button)
    colasBlack: '#000000',       // Logo and text
    colasWhite: '#FFFFFF',       // White text/elements

    // Functional colors (for GPS tracking screens)
    primary: '#007AFF',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    // Neutral colors
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#3C3C43',
    border: '#C7C7CC',
  },

  // Typography - Inter Font Family
  fonts: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Spacing System
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },

  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Shadows (for elevation)
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};
