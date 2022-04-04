module.exports = (config, options) => {
  config.optimization.minimizer.filter(({ constructor: { name } }) => name === 'JavaScriptOptimizerPlugin')
    .forEach(plugin => plugin.options.keepNames = true);

  return config;
};
