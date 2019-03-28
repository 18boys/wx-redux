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

export default function getType(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

