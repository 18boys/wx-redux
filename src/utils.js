/**
 * @file utils
 * @author shuai.li
 */
export const proxyPage = function (config, methodName, hookMethod) {
  if (config[methodName]) {
    const oldMethod = config[methodName];
    config[methodName] = function (options) {
      hookMethod.call(this, options, config);
      oldMethod.call(this, options)
    };
    return;
  }
  config[methodName] = function (options) {
    hookMethod.call(this, options, config)
  }
};
