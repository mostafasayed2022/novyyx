/**
 * Intentionally empty — Suspense boundary lives in layout.tsx.
 *
 * This file exists only so Next.js doesn't generate a default
 * loading state. The root layout wraps {children} with
 * <Suspense fallback={null}> for instant page rendering.
 */
export default function Loading() {
  return null;
}
