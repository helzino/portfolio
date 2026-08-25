import { baseVertexShader, coverChunk } from "@/shaders/common";

export { baseVertexShader };

/**
 * Image-to-image transition used by the photography viewer: the outgoing
 * frame is pushed away along a displacement field while the incoming one
 * arrives against it, with a moving seam between the two.
 */
export const transitionFragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform vec2 uPlaneSize;
uniform vec2 uImageSizeA;
uniform vec2 uImageSizeB;
uniform float uProgress;
uniform float uDirection;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

${coverChunk}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float eased = p * p * (3.0 - 2.0 * p);

  // A slow wave gives the displacement an organic edge.
  float wave = sin((vUv.y + vUv.x * 0.4) * 6.2831 + uTime * 0.2) * 0.5 + 0.5;
  float amount = eased * (1.0 - eased) * 4.0;

  vec2 push = vec2(uDirection, 0.0) * (0.16 + wave * 0.05);
  // Scaled by the move, so a frame at rest samples its own pixels exactly
  // rather than sitting a fraction off and smearing its clamped edge.
  vec2 parallax = (uMouse - 0.5) * 0.02 * amount;

  vec2 uvA = cover(vUv + push * eased + parallax, uPlaneSize, uImageSizeA);
  vec2 uvB = cover(vUv - push * (1.0 - eased) + parallax, uPlaneSize, uImageSizeB);

  vec4 a = texture2D(uTextureA, uvA);
  vec4 b = texture2D(uTextureB, uvB);

  float seam = smoothstep(eased - 0.35 - wave * 0.15, eased + 0.35, vUv.x * uDirection * 0.5 + 0.5);
  vec3 blended = mix(b.rgb, a.rgb, seam);
  blended = mix(blended, mix(a.rgb, b.rgb, eased), 0.55);

  // The seam does not resolve on its own: its upper edge sits past 1.0, so at
  // the end of the move part of the frame still carries the outgoing image,
  // and the 0.55 mix only removes half of it. Land on each photograph exactly
  // at the ends of the move so what is on screen is the photograph.
  vec3 color = mix(blended, a.rgb, smoothstep(0.12, 0.0, p));
  color = mix(color, b.rgb, smoothstep(0.88, 1.0, p));

  // The image de-saturates very slightly at the midpoint of the move.
  float grey = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(color, vec3(grey), amount * 0.18);
  // Grain belongs to the move as well; a still photograph should not crawl.
  color += (grain(vUv * 800.0, fract(uTime * 0.5)) - 0.5) * 0.03 * amount;

  gl_FragColor = vec4(color, 1.0);
}
`;
