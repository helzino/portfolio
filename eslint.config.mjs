import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    // React Three Fiber drives the GPU by mutating uniforms and object
    // transforms every frame — that is the whole point of useFrame, and the
    // immutability rule cannot tell it apart from accidental mutation.
    files: ["components/webgl/**/*.tsx"],
    rules: { "react-hooks/immutability": "off" },
  },
  { ignores: [".legacy/**", ".next/**", "node_modules/**", "scripts/**"] },
];

export default config;
