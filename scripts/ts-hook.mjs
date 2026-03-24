// scripts/ts-hook.mjs
// The actual loader hooks

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if ((err.code === 'ERR_UNKNOWN_FILE_EXTENSION' || err.code === 'ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING') && specifier.endsWith('.ts')) {
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
      source: 'export default {};\n',
    };
  }
  return nextLoad(url, context);
}
