/**
 * @file Centralized configuration for the application
 * @description Provides a single source of truth for environment variables and site-side settings.
 */

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const DEMO_SENTENCE_PREFIX = isDemoMode ? '(DEMO)' : '';
