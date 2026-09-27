/**
 * CampusXchange Centralized Design Tokens
 * Strict Black / White / Grayscale Visual System
 */

export const colors = {
  black: '#000000',
  offBlack: '#09090b',
  cardDark: '#121215',
  surfaceDark: '#18181b',
  borderDark: '#27272a',
  mutedDark: '#3f3f46',
  midGray: '#71717a',
  mutedLight: '#a1a1aa',
  borderLight: '#d4d4d8',
  surfaceLight: '#e4e4e7',
  cardLight: '#f4f4f5',
  offWhite: '#fafafa',
  white: '#ffffff',
};

export const typography = {
  fontFamily: {
    sans: 'Inter, Geist, -apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  fontSize: {
    display: { size: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.03em', weight: '800' }, // 56px
    h1: { size: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.025em', weight: '700' },       // 40px
    h2: { size: '1.875rem', lineHeight: '1.25', letterSpacing: '-0.02em', weight: '600' },    // 30px
    h3: { size: '1.5rem', lineHeight: '1.3', letterSpacing: '-0.015em', weight: '600' },      // 24px
    bodyLarge: { size: '1.125rem', lineHeight: '1.6', letterSpacing: '-0.01em', weight: '400' },// 18px
    body: { size: '1rem', lineHeight: '1.5', letterSpacing: '0', weight: '400' },              // 16px
    bodySmall: { size: '0.875rem', lineHeight: '1.4', letterSpacing: '0', weight: '400' },     // 14px
    caption: { size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.02em', weight: '500' },   // 12px
    label: { size: '0.6875rem', lineHeight: '1.2', letterSpacing: '0.08em', weight: '600' },   // 11px uppercase
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
};

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  card: '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
  cardDark: '0 4px 25px -2px rgba(0, 0, 0, 0.7), 0 2px 8px -1px rgba(0, 0, 0, 0.5)',
  glowWhite: '0 0 20px rgba(255, 255, 255, 0.15)',
  glowBlack: '0 0 20px rgba(0, 0, 0, 0.3)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: { type: 'spring', stiffness: 400, damping: 30 },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
};
