// scripts/register-loader.mjs
// Registers the custom hook
import { register } from 'node:module';

// Register the actual hook file, import.meta.url is already a string file://...
register('./ts-hook.mjs', import.meta.url);
