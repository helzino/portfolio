/**
 * A tiny module-level scroll store.
 *
 * WebGL reads scroll velocity every frame; putting it in React state would
 * re-render the tree sixty times a second, so Lenis writes here instead and
 * the shaders read it directly.
 */
export const scrollState = {
  velocity: 0,
  progress: 0,
  y: 0,
};

export function setScrollState(next: Partial<typeof scrollState>): void {
  Object.assign(scrollState, next);
}
