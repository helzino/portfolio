import { baseVertexShader, coverChunk } from "@/shaders/common";

export { baseVertexShader };

/**
 * The hero image plane.
 *
 * Three forces move the photograph, all of them deliberately small: a slow
 * ambient drift, a ripple that follows the pointer, and a vertical smear plus
 * chromatic separation proportional to scroll velocity. `uReveal` drives the
 * entrance wipe so the picture arrives rather than appears.
 */
export const heroFragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uPlaneSize;
uniform vec2 uImageSize;
uniform vec2 uMouse;
uniform float uTime;
uniform float uVelocity;
uniform float uReveal;
uniform float uHover;

varying vec2 vUv;

${coverChunk}

void main() {
  vec2 uv = vUv;

  // Entrance: the frame settles out of a slight over-scale.
  float settle = mix(1.08, 1.0, uReveal);
  uv = (uv - 0.5) * settle + 0.5;

  // Ambient drift — barely perceptible, keeps the still from feeling dead.
  uv.y += sin(uTime * 0.12) * 0.0018;
  uv.x += cos(uTime * 0.09) * 0.0015;

  // Pointer ripple.
  float d = distance(vUv, uMouse);
  float falloff = smoothstep(0.65, 0.0, d);
  float ripple = sin(d * 13.0 - uTime * 1.1) * 0.0075 * falloff * (0.35 + uHover);
  vec2 dir = normalize(vUv - uMouse + vec2(0.0001));
  uv += dir * ripple;

  // Scroll velocity: a soft vertical smear, strongest at the centre.
  float centre = 1.0 - abs(vUv.x - 0.5) * 1.6;
  uv.y += uVelocity * 0.022 * centre;

  vec2 texUv = cover(uv, uPlaneSize, uImageSize);

  // Chromatic separation, scaled by how fast things are moving.
  float sep = abs(uVelocity) * 0.004 + falloff * 0.0015 * uHover;
  vec3 color;
  color.r = texture2D(uTexture, texUv + vec2(sep, 0.0)).r;
  color.g = texture2D(uTexture, texUv).g;
  color.b = texture2D(uTexture, texUv - vec2(sep, 0.0)).b;

  // Grain and vignette hold the image together tonally.
  color += (grain(vUv * 900.0, fract(uTime * 0.6)) - 0.5) * 0.035;
  float vignette = smoothstep(1.25, 0.35, distance(vUv, vec2(0.5)));
  color *= mix(0.84, 1.0, vignette);

  float wipe = smoothstep(0.0, 1.0, uReveal * 1.4 - (1.0 - vUv.y) * 0.4);
  gl_FragColor = vec4(color, wipe);
}
`;
