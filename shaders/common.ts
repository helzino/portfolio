/**
 * Shared GLSL: `cover` maps a plane's UVs onto a texture the way CSS
 * object-fit: cover does, so photographs are never stretched whatever the
 * viewport shape.
 */
export const coverChunk = /* glsl */ `
vec2 cover(vec2 uv, vec2 plane, vec2 image) {
  vec2 ratio = vec2(
    min((plane.x / plane.y) / (image.x / image.y), 1.0),
    min((plane.y / plane.x) / (image.y / image.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

float grain(vec2 uv, float t) {
  return fract(sin(dot(uv + t, vec2(12.9898, 78.233))) * 43758.5453);
}
`;

export const baseVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
