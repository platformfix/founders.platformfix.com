import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom has no IntersectionObserver, which framer-motion's whileInView
// feature needs to mount. The mock just needs to exist and be inert;
// no test currently asserts on scroll-triggered entrance state.
class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
