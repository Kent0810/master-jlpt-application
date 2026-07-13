import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Must be the pnpm workspace root (not this app's own dir) so file tracing
  // can resolve packages hoisted into the root node_modules/.pnpm store.
  // A too-narrow root drops files like next/dist/compiled/source-map from
  // the deployed serverless function, which only breaks routes that need a
  // real function invocation (dynamic/SSR pages) - statically generated
  // pages are unaffected since they ship as prebuilt HTML.
  outputFileTracingRoot: path.join(import.meta.dirname, "../.."),
};

export default nextConfig;
