import { describe, it, expect } from 'vitest';

// Sanity test — verifies Vitest is configured and runs.
// Engine unit tests are added in Stage 1.
describe('sanity', () => {
  it('true is true', () => {
    expect(true).toBe(true);
  });

  it('arithmetic works', () => {
    expect(1 + 1).toBe(2);
  });
});
