module.exports = function override (config, env) {
  console.log('override');
  const loaders = config.resolve;
  loaders.fallback = {
    'path': require.resolve('path-browserify'),
    'stream': require.resolve('stream-browserify'),
    'crypto': require.resolve('crypto-browserify')
  };

  return config;
};