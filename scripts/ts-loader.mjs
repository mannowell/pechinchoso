// scripts/ts-loader.mjs
// Custom Node.js ESM loader that handles .ts files by treating them as empty modules.
// This is needed for Node v22+ which intercepts .ts files in node_modules.
// Usage: node --import ./scripts/ts-loader.mjs <script>

import { register } from 'module';

// Patch for Node 22+: ignore .ts file extension errors from node_modules
// by registering a hook that converts .ts imports to empty CJS modules.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (err.code === 'ERR_UNKNOWN_FILE_EXTENSION' && specifier.endsWith('.ts')) {
      // Return the specifier as-is, we'll handle it in load()
      return { shortCircuit: true, url: new URL(specifier, context.parentURL).href };
    }
    throw err;
  }
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    // Return empty module for TypeScript files that Node can't handle
    return {
      shortCircuit: true,
      format: 'module',
      source: '// auto-skipped .ts file\nexport default {};\n',
    };
  }
  return nextLoad(url, context);
}
