const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure .cjs files are resolved (needed by some packages on Node 25+)
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;