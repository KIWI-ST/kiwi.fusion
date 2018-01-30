var kiwi = (function (exports,stream) {
'use strict';

stream = stream && stream.hasOwnProperty('default') ? stream['default'] : stream;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jsx = function () {
  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  return function createRawReactElement(type, props, key, children) {
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {};
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  };
}();

var asyncIterator = function (iterable) {
  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      var method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      return iterable[Symbol.iterator]();
    }
  }

  throw new TypeError("Object is not async iterable");
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var asyncGeneratorDelegate = function (inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

var defaults = function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var _instanceof = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

var interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

var interopRequireWildcard = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
};

var newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var selfGlobal = typeof global === "undefined" ? self : global;

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var slicedToArrayLoose = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

var temporalRef = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
};

var temporalUndefined = {};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};




var babelHelpers = Object.freeze({
	jsx: jsx,
	asyncIterator: asyncIterator,
	asyncGenerator: asyncGenerator,
	asyncGeneratorDelegate: asyncGeneratorDelegate,
	asyncToGenerator: asyncToGenerator,
	classCallCheck: classCallCheck,
	createClass: createClass,
	defineEnumerableProperties: defineEnumerableProperties,
	defaults: defaults,
	defineProperty: defineProperty,
	get: get,
	inherits: inherits,
	interopRequireDefault: interopRequireDefault,
	interopRequireWildcard: interopRequireWildcard,
	newArrowCheck: newArrowCheck,
	objectDestructuringEmpty: objectDestructuringEmpty,
	objectWithoutProperties: objectWithoutProperties,
	possibleConstructorReturn: possibleConstructorReturn,
	selfGlobal: selfGlobal,
	set: set,
	slicedToArray: slicedToArray,
	slicedToArrayLoose: slicedToArrayLoose,
	taggedTemplateLiteral: taggedTemplateLiteral,
	taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
	temporalRef: temporalRef,
	temporalUndefined: temporalUndefined,
	toArray: toArray,
	toConsumableArray: toConsumableArray,
	typeof: _typeof,
	extends: _extends,
	instanceof: _instanceof
});

var isObject_1 = createCommonjsModule(function (module) {
  /**
   * reference:
   * http://www.css88.com/doc/underscore/docs/underscore.html
   * 
   */

  var isObject = function isObject(obj) {
    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    return type === 'function' || type === 'object' && !!obj;
  };

  module.exports = isObject;
});

var isString_1 = createCommonjsModule(function (module) {
  /**
   * reference:
   *  http://www.css88.com/doc/underscore/docs/underscore.html
   */

  var isString = function isString(str) {
    return typeof str == 'string' && str.constructor == String;
  };

  module.exports = isString;
});

var stamp_1 = createCommonjsModule(function (module) {
    /**
     * assign kiwi.gl object to be an unique id in the global
     * @author yellow 2017/5/26
     */

    var _prefix = '_kiwi.gl_',
        _prefixId = _prefix + 'id_';
    /**
     * the seed of id
     */
    var i = 1;
    /**
     * get uniqueId and count++
     * @param {String} prefix 
     */
    var getId = function getId(prefix) {
        return (prefix || _prefixId) + '_' + i++;
    };
    /**
     * 
     * @param {Object} obj 
     * @param {String} id 
     */
    var setId = function setId(obj, id) {
        if (isObject_1(obj) && isString_1(id)) {
            obj._kiwi_gl_id_ = id;
            return id;
        }
        return null;
    };
    /**
     * get the unique id
     * @method stamp
     * @param {Object} obj 
     * @return {String} error if returned 'null'
     */
    var stamp = function stamp(obj) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _prefix;

        if (!obj._kiwi_gl_id_) {
            var id = getId(prefix);
            return setId(obj, id);
        } else {
            return obj._kiwi_gl_id_;
        }
    };

    module.exports = stamp;
});

/**
 * 设计思路为.net framework 的 IDispose接口
 * 除此之外提供额外的属性：
 * -id
 * -handle
 * -create handle
 * -dispose
 */

/**
 * @class
 */

var Dispose = function () {
  /**
   * 构建一个可被销毁的资源对象,提供prefix
   */
  function Dispose() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    classCallCheck(this, Dispose);

    this._id = stamp_1(this, prefix);
  }
  /**
   * 获取资源id
   */


  createClass(Dispose, [{
    key: 'dispose',

    /**
     * 资源销毁方法，执行完一段后，统一调用
     * must be implement be child class
     * @abstract
     */
    value: function dispose() {
      throw new Error('no implementation of function dispose');
    }
  }, {
    key: 'id',
    get: function get$$1() {
      return this._id;
    }
  }]);
  return Dispose;
}();

var Dispose_1 = Dispose;

/**
*   @author }{yellow 2017/4/18
*   @returns {Object} 合并后对象
*/

/**
 * @func
 */
var merge = function merge() {
  var _babelHelpers;

  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return (_babelHelpers = babelHelpers).extends.apply(_babelHelpers, [{}].concat(sources));
};

var merge_1 = merge;

/**
 * reference:
 * http://www.css88.com/doc/underscore1.4.2/docs/underscore.html
 * 
 */

/**
 * @func
 */

/**
 * 操作记单元
 * @author yellow date 2018/1/4
 */

/**
 * @class
 */

var Record = function () {
  /**
   * 
   * @param {*} opName 
   * @param {*} rest 
   */
  function Record(opName) {
    classCallCheck(this, Record);

    /**
     * webgl operation name
     */
    this._opName = opName;
    /**
     * args
     */

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    this._rest = this._exact(rest);
    /**
     * use prfix instead of value in args
     * @type {Int}
     */
    this._ptMapIndex = {};
    /**
     * indicate this record needs to return value
     * @type {String}
     */
    this._returnId = null;
  }
  /**
   * operation name
   */


  createClass(Record, [{
    key: '_exact',

    /**
     * @private
     * @param {*} rest 
     */
    value: function _exact(rest) {
      for (var i = 0, len = rest.length; i < len; i++) {
        var target = rest[i];
        if (target instanceof Float32Array) {
          rest[i] = new Float32Array(target);
        }
      }
      return rest;
    }
    /**
     * 修改某处指令的值
     * @param {int} ptIndex 
     * @param {String} ptName always represents shaderId/porgramId/
     */

  }, {
    key: 'exactIndexByValue',
    value: function exactIndexByValue(ptIndex, ptName) {
      var arr = ptName.split('_');
      //map to _ptIndex
      this._ptMapIndex[ptIndex] = {
        prefix: arr[0],
        index: ptIndex,
        id: ptName
      };
      //replace value
      this._rest[ptIndex] = ptName;
    }
    /**
     * 
     * @param {Array} ptIndex 
     */

  }, {
    key: 'exactIndexByObject',
    value: function exactIndexByObject(ptIndexs) {
      for (var i = 0, len = ptIndexs.length; i < len; i++) {
        var ptIndex = ptIndexs[i],
            ptName = stamp_1(this._rest[ptIndex]);
        this.exactIndexByValue(ptIndex, ptName);
      }
    }
    /**
     * 
     * @param {Array} refs 
     */

  }, {
    key: 'replace',
    value: function replace(refs) {
      for (var key in refs) {
        this._rest[key] = refs[key];
      }
    }
    /**
     * 设置返回的id
     */

  }, {
    key: 'setReturnId',
    value: function setReturnId(v) {
      this._returnId = v;
      this._analysisReturnId(v);
    }
    /**
     * 
     * @param {String} v 
     */

  }, {
    key: '_analysisReturnId',
    value: function _analysisReturnId(v) {
      var val = isString_1(v) ? v : stamp_1(v);
      var arr = val.split('_');
      //map to _ptIndex
      this._returanIdPrefix = arr[0];
    }
  }, {
    key: 'opName',
    get: function get$$1() {
      return this._opName;
    }
    /**
     * arguments of record
     */

  }, {
    key: 'args',
    get: function get$$1() {
      return this._rest;
    }
    /**
     * @returns {String}
     */

  }, {
    key: 'returnId',
    get: function get$$1() {
      return this._returnId;
    }
    /**
     * @returns {String}
     */

  }, {
    key: 'returanIdPrefix',
    get: function get$$1() {
      return this._returanIdPrefix;
    }
    /**
     * @type {Int}
     */

  }, {
    key: 'ptMapIndex',
    get: function get$$1() {
      return this._ptMapIndex;
    }
  }]);
  return Record;
}();

var Record_1 = Record;

/**
 * reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
 * 
 * 具有返回对象的操作
 * -code 操作代码
 * -return 具有返回值的操作
 * -replace 需要使用新对象代替引用的操作
 * -ptIndex 替换参数的位置索引
 */

var Encrypt_WebGLContext = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/canvas
   * @property
   */
  'canvas': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/commit
   */
  'commit': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferWidth
   * @property
   */
  'drawingBufferWidth': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferHeight
   * @property
   */
  'drawingBufferHeight': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
   */
  'getContextAttributes': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost
   */
  'isContextLost': { code: 0, return: 1, replace: 0 }
};

var Encrypt_Viewing_And_Clipping = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
   */
  'scissor': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
   */
  'viewport': { code: 0, return: 0, replace: 0 }
};

var Encrypt_State_Information = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture
   */
  'activeTexture': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor
   */
  'blendColor': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation
   */
  'blendEquation': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquationSeparate
   */
  'blendEquationSeparate': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc
   */
  'blendFunc': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate
   */
  'blendFuncSeparate': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
   */
  'clearColor': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearDepth
   */
  'clearDepth': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearStencil
   */
  'clearStencil': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/colorMask
   */
  'colorMask': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/cullFace
   */
  'cullFace': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc
   */
  'depthFunc': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthMask
   */
  'depthMask': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthRange
   */
  'depthRange': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disable
   */
  'disable': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable
   */
  'enable': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/frontFace
   */
  'frontFace': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
   * @description 
   * warning return appropriate value by the parameter 'pname'
   */
  'getParameter': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
   */
  'getError': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/hint
   */
  'hint': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isEnabled
   */
  'isEnabled': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/lineWidth
   */
  'lineWidth': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
   */
  'pixelStorei': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/polygonOffset
   */
  'polygonOffset': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/sampleCoverage
   */
  'sampleCoverage': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc
   */
  'stencilFunc': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFuncSeparate
   */
  'stencilFuncSeparate': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMask
   */
  'stencilMask': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMaskSeparate
   */
  'stencilMaskSeparate': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOp
   */
  'stencilOp': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOpSeparate
   */
  'stencilOpSeparate': { code: 0, return: 0, replace: 0 }
};

var Encrypt_Buffers = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer
   */
  'bindBuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
   */
  'bufferData': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
   */
  'bufferSubData': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer
   */
  'createBuffer': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteBuffer
   */
  'deleteBuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getBufferParameter
   */
  'getBufferParameter': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isBuffer
   */
  'isBuffer': { code: 0, return: 1, replace: 0 }
};

var Encrypt_Framebuffers = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindFramebuffer
   */
  'bindFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/checkFramebufferStatus
   */
  'checkFramebufferStatus': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createFramebuffer
   */
  'createFramebuffer': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteFramebuffer
   */
  'deleteFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferRenderbuffer
   */
  'framebufferRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [3] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D
   */
  'framebufferTexture2D': { code: 0, return: 0, replace: 1, ptIndex: [3] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getFramebufferAttachmentParameter
   */
  'getFramebufferAttachmentParameter': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isFramebuffer
   */
  'isFramebuffer': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
   */
  'readPixels': { code: 0, return: 0, replace: 0 }
};

var Encrypt_Renderbuffers = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindRenderbuffer
   */
  'bindRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createRenderbuffer
   */
  'createRenderbuffer': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteRenderbuffer
   */
  'deleteRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getRenderbufferParameter
   */
  'getRenderbufferParameter': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isRenderbuffer
   */
  'isRenderbuffer': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/renderbufferStorage
   */
  'renderbufferStorage': { code: 0, return: 0, replace: 0 }
};

var Encrypt_Textures = {
  /**
  * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindTexture
  */
  'bindTexture': { code: 0, return: 0, replace: 1, ptIndex: [1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D
   */
  'compressedTexImage2D': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexImage2D
   */
  'copyTexImage2D': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexSubImage2D
   */
  'copyTexSubImage2D': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
   */
  'createTexture': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteTexture
   */
  'deleteTexture': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipmap
   */
  'generateMipmap': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
   */
  'getTexParameter': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isTexture
   */
  'isTexture': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
   */
  'texImage2D': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D
   */
  'texSubImage2D': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
   */
  'texParameterf': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
   */
  'texParameteri': { code: 0, return: 0, replace: 0 }
};

var Encrypt_Programs_And_Shaders = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/attachShader
   * @augments
   */
  'attachShader': { code: 0, return: 0, replace: 2, ptIndex: [0, 1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindAttribLocation
   * @augments
   */
  'bindAttribLocation': { code: 0, return: 0, replace: 2, ptIndex: [0, 1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compileShader
   */
  'compileShader': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
   */
  'createProgram': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
   */
  'createShader': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteProgram
   */
  'deleteProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteShader
   */
  'deleteShader': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/detachShader
   */
  'detachShader': { code: 0, return: 0, replace: 2, ptIndex: [0, 1] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttachedShaders
   */
  'getAttachedShaders': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramParameter
   */
  'getProgramParameter': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramInfoLog
   */
  'getProgramInfoLog': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderParameter
   */
  'getShaderParameter': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
   */
  'getShaderPrecisionFormat': { code: 0, return: 1, replace: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog
   */
  'getShaderInfoLog': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderSource
   */
  'getShaderSource': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isProgram
   */
  'isProgram': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isShader
   */
  'isShader': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/linkProgram
   */
  'linkProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource
   */
  'shaderSource': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/useProgram
   */
  'useProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/validateProgram
   */
  'validateProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] }
};

var Encrypt_Uniforms_And_Attributes = {
  /**
      * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disableVertexAttribArray
      */
  'disableVertexAttribArray': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray
   */
  'enableVertexAttribArray': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveAttrib
   */
  'getActiveAttrib': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveUniform
   */
  'getActiveUniform': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
   */
  'getAttribLocation': { code: 0, return: 1, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttrib
   */
  'getVertexAttrib': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttribOffset
   */
  'getVertexAttribOffset': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
   */
  'vertexAttribPointer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniformMatrix
   */
  'uniformMatrix2fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniformMatrix3fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniformMatrix4fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniform
   */
  'uniform1f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform1fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform1i': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform1iv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform2f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform2fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform2i': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform2iv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform3f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform3fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform3i': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform3iv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform4f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform4fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform4i': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'uniform4iv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttrib
   */
  'vertexAttrib1f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib2f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib3f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib4f': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib1fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib2fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib3fv': { code: 0, return: 0, replace: 1, ptIndex: [0] },
  'vertexAttrib4fv': { code: 0, return: 0, replace: 1, ptIndex: [0] }
};

var Encrypt_Drawing_Buffers = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear
   */
  'clear': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
   */
  'drawArrays': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
   */
  'drawElements': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/finish
   */
  'finish': { code: 0, return: 0, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/flush
   */
  'flush': { code: 0, return: 0, replace: 0 }
};

var Encrypt_Working_With_Extensions = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getSupportedExtensions
   */
  'getSupportedExtensions': { code: 0, return: 1, replace: 0 },
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getExtension
   */
  'getExtension': { code: 0, return: 1, replace: 0 }
};

var Encrypt = merge_1({}, Encrypt_Buffers, Encrypt_Drawing_Buffers, Encrypt_Framebuffers, Encrypt_Programs_And_Shaders, Encrypt_Renderbuffers, Encrypt_State_Information, Encrypt_Textures, Encrypt_Uniforms_And_Attributes, Encrypt_Viewing_And_Clipping, Encrypt_WebGLContext, Encrypt_Working_With_Extensions);

/**
 * @author yellow date 2018/1/4
 */

/**
 * @class
 */

var Recorder = function () {
  function Recorder(glContext) {
    classCallCheck(this, Recorder);

    /**
     * @type {GLContext}
     */
    this._glContext = glContext;
    /**
     * @type {Array}
     */
    this._records = [];
    /**
     * 注册到全局实例中
     */
    Recorder.instances[glContext.id] = this;
  }
  /**
   * 新增record
   * @param {Record} record 
   */


  createClass(Recorder, [{
    key: 'increase',
    value: function increase(record) {
      this._records.push(record);
    }
    /**
     * 将现有的记录转换成指令
     */

  }, {
    key: 'toInstruction',
    value: function toInstruction() {
      var len = this._records.length,
          list = this._records.splice(0, len);
      return list;
    }
  }]);
  return Recorder;
}();
/**
 * 
 */


Recorder.instances = {};

var Recorder_1 = Recorder;

/**
 * reference https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
 * reference https://github.com/uber/luma.gl/blob/master/src/webgl-utils/constants.js
 * reference https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types
 * Store GLEnum value the boost glContext setting
 * webgl2 used within a WebGL2RenderingContext,add GLint64(GLuint64EXT) 
 * @author yellow date 2017/6/15
 */
var GLConstants = {
    /**
     * 深度缓冲，常用与 gl.clear(gl.Enum)
     * Passed to clear to clear the current depth buffer.
     */
    DEPTH_BUFFER_BIT: 0x00000100,
    /**
     * 模版缓冲，常用与 gl.clear(gl.Enum)
     * Passed to clear to clear the current stencil buffer.
     */
    STENCIL_BUFFER_BIT: 0x00000400,
    /**
     * 当前可写的颜色缓冲，常用与 gl.clear(gl.Enum)
     *  Passed to clear to clear the current color buffer.
     */
    COLOR_BUFFER_BIT: 0x00004000, //
    // Rendering primitives
    // Constants passed to drawElements() or drawArrays() to specify what kind of primitive to render.
    POINTS: 0x0000, // Passed to drawElements or drawArrays to draw single points.
    LINES: 0x0001, // Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it.
    LINE_LOOP: 0x0002, // Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
    LINE_STRIP: 0x0003, // Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last.
    TRIANGLES: 0x0004, // Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
    TRIANGLE_STRIP: 0x0005, // Passed to drawElements or drawArrays to draw a connected group of triangles.
    TRIANGLE_FAN: 0x0006, // Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan.
    // Blending modes
    // Constants passed to blendFunc() or blendFuncSeparate() to specify the blending mode (for both, RBG and alpha, or separately).
    ZERO: 0, // Passed to blendFunc or blendFuncSeparate to turn off a component.
    ONE: 1, // Passed to blendFunc or blendFuncSeparate to turn on a component.
    SRC_COLOR: 0x0300, // Passed to blendFunc or blendFuncSeparate to multiply a component by the source elements color.
    ONE_MINUS_SRC_COLOR: 0x0301, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source elements color.
    SRC_ALPHA: 0x0302, // Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha.
    /**
     * 传递给BleandFunc或BlendFuncSeparate使用，用来指定混合计算颜色时，基于源颜色的aplha所占比。
     * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha.
     */
    ONE_MINUS_SRC_ALPHA: 0x0303,
    DST_ALPHA: 0x0304, // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's alpha.
    ONE_MINUS_DST_ALPHA: 0x0305, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's alpha.
    DST_COLOR: 0x0306, // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's color.
    ONE_MINUS_DST_COLOR: 0x0307, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's color.
    SRC_ALPHA_SATURATE: 0x0308, // Passed to blendFunc or blendFuncSeparate to multiply a component by the minimum of source's alpha or one minus the destination's alpha.
    CONSTANT_COLOR: 0x8001, // Passed to blendFunc or blendFuncSeparate to specify a constant color blend function.
    ONE_MINUS_CONSTANT_COLOR: 0x8002, // Passed to blendFunc or blendFuncSeparate to specify one minus a constant color blend function.
    CONSTANT_ALPHA: 0x8003, // Passed to blendFunc or blendFuncSeparate to specify a constant alpha blend function.
    ONE_MINUS_CONSTANT_ALPHA: 0x8004, // Passed to blendFunc or blendFuncSeparate to specify one minus a constant alpha blend function.
    // Blending equations
    // Constants passed to blendEquation() or blendEquationSeparate() to control
    // how the blending is calculated (for both, RBG and alpha, or separately).
    FUNC_ADD: 0x8006, // Passed to blendEquation or blendEquationSeparate to set an addition blend function.
    FUNC_SUBSTRACT: 0x800A, // Passed to blendEquation or blendEquationSeparate to specify a subtraction blend function (source - destination).
    FUNC_REVERSE_SUBTRACT: 0x800B, // Passed to blendEquation or blendEquationSeparate to specify a reverse subtraction blend function (destination - source).
    // Getting GL parameter information
    // Constants passed to getParameter() to specify what information to return.
    BLEND_EQUATION: 0x8009, // Passed to getParameter to get the current RGB blend function.
    BLEND_EQUATION_RGB: 0x8009, // Passed to getParameter to get the current RGB blend function. Same as BLEND_EQUATION
    BLEND_EQUATION_ALPHA: 0x883D, // Passed to getParameter to get the current alpha blend function. Same as BLEND_EQUATION
    BLEND_DST_RGB: 0x80C8, // Passed to getParameter to get the current destination RGB blend function.
    BLEND_SRC_RGB: 0x80C9, // Passed to getParameter to get the current destination RGB blend function.
    BLEND_DST_ALPHA: 0x80CA, // Passed to getParameter to get the current destination alpha blend function.
    BLEND_SRC_ALPHA: 0x80CB, // Passed to getParameter to get the current source alpha blend function.
    BLEND_COLOR: 0x8005, // Passed to getParameter to return a the current blend color.
    ARRAY_BUFFER_BINDING: 0x8894, // Passed to getParameter to get the array buffer binding.
    ELEMENT_ARRAY_BUFFER_BINDING: 0x8895, // Passed to getParameter to get the current element array buffer.
    LINE_WIDTH: 0x0B21, // Passed to getParameter to get the current lineWidth (set by the lineWidth method).
    ALIASED_POINT_SIZE_RANGE: 0x846D, // Passed to getParameter to get the current size of a point drawn with gl.POINTS
    ALIASED_LINE_WIDTH_RANGE: 0x846E, // Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1.
    CULL_FACE_MODE: 0x0B45, // Passed to getParameter to get the current value of cullFace. Should return FRONT, BACK, or FRONT_AND_BACK
    FRONT_FACE: 0x0B46, // Passed to getParameter to determine the current value of frontFace. Should return CW or CCW.
    DEPTH_RANGE: 0x0B70, // Passed to getParameter to return a length-2 array of floats giving the current depth range.
    DEPTH_WRITEMASK: 0x0B72, // Passed to getParameter to determine if the depth write mask is enabled.
    DEPTH_CLEAR_VALUE: 0x0B73, // Passed to getParameter to determine the current depth clear value.
    DEPTH_FUNC: 0x0B74, // Passed to getParameter to get the current depth function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
    STENCIL_CLEAR_VALUE: 0x0B91, // Passed to getParameter to get the value the stencil will be cleared to.
    STENCIL_FUNC: 0x0B92, // Passed to getParameter to get the current stencil function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
    STENCIL_FAIL: 0x0B94, // Passed to getParameter to get the current stencil fail function. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
    STENCIL_PASS_DEPTH_FAIL: 0x0B95, // Passed to getParameter to get the current stencil fail function should the depth buffer test fail. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
    STENCIL_PASS_DEPTH_PASS: 0x0B96, // Passed to getParameter to get the current stencil fail function should the depth buffer test pass. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
    STENCIL_REF: 0x0B97, // Passed to getParameter to get the reference value used for stencil tests.
    STENCIL_VALUE_MASK: 0x0B93,
    STENCIL_WRITEMASK: 0x0B98,
    STENCIL_BACK_FUNC: 0x8800,
    STENCIL_BACK_FAIL: 0x8801,
    STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
    STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
    STENCIL_BACK_REF: 0x8CA3,
    STENCIL_BACK_VALUE_MASK: 0x8CA4,
    STENCIL_BACK_WRITEMASK: 0x8CA5,
    VIEWPORT: 0x0BA2, // Returns an Int32Array with four elements for the current viewport dimensions.
    SCISSOR_BOX: 0x0C10, // Returns an Int32Array with four elements for the current scissor box dimensions.
    COLOR_CLEAR_VALUE: 0x0C22,
    COLOR_WRITEMASK: 0x0C23,
    UNPACK_ALIGNMENT: 0x0CF5,
    PACK_ALIGNMENT: 0x0D05,
    MAX_TEXTURE_SIZE: 0x0D33,
    MAX_VIEWPORT_DIMS: 0x0D3A,
    SUBPIXEL_BITS: 0x0D50,
    RED_BITS: 0x0D52,
    GREEN_BITS: 0x0D53,
    BLUE_BITS: 0x0D54,
    ALPHA_BITS: 0x0D55,
    DEPTH_BITS: 0x0D56,
    STENCIL_BITS: 0x0D57,
    POLYGON_OFFSET_UNITS: 0x2A00,
    POLYGON_OFFSET_FACTOR: 0x8038,
    TEXTURE_BINDING_2D: 0x8069,
    SAMPLE_BUFFERS: 0x80A8,
    SAMPLES: 0x80A9,
    SAMPLE_COVERAGE_VALUE: 0x80AA,
    SAMPLE_COVERAGE_INVERT: 0x80AB,
    COMPRESSED_TEXTURE_FORMATS: 0x86A3,
    VENDOR: 0x1F00,
    RENDERER: 0x1F01,
    VERSION: 0x1F02,
    IMPLEMENTATION_COLOR_READ_TYPE: 0x8B9A,
    IMPLEMENTATION_COLOR_READ_FORMAT: 0x8B9B,
    BROWSER_DEFAULT_WEBGL: 0x9244,

    // Buffers
    // Constants passed to bufferData(), bufferSubData(), bindBuffer(), or
    // getBufferParameter().

    STATIC_DRAW: 0x88E4, // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
    STREAM_DRAW: 0x88E0, // Passed to bufferData as a hint about whether the contents of the buffer are likely to not be used often.
    DYNAMIC_DRAW: 0x88E8, // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often.
    ARRAY_BUFFER: 0x8892, // Passed to bindBuffer or bufferData to specify the type of buffer being used.
    ELEMENT_ARRAY_BUFFER: 0x8893, // Passed to bindBuffer or bufferData to specify the type of buffer being used.
    BUFFER_SIZE: 0x8764, // Passed to getBufferParameter to get a buffer's size.
    BUFFER_USAGE: 0x8765, // Passed to getBufferParameter to get the hint for the buffer passed in when it was created.

    // Vertex attributes
    // Constants passed to getVertexAttrib().

    CURRENT_VERTEX_ATTRIB: 0x8626, // Passed to getVertexAttrib to read back the current vertex attribute.
    VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
    VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
    VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
    VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886A,
    VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889F,

    // Culling
    // Constants passed to cullFace().

    CULL_FACE: 0x0B44, // Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
    FRONT: 0x0404, // Passed to cullFace to specify that only front faces should be drawn.
    BACK: 0x0405, // Passed to cullFace to specify that only back faces should be drawn.
    FRONT_AND_BACK: 0x0408, // Passed to cullFace to specify that front and back faces should be drawn.

    // Enabling and disabling
    // Constants passed to enable() or disable().

    BLEND: 0x0BE2, // Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method.
    DEPTH_TEST: 0x0B71, // Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
    DITHER: 0x0BD0, // Passed to enable/disable to turn on/off dithering. Can also be used with getParameter to find the current dithering method.
    POLYGON_OFFSET_FILL: 0x8037, // Passed to enable/disable to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and or solids with highlighted edges. Can also be used with getParameter to query the scissor test.
    SAMPLE_ALPHA_TO_COVERAGE: 0x809E, // Passed to enable/disable to turn on/off the alpha to coverage. Used in multi-sampling alpha channels.
    SAMPLE_COVERAGE: 0x80A0, // Passed to enable/disable to turn on/off the sample coverage. Used in multi-sampling.
    SCISSOR_TEST: 0x0C11, // Passed to enable/disable to turn on/off the scissor test. Can also be used with getParameter to query the scissor test.
    /**
     *  模版缓冲区测试，发生在透明度测试之后，和深度测试之前
     *  Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test.
     */
    STENCIL_TEST: 0x0B90,

    // Errors
    // Constants returned from getError().

    NO_ERROR: 0, // Returned from getError.
    INVALID_ENUM: 0x0500, //  Returned from getError.
    INVALID_VALUE: 0x0501, //  Returned from getError.
    INVALID_OPERATION: 0x0502, //  Returned from getError.
    OUT_OF_MEMORY: 0x0505, //  Returned from getError.
    CONTEXT_LOST_WEBGL: 0x9242, //  Returned from getError.

    // Front face directions
    // Constants passed to frontFace().

    CW: 0x0900, //  Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction
    CCW: 0x0901, // Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction

    // Hints
    // Constants passed to hint()

    DONT_CARE: 0x1100, // There is no preference for this behavior.
    FASTEST: 0x1101, // The most efficient behavior should be used.
    NICEST: 0x1102, // The most correct or the highest quality option should be used.
    GENERATE_MIPMAP_HINT: 0x8192, // Hint for the quality of filtering when generating mipmap images with generateMipmap().

    // Data types

    BYTE: 0x1400,
    /**
     * 无符号byte,即每通道8bit 适合 gl.RGBA
     */
    UNSIGNED_BYTE: 0x1401,
    SHORT: 0x1402,
    UNSIGNED_SHORT: 0x1403,
    INT: 0x1404,
    UNSIGNED_INT: 0x1405,
    FLOAT: 0x1406,

    // Pixel formats

    DEPTH_COMPONENT: 0x1902,
    ALPHA: 0x1906,
    /**
     * RGB颜色表示Texture，Image颜色读取规则
     */
    RGB: 0x1907,
    RGBA: 0x1908,
    LUMINANCE: 0x1909,
    LUMINANCE_ALPHA: 0x190A,

    // Pixel types

    // UNSIGNED_BYTE: 0x1401,
    UNSIGNED_SHORT_4_4_4_4: 0x8033,
    UNSIGNED_SHORT_5_5_5_1: 0x8034,
    UNSIGNED_SHORT_5_6_5: 0x8363,

    // Shaders
    // Constants passed to createShader() or getShaderParameter()

    FRAGMENT_SHADER: 0x8B30, // Passed to createShader to define a fragment shader.
    VERTEX_SHADER: 0x8B31, // Passed to createShader to define a vertex shader
    /**
     * shader 编译状态，
     * Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error
     */
    COMPILE_STATUS: 0x8B81,
    DELETE_STATUS: 0x8B80, // Passed to getShaderParamter to determine if a shader was deleted via deleteShader. Returns true if it was, false otherwise.
    LINK_STATUS: 0x8B82, // Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
    VALIDATE_STATUS: 0x8B83, // Passed to getProgramParameter after calling validateProgram to determine if it is valid. Returns false if errors were found.
    ATTACHED_SHADERS: 0x8B85, // Passed to getProgramParameter after calling attachShader to determine if the shader was attached correctly. Returns false if errors occurred.
    /**
     * 获取program里可用的attributes，【map到program里方便upload属性】
     */
    ACTIVE_ATTRIBUTES: 0x8B89, // Passed to getProgramParameter to get the number of attributes active in a program.
    /**
     * 获取program里可用的uniforms，【map到program里方便upload属性】
     */
    ACTIVE_UNIFORMS: 0x8B86, // Passed to getProgramParamter to get the number of uniforms active in a program.
    MAX_VERTEX_ATTRIBS: 0x8869,
    MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB,
    MAX_VARYING_VECTORS: 0x8DFC,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8B4C,
    MAX_TEXTURE_IMAGE_UNITS: 0x8872, // Implementation dependent number of maximum texture units. At least 8.
    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD,
    SHADER_TYPE: 0x8B4F,
    SHADING_LANGUAGE_VERSION: 0x8B8C,
    CURRENT_PROGRAM: 0x8B8D,

    // Depth or stencil tests
    // Constants passed to depthFunc() or stencilFunc().

    NEVER: 0x0200, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn.
    ALWAYS: 0x0207, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn.
    LESS: 0x0201, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value.
    EQUAL: 0x0202, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value.
    /**
     * 测试对比条件，当参考值小于等于模板值时，通过测试，常用于深度测试
     * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value.
     */
    LEQUAL: 0x0203,
    /**
     * 测试对比条件，当参考值大于模版值时，通过测试
     * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value.
     */
    GREATER: 0x0204,
    GEQUAL: 0x0206, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value.
    NOTEQUAL: 0x0205, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value.

    // Stencil actions
    // Constants passed to stencilOp().

    KEEP: 0x1E00,
    REPLACE: 0x1E01,
    INCR: 0x1E02,
    DECR: 0x1E03,
    INVERT: 0x150A,
    INCR_WRAP: 0x8507,
    DECR_WRAP: 0x8508,

    // Textures
    // Constants passed to texParameteri(),
    // texParameterf(), bindTexture(), texImage2D(), and others.

    NEAREST: 0x2600,
    LINEAR: 0x2601,
    NEAREST_MIPMAP_NEAREST: 0x2700,
    LINEAR_MIPMAP_NEAREST: 0x2701,
    NEAREST_MIPMAP_LINEAR: 0x2702,
    LINEAR_MIPMAP_LINEAR: 0x2703,
    TEXTURE_MAG_FILTER: 0x2800,
    TEXTURE_MIN_FILTER: 0x2801,
    TEXTURE_WRAP_S: 0x2802,
    TEXTURE_WRAP_T: 0x2803,
    TEXTURE_2D: 0x0DE1,
    TEXTURE: 0x1702,
    TEXTURE_CUBE_MAP: 0x8513,
    TEXTURE_BINDING_CUBE_MAP: 0x8514,
    TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
    TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
    TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
    TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A,
    MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C,
    // TEXTURE0 - 31 0x84C0 - 0x84DF A texture unit.
    TEXTURE0: 0x84C0, // A texture unit.
    ACTIVE_TEXTURE: 0x84E0, // The current active texture unit.
    REPEAT: 0x2901,
    CLAMP_TO_EDGE: 0x812F,
    MIRRORED_REPEAT: 0x8370,

    // Emulation
    TEXTURE_WIDTH: 0x1000,
    TEXTURE_HEIGHT: 0x1001,

    // Uniform types

    FLOAT_VEC2: 0x8B50,
    FLOAT_VEC3: 0x8B51,
    FLOAT_VEC4: 0x8B52,
    INT_VEC2: 0x8B53,
    INT_VEC3: 0x8B54,
    INT_VEC4: 0x8B55,
    BOOL: 0x8B56,
    BOOL_VEC2: 0x8B57,
    BOOL_VEC3: 0x8B58,
    BOOL_VEC4: 0x8B59,
    FLOAT_MAT2: 0x8B5A,
    FLOAT_MAT3: 0x8B5B,
    FLOAT_MAT4: 0x8B5C,
    SAMPLER_2D: 0x8B5E,
    SAMPLER_CUBE: 0x8B60,

    // Shader precision-specified types

    LOW_FLOAT: 0x8DF0,
    MEDIUM_FLOAT: 0x8DF1,
    HIGH_FLOAT: 0x8DF2,
    LOW_INT: 0x8DF3,
    MEDIUM_INT: 0x8DF4,
    HIGH_INT: 0x8DF5,

    // Framebuffers and renderbuffers
    /**
     * 绑定framebuffer
     */
    FRAMEBUFFER: 0x8D40,
    /**
     * 绑定 renderbuffer 
     */
    RENDERBUFFER: 0x8D41,
    RGBA4: 0x8056,
    RGB5_A1: 0x8057,
    RGB565: 0x8D62,
    DEPTH_COMPONENT16: 0x81A5,
    STENCIL_INDEX: 0x1901,
    STENCIL_INDEX8: 0x8D48,
    /**
     * 一般用于 bufferStorage，支持深度和缓冲区数据存储
     */
    DEPTH_STENCIL: 0x84F9,
    RENDERBUFFER_WIDTH: 0x8D42,
    RENDERBUFFER_HEIGHT: 0x8D43,
    RENDERBUFFER_INTERNAL_FORMAT: 0x8D44,
    RENDERBUFFER_RED_SIZE: 0x8D50,
    RENDERBUFFER_GREEN_SIZE: 0x8D51,
    RENDERBUFFER_BLUE_SIZE: 0x8D52,
    RENDERBUFFER_ALPHA_SIZE: 0x8D53,
    RENDERBUFFER_DEPTH_SIZE: 0x8D54,
    RENDERBUFFER_STENCIL_SIZE: 0x8D55,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8CD0,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8CD1,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8CD2,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8CD3,
    COLOR_ATTACHMENT0: 0x8CE0,
    DEPTH_ATTACHMENT: 0x8D00,
    STENCIL_ATTACHMENT: 0x8D20,
    /**
     * 深度和缓冲区附着，webgl2支持
     */
    DEPTH_STENCIL_ATTACHMENT: 0x821A,
    NONE: 0,
    FRAMEBUFFER_COMPLETE: 0x8CD5,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8CD6,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8CD7,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8CD9,
    FRAMEBUFFER_UNSUPPORTED: 0x8CDD,
    FRAMEBUFFER_BINDING: 0x8CA6,
    RENDERBUFFER_BINDING: 0x8CA7,
    MAX_RENDERBUFFER_SIZE: 0x84E8,
    INVALID_FRAMEBUFFER_OPERATION: 0x0506,

    // READ_FRAMEBUFFER: 0x8CA8,
    // DRAW_FRAMEBUFFER: 0x8CA9,

    // Pixel storage modes
    // Constants passed to pixelStorei().

    UNPACK_FLIP_Y_WEBGL: 0x9240,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,

    // /////////////////////////////////////////////////////
    // Additional constants defined WebGL 2
    // These constants are defined on the WebGL2RenderingContext interface.
    // All WebGL 1 constants are also available in a WebGL 2 context.
    // /////////////////////////////////////////////////////

    // Getting GL parameter information
    // Constants passed to getParameter()
    // to specify what information to return.

    READ_BUFFER: 0x0C02,
    UNPACK_ROW_LENGTH: 0x0CF2,
    UNPACK_SKIP_ROWS: 0x0CF3,
    UNPACK_SKIP_PIXELS: 0x0CF4,
    PACK_ROW_LENGTH: 0x0D02,
    PACK_SKIP_ROWS: 0x0D03,
    PACK_SKIP_PIXELS: 0x0D04,
    TEXTURE_BINDING_3D: 0x806A,
    UNPACK_SKIP_IMAGES: 0x806D,
    UNPACK_IMAGE_HEIGHT: 0x806E,
    MAX_3D_TEXTURE_SIZE: 0x8073,
    MAX_ELEMENTS_VERTICES: 0x80E8,
    MAX_ELEMENTS_INDICES: 0x80E9,
    MAX_TEXTURE_LOD_BIAS: 0x84FD,
    MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8B49,
    MAX_VERTEX_UNIFORM_COMPONENTS: 0x8B4A,
    MAX_ARRAY_TEXTURE_LAYERS: 0x88FF,
    MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
    MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
    MAX_VARYING_COMPONENTS: 0x8B4B,
    FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8B8B,
    RASTERIZER_DISCARD: 0x8C89,
    VERTEX_ARRAY_BINDING: 0x85B5,
    MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
    MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
    MAX_SERVER_WAIT_TIMEOUT: 0x9111,
    MAX_ELEMENT_INDEX: 0x8D6B,

    // Textures
    // Constants passed to texParameteri(),
    // texParameterf(), bindTexture(), texImage2D(), and others.

    RED: 0x1903,
    RGB8: 0x8051,
    RGBA8: 0x8058,
    RGB10_A2: 0x8059,
    TEXTURE_3D: 0x806F,
    TEXTURE_WRAP_R: 0x8072,
    TEXTURE_MIN_LOD: 0x813A,
    TEXTURE_MAX_LOD: 0x813B,
    TEXTURE_BASE_LEVEL: 0x813C,
    TEXTURE_MAX_LEVEL: 0x813D,
    TEXTURE_COMPARE_MODE: 0x884C,
    TEXTURE_COMPARE_FUNC: 0x884D,
    SRGB: 0x8C40,
    SRGB8: 0x8C41,
    SRGB8_ALPHA8: 0x8C43,
    COMPARE_REF_TO_TEXTURE: 0x884E,
    RGBA32F: 0x8814,
    RGB32F: 0x8815,
    RGBA16F: 0x881A,
    RGB16F: 0x881B,
    TEXTURE_2D_ARRAY: 0x8C1A,
    TEXTURE_BINDING_2D_ARRAY: 0x8C1D,
    R11F_G11F_B10F: 0x8C3A,
    RGB9_E5: 0x8C3D,
    RGBA32UI: 0x8D70,
    RGB32UI: 0x8D71,
    RGBA16UI: 0x8D76,
    RGB16UI: 0x8D77,
    RGBA8UI: 0x8D7C,
    RGB8UI: 0x8D7D,
    RGBA32I: 0x8D82,
    RGB32I: 0x8D83,
    RGBA16I: 0x8D88,
    RGB16I: 0x8D89,
    RGBA8I: 0x8D8E,
    RGB8I: 0x8D8F,
    RED_INTEGER: 0x8D94,
    RGB_INTEGER: 0x8D98,
    RGBA_INTEGER: 0x8D99,
    R8: 0x8229,
    RG8: 0x822B,
    R16F: 0x822D,
    R32F: 0x822E,
    RG16F: 0x822F,
    RG32F: 0x8230,
    R8I: 0x8231,
    R8UI: 0x8232,
    R16I: 0x8233,
    R16UI: 0x8234,
    R32I: 0x8235,
    R32UI: 0x8236,
    RG8I: 0x8237,
    RG8UI: 0x8238,
    RG16I: 0x8239,
    RG16UI: 0x823A,
    RG32I: 0x823B,
    RG32UI: 0x823C,
    R8_SNORM: 0x8F94,
    RG8_SNORM: 0x8F95,
    RGB8_SNORM: 0x8F96,
    RGBA8_SNORM: 0x8F97,
    RGB10_A2UI: 0x906F,

    /* covered by extension
    COMPRESSED_R11_EAC : 0x9270,
    COMPRESSED_SIGNED_R11_EAC: 0x9271,
    COMPRESSED_RG11_EAC: 0x9272,
    COMPRESSED_SIGNED_RG11_EAC : 0x9273,
    COMPRESSED_RGB8_ETC2 : 0x9274,
    COMPRESSED_SRGB8_ETC2: 0x9275,
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 : 0x9276,
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC : 0x9277,
    COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : 0x9279,
    */
    TEXTURE_IMMUTABLE_FORMAT: 0x912F,
    TEXTURE_IMMUTABLE_LEVELS: 0x82DF,

    // Pixel types

    UNSIGNED_INT_2_10_10_10_REV: 0x8368,
    UNSIGNED_INT_10F_11F_11F_REV: 0x8C3B,
    UNSIGNED_INT_5_9_9_9_REV: 0x8C3E,
    FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8DAD,
    UNSIGNED_INT_24_8: 0x84FA,
    HALF_FLOAT: 0x140B,
    RG: 0x8227,
    RG_INTEGER: 0x8228,
    INT_2_10_10_10_REV: 0x8D9F,

    // Queries

    CURRENT_QUERY: 0x8865,
    QUERY_RESULT: 0x8866,
    QUERY_RESULT_AVAILABLE: 0x8867,
    ANY_SAMPLES_PASSED: 0x8C2F,
    ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8D6A,

    // Draw buffers

    MAX_DRAW_BUFFERS: 0x8824,
    DRAW_BUFFER0: 0x8825,
    DRAW_BUFFER1: 0x8826,
    DRAW_BUFFER2: 0x8827,
    DRAW_BUFFER3: 0x8828,
    DRAW_BUFFER4: 0x8829,
    DRAW_BUFFER5: 0x882A,
    DRAW_BUFFER6: 0x882B,
    DRAW_BUFFER7: 0x882C,
    DRAW_BUFFER8: 0x882D,
    DRAW_BUFFER9: 0x882E,
    DRAW_BUFFER10: 0x882F,
    DRAW_BUFFER11: 0x8830,
    DRAW_BUFFER12: 0x8831,
    DRAW_BUFFER13: 0x8832,
    DRAW_BUFFER14: 0x8833,
    DRAW_BUFFER15: 0x8834,
    MAX_COLOR_ATTACHMENTS: 0x8CDF,
    COLOR_ATTACHMENT1: 0x8CE1,
    COLOR_ATTACHMENT2: 0x8CE2,
    COLOR_ATTACHMENT3: 0x8CE3,
    COLOR_ATTACHMENT4: 0x8CE4,
    COLOR_ATTACHMENT5: 0x8CE5,
    COLOR_ATTACHMENT6: 0x8CE6,
    COLOR_ATTACHMENT7: 0x8CE7,
    COLOR_ATTACHMENT8: 0x8CE8,
    COLOR_ATTACHMENT9: 0x8CE9,
    COLOR_ATTACHMENT10: 0x8CEA,
    COLOR_ATTACHMENT11: 0x8CEB,
    COLOR_ATTACHMENT12: 0x8CEC,
    COLOR_ATTACHMENT13: 0x8CED,
    COLOR_ATTACHMENT14: 0x8CEE,
    COLOR_ATTACHMENT15: 0x8CEF,

    // Samplers

    SAMPLER_3D: 0x8B5F,
    SAMPLER_2D_SHADOW: 0x8B62,
    SAMPLER_2D_ARRAY: 0x8DC1,
    SAMPLER_2D_ARRAY_SHADOW: 0x8DC4,
    SAMPLER_CUBE_SHADOW: 0x8DC5,
    INT_SAMPLER_2D: 0x8DCA,
    INT_SAMPLER_3D: 0x8DCB,
    INT_SAMPLER_CUBE: 0x8DCC,
    INT_SAMPLER_2D_ARRAY: 0x8DCF,
    UNSIGNED_INT_SAMPLER_2D: 0x8DD2,
    UNSIGNED_INT_SAMPLER_3D: 0x8DD3,
    UNSIGNED_INT_SAMPLER_CUBE: 0x8DD4,
    UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8DD7,
    MAX_SAMPLES: 0x8D57,
    SAMPLER_BINDING: 0x8919,

    // Buffers

    PIXEL_PACK_BUFFER: 0x88EB,
    PIXEL_UNPACK_BUFFER: 0x88EC,
    PIXEL_PACK_BUFFER_BINDING: 0x88ED,
    PIXEL_UNPACK_BUFFER_BINDING: 0x88EF,
    COPY_READ_BUFFER: 0x8F36,
    COPY_WRITE_BUFFER: 0x8F37,
    COPY_READ_BUFFER_BINDING: 0x8F36,
    COPY_WRITE_BUFFER_BINDING: 0x8F37,

    // Data types

    FLOAT_MAT2x3: 0x8B65,
    FLOAT_MAT2x4: 0x8B66,
    FLOAT_MAT3x2: 0x8B67,
    FLOAT_MAT3x4: 0x8B68,
    FLOAT_MAT4x2: 0x8B69,
    FLOAT_MAT4x3: 0x8B6A,
    UNSIGNED_INT_VEC2: 0x8DC6,
    UNSIGNED_INT_VEC3: 0x8DC7,
    UNSIGNED_INT_VEC4: 0x8DC8,
    UNSIGNED_NORMALIZED: 0x8C17,
    SIGNED_NORMALIZED: 0x8F9C,

    // Vertex attributes

    VERTEX_ATTRIB_ARRAY_INTEGER: 0x88FD,
    VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88FE,

    // Transform feedback

    TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8C7F,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8C80,
    TRANSFORM_FEEDBACK_VARYINGS: 0x8C83,
    TRANSFORM_FEEDBACK_BUFFER_START: 0x8C84,
    TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8C85,
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8C88,
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8C8A,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8C8B,
    INTERLEAVED_ATTRIBS: 0x8C8C,
    SEPARATE_ATTRIBS: 0x8C8D,
    TRANSFORM_FEEDBACK_BUFFER: 0x8C8E,
    TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8C8F,
    TRANSFORM_FEEDBACK: 0x8E22,
    TRANSFORM_FEEDBACK_PAUSED: 0x8E23,
    TRANSFORM_FEEDBACK_ACTIVE: 0x8E24,
    TRANSFORM_FEEDBACK_BINDING: 0x8E25,

    // Framebuffers and renderbuffers

    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
    FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
    FRAMEBUFFER_DEFAULT: 0x8218,
    // DEPTH_STENCIL_ATTACHMENT : 0x821A,
    // DEPTH_STENCIL: 0x84F9,
    DEPTH24_STENCIL8: 0x88F0,
    DRAW_FRAMEBUFFER_BINDING: 0x8CA6,
    // READ_FRAMEBUFFER : 0x8CA8,
    // DRAW_FRAMEBUFFER : 0x8CA9,
    READ_FRAMEBUFFER_BINDING: 0x8CAA,
    RENDERBUFFER_SAMPLES: 0x8CAB,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8CD4,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8D56,

    // Uniforms

    UNIFORM_BUFFER: 0x8A11,
    UNIFORM_BUFFER_BINDING: 0x8A28,
    UNIFORM_BUFFER_START: 0x8A29,
    UNIFORM_BUFFER_SIZE: 0x8A2A,
    MAX_VERTEX_UNIFORM_BLOCKS: 0x8A2B,
    MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8A2D,
    MAX_COMBINED_UNIFORM_BLOCKS: 0x8A2E,
    MAX_UNIFORM_BUFFER_BINDINGS: 0x8A2F,
    MAX_UNIFORM_BLOCK_SIZE: 0x8A30,
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8A31,
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8A33,
    UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8A34,
    ACTIVE_UNIFORM_BLOCKS: 0x8A36,
    UNIFORM_TYPE: 0x8A37,
    UNIFORM_SIZE: 0x8A38,
    UNIFORM_BLOCK_INDEX: 0x8A3A,
    UNIFORM_OFFSET: 0x8A3B,
    UNIFORM_ARRAY_STRIDE: 0x8A3C,
    UNIFORM_MATRIX_STRIDE: 0x8A3D,
    UNIFORM_IS_ROW_MAJOR: 0x8A3E,
    UNIFORM_BLOCK_BINDING: 0x8A3F,
    UNIFORM_BLOCK_DATA_SIZE: 0x8A40,
    UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8A42,
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8A43,
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8A44,
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8A46,

    // Sync objects

    OBJECT_TYPE: 0x9112,
    SYNC_CONDITION: 0x9113,
    SYNC_STATUS: 0x9114,
    SYNC_FLAGS: 0x9115,
    SYNC_FENCE: 0x9116,
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    UNSIGNALED: 0x9118,
    SIGNALED: 0x9119,
    ALREADY_SIGNALED: 0x911A,
    TIMEOUT_EXPIRED: 0x911B,
    CONDITION_SATISFIED: 0x911C,
    WAIT_FAILED: 0x911D,
    SYNC_FLUSH_COMMANDS_BIT: 0x00000001,

    // Miscellaneous constants

    COLOR: 0x1800,
    DEPTH: 0x1801,
    STENCIL: 0x1802,
    MIN: 0x8007,
    MAX: 0x8008,
    DEPTH_COMPONENT24: 0x81A6,
    STREAM_READ: 0x88E1,
    STREAM_COPY: 0x88E2,
    STATIC_READ: 0x88E5,
    STATIC_COPY: 0x88E6,
    DYNAMIC_READ: 0x88E9,
    DYNAMIC_COPY: 0x88EA,
    DEPTH_COMPONENT32F: 0x8CAC,
    DEPTH32F_STENCIL8: 0x8CAD,
    INVALID_INDEX: 0xFFFFFFFF,
    TIMEOUT_IGNORED: -1,
    MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 0x9247,

    // Constants defined in WebGL extensions

    // ANGLE_instanced_arrays

    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: 0x88FE, // Describes the frequency divisor used for instanced rendering.

    // WEBGL_debug_renderer_info

    UNMASKED_VENDOR_WEBGL: 0x9245, // Passed to getParameter to get the vendor string of the graphics driver.
    UNMASKED_RENDERER_WEBGL: 0x9246, // Passed to getParameter to get the renderer string of the graphics driver.

    // EXT_texture_filter_anisotropic

    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84FF, // Returns the maximum available anisotropy.
    TEXTURE_MAX_ANISOTROPY_EXT: 0x84FE, // Passed to texParameter to set the desired maximum anisotropy for a texture.

    // WEBGL_compressed_texture_s3tc

    COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0, // A DXT1-compressed image in an RGB image format.
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1, // A DXT1-compressed image in an RGB image format with a simple on/off alpha value.
    COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2, // A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.
    COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3, // A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3 compression in how the alpha compression is done.

    // WEBGL_compressed_texture_es3

    COMPRESSED_R11_EAC: 0x9270, // One-channel (red) unsigned format compression.
    COMPRESSED_SIGNED_R11_EAC: 0x9271, // One-channel (red) signed format compression.
    COMPRESSED_RG11_EAC: 0x9272, // Two-channel (red and green) unsigned format compression.
    COMPRESSED_SIGNED_RG11_EAC: 0x9273, // Two-channel (red and green) signed format compression.
    COMPRESSED_RGB8_ETC2: 0x9274, // Compresses RBG8 data with no alpha channel.
    COMPRESSED_RGBA8_ETC2_EAC: 0x9275, // Compresses RGBA8 data. The RGB part is encoded the same as RGB_ETC2, but the alpha part is encoded separately.
    COMPRESSED_SRGB8_ETC2: 0x9276, // Compresses sRBG8 data with no alpha channel.
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9277, // Compresses sRGBA8 data. The sRGB part is encoded the same as SRGB_ETC2, but the alpha part is encoded separately.
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9278, // Similar to RGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9279, // Similar to SRGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.

    // WEBGL_compressed_texture_pvrtc

    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8C00, // RGB compression in 4-bit mode. One block for each 4×4 pixels.
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8C02, // RGBA compression in 4-bit mode. One block for each 4×4 pixels.
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8C01, // RGB compression in 2-bit mode. One block for each 8×4 pixels.
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8C03, // RGBA compression in 2-bit mode. One block for each 8×4 pixe

    // WEBGL_compressed_texture_etc1

    COMPRESSED_RGB_ETC1_WEBGL: 0x8D64, // Compresses 24-bit RGB data with no alpha channel.

    // WEBGL_compressed_texture_atc

    COMPRESSED_RGB_ATC_WEBGL: 0x8C92, //  Compresses RGB textures with no alpha channel.
    COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 0x8C92, // Compresses RGBA textures using explicit alpha encoding (useful when alpha transitions are sharp).
    COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 0x87EE, // Compresses RGBA textures using interpolated alpha encoding (useful when alpha transitions are gradient).

    // WEBGL_depth_texture

    UNSIGNED_INT_24_8_WEBGL: 0x84FA, // Unsigned integer type for 24-bit depth texture data.

    // OES_texture_half_float

    HALF_FLOAT_OES: 0x8D61, // Half floating-point type (16-bit).

    // WEBGL_color_buffer_float

    RGBA32F_EXT: 0x8814, // RGBA 32-bit floating-point color-renderable format.
    RGB32F_EXT: 0x8815, // RGB 32-bit floating-point color-renderable format.
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
    UNSIGNED_NORMALIZED_EXT: 0x8C17,

    // EXT_blend_minmax

    MIN_EXT: 0x8007, // Produces the minimum color components of the source and destination colors.
    MAX_EXT: 0x8008, // Produces the maximum color components of the source and destination colors.

    // EXT_sRGB

    SRGB_EXT: 0x8C40, // Unsized sRGB format that leaves the precision up to the driver.
    SRGB_ALPHA_EXT: 0x8C42, // Unsized sRGB format with unsized alpha component.
    SRGB8_ALPHA8_EXT: 0x8C43, // Sized (8-bit) sRGB and alpha formats.
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: 0x8210, // Returns the framebuffer color encoding.

    // OES_standard_derivatives

    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 0x8B8B, // Indicates the accuracy of the derivative calculation for the GLSL built-in functions: dFdx, dFdy, and fwidth.

    // WEBGL_draw_buffers

    COLOR_ATTACHMENT0_WEBGL: 0x8CE0, // Framebuffer color attachment point
    COLOR_ATTACHMENT1_WEBGL: 0x8CE1, // Framebuffer color attachment point
    COLOR_ATTACHMENT2_WEBGL: 0x8CE2, // Framebuffer color attachment point
    COLOR_ATTACHMENT3_WEBGL: 0x8CE3, // Framebuffer color attachment point
    COLOR_ATTACHMENT4_WEBGL: 0x8CE4, // Framebuffer color attachment point
    COLOR_ATTACHMENT5_WEBGL: 0x8CE5, // Framebuffer color attachment point
    COLOR_ATTACHMENT6_WEBGL: 0x8CE6, // Framebuffer color attachment point
    COLOR_ATTACHMENT7_WEBGL: 0x8CE7, // Framebuffer color attachment point
    COLOR_ATTACHMENT8_WEBGL: 0x8CE8, // Framebuffer color attachment point
    COLOR_ATTACHMENT9_WEBGL: 0x8CE9, // Framebuffer color attachment point
    COLOR_ATTACHMENT10_WEBGL: 0x8CEA, // Framebuffer color attachment point
    COLOR_ATTACHMENT11_WEBGL: 0x8CEB, // Framebuffer color attachment point
    COLOR_ATTACHMENT12_WEBGL: 0x8CEC, // Framebuffer color attachment point
    COLOR_ATTACHMENT13_WEBGL: 0x8CED, // Framebuffer color attachment point
    COLOR_ATTACHMENT14_WEBGL: 0x8CEE, // Framebuffer color attachment point
    COLOR_ATTACHMENT15_WEBGL: 0x8CEF, // Framebuffer color attachment point
    DRAW_BUFFER0_WEBGL: 0x8825, // Draw buffer
    DRAW_BUFFER1_WEBGL: 0x8826, // Draw buffer
    DRAW_BUFFER2_WEBGL: 0x8827, // Draw buffer
    DRAW_BUFFER3_WEBGL: 0x8828, // Draw buffer
    DRAW_BUFFER4_WEBGL: 0x8829, // Draw buffer
    DRAW_BUFFER5_WEBGL: 0x882A, // Draw buffer
    DRAW_BUFFER6_WEBGL: 0x882B, // Draw buffer
    DRAW_BUFFER7_WEBGL: 0x882C, // Draw buffer
    DRAW_BUFFER8_WEBGL: 0x882D, // Draw buffer
    DRAW_BUFFER9_WEBGL: 0x882E, // Draw buffer
    DRAW_BUFFER10_WEBGL: 0x882F, // Draw buffer
    DRAW_BUFFER11_WEBGL: 0x8830, // Draw buffer
    DRAW_BUFFER12_WEBGL: 0x8831, // Draw buffer
    DRAW_BUFFER13_WEBGL: 0x8832, // Draw buffer
    DRAW_BUFFER14_WEBGL: 0x8833, // Draw buffer
    DRAW_BUFFER15_WEBGL: 0x8834, // Draw buffer
    MAX_COLOR_ATTACHMENTS_WEBGL: 0x8CDF, // Maximum number of framebuffer color attachment points
    MAX_DRAW_BUFFERS_WEBGL: 0x8824, // Maximum number of draw buffers

    // OES_vertex_array_object

    VERTEX_ARRAY_BINDING_OES: 0x85B5, // The bound vertex array object (VAO).

    // EXT_disjoint_timer_query

    QUERY_COUNTER_BITS_EXT: 0x8864, // The number of bits used to hold the query result for the given target.
    CURRENT_QUERY_EXT: 0x8865, // The currently active query.
    QUERY_RESULT_EXT: 0x8866, // The query result.
    QUERY_RESULT_AVAILABLE_EXT: 0x8867, // A Boolean indicating whether or not a query result is available.
    TIME_ELAPSED_EXT: 0x88BF, // Elapsed time (in nanoseconds).
    TIMESTAMP_EXT: 0x8E28, // The current time.
    GPU_DISJOINT_EXT: 0x8FBB // A Boolean indicating whether or not the GPU performed any disjoint operation.
};

var GLConstants_1 = GLConstants;

/**
 * reference:
 * https://github.com/uber/luma.gl/blob/master/src/utils/is-browser.js
 */
var isNode = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && String(process) === '[object process]' && !process.browser;

/**
 * store mapping data and default value
 */
var _polyfill = {};
/**
 * source poly
 */
var _poly = {
    'MAX_VIEWPORT_DIMS': {
        name: 'MAX_VIEWPORT_DIMS',
        key: GLConstants_1.MAX_VIEWPORT_DIMS,
        webgl: new Float32Array([32767, 32767]),
        webgl2: new Float32Array([32767, 32767])
    },
    'ALIASED_POINT_SIZE_RANGE': {
        name: 'ALIASED_POINT_SIZE_RANGE',
        key: GLConstants_1.ALIASED_POINT_SIZE_RANGE,
        webgl: new Float32Array([1, 1024]),
        webgl2: new Float32Array([1, 1024])
    },
    'ALIASED_LINE_WIDTH_RANGE': {
        name: 'ALIASED_LINE_WIDTH_RANGE',
        key: GLConstants_1.ALIASED_LINE_WIDTH_RANGE,
        webgl: new Float32Array([1, 1]),
        webgl2: new Float32Array([1, 1])
    },
    'MAX_VERTEX_UNIFORM_VECTORS': {
        name: 'MAX_VERTEX_UNIFORM_VECTORS',
        key: GLConstants_1.MAX_VERTEX_UNIFORM_VECTORS,
        webgl: 128,
        webgl2: 128
    },
    'MAX_VERTEX_TEXTURE_IMAGE_UNITS': {
        name: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
        key: GLConstants_1.MAX_VERTEX_TEXTURE_IMAGE_UNITS,
        webgl: 0,
        webgl2: 0
    },
    'MAX_VERTEX_ATTRIBS': {
        name: 'MAX_VERTEX_ATTRIBS',
        key: GLConstants_1.MAX_VERTEX_ATTRIBS,
        webgl: 8,
        webgl2: 8
    },
    'MAX_VARYING_VECTORS': {
        name: 'MAX_VARYING_VECTORS',
        key: GLConstants_1.MAX_VARYING_VECTORS,
        webgl: 8,
        webgl2: 8
    },
    'MAX_TEXTURE_SIZE': {
        name: 'MAX_TEXTURE_SIZE',
        key: GLConstants_1.MAX_TEXTURE_SIZE,
        webgl: 64,
        webgl2: 64
    },
    'MAX_RENDERBUFFER_SIZE': {
        name: 'MAX_RENDERBUFFER_SIZE',
        key: GLConstants_1.MAX_RENDERBUFFER_SIZE,
        webgl: 1,
        webgl2: 1
    },
    'MAX_TEXTURE_IMAGE_UNITS': {
        name: 'MAX_TEXTURE_IMAGE_UNITS',
        key: GLConstants_1.MAX_TEXTURE_IMAGE_UNITS,
        webgl: 8,
        webgl2: 8
    },
    'MAX_FRAGMENT_UNIFORM_VECTORS': {
        name: 'MAX_FRAGMENT_UNIFORM_VECTORS',
        key: GLConstants_1.MAX_FRAGMENT_UNIFORM_VECTORS,
        webgl: 16,
        webgl2: 16
    },
    'MAX_CUBE_MAP_TEXTURE_SIZE': {
        name: 'MAX_CUBE_MAP_TEXTURE_SIZE',
        key: GLConstants_1.MAX_CUBE_MAP_TEXTURE_SIZE,
        webgl: 16,
        webgl2: 16
    },
    'MAX_COMBINED_TEXTURE_IMAGE_UNITS': {
        name: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
        key: GLConstants_1.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
        webgl: 8,
        webgl2: 8

    },
    'VERSION': {
        name: 'VERSION',
        key: GLConstants_1.VERSION,
        webgl: 'WebGL 1.0',
        webgl2: 'WebGL 2.0'
    }
};
/**
 * map GLConstants location to key
 */
for (var key in _poly) {
    var target = _poly[key];
    _polyfill[key] = _polyfill[target.key] = target;
}
/**
 * @class
 */

var GLLimits = function () {
    /**
     * 
     * @param {GLContext} glContext 
     */
    function GLLimits(glContext) {
        classCallCheck(this, GLLimits);

        this._glContext = glContext;
        this._type = glContext.renderType;
        this._indexs = [];
        this._map(_polyfill);
    }
    /**
     * will be call while change or set WebGLRenderingContext
     */


    createClass(GLLimits, [{
        key: '_include',
        value: function _include() {}
    }, {
        key: '_map',
        value: function _map(mapObject) {
            var type = this._type;
            for (var _key in mapObject) {
                if (!this.hasOwnProperty(_key)) {
                    var _target = mapObject[_key];
                    if (!this[_key]) this[_key] = _target[type];
                }
            }
        }
    }]);
    return GLLimits;
}();

var GLLimits_1 = GLLimits;

/**
 * management of GLExtension
 * @author yellow date 2017/6/15
 */
var GL_STANDEXTENSIONS = {
    standardDerivatives: ['OES_standard_derivatives'],
    elementIndexUint: ['OES_element_index_uint'],
    depthTexture: ['WEBGL_depth_texture', 'WEBKIT_WEBGL_depth_texture'],
    textureFloat: ['OES_texture_float'],
    fragDepth: ['EXT_frag_depth'],
    debugShaders: ['WEBGL_debug_shaders'],
    s3tc: ['WEBGL_compressed_texture_s3tc', 'MOZ_WEBGL_compressed_texture_s3tc', 'WEBKIT_WEBGL_compressed_texture_s3tc'],
    pvrtc: ['WEBGL_compressed_texture_pvrtc', 'WEBKIT_WEBGL_compressed_texture_pvrtc'],
    etc1: ['WEBGL_compressed_texture_etc1'],
    textureFilterAnisotropic: ['EXT_texture_filter_anisotropic', 'MOZ_EXT_texture_filter_anisotropic', 'WEBKIT_EXT_texture_filter_anisotropic'],
    vertexArrayObject: ['OES_vertex_array_object', 'MOZ_OES_vertex_array_object', 'WEBKIT_OES_vertex_array_object'],
    angleInstancedArrays: ['ANGLE_instanced_arrays']
};
/**
 * @class
 */

var GLExtension = function () {
    /**
     * 
     * @param {GLContext} glContext 
     */
    function GLExtension(glContext) {
        classCallCheck(this, GLExtension);

        /**
         * quote of GLContext instance
         */
        this._glContext = glContext;
        /**
         * store key and value of extension
         * @type {Object}
         */
        this._options = {};
    }

    createClass(GLExtension, [{
        key: '_include',
        value: function _include() {
            for (var key in GL_STANDEXTENSIONS) {
                if (GL_STANDEXTENSIONS.hasOwnProperty(key)) {
                    var extensionName = GL_STANDEXTENSIONS[key],
                        extension = this.getExtension(extensionName);
                    if (!!extension) this._options[key] = extension;
                }
            }
        }
        /**
        * 
        * @param {String[]} extNames 
        */

    }, {
        key: 'getExtension',
        value: function getExtension() {
            var _ref;

            var gl = this._glContext.gl,
                names = (_ref = []).concat.apply(_ref, arguments),
                len = names.length;
            for (var i = 0; i < len; ++i) {
                var name = names[i];
                var extension = gl.getExtension(name);
                if (extension) return extension;
            }
            return null;
        }
    }, {
        key: '_map',
        value: function _map() {
            for (var key in this._extensions) {
                if (this._options.hasOwnProperty(key)) {
                    var target = this._options[key];
                    if (!this[key] && !!target) this[key] = target;
                }
            }
        }
    }]);
    return GLExtension;
}();

var GLExtension_1 = GLExtension;

/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = function() {   },
      peg$c1 = function(root) {
            
          },
      peg$c2 = function() {   },
      peg$c3 = /^[\n]/,
      peg$c4 = peg$classExpectation(["\n"], false, false),
      peg$c5 = function() {
          return "\n";
        },
      peg$c6 = peg$anyExpectation(),
      peg$c7 = peg$otherExpectation("whitespace"),
      peg$c8 = /^[\\\n]/,
      peg$c9 = peg$classExpectation(["\\", "\n"], false, false),
      peg$c10 = /^[\r\t\f\x0B ]/,
      peg$c11 = peg$classExpectation(["\r", "\t", "\f", "\x0B", " "], false, false),
      peg$c12 = "/*",
      peg$c13 = peg$literalExpectation("/*", false),
      peg$c14 = "*/",
      peg$c15 = peg$literalExpectation("*/", false),
      peg$c16 = "//",
      peg$c17 = peg$literalExpectation("//", false),
      peg$c18 = /^[^\n]/,
      peg$c19 = peg$classExpectation(["\n"], true, false),
      peg$c20 = peg$otherExpectation("comment"),
      peg$c21 = ";",
      peg$c22 = peg$literalExpectation(";", false),
      peg$c23 = ",",
      peg$c24 = peg$literalExpectation(",", false),
      peg$c25 = "[",
      peg$c26 = peg$literalExpectation("[", false),
      peg$c27 = "]",
      peg$c28 = peg$literalExpectation("]", false),
      peg$c29 = "=",
      peg$c30 = peg$literalExpectation("=", false),
      peg$c31 = "(",
      peg$c32 = peg$literalExpectation("(", false),
      peg$c33 = ")",
      peg$c34 = peg$literalExpectation(")", false),
      peg$c35 = "{",
      peg$c36 = peg$literalExpectation("{", false),
      peg$c37 = "}",
      peg$c38 = peg$literalExpectation("}", false),
      peg$c39 = function(statements) {
            // Skip blank statements.  These were either whitespace or
            var result = new node({
              type: "root",
              statements: []
            });
            for (var i = 0; i < statements.length; i++) {
              if (statements[i]) {
                result.statements = result.statements.concat(statements[i]);
              }
            }
            return result;
          },
      peg$c40 = function(statement) { return statement; },
      peg$c41 = function() { return ""; },
      peg$c42 = "#",
      peg$c43 = peg$literalExpectation("#", false),
      peg$c44 = "undef",
      peg$c45 = peg$literalExpectation("undef", false),
      peg$c46 = "pragma",
      peg$c47 = peg$literalExpectation("pragma", false),
      peg$c48 = "version",
      peg$c49 = peg$literalExpectation("version", false),
      peg$c50 = "error",
      peg$c51 = peg$literalExpectation("error", false),
      peg$c52 = "extension",
      peg$c53 = peg$literalExpectation("extension", false),
      peg$c54 = "line",
      peg$c55 = peg$literalExpectation("line", false),
      peg$c56 = "include",
      peg$c57 = peg$literalExpectation("include", false),
      peg$c58 = function(directive, defname) {return defname.join("")},
      peg$c59 = function(directive, value) {
          return new node({
            type: "preprocessor",
            directive: "#" + directive,
            value: value
          });
        },
      peg$c60 = /^[A-Za-z_]/,
      peg$c61 = peg$classExpectation([["A", "Z"], ["a", "z"], "_"], false, false),
      peg$c62 = /^[A-Za-z_0-9]/,
      peg$c63 = peg$classExpectation([["A", "Z"], ["a", "z"], "_", ["0", "9"]], false, false),
      peg$c64 = function(head, tail) {
           return new node({
             type: "identifier",
             name: head + tail.join("")
           });
        },
      peg$c65 = function(head, tail) {
          if (!head) {
            return [];
          }
          return [ head ].concat(tail.map(function(item) { return item[1]; }));
        },
      peg$c66 = /^[^()]/,
      peg$c67 = peg$classExpectation(["(", ")"], true, false),
      peg$c68 = function(head, paren, tail) {
          
        },
      peg$c69 = function(value) {
          
        },
      peg$c70 = /^[^,)]/,
      peg$c71 = peg$classExpectation([",", ")"], true, false),
      peg$c72 = function(value) {
          
        },
      peg$c73 = function(head, tail) {
          
        },
      peg$c74 = function(macro_name, parameters) {
            var result = new node({
              type: "macro_call",
              macro_name: macro_name,
              parameters: parameters
            });
            if (!parameters) {
              result.parameters = [];
            }
            return result;
          },
      peg$c75 = function(head, tail) {
          
        },
      peg$c76 = "define",
      peg$c77 = peg$literalExpectation("define", false),
      peg$c78 = /^[ \t]/,
      peg$c79 = peg$classExpectation([" ", "\t"], false, false),
      peg$c80 = function(identifier, parameters, defname) {return defname.join("")},
      peg$c81 = function(identifier, parameters, token_string) {
          return new node({
               type: "preprocessor",
               directive: "#define",
               identifier: identifier.name,
               token_string: token_string,
               parameters: parameters || null
             });
           },
      peg$c82 = "ifdef",
      peg$c83 = peg$literalExpectation("ifdef", false),
      peg$c84 = "ifndef",
      peg$c85 = peg$literalExpectation("ifndef", false),
      peg$c86 = "if",
      peg$c87 = peg$literalExpectation("if", false),
      peg$c88 = function(directive, value) {
             return new node({
               type: "preprocessor",
               directive: "#" + directive,
               value: value
             });
           },
      peg$c89 = "elif",
      peg$c90 = peg$literalExpectation("elif", false),
      peg$c91 = function(defname) {return defname.join("")},
      peg$c92 = function(value) {
            return new node({
              type: "preprocessor",
              directive: "#elif",
              value: value
            });
          },
      peg$c93 = "else",
      peg$c94 = peg$literalExpectation("else", false),
      peg$c95 = function() {
          return new node({
            type: "preprocessor",
            directive: "#else"
          });
        },
      peg$c96 = "endif",
      peg$c97 = peg$literalExpectation("endif", false),
      peg$c98 = function(if_directive, elif_directive, else_directive) {
            return preprocessor_branch(if_directive, elif_directive, else_directive);
          },
      peg$c99 = function(prototype, body) {
            var result = new node({
              type: "function_declaration",
              name: prototype.name,
              returnType: prototype.returnType,
              parameters: prototype.parameters,
              body: body
            });
            return result;
        },
      peg$c100 = function(statements) {
            var result = new node({
              type: "scope",
              statements: []
            });
            if (statements && statements.statements) {
              result.statements = statements.statements;
            }
            return result;
          },
      peg$c101 = function(list) {return {statements: list};},
      peg$c102 = function(statement) {
          return statement;
        },
      peg$c103 = function(condition, if_body, else_body) {
             var result = new node({
               type:"if_statement",
               condition:condition,
               body:if_body
             });
             if (else_body) {
               result.elseBody = else_body[2];
             }
             return result;
           },
      peg$c104 = "for",
      peg$c105 = peg$literalExpectation("for", false),
      peg$c106 = function(initializer, condition, increment, body) {
              return new node({
                type:"for_statement",
                initializer:initializer,
                condition:condition,
                increment:increment,
                body:body
              });
            },
      peg$c107 = "while",
      peg$c108 = peg$literalExpectation("while", false),
      peg$c109 = function(condition) {
             return {
               condition:condition
             };
           },
      peg$c110 = function(w, body) {
            return new node({
              type: "while_statement",
              condition: w.condition,
              body: body
            });
          },
      peg$c111 = "do",
      peg$c112 = peg$literalExpectation("do", false),
      peg$c113 = function(body, w) {
             return new node({
               type: "do_statement",
               condition: w.condition,
               body: body
             });
           },
      peg$c114 = "return",
      peg$c115 = peg$literalExpectation("return", false),
      peg$c116 = "++",
      peg$c117 = peg$literalExpectation("++", false),
      peg$c118 = "--",
      peg$c119 = peg$literalExpectation("--", false),
      peg$c120 = "!",
      peg$c121 = peg$literalExpectation("!", false),
      peg$c122 = "~",
      peg$c123 = peg$literalExpectation("~", false),
      peg$c124 = "+",
      peg$c125 = peg$literalExpectation("+", false),
      peg$c126 = "-",
      peg$c127 = peg$literalExpectation("-", false),
      peg$c128 = function(head, expression) {
            return new node({
              type: "return",
              value: expression
            });
          },
      peg$c129 = "continue",
      peg$c130 = peg$literalExpectation("continue", false),
      peg$c131 = "break",
      peg$c132 = peg$literalExpectation("break", false),
      peg$c133 = "discard",
      peg$c134 = peg$literalExpectation("discard", false),
      peg$c135 = function(type) {
                  return new node({
                    type:type[0]
                  });
                },
      peg$c136 = function(e) {
            return new node({
              type: "expression",
              expression: e
            });
        },
      peg$c137 = function(head, tail) {
            return new node({
              type: "sequence",
              expressions: [ head ].concat(tail.map(function(item) { return item[1] }))
            })
          },
      peg$c138 = peg$otherExpectation("declaration"),
      peg$c139 = function(function_prototype) {
            return function_prototype;
          },
      peg$c140 = function(type, declarators) {
            return new node({
              type: "declarator",
              typeAttribute: type,
              declarators: declarators
            });
          },
      peg$c141 = function() { return shaderType == "vs"; },
      peg$c142 = "invariant",
      peg$c143 = peg$literalExpectation("invariant", false),
      peg$c144 = function(head, tail) {
              var items = [ head ].concat(tail.map(function(item) {
                return item[1]; }));
              return new node({
                type: "invariant",
                identifiers: items
              });
            },
      peg$c145 = "precision",
      peg$c146 = peg$literalExpectation("precision", false),
      peg$c147 = function(precission, type) {
            return new node({
              type:"precision",
              precision: precission,
              typeName: type
            });
          },
      peg$c148 = function(type, declarators) {
          return new node({
            type: "declarator",
            typeAttribute: type,
            declarators: declarators
          });
        },
      peg$c149 = "void",
      peg$c150 = peg$literalExpectation("void", false),
      peg$c151 = function(head, tail) {
            return [ head ].concat(tail.map(function(item) { return item[1]; }));
          },
      peg$c152 = function(type, identifier, parameters) {
            var result = new node({
              type:"function_prototype",
              name: identifier.name,
              returnType: type,
              parameters: parameters
            });
            if (parameters == "void" || !parameters) {
              result.parameters = [];
            }
            return result;
          },
      peg$c153 = "inout",
      peg$c154 = peg$literalExpectation("inout", false),
      peg$c155 = "in",
      peg$c156 = peg$literalExpectation("in", false),
      peg$c157 = "out",
      peg$c158 = peg$literalExpectation("out", false),
      peg$c159 = function(const_qualifier, parameter, precision, type_name, identifier, array_size) {
          var result = new node({
            type: "parameter",
            type_name: type_name,
            name: identifier.name
          });
          if (const_qualifier) result.typeQualifier = const_qualifier[0];
          if (parameter) result.parameterQualifier = parameter[0];
          if (precision) result.precision = precision[0];
          if (array_size) result.arraySize = array_size[1];
          // "const" is only legal on "in" parameter qualifiers.
          if (result.typeQualifier &&
              result.parameterQualifier &&
              result.parameterQualifier != "in") {
            return null;
          } else {
            return result;
          }
        },
      peg$c160 = function(head, tail) {
          return [ head ].concat(tail.map(function(item) { return item[1]; }));
        },
      peg$c161 = function(name) {
            return new node({
              type: "declarator_item",
              name:name
            });
          },
      peg$c162 = function(name, arraySize) {
            return new node({
              type: "declarator_item",
              name: name,
              arraySize: arraySize,
              isArray: true
            });
          },
      peg$c163 = function(name) {
            return new node({
              type: "declarator_item",
              name: name,
              isArray: true
            });
          },
      peg$c164 = function(name, initializer) {
            return new node({
              type: "declarator_item",
              name: name,
              initializer:initializer
            });
          },
      peg$c165 = function(declarators) {
           return declarators.map(function(item) {
             return new node({
               type: "declarator",
               typeAttribute: item[0],
               declarators: item[2]
             })
            });
        },
      peg$c166 = "struct",
      peg$c167 = peg$literalExpectation("struct", false),
      peg$c168 = function(qualifier, identifier, members, declarators) {
            var result = new node({
              type: "struct_definition",
              members:members
            });
            if (qualifier) {
              result.qualifier = qualifier[0];
            }
            if (identifier) {
              result.name = identifier[1].name;
              
            }
            if (declarators) {
              result.declarators = declarators;
            }
            return result;
          },
      peg$c169 = function(precision, name) {
          var result = new node({
            type: "type",
            name: name
          });
          if (precision) result.precision = precision[0];
          return result;
        },
      peg$c170 = peg$otherExpectation("locally specified type"),
      peg$c171 = function(qualifier, type) {
          var result = type;
          if (qualifier) result.qualifier = qualifier[0];
          return result;
        },
      peg$c172 = "attribute",
      peg$c173 = peg$literalExpectation("attribute", false),
      peg$c174 = function() {
          return "attribute";
        },
      peg$c175 = function(qualifier, type) {
          var result = type;
          result.qualifier = qualifier;
          return result;
        },
      peg$c176 = peg$otherExpectation("fully specified type"),
      peg$c177 = peg$otherExpectation("precision qualifier"),
      peg$c178 = "highp",
      peg$c179 = peg$literalExpectation("highp", false),
      peg$c180 = "mediump",
      peg$c181 = peg$literalExpectation("mediump", false),
      peg$c182 = "lowp",
      peg$c183 = peg$literalExpectation("lowp", false),
      peg$c184 = "const",
      peg$c185 = peg$literalExpectation("const", false),
      peg$c186 = peg$otherExpectation("type qualifier"),
      peg$c187 = "varying",
      peg$c188 = peg$literalExpectation("varying", false),
      peg$c189 = function() { return "invariant varying"; },
      peg$c190 = "uniform",
      peg$c191 = peg$literalExpectation("uniform", false),
      peg$c192 = peg$otherExpectation("void"),
      peg$c193 = function() {
          return new node({
            type: "type",
            name: "void"
          })
        },
      peg$c194 = peg$otherExpectation("type name"),
      peg$c195 = "float",
      peg$c196 = peg$literalExpectation("float", false),
      peg$c197 = "double",
      peg$c198 = peg$literalExpectation("double", false),
      peg$c199 = "int",
      peg$c200 = peg$literalExpectation("int", false),
      peg$c201 = "uint",
      peg$c202 = peg$literalExpectation("uint", false),
      peg$c203 = "bool",
      peg$c204 = peg$literalExpectation("bool", false),
      peg$c205 = function(name) {
            return name.name;
          },
      peg$c206 = peg$otherExpectation("identifier"),
      peg$c207 = /^[^A-Za-z_0-9]/,
      peg$c208 = peg$classExpectation([["A", "Z"], ["a", "z"], "_", ["0", "9"]], true, false),
      peg$c209 = /^[$A-Za-z_]/,
      peg$c210 = peg$classExpectation(["$", ["A", "Z"], ["a", "z"], "_"], false, false),
      peg$c211 = /^[$A-Za-z_0-9]/,
      peg$c212 = peg$classExpectation(["$", ["A", "Z"], ["a", "z"], "_", ["0", "9"]], false, false),
      peg$c213 = peg$otherExpectation("keyword"),
      peg$c214 = "sampler2D",
      peg$c215 = peg$literalExpectation("sampler2D", false),
      peg$c216 = "samplerCube",
      peg$c217 = peg$literalExpectation("samplerCube", false),
      peg$c218 = "true",
      peg$c219 = peg$literalExpectation("true", false),
      peg$c220 = "false",
      peg$c221 = peg$literalExpectation("false", false),
      peg$c222 = /^[biud]/,
      peg$c223 = peg$classExpectation(["b", "i", "u", "d"], false, false),
      peg$c224 = "vec",
      peg$c225 = peg$literalExpectation("vec", false),
      peg$c226 = /^[234]/,
      peg$c227 = peg$classExpectation(["2", "3", "4"], false, false),
      peg$c228 = function(a) { return a.join(""); },
      peg$c229 = /^[d]/,
      peg$c230 = peg$classExpectation(["d"], false, false),
      peg$c231 = "mat",
      peg$c232 = peg$literalExpectation("mat", false),
      peg$c233 = /^[x]/,
      peg$c234 = peg$classExpectation(["x"], false, false),
      peg$c235 = /^[iu]/,
      peg$c236 = peg$classExpectation(["i", "u"], false, false),
      peg$c237 = "sampler",
      peg$c238 = peg$literalExpectation("sampler", false),
      peg$c239 = /^[123]/,
      peg$c240 = peg$classExpectation(["1", "2", "3"], false, false),
      peg$c241 = "D",
      peg$c242 = peg$literalExpectation("D", false),
      peg$c243 = "Array",
      peg$c244 = peg$literalExpectation("Array", false),
      peg$c245 = "Shadow",
      peg$c246 = peg$literalExpectation("Shadow", false),
      peg$c247 = "sampler2DRect",
      peg$c248 = peg$literalExpectation("sampler2DRect", false),
      peg$c249 = "sampler2DMS",
      peg$c250 = peg$literalExpectation("sampler2DMS", false),
      peg$c251 = "samplerBuffer",
      peg$c252 = peg$literalExpectation("samplerBuffer", false),
      peg$c253 = peg$otherExpectation("reserved name"),
      peg$c254 = "__",
      peg$c255 = peg$literalExpectation("__", false),
      peg$c256 = /^[A-Za-z0-9]/,
      peg$c257 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"]], false, false),
      peg$c258 = "_",
      peg$c259 = peg$literalExpectation("_", false),
      peg$c260 = /^[\-1-9]/,
      peg$c261 = peg$classExpectation(["-", ["1", "9"]], false, false),
      peg$c262 = /^[0-9]/,
      peg$c263 = peg$classExpectation([["0", "9"]], false, false),
      peg$c264 = /^[Uu]/,
      peg$c265 = peg$classExpectation(["U", "u"], false, false),
      peg$c266 = function(head, tail, unsigned) {
            return new node({
              type: "int",
              format: "number",
              value_base10: parseInt([head].concat(tail).join(""), 10),
              value: [head].concat(tail).join("") + (unsigned ? unsigned : '')
            });
          },
      peg$c267 = "0",
      peg$c268 = peg$literalExpectation("0", false),
      peg$c269 = /^[Xx]/,
      peg$c270 = peg$classExpectation(["X", "x"], false, false),
      peg$c271 = /^[0-9A-Fa-f]/,
      peg$c272 = peg$classExpectation([["0", "9"], ["A", "F"], ["a", "f"]], false, false),
      peg$c273 = function(digits, unsigned) {
            return new node({
              type: "int",
              format: "hex",
              value_base10: parseInt(digits.join(""), 16),
              value: "0x" + digits.join("") + (unsigned ? unsigned : '')
            });
          },
      peg$c274 = /^[0-7]/,
      peg$c275 = peg$classExpectation([["0", "7"]], false, false),
      peg$c276 = function(digits, unsigned) {
            return new node({
              type: "int",
              format: "octal",
              value_base10: parseInt(digits.join(""), 8),
              value: "0" + digits.join("") + (unsigned ? unsigned : '')
            });
          },
      peg$c277 = function(unsigned) {
            return new node({
              type: "int",
              format: "number",
              value_base10: 0,
              value: "0" + (unsigned ? unsigned : '')
            });
          },
      peg$c278 = /^[\-0-9]/,
      peg$c279 = peg$classExpectation(["-", ["0", "9"]], false, false),
      peg$c280 = ".",
      peg$c281 = peg$literalExpectation(".", false),
      peg$c282 = /^[fF]/,
      peg$c283 = peg$classExpectation(["f", "F"], false, false),
      peg$c284 = "lf",
      peg$c285 = peg$literalExpectation("lf", false),
      peg$c286 = "LF",
      peg$c287 = peg$literalExpectation("LF", false),
      peg$c288 = function(digits, suffix) {
            digits[0] = digits[0].join("");
            digits[2] = digits[2].join("");
            return new node({
              type: "float",
              value_base10: parseFloat(digits.join("")),
              value: digits.join("") + (suffix ? suffix : '')
            });
          },
      peg$c289 = /^[f]/,
      peg$c290 = peg$classExpectation(["f"], false, false),
      peg$c291 = function(digits, suffix) {
            return new node({
              type: "float",
              value_base10: parseFloat(digits[0].join("") + digits[1]),
              value: digits.join("") + (suffix ? suffix : '')
            });
        },
      peg$c292 = /^[Ee]/,
      peg$c293 = peg$classExpectation(["E", "e"], false, false),
      peg$c294 = /^[+\-]/,
      peg$c295 = peg$classExpectation(["+", "-"], false, false),
      peg$c296 = function(sign, exponent) {
            return ["e", sign].concat(exponent).join("");
         },
      peg$c297 = function(expression) {
            return expression;
          },
      peg$c298 = function(value) {
          return new node({
            type: "bool",
            value: value == "true"
          });
        },
      peg$c299 = function(index) {
          return new node({
            type: "accessor",
            index: index
          });
        },
      peg$c300 = function(id) {
          return new node({
            type: "field_selector",
            selection: id.name
          })
        },
      peg$c301 = function(head, tail) {
            var result = head;
            for (var i = 0; i < tail.length; i++) {
              result = new node({
                type: "postfix",
                operator: tail[i],
                expression: result
              });
            }
            return result;
          },
      peg$c302 = function(head, tail, rest) {
            var result = head;
            if(tail) {
              result = new node({
                type: "postfix",
                operator: new node({
                  id: next_id++,
                  type: "operator",
                  operator: tail
                }),
                expression: result
              });
            }
            for (var i = 0; i < rest.length; i++) {
              result = new node({
                type: "postfix",
                operator: rest[i],
                expression: result
              });
            }
            return result;
          },
      peg$c303 = function() {return []; },
      peg$c304 = function(head, tail) {
            return [ head ].concat(tail.map(function(item) { return item[1] }));
          },
      peg$c305 = function(function_name, parameters) {
            var result = new node({
              type: "function_call",
              function_name: function_name,
              parameters: parameters
            });
            if (!parameters) {
              result.parameters = [];
            }
            return result;
          },
      peg$c306 = function(id) {return id.name;},
      peg$c307 = function(head, tail) {
            var result = tail;
            if (head) {
              result = new node({
                type: "unary",
                expression: result,
                operator: new node({
                  type: "operator",
                  operator: head
                })
              });
            }
            return result;
          },
      peg$c308 = "*",
      peg$c309 = peg$literalExpectation("*", false),
      peg$c310 = "/",
      peg$c311 = peg$literalExpectation("/", false),
      peg$c312 = "%",
      peg$c313 = peg$literalExpectation("%", false),
      peg$c314 = function(operator) {
          return new node({
            type: "operator",
            operator: operator
          });
        },
      peg$c315 = function(head, tail) {
            return daisy_chain(head, tail);
          },
      peg$c316 = function() {
          return new node({
            type: "operator",
            operator: "+"
          });
        },
      peg$c317 = function() {
          return new node({
            type: "operator",
            operator: "-"
          });
        },
      peg$c318 = "<<",
      peg$c319 = peg$literalExpectation("<<", false),
      peg$c320 = ">>",
      peg$c321 = peg$literalExpectation(">>", false),
      peg$c322 = "<",
      peg$c323 = peg$literalExpectation("<", false),
      peg$c324 = function(equal) {
          return new node({
            type: "operator",
            operator: "<" + (equal ? equal : '')
          });
        },
      peg$c325 = ">",
      peg$c326 = peg$literalExpectation(">", false),
      peg$c327 = function(equal) {
          return new node({
            type: "operator",
            operator: ">" + (equal ? equal : '')
          });
        },
      peg$c328 = "==",
      peg$c329 = peg$literalExpectation("==", false),
      peg$c330 = "!=",
      peg$c331 = peg$literalExpectation("!=", false),
      peg$c332 = function(operator) {
           return new node({
             type: "operator",
             operator: operator
           });
         },
      peg$c333 = "&",
      peg$c334 = peg$literalExpectation("&", false),
      peg$c335 = function() {
           return new node({
             type: "operator",
             operator: "&"
           });
         },
      peg$c336 = "^",
      peg$c337 = peg$literalExpectation("^", false),
      peg$c338 = function() {
           return new node({
             type: "operator",
             operator: "^"
           });
         },
      peg$c339 = "|",
      peg$c340 = peg$literalExpectation("|", false),
      peg$c341 = function() {
           return new node({
             type: "operator",
             operator: "|"
           });
         },
      peg$c342 = "&&",
      peg$c343 = peg$literalExpectation("&&", false),
      peg$c344 = function() {
           return new node({
             type: "operator",
             operator: "&&"
           });
         },
      peg$c345 = "^^",
      peg$c346 = peg$literalExpectation("^^", false),
      peg$c347 = function() {
           return new node({
             type: "operator",
             operator: "^^"
           });
         },
      peg$c348 = "||",
      peg$c349 = peg$literalExpectation("||", false),
      peg$c350 = function() {
           return new node({
             type: "operator",
             operator: "||"
           });
         },
      peg$c351 = "?",
      peg$c352 = peg$literalExpectation("?", false),
      peg$c353 = ":",
      peg$c354 = peg$literalExpectation(":", false),
      peg$c355 = function(head, tail) {
            var result = head;
            if (tail) {
              result = new node({
                type: "ternary",
                condition: head,
                is_true: tail[3],
                is_false: tail[7]
              });
            }
            return result;
          },
      peg$c356 = "*=",
      peg$c357 = peg$literalExpectation("*=", false),
      peg$c358 = "/=",
      peg$c359 = peg$literalExpectation("/=", false),
      peg$c360 = "%=",
      peg$c361 = peg$literalExpectation("%=", false),
      peg$c362 = "+=",
      peg$c363 = peg$literalExpectation("+=", false),
      peg$c364 = "-=",
      peg$c365 = peg$literalExpectation("-=", false),
      peg$c366 = "<<=",
      peg$c367 = peg$literalExpectation("<<=", false),
      peg$c368 = ">>=",
      peg$c369 = peg$literalExpectation(">>=", false),
      peg$c370 = "&=",
      peg$c371 = peg$literalExpectation("&=", false),
      peg$c372 = "^=",
      peg$c373 = peg$literalExpectation("^=", false),
      peg$c374 = "|=",
      peg$c375 = peg$literalExpectation("|=", false),
      peg$c376 = function(variable, operator, expression) {
            return new node({
              type: "binary",
              operator: new node({
                type: "operator",
                operator: operator
              }),
              left: variable,
              right: expression
            });
          },

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0;

    s0 = peg$parseexternal_statement_list();

    return s0;
  }

  function peg$parsenewLine() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c3.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c4); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c5();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseEOF() {
    var s0, s1;

    s0 = peg$currPos;
    peg$silentFails++;
    if (input.length > peg$currPos) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    peg$silentFails--;
    if (s1 === peg$FAILED) {
      s0 = void 0;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    s1 = peg$parsenewLine();
    if (s1 === peg$FAILED) {
      if (peg$c8.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 === peg$FAILED) {
        if (peg$c10.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
        if (s1 === peg$FAILED) {
          s1 = peg$parsecomment();
        }
      }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsenewLine();
        if (s1 === peg$FAILED) {
          if (peg$c8.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
          if (s1 === peg$FAILED) {
            if (peg$c10.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s1 === peg$FAILED) {
              s1 = peg$parsecomment();
            }
          }
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }

    return s0;
  }

  function peg$parsenoNewlineComment() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c12) {
      s1 = peg$c12;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c14) {
        s5 = peg$c14;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      peg$silentFails--;
      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c14) {
          s5 = peg$c14;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c14) {
          s3 = peg$c14;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c16) {
        s1 = peg$c16;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c18.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsenoNewlineWhitespace() {
    var s0, s1;

    s0 = [];
    if (peg$c10.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c11); }
    }
    if (s1 === peg$FAILED) {
      s1 = peg$parsenoNewlineComment();
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c10.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
        if (s1 === peg$FAILED) {
          s1 = peg$parsenoNewlineComment();
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecomment() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c12) {
      s1 = peg$c12;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$currPos;
      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c14) {
        s5 = peg$c14;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      peg$silentFails--;
      if (s5 === peg$FAILED) {
        s4 = void 0;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c14) {
          s5 = peg$c14;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c14) {
          s3 = peg$c14;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c16) {
        s1 = peg$c16;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c18.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenewLine();
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c20); }
    }

    return s0;
  }

  function peg$parsesemicolon() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 59) {
        s2 = peg$c21;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecomma() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 44) {
        s2 = peg$c23;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseleft_bracket() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 91) {
        s2 = peg$c25;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseright_bracket() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 93) {
        s2 = peg$c27;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c28); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseequals() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c29;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseleft_paren() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c31;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseright_paren() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 41) {
        s2 = peg$c33;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseleft_brace() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 123) {
        s2 = peg$c35;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c36); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseright_brace() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 125) {
        s2 = peg$c37;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseexternal_statement_list() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseexternal_statement();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseexternal_statement();
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c39(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseexternal_statement() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsepreprocessor_external_branch();
    if (s1 === peg$FAILED) {
      s1 = peg$parseexternal_declaration();
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c40(s1);
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s1 = peg$c41();
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parseexternal_declaration() {
    var s0;

    s0 = peg$parsefunction_definition();
    if (s0 === peg$FAILED) {
      s0 = peg$parseglobal_declaration();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepreprocessor_define();
        if (s0 === peg$FAILED) {
          s0 = peg$parsepreprocessor_operator();
          if (s0 === peg$FAILED) {
            s0 = peg$parsestruct_definition();
            if (s0 === peg$FAILED) {
              s0 = peg$parsemacro_call();
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsepreprocessor_operator() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 5) === peg$c44) {
        s2 = peg$c44;
        peg$currPos += 5;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c46) {
          s2 = peg$c46;
          peg$currPos += 6;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c48) {
            s2 = peg$c48;
            peg$currPos += 7;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c49); }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c50) {
              s2 = peg$c50;
              peg$currPos += 5;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c51); }
            }
            if (s2 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c52) {
                s2 = peg$c52;
                peg$currPos += 9;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c53); }
              }
              if (s2 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c54) {
                  s2 = peg$c54;
                  peg$currPos += 4;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c55); }
                }
                if (s2 === peg$FAILED) {
                  if (input.substr(peg$currPos, 7) === peg$c56) {
                    s2 = peg$c56;
                    peg$currPos += 7;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c57); }
                  }
                }
              }
            }
          }
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          s5 = [];
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c18.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c19); }
            }
          }
          if (s5 !== peg$FAILED) {
            s5 = peg$c58(s2, s5);
          }
          s4 = s5;
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenewLine();
            if (s5 === peg$FAILED) {
              s5 = peg$parseEOF();
            }
            if (s5 !== peg$FAILED) {
              s1 = peg$c59(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemacro_identifier() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c60.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c61); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c62.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c63); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c62.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c63); }
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c64(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_parameter_list() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      s1 = peg$c31;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsemacro_identifier();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$parsecomma();
        if (s5 !== peg$FAILED) {
          s6 = peg$parsemacro_identifier();
          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$currPos;
          s5 = peg$parsecomma();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsemacro_identifier();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseright_paren();
          if (s4 !== peg$FAILED) {
            s1 = peg$c65(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemacro_call() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsemacro_identifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseleft_paren();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseparameter_list();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s5 = peg$c33;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c34); }
            }
            if (s5 !== peg$FAILED) {
              s1 = peg$c74(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_define() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c76) {
          s3 = peg$c76;
          peg$currPos += 6;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c77); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsemacro_identifier();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepreprocessor_parameter_list();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                if (peg$c78.test(input.charAt(peg$currPos))) {
                  s8 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c79); }
                }
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  if (peg$c78.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c79); }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$currPos;
                  s9 = [];
                  if (peg$c18.test(input.charAt(peg$currPos))) {
                    s10 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s10 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c19); }
                  }
                  while (s10 !== peg$FAILED) {
                    s9.push(s10);
                    if (peg$c18.test(input.charAt(peg$currPos))) {
                      s10 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s10 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c19); }
                    }
                  }
                  if (s9 !== peg$FAILED) {
                    s9 = peg$c80(s5, s6, s9);
                  }
                  s8 = s9;
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsenewLine();
                    if (s9 === peg$FAILED) {
                      s9 = peg$parseEOF();
                    }
                    if (s9 !== peg$FAILED) {
                      s1 = peg$c81(s5, s6, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_if() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c82) {
          s3 = peg$c82;
          peg$currPos += 5;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c83); }
        }
        if (s3 === peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c84) {
            s3 = peg$c84;
            peg$currPos += 6;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c85); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c86) {
              s3 = peg$c86;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c87); }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$currPos;
            s6 = [];
            if (peg$c18.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c19); }
            }
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              if (peg$c18.test(input.charAt(peg$currPos))) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c19); }
              }
            }
            if (s6 !== peg$FAILED) {
              s6 = peg$c58(s3, s6);
            }
            s5 = s6;
            if (s5 !== peg$FAILED) {
              s6 = peg$parsenewLine();
              if (s6 === peg$FAILED) {
                s6 = peg$parseEOF();
              }
              if (s6 !== peg$FAILED) {
                s1 = peg$c88(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_else_if() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c89) {
          s3 = peg$c89;
          peg$currPos += 4;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c90); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$currPos;
            s6 = [];
            if (peg$c18.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c19); }
            }
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              if (peg$c18.test(input.charAt(peg$currPos))) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c19); }
              }
            }
            if (s6 !== peg$FAILED) {
              s6 = peg$c91(s6);
            }
            s5 = s6;
            if (s5 !== peg$FAILED) {
              s6 = peg$parsenewLine();
              if (s6 === peg$FAILED) {
                s6 = peg$parseEOF();
              }
              if (s6 !== peg$FAILED) {
                s1 = peg$c92(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_else() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c93) {
          s3 = peg$c93;
          peg$currPos += 4;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c94); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenoNewlineWhitespace();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenewLine();
            if (s5 !== peg$FAILED) {
              s1 = peg$c95();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_end() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c42;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c96) {
          s3 = peg$c96;
          peg$currPos += 5;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c97); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenoNewlineWhitespace();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenewLine();
            if (s5 === peg$FAILED) {
              s5 = peg$parseEOF();
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5, s6];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_external_branch() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsepreprocessor_if();
    if (s2 !== peg$FAILED) {
      s3 = peg$parseexternal_statement_list();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsepreprocessor_else_if();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseexternal_statement_list();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsepreprocessor_else_if();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseexternal_statement_list();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parsepreprocessor_else();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseexternal_statement_list();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsepreprocessor_end();
          if (s4 !== peg$FAILED) {
            s1 = peg$c98(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepreprocessor_statement_branch() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsepreprocessor_if();
    if (s2 !== peg$FAILED) {
      s3 = peg$parsestatement_list();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsepreprocessor_else_if();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsestatement_list();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsepreprocessor_else_if();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsestatement_list();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parsepreprocessor_else();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsestatement_list();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsepreprocessor_end();
          if (s4 !== peg$FAILED) {
            s1 = peg$c98(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction_definition() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parsefunction_prototype();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecompound_statement();
      if (s2 !== peg$FAILED) {
        s1 = peg$c99(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecompound_statement() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseleft_brace();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsestatement_list();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseright_brace();
        if (s3 !== peg$FAILED) {
          s1 = peg$c100(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsestatement_list() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsestatement_no_new_scope();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsestatement_no_new_scope();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = peg$c101(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsestatement_no_new_scope() {
    var s0;

    s0 = peg$parsecompound_statement();
    if (s0 === peg$FAILED) {
      s0 = peg$parsesimple_statement();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepreprocessor_statement_branch();
      }
    }

    return s0;
  }

  function peg$parsestatement_with_scope() {
    var s0;

    s0 = peg$parsecompound_statement();
    if (s0 === peg$FAILED) {
      s0 = peg$parsesimple_statement();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepreprocessor_statement_branch();
      }
    }

    return s0;
  }

  function peg$parsesimple_statement() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsedeclaration();
    if (s1 === peg$FAILED) {
      s1 = peg$parseexpression_statement();
      if (s1 === peg$FAILED) {
        s1 = peg$parseselection_statement();
        if (s1 === peg$FAILED) {
          s1 = peg$parseiteration_statement();
          if (s1 === peg$FAILED) {
            s1 = peg$parsejump_statement();
            if (s1 === peg$FAILED) {
              s1 = peg$parsepreprocessor_define();
              if (s1 === peg$FAILED) {
                s1 = peg$parsepreprocessor_operator();
                if (s1 === peg$FAILED) {
                  s1 = peg$parsesequence_expression();
                  if (s1 === peg$FAILED) {
                    s1 = peg$parsemacro_call();
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c102(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseselection_statement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c86) {
      s1 = peg$c86;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c87); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_paren();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseassignment_expression();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseright_paren();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsestatement_with_scope();
            if (s5 !== peg$FAILED) {
              s6 = peg$currPos;
              if (input.substr(peg$currPos, 4) === peg$c93) {
                s7 = peg$c93;
                peg$currPos += 4;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c94); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parse_();
                if (s8 === peg$FAILED) {
                  s8 = null;
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestatement_with_scope();
                  if (s9 !== peg$FAILED) {
                    s7 = [s7, s8, s9];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s1 = peg$c103(s3, s5, s6);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefor_loop() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c104) {
      s1 = peg$c104;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c105); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_paren();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseexpression_statement();
        if (s3 === peg$FAILED) {
          s3 = peg$parsedeclaration();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecondition();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsesemicolon();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseassignment_expression();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseright_paren();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsestatement_no_new_scope();
                  if (s8 !== peg$FAILED) {
                    s1 = peg$c106(s3, s4, s6, s8);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhile_statement() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c107) {
      s1 = peg$c107;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c108); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_paren();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecondition();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseright_paren();
          if (s4 !== peg$FAILED) {
            s1 = peg$c109(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhile_loop() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parsewhile_statement();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsestatement_no_new_scope();
      if (s2 !== peg$FAILED) {
        s1 = peg$c110(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedo_while() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c111) {
      s1 = peg$c111;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c112); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsestatement_with_scope();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhile_statement();
        if (s3 !== peg$FAILED) {
          s1 = peg$c113(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseiteration_statement() {
    var s0;

    s0 = peg$parsewhile_loop();
    if (s0 === peg$FAILED) {
      s0 = peg$parsedo_while();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefor_loop();
      }
    }

    return s0;
  }

  function peg$parsejump_statement() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 6) === peg$c114) {
      s1 = peg$c114;
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c115); }
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c116) {
        s2 = peg$c116;
        peg$currPos += 2;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c117); }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c118) {
          s2 = peg$c118;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c119); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 33) {
            s2 = peg$c120;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c121); }
          }
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 126) {
              s2 = peg$c122;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c123); }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 43) {
                s2 = peg$c124;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c125); }
              }
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                  s2 = peg$c126;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c127); }
                }
              }
            }
          }
        }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseassignment_expression();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsesemicolon();
            if (s5 !== peg$FAILED) {
              s1 = peg$c128(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c129) {
        s2 = peg$c129;
        peg$currPos += 8;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c130); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesemicolon();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c131) {
          s2 = peg$c131;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c132); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesemicolon();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c114) {
            s2 = peg$c114;
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c115); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesemicolon();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 === peg$FAILED) {
            s1 = peg$currPos;
            if (input.substr(peg$currPos, 7) === peg$c133) {
              s2 = peg$c133;
              peg$currPos += 7;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c134); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsesemicolon();
              if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c135(s1);
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parseexpression_statement() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseassignment_expression();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsesemicolon();
      if (s2 !== peg$FAILED) {
        s1 = peg$c136(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesequence_expression() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseassignment_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseassignment_expression();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseassignment_expression();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c137(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedeclaration() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsefunction_prototype();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsesemicolon();
      if (s2 !== peg$FAILED) {
        s1 = peg$c139(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parselocally_specified_type();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinit_declarator_list();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesemicolon();
            if (s4 !== peg$FAILED) {
              s1 = peg$c140(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$c141();
        if (s1) {
          s1 = void 0;
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 9) === peg$c142) {
            s2 = peg$c142;
            peg$currPos += 9;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c143); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseidentifier();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsecomma();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseidentifier();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsecomma();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseidentifier();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsesemicolon();
                  if (s6 !== peg$FAILED) {
                    s1 = peg$c144(s4, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 9) === peg$c145) {
            s1 = peg$c145;
            peg$currPos += 9;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c146); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseprecision_qualifier();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsetype_name();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsesemicolon();
                    if (s6 !== peg$FAILED) {
                      s1 = peg$c147(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c138); }
    }

    return s0;
  }

  function peg$parseglobal_declaration() {
    var s0, s1, s2, s3, s4;

    s0 = peg$parsedeclaration();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsefully_specified_type();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinit_declarator_list();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesemicolon();
            if (s4 !== peg$FAILED) {
              s1 = peg$c148(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseattribute_type();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsedeclarator_list_no_array();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsesemicolon();
              if (s4 !== peg$FAILED) {
                s1 = peg$c148(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parsefunction_prototype_parameter_list() {
    var s0, s1, s2, s3, s4, s5;

    if (input.substr(peg$currPos, 4) === peg$c149) {
      s0 = peg$c149;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c150); }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseparameter_declaration();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseparameter_declaration();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseparameter_declaration();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c151(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsefunction_prototype() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = peg$parsevoid_type();
    if (s1 === peg$FAILED) {
      s1 = peg$parseprecision_type();
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseidentifier();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseleft_paren();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsefunction_prototype_parameter_list();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseright_paren();
              if (s6 !== peg$FAILED) {
                s1 = peg$c152(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseparameter_qualifier() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c153) {
      s0 = peg$c153;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c154); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c155) {
        s0 = peg$c155;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c156); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c157) {
          s0 = peg$c157;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c158); }
        }
      }
    }

    return s0;
  }

  function peg$parseparameter_declaration() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseconst_qualifier();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parseparameter_qualifier();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parseprecision_qualifier();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsetype_name();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseidentifier();
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                s8 = peg$parseleft_bracket();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseconditional_expression();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseright_bracket();
                    if (s10 !== peg$FAILED) {
                      s8 = [s8, s9, s10];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s1 = peg$c159(s1, s2, s3, s4, s6, s7);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinit_declarator_list() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseinit_declarator();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseinit_declarator();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseinit_declarator();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c160(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedeclarator_list() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsedeclarator();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsedeclarator();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedeclarator();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c160(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedeclarator_list_no_array() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsedeclarator_no_array();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsedeclarator_no_array();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedeclarator_no_array();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c160(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedeclarator_list_arrays_have_size() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsedeclarator_array_with_size();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsecomma();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsedeclarator_array_with_size();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsedeclarator_array_with_size();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c160(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedeclarator_no_array() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseidentifier();
    if (s1 !== peg$FAILED) {
      s1 = peg$c161(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsedeclarator_array_with_size() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseidentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_bracket();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseconditional_expression();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseright_bracket();
          if (s4 !== peg$FAILED) {
            s1 = peg$c162(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parsedeclarator_no_array();
    }

    return s0;
  }

  function peg$parsedeclarator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseidentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_bracket();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseright_bracket();
        if (s3 !== peg$FAILED) {
          s1 = peg$c163(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parsedeclarator_array_with_size();
    }

    return s0;
  }

  function peg$parseinit_declarator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseidentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseequals();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseconditional_expression();
        if (s3 !== peg$FAILED) {
          s1 = peg$c164(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parsedeclarator();
    }

    return s0;
  }

  function peg$parsemember_list() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parselocally_specified_type();
    if (s3 !== peg$FAILED) {
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsedeclarator_list_arrays_have_size();
        if (s5 !== peg$FAILED) {
          s6 = peg$parsesemicolon();
          if (s6 !== peg$FAILED) {
            s3 = [s3, s4, s5, s6];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$parselocally_specified_type();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsedeclarator_list_arrays_have_size();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsesemicolon();
              if (s6 !== peg$FAILED) {
                s3 = [s3, s4, s5, s6];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c165(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsestruct_definition() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsetype_qualifier();
    if (s2 === peg$FAILED) {
      s2 = peg$parseattribute_qualifier();
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c166) {
        s2 = peg$c166;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c167); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseidentifier();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseleft_brace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsemember_list();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseright_brace();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsedeclarator_list();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsesemicolon();
                  if (s8 !== peg$FAILED) {
                    s1 = peg$c168(s1, s3, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseprecision_type() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseprecision_qualifier();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsetype_name();
      if (s2 !== peg$FAILED) {
        s1 = peg$c169(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselocally_specified_type() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseconst_qualifier();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseprecision_type();
      if (s2 !== peg$FAILED) {
        s1 = peg$c171(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c170); }
    }

    return s0;
  }

  function peg$parseattribute_qualifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$c141();
    if (s1) {
      s1 = void 0;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 9) === peg$c172) {
        s2 = peg$c172;
        peg$currPos += 9;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c173); }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c174();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseattribute_type() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseattribute_qualifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseprecision_type();
        if (s3 !== peg$FAILED) {
          s1 = peg$c175(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c170); }
    }

    return s0;
  }

  function peg$parsefully_specified_type() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsetype_qualifier();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseprecision_type();
      if (s2 !== peg$FAILED) {
        s1 = peg$c171(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c176); }
    }

    return s0;
  }

  function peg$parseprecision_qualifier() {
    var s0;

    peg$silentFails++;
    if (input.substr(peg$currPos, 5) === peg$c178) {
      s0 = peg$c178;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c179); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 7) === peg$c180) {
        s0 = peg$c180;
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c181); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c182) {
          s0 = peg$c182;
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c183); }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) { peg$fail(peg$c177); }
    }

    return s0;
  }

  function peg$parseconst_qualifier() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c184) {
      s0 = peg$c184;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c185); }
    }

    return s0;
  }

  function peg$parsetype_qualifier() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$parseconst_qualifier();
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 7) === peg$c187) {
        s0 = peg$c187;
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 9) === peg$c142) {
          s1 = peg$c142;
          peg$currPos += 9;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c143); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c187) {
              s3 = peg$c187;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c188); }
            }
            if (s3 !== peg$FAILED) {
              s1 = peg$c189();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c190) {
            s0 = peg$c190;
            peg$currPos += 7;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c191); }
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c186); }
    }

    return s0;
  }

  function peg$parsevoid_type() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c149) {
      s1 = peg$c149;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c150); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c193();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c192); }
    }

    return s0;
  }

  function peg$parsetype_name() {
    var s0, s1;

    peg$silentFails++;
    if (input.substr(peg$currPos, 5) === peg$c195) {
      s0 = peg$c195;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c196); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c197) {
        s0 = peg$c197;
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c198); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c199) {
          s0 = peg$c199;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c200); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c201) {
            s0 = peg$c201;
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c202); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c203) {
              s0 = peg$c203;
              peg$currPos += 4;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c204); }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parsesampler_buffer();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesampler_rect();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsesampler_ms();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsesampler();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsesampler_cube();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsevector();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parsematrix();
                          if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            s1 = peg$parseidentifier();
                            if (s1 !== peg$FAILED) {
                              s1 = peg$c205(s1);
                            }
                            s0 = s1;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c194); }
    }

    return s0;
  }

  function peg$parseidentifier() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = peg$currPos;
    s3 = peg$parsekeyword();
    if (s3 !== peg$FAILED) {
      if (peg$c207.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c208); }
      }
      if (s4 !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    peg$silentFails--;
    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (peg$c209.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c210); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c211.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c212); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c211.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c212); }
          }
        }
        if (s3 !== peg$FAILED) {
          s1 = peg$c64(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c206); }
    }

    return s0;
  }

  function peg$parsekeyword() {
    var s0;

    peg$silentFails++;
    if (input.substr(peg$currPos, 4) === peg$c203) {
      s0 = peg$c203;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c204); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5) === peg$c195) {
        s0 = peg$c195;
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c196); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c197) {
          s0 = peg$c197;
          peg$currPos += 6;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c198); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c199) {
            s0 = peg$c199;
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c200); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c201) {
              s0 = peg$c201;
              peg$currPos += 4;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c202); }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parsesampler_buffer();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesampler_rect();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsesampler_ms();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsesampler();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsesampler_cube();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsevector();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parsematrix();
                          if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5) === peg$c131) {
                              s0 = peg$c131;
                              peg$currPos += 5;
                            } else {
                              s0 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c132); }
                            }
                            if (s0 === peg$FAILED) {
                              if (input.substr(peg$currPos, 8) === peg$c129) {
                                s0 = peg$c129;
                                peg$currPos += 8;
                              } else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c130); }
                              }
                              if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c111) {
                                  s0 = peg$c111;
                                  peg$currPos += 2;
                                } else {
                                  s0 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c112); }
                                }
                                if (s0 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 4) === peg$c93) {
                                    s0 = peg$c93;
                                    peg$currPos += 4;
                                  } else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c94); }
                                  }
                                  if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c104) {
                                      s0 = peg$c104;
                                      peg$currPos += 3;
                                    } else {
                                      s0 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c105); }
                                    }
                                    if (s0 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 2) === peg$c86) {
                                        s0 = peg$c86;
                                        peg$currPos += 2;
                                      } else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c87); }
                                      }
                                      if (s0 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 7) === peg$c133) {
                                          s0 = peg$c133;
                                          peg$currPos += 7;
                                        } else {
                                          s0 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c134); }
                                        }
                                        if (s0 === peg$FAILED) {
                                          if (input.substr(peg$currPos, 6) === peg$c114) {
                                            s0 = peg$c114;
                                            peg$currPos += 6;
                                          } else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c115); }
                                          }
                                          if (s0 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 9) === peg$c172) {
                                              s0 = peg$c172;
                                              peg$currPos += 9;
                                            } else {
                                              s0 = peg$FAILED;
                                              if (peg$silentFails === 0) { peg$fail(peg$c173); }
                                            }
                                            if (s0 === peg$FAILED) {
                                              if (input.substr(peg$currPos, 5) === peg$c184) {
                                                s0 = peg$c184;
                                                peg$currPos += 5;
                                              } else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) { peg$fail(peg$c185); }
                                              }
                                              if (s0 === peg$FAILED) {
                                                if (input.substr(peg$currPos, 2) === peg$c155) {
                                                  s0 = peg$c155;
                                                  peg$currPos += 2;
                                                } else {
                                                  s0 = peg$FAILED;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c156); }
                                                }
                                                if (s0 === peg$FAILED) {
                                                  if (input.substr(peg$currPos, 3) === peg$c157) {
                                                    s0 = peg$c157;
                                                    peg$currPos += 3;
                                                  } else {
                                                    s0 = peg$FAILED;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c158); }
                                                  }
                                                  if (s0 === peg$FAILED) {
                                                    if (input.substr(peg$currPos, 5) === peg$c153) {
                                                      s0 = peg$c153;
                                                      peg$currPos += 5;
                                                    } else {
                                                      s0 = peg$FAILED;
                                                      if (peg$silentFails === 0) { peg$fail(peg$c154); }
                                                    }
                                                    if (s0 === peg$FAILED) {
                                                      if (input.substr(peg$currPos, 7) === peg$c190) {
                                                        s0 = peg$c190;
                                                        peg$currPos += 7;
                                                      } else {
                                                        s0 = peg$FAILED;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c191); }
                                                      }
                                                      if (s0 === peg$FAILED) {
                                                        if (input.substr(peg$currPos, 7) === peg$c187) {
                                                          s0 = peg$c187;
                                                          peg$currPos += 7;
                                                        } else {
                                                          s0 = peg$FAILED;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c188); }
                                                        }
                                                        if (s0 === peg$FAILED) {
                                                          if (input.substr(peg$currPos, 9) === peg$c214) {
                                                            s0 = peg$c214;
                                                            peg$currPos += 9;
                                                          } else {
                                                            s0 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c215); }
                                                          }
                                                          if (s0 === peg$FAILED) {
                                                            if (input.substr(peg$currPos, 11) === peg$c216) {
                                                              s0 = peg$c216;
                                                              peg$currPos += 11;
                                                            } else {
                                                              s0 = peg$FAILED;
                                                              if (peg$silentFails === 0) { peg$fail(peg$c217); }
                                                            }
                                                            if (s0 === peg$FAILED) {
                                                              if (input.substr(peg$currPos, 6) === peg$c166) {
                                                                s0 = peg$c166;
                                                                peg$currPos += 6;
                                                              } else {
                                                                s0 = peg$FAILED;
                                                                if (peg$silentFails === 0) { peg$fail(peg$c167); }
                                                              }
                                                              if (s0 === peg$FAILED) {
                                                                if (input.substr(peg$currPos, 4) === peg$c149) {
                                                                  s0 = peg$c149;
                                                                  peg$currPos += 4;
                                                                } else {
                                                                  s0 = peg$FAILED;
                                                                  if (peg$silentFails === 0) { peg$fail(peg$c150); }
                                                                }
                                                                if (s0 === peg$FAILED) {
                                                                  if (input.substr(peg$currPos, 5) === peg$c107) {
                                                                    s0 = peg$c107;
                                                                    peg$currPos += 5;
                                                                  } else {
                                                                    s0 = peg$FAILED;
                                                                    if (peg$silentFails === 0) { peg$fail(peg$c108); }
                                                                  }
                                                                  if (s0 === peg$FAILED) {
                                                                    if (input.substr(peg$currPos, 5) === peg$c178) {
                                                                      s0 = peg$c178;
                                                                      peg$currPos += 5;
                                                                    } else {
                                                                      s0 = peg$FAILED;
                                                                      if (peg$silentFails === 0) { peg$fail(peg$c179); }
                                                                    }
                                                                    if (s0 === peg$FAILED) {
                                                                      if (input.substr(peg$currPos, 7) === peg$c180) {
                                                                        s0 = peg$c180;
                                                                        peg$currPos += 7;
                                                                      } else {
                                                                        s0 = peg$FAILED;
                                                                        if (peg$silentFails === 0) { peg$fail(peg$c181); }
                                                                      }
                                                                      if (s0 === peg$FAILED) {
                                                                        if (input.substr(peg$currPos, 4) === peg$c182) {
                                                                          s0 = peg$c182;
                                                                          peg$currPos += 4;
                                                                        } else {
                                                                          s0 = peg$FAILED;
                                                                          if (peg$silentFails === 0) { peg$fail(peg$c183); }
                                                                        }
                                                                        if (s0 === peg$FAILED) {
                                                                          if (input.substr(peg$currPos, 4) === peg$c218) {
                                                                            s0 = peg$c218;
                                                                            peg$currPos += 4;
                                                                          } else {
                                                                            s0 = peg$FAILED;
                                                                            if (peg$silentFails === 0) { peg$fail(peg$c219); }
                                                                          }
                                                                          if (s0 === peg$FAILED) {
                                                                            if (input.substr(peg$currPos, 5) === peg$c220) {
                                                                              s0 = peg$c220;
                                                                              peg$currPos += 5;
                                                                            } else {
                                                                              s0 = peg$FAILED;
                                                                              if (peg$silentFails === 0) { peg$fail(peg$c221); }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) { peg$fail(peg$c213); }
    }

    return s0;
  }

  function peg$parsevector() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c222.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c223); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c224) {
        s3 = peg$c224;
        peg$currPos += 3;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c225); }
      }
      if (s3 !== peg$FAILED) {
        if (peg$c226.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c227); }
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsematrix() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c229.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c230); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c231) {
        s3 = peg$c231;
        peg$currPos += 3;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c232); }
      }
      if (s3 !== peg$FAILED) {
        if (peg$c226.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c227); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$currPos;
          if (peg$c233.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c234); }
          }
          if (s7 !== peg$FAILED) {
            if (peg$c226.test(input.charAt(peg$currPos))) {
              s8 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c227); }
            }
            if (s8 !== peg$FAILED) {
              s7 = [s7, s8];
              s6 = s7;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s5 = input.substring(s5, peg$currPos);
          } else {
            s5 = s6;
          }
          if (s5 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesampler() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c235.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c236); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 7) === peg$c237) {
        s3 = peg$c237;
        peg$currPos += 7;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c238); }
      }
      if (s3 !== peg$FAILED) {
        if (peg$c239.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c240); }
        }
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 68) {
            s5 = peg$c241;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c242); }
          }
          if (s5 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c243) {
              s6 = peg$c243;
              peg$currPos += 5;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c244); }
            }
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c245) {
                s7 = peg$c245;
                peg$currPos += 6;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c246); }
              }
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              if (s7 !== peg$FAILED) {
                s2 = [s2, s3, s4, s5, s6, s7];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesampler_cube() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c235.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c236); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 11) === peg$c216) {
        s3 = peg$c216;
        peg$currPos += 11;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c217); }
      }
      if (s3 !== peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c243) {
          s4 = peg$c243;
          peg$currPos += 5;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c244); }
        }
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c245) {
            s5 = peg$c245;
            peg$currPos += 6;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c246); }
          }
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesampler_rect() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c235.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c236); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 13) === peg$c247) {
        s3 = peg$c247;
        peg$currPos += 13;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c248); }
      }
      if (s3 !== peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c245) {
          s4 = peg$c245;
          peg$currPos += 6;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c246); }
        }
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesampler_ms() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c235.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c236); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 11) === peg$c249) {
        s3 = peg$c249;
        peg$currPos += 11;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c250); }
      }
      if (s3 !== peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c243) {
          s4 = peg$c243;
          peg$currPos += 5;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c244); }
        }
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsesampler_buffer() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c235.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c236); }
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.substr(peg$currPos, 13) === peg$c251) {
        s3 = peg$c251;
        peg$currPos += 13;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c252); }
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c228(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseint_constant() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (peg$c260.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c261); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c262.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c263); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c262.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c263); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (peg$c264.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c265); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = peg$c266(s1, s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c267;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c268); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c269.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c270); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c271.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c272); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c271.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c272); }
              }
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            if (peg$c264.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c265); }
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s1 = peg$c273(s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c267;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c268); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c274.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c275); }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$c274.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c275); }
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            if (peg$c264.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c265); }
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              s1 = peg$c276(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c267;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c268); }
          }
          if (s1 !== peg$FAILED) {
            if (peg$c264.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c265); }
            }
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              s1 = peg$c277(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }

    return s0;
  }

  function peg$parsefloat_constant() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    if (peg$c278.test(input.charAt(peg$currPos))) {
      s3 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c279); }
    }
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      if (peg$c278.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c279); }
      }
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s3 = peg$c280;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c281); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        if (peg$c262.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c263); }
        }
        if (s5 !== peg$FAILED) {
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c262.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c263); }
            }
          }
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsefloat_exponent();
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      s2 = [];
      if (peg$c262.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c263); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c262.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c263); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c280;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c281); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c262.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c263); }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c262.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c263); }
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsefloat_exponent();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c282.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c283); }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c284) {
          s2 = peg$c284;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c285); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c286) {
            s2 = peg$c286;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c287); }
          }
        }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c288(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c278.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c279); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c278.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c279); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsefloat_exponent();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (peg$c289.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c290); }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c291(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsefloat_exponent() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (peg$c292.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c293); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c294.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c295); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c262.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c263); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c262.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c263); }
            }
          }
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s1 = peg$c296(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseparen_expression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseleft_paren();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseassignment_expression();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseright_paren();
        if (s3 !== peg$FAILED) {
          s1 = peg$c297(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebool_constant() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c218) {
      s1 = peg$c218;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c219); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 5) === peg$c220) {
        s1 = peg$c220;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c221); }
      }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c298(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseprimary_expression() {
    var s0;

    s0 = peg$parsefunction_call();
    if (s0 === peg$FAILED) {
      s0 = peg$parseidentifier();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefloat_constant();
        if (s0 === peg$FAILED) {
          s0 = peg$parseint_constant();
          if (s0 === peg$FAILED) {
            s0 = peg$parsebool_constant();
            if (s0 === peg$FAILED) {
              s0 = peg$parseparen_expression();
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseindex_accessor() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseleft_bracket();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseassignment_expression();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseright_bracket();
        if (s3 !== peg$FAILED) {
          s1 = peg$c299(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefield_selector() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 46) {
      s1 = peg$c280;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c281); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseidentifier();
      if (s2 !== peg$FAILED) {
        s1 = peg$c300(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepostfix_expression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseprimary_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsefield_selector();
      if (s3 === peg$FAILED) {
        s3 = peg$parseindex_accessor();
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsefield_selector();
        if (s3 === peg$FAILED) {
          s3 = peg$parseindex_accessor();
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c301(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepostfix_expression_no_repeat() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsepostfix_expression();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c116) {
          s3 = peg$c116;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c117); }
        }
        if (s3 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c118) {
            s3 = peg$c118;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c119); }
          }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsefield_selector();
          if (s5 === peg$FAILED) {
            s5 = peg$parseindex_accessor();
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsefield_selector();
            if (s5 === peg$FAILED) {
              s5 = peg$parseindex_accessor();
            }
          }
          if (s4 !== peg$FAILED) {
            s1 = peg$c302(s1, s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseparameter_list() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c149) {
      s1 = peg$c149;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c150); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c303();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseassignment_expression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsecomma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseassignment_expression();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsecomma();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseassignment_expression();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c304(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsefunction_call() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parsefunction_identifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseleft_paren();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseparameter_list();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseright_paren();
          if (s4 !== peg$FAILED) {
            s1 = peg$c305(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction_identifier() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseidentifier();
    if (s1 !== peg$FAILED) {
      s1 = peg$c306(s1);
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$parsetype_name();
    }

    return s0;
  }

  function peg$parseunary_expression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c116) {
      s1 = peg$c116;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c117); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c118) {
        s1 = peg$c118;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c119); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 33) {
          s1 = peg$c120;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c121); }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 126) {
            s1 = peg$c122;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c123); }
          }
          if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 43) {
              s1 = peg$c124;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c125); }
            }
            if (s1 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s1 = peg$c126;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c127); }
              }
            }
          }
        }
      }
    }
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsepostfix_expression_no_repeat();
        if (s3 !== peg$FAILED) {
          s1 = peg$c307(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemultiplicative_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 42) {
      s1 = peg$c308;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c309); }
    }
    if (s1 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c310;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c311); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s1 = peg$c312;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c313); }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c29;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c314(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemultiplicative_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseunary_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsemultiplicative_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseunary_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsemultiplicative_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseunary_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseadditive_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 43) {
      s1 = peg$c124;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c125); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 43) {
        s3 = peg$c124;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c125); }
      }
      if (s3 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c29;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c316();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c126;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c127); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 45) {
          s3 = peg$c126;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c127); }
        }
        if (s3 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c29;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c30); }
          }
        }
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c317();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseadditive_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsemultiplicative_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseadditive_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parsemultiplicative_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseadditive_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsemultiplicative_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseshift_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c318) {
      s1 = peg$c318;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c319); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c320) {
        s1 = peg$c320;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c321); }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c29;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c314(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseshift_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseadditive_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseshift_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseadditive_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseshift_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseadditive_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parserelational_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 60) {
      s1 = peg$c322;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c323); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 60) {
        s3 = peg$c322;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c323); }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c29;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s1 = peg$c324(s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 62) {
        s1 = peg$c325;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c326); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 62) {
          s3 = peg$c325;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c326); }
        }
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c29;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c30); }
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c327(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parserelational_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseshift_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parserelational_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseshift_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parserelational_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseshift_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseequality_operator() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c328) {
      s1 = peg$c328;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c329); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c330) {
        s1 = peg$c330;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c331); }
      }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c332(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseequality_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parserelational_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseequality_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parserelational_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseequality_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parserelational_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_and_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 38) {
      s1 = peg$c333;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c334); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c29;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s3 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 38) {
          s3 = peg$c333;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c334); }
        }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c335();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_and_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseequality_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsebitwise_and_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseequality_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsebitwise_and_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseequality_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_xor_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 94) {
      s1 = peg$c336;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c337); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c29;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s3 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 94) {
          s3 = peg$c336;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c337); }
        }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c338();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_xor_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsebitwise_and_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsebitwise_xor_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parsebitwise_and_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsebitwise_xor_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsebitwise_and_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_or_operator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 124) {
      s1 = peg$c339;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c340); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c29;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s3 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 124) {
          s3 = peg$c339;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c340); }
        }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c341();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebitwise_or_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsebitwise_xor_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parsebitwise_or_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parsebitwise_xor_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsebitwise_or_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsebitwise_xor_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselogical_and_operator() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c342) {
      s1 = peg$c342;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c343); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c344();
    }
    s0 = s1;

    return s0;
  }

  function peg$parselogical_and_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsebitwise_or_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parselogical_and_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parsebitwise_or_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parselogical_and_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsebitwise_or_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselogical_xor_operator() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c345) {
      s1 = peg$c345;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c346); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c347();
    }
    s0 = s1;

    return s0;
  }

  function peg$parselogical_xor_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parselogical_and_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parselogical_xor_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parselogical_and_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parselogical_xor_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parselogical_and_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselogical_or_operator() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c348) {
      s1 = peg$c348;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c349); }
    }
    if (s1 !== peg$FAILED) {
      s1 = peg$c350();
    }
    s0 = s1;

    return s0;
  }

  function peg$parselogical_or_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parselogical_xor_expression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parselogical_or_operator();
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parselogical_xor_expression();
            if (s7 !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parselogical_or_operator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parselogical_xor_expression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c315(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseconditional_expression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    s1 = peg$parselogical_or_expression();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 63) {
          s4 = peg$c351;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c352); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parseassignment_expression();
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              if (s7 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s8 = peg$c353;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c354); }
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parse_();
                  if (s9 === peg$FAILED) {
                    s9 = null;
                  }
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseassignment_expression();
                    if (s10 !== peg$FAILED) {
                      s3 = [s3, s4, s5, s6, s7, s8, s9, s10];
                      s2 = s3;
                    } else {
                      peg$currPos = s2;
                      s2 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s1 = peg$c355(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseassignment_expression() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseconditional_expression();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c29;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
        if (s3 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c356) {
            s3 = peg$c356;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c357); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c358) {
              s3 = peg$c358;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c359); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c360) {
                s3 = peg$c360;
                peg$currPos += 2;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c361); }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c362) {
                  s3 = peg$c362;
                  peg$currPos += 2;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c363); }
                }
                if (s3 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c364) {
                    s3 = peg$c364;
                    peg$currPos += 2;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c365); }
                  }
                  if (s3 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c366) {
                      s3 = peg$c366;
                      peg$currPos += 3;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c367); }
                    }
                    if (s3 === peg$FAILED) {
                      if (input.substr(peg$currPos, 3) === peg$c368) {
                        s3 = peg$c368;
                        peg$currPos += 3;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c369); }
                      }
                      if (s3 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c370) {
                          s3 = peg$c370;
                          peg$currPos += 2;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c371); }
                        }
                        if (s3 === peg$FAILED) {
                          if (input.substr(peg$currPos, 2) === peg$c372) {
                            s3 = peg$c372;
                            peg$currPos += 2;
                          } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c373); }
                          }
                          if (s3 === peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c374) {
                              s3 = peg$c374;
                              peg$currPos += 2;
                            } else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c375); }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseassignment_expression();
            if (s5 !== peg$FAILED) {
              s1 = peg$c376(s1, s3, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseconditional_expression();
    }

    return s0;
  }

  function peg$parsecondition() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parselocally_specified_type();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseidentifier();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s5 = peg$c29;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c30); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseassignment_expression();
                if (s7 !== peg$FAILED) {
                  s1 = [s1, s2, s3, s4, s5, s6, s7];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseassignment_expression();
    }

    return s0;
  }


    // Map containing the names of structs defined in the shader mapped to "true".
    var next_id = 0;

    // The type of shader being parsed.  This sould be set before parsing begins.
    // This allows us to reject invalid constructs such as attribute declaration
    // in a fragment shader or discard ina vertex shader.
    var shaderType = "vs";

    /** @constructor */
    function node(extraProperties) {
      this._isNode = true;
      this.id = next_id++;
      for (var prop in extraProperties) {
          if (extraProperties.hasOwnProperty(prop)) {
            this[prop] = extraProperties[prop];
          }
      }
    }

    // Helper function to daisy chain together a series of binary operations.
    function daisy_chain(head, tail) {
      var result = head;
      for (var i = 0; i < tail.length; i++) {
        result = new node({
          type: "binary",
          operator: tail[i][1],
          left: result,
          right: tail[i][3]
        });
      }
      return result;
    }

    // Generates AST Nodes for a preprocessor branch.
    function preprocessor_branch(if_directive,
                                 elif_directives,
                                 else_directive) {
      var elseList = elif_directives;
      if (else_directive) {
        elseList = elseList.concat([else_directive]);
      }
      var result = if_directive[0];
      result.guarded_statements = if_directive[1].statements;
      var current_branch = result;
      for (var i = 0; i < elseList.length; i++) {
        current_branch.elseBody = elseList[i][0];
        current_branch.elseBody.guarded_statements =
          elseList[i][1].statements;
        current_branch = current_branch.elseBody;
      }
      return result;
    }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

var parser = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};

var subnodes = function(node) {
	var subnodes = [];
	for (var param in node) {
		if (!node.hasOwnProperty(param) || node[param] === null)
			continue;
		if (param == 'parent')
			continue;

		if (node[param] instanceof Array) {
			subnodes = subnodes.concat(node[param]);
		}
		else if (node[param]._isNode) {
			subnodes.push(node[param]);
		}
	}
	return subnodes;
};

var async = createCommonjsModule(function (module) {
/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
(function () {

    var async = {};
    function noop() {}
    function identity(v) {
        return v;
    }
    function toBool(v) {
        return !!v;
    }
    function notId(v) {
        return !v;
    }

    // global on the server, window in the browser
    var previous_async;

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self === 'object' && self.self === self && self ||
            typeof commonjsGlobal === 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal ||
            this;

    if (root != null) {
        previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            fn.apply(this, arguments);
            fn = null;
        };
    }

    function _once(fn) {
        return function() {
            if (fn === null) return;
            fn.apply(this, arguments);
            fn = null;
        };
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    // Ported from underscore.js isObject
    var _isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    function _isArrayLike(arr) {
        return _isArray(arr) || (
            // has a positive integer length property
            typeof arr.length === "number" &&
            arr.length >= 0 &&
            arr.length % 1 === 0
        );
    }

    function _arrayEach(arr, iterator) {
        var index = -1,
            length = arr.length;

        while (++index < length) {
            iterator(arr[index], index, arr);
        }
    }

    function _map(arr, iterator) {
        var index = -1,
            length = arr.length,
            result = Array(length);

        while (++index < length) {
            result[index] = iterator(arr[index], index, arr);
        }
        return result;
    }

    function _range(count) {
        return _map(Array(count), function (v, i) { return i; });
    }

    function _reduce(arr, iterator, memo) {
        _arrayEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    }

    function _forEachOf(object, iterator) {
        _arrayEach(_keys(object), function (key) {
            iterator(object[key], key);
        });
    }

    function _indexOf(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) return i;
        }
        return -1;
    }

    var _keys = Object.keys || function (obj) {
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    function _keyIterator(coll) {
        var i = -1;
        var len;
        var keys;
        if (_isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? i : null;
            };
        } else {
            keys = _keys(coll);
            len = keys.length;
            return function next() {
                i++;
                return i < len ? keys[i] : null;
            };
        }
    }

    // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
    // This accumulates the arguments passed into an array, after a given index.
    // From underscore.js (https://github.com/jashkenas/underscore/pull/2140).
    function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
            }
            // Currently unused but handle cases outside of the switch statement:
            // var args = Array(startIndex + 1);
            // for (index = 0; index < startIndex; index++) {
            //     args[index] = arguments[index];
            // }
            // args[startIndex] = rest;
            // return func.apply(this, args);
        };
    }

    function _withoutIndex(iterator) {
        return function (value, index, callback) {
            return iterator(value, callback);
        };
    }

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////

    // capture the global reference to guard against fakeTimer mocks
    var _setImmediate = typeof setImmediate === 'function' && setImmediate;

    var _delay = _setImmediate ? function(fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
    } : function(fn) {
        setTimeout(fn, 0);
    };

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
        async.nextTick = process.nextTick;
    } else {
        async.nextTick = _delay;
    }
    async.setImmediate = _setImmediate ? _delay : async.nextTick;


    async.forEach =
    async.each = function (arr, iterator, callback) {
        return async.eachOf(arr, _withoutIndex(iterator), callback);
    };

    async.forEachSeries =
    async.eachSeries = function (arr, iterator, callback) {
        return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
    };


    async.forEachLimit =
    async.eachLimit = function (arr, limit, iterator, callback) {
        return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
    };

    async.forEachOf =
    async.eachOf = function (object, iterator, callback) {
        callback = _once(callback || noop);
        object = object || [];

        var iter = _keyIterator(object);
        var key, completed = 0;

        while ((key = iter()) != null) {
            completed += 1;
            iterator(object[key], key, only_once(done));
        }

        if (completed === 0) callback(null);

        function done(err) {
            completed--;
            if (err) {
                callback(err);
            }
            // Check key is null in case iterator isn't exhausted
            // and done resolved synchronously.
            else if (key === null && completed <= 0) {
                callback(null);
            }
        }
    };

    async.forEachOfSeries =
    async.eachOfSeries = function (obj, iterator, callback) {
        callback = _once(callback || noop);
        obj = obj || [];
        var nextKey = _keyIterator(obj);
        var key = nextKey();
        function iterate() {
            var sync = true;
            if (key === null) {
                return callback(null);
            }
            iterator(obj[key], key, only_once(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    key = nextKey();
                    if (key === null) {
                        return callback(null);
                    } else {
                        if (sync) {
                            async.setImmediate(iterate);
                        } else {
                            iterate();
                        }
                    }
                }
            }));
            sync = false;
        }
        iterate();
    };



    async.forEachOfLimit =
    async.eachOfLimit = function (obj, limit, iterator, callback) {
        _eachOfLimit(limit)(obj, iterator, callback);
    };

    function _eachOfLimit(limit) {

        return function (obj, iterator, callback) {
            callback = _once(callback || noop);
            obj = obj || [];
            var nextKey = _keyIterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish () {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var key = nextKey();
                    if (key === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iterator(obj[key], key, only_once(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        }
                        else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }


    function doParallel(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOf, obj, iterator, callback);
        };
    }
    function doParallelLimit(fn) {
        return function (obj, limit, iterator, callback) {
            return fn(_eachOfLimit(limit), obj, iterator, callback);
        };
    }
    function doSeries(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOfSeries, obj, iterator, callback);
        };
    }

    function _asyncMap(eachfn, arr, iterator, callback) {
        callback = _once(callback || noop);
        arr = arr || [];
        var results = _isArrayLike(arr) ? [] : {};
        eachfn(arr, function (value, index, callback) {
            iterator(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = doParallelLimit(_asyncMap);

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.inject =
    async.foldl =
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachOfSeries(arr, function (x, i, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };

    async.foldr =
    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, identity).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };

    async.transform = function (arr, memo, iterator, callback) {
        if (arguments.length === 3) {
            callback = iterator;
            iterator = memo;
            memo = _isArray(arr) ? [] : {};
        }

        async.eachOf(arr, function(v, k, cb) {
            iterator(memo, v, k, cb);
        }, function(err) {
            callback(err, memo);
        });
    };

    function _filter(eachfn, arr, iterator, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iterator(x, function (v) {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            });
        }, function () {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    }

    async.select =
    async.filter = doParallel(_filter);

    async.selectLimit =
    async.filterLimit = doParallelLimit(_filter);

    async.selectSeries =
    async.filterSeries = doSeries(_filter);

    function _reject(eachfn, arr, iterator, callback) {
        _filter(eachfn, arr, function(value, cb) {
            iterator(value, function(v) {
                cb(!v);
            });
        }, callback);
    }
    async.reject = doParallel(_reject);
    async.rejectLimit = doParallelLimit(_reject);
    async.rejectSeries = doSeries(_reject);

    function _createTester(eachfn, check, getResult) {
        return function(arr, limit, iterator, cb) {
            function done() {
                if (cb) cb(getResult(false, void 0));
            }
            function iteratee(x, _, callback) {
                if (!cb) return callback();
                iterator(x, function (v) {
                    if (cb && check(v)) {
                        cb(getResult(true, x));
                        cb = iterator = false;
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                eachfn(arr, limit, iteratee, done);
            } else {
                cb = iterator;
                iterator = limit;
                eachfn(arr, iteratee, done);
            }
        };
    }

    async.any =
    async.some = _createTester(async.eachOf, toBool, identity);

    async.someLimit = _createTester(async.eachOfLimit, toBool, identity);

    async.all =
    async.every = _createTester(async.eachOf, notId, notId);

    async.everyLimit = _createTester(async.eachOfLimit, notId, notId);

    function _findGetResult(v, x) {
        return x;
    }
    async.detect = _createTester(async.eachOf, identity, _findGetResult);
    async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
    async.detectLimit = _createTester(async.eachOfLimit, identity, _findGetResult);

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                callback(null, _map(results.sort(comparator), function (x) {
                    return x.value;
                }));
            }

        });

        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    };

    async.auto = function (tasks, concurrency, callback) {
        if (typeof arguments[1] === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = _once(callback || noop);
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = remainingTasks;
        }

        var results = {};
        var runningTasks = 0;

        var hasError = false;

        var listeners = [];
        function addListener(fn) {
            listeners.unshift(fn);
        }
        function removeListener(fn) {
            var idx = _indexOf(listeners, fn);
            if (idx >= 0) listeners.splice(idx, 1);
        }
        function taskComplete() {
            remainingTasks--;
            _arrayEach(listeners.slice(0), function (fn) {
                fn();
            });
        }

        addListener(function () {
            if (!remainingTasks) {
                callback(null, results);
            }
        });

        _arrayEach(keys, function (k) {
            if (hasError) return;
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = _restParam(function(err, args) {
                runningTasks--;
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _forEachOf(results, function(val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[k] = args;
                    hasError = true;

                    callback(err, safeResults);
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            });
            var requires = task.slice(0, task.length - 1);
            // prevent dead-locks
            var len = requires.length;
            var dep;
            while (len--) {
                if (!(dep = tasks[requires[len]])) {
                    throw new Error('Has nonexistent dependency in ' + requires.join(', '));
                }
                if (_isArray(dep) && _indexOf(dep, k) >= 0) {
                    throw new Error('Has cyclic dependencies');
                }
            }
            function ready() {
                return runningTasks < concurrency && _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            }
            if (ready()) {
                runningTasks++;
                task[task.length - 1](taskCallback, results);
            }
            else {
                addListener(listener);
            }
            function listener() {
                if (ready()) {
                    runningTasks++;
                    removeListener(listener);
                    task[task.length - 1](taskCallback, results);
                }
            }
        });
    };



    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var attempts = [];

        var opts = {
            times: DEFAULT_TIMES,
            interval: DEFAULT_INTERVAL
        };

        function parseTimes(acc, t){
            if(typeof t === 'number'){
                acc.times = parseInt(t, 10) || DEFAULT_TIMES;
            } else if(typeof t === 'object'){
                acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
                acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
            } else {
                throw new Error('Unsupported argument type for \'times\': ' + typeof t);
            }
        }

        var length = arguments.length;
        if (length < 1 || length > 3) {
            throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
        } else if (length <= 2 && typeof times === 'function') {
            callback = task;
            task = times;
        }
        if (typeof times !== 'function') {
            parseTimes(opts, times);
        }
        opts.callback = callback;
        opts.task = task;

        function wrappedTask(wrappedCallback, wrappedResults) {
            function retryAttempt(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            }

            function retryInterval(interval){
                return function(seriesCallback){
                    setTimeout(function(){
                        seriesCallback(null);
                    }, interval);
                };
            }

            while (opts.times) {

                var finalAttempt = !(opts.times-=1);
                attempts.push(retryAttempt(opts.task, finalAttempt));
                if(!finalAttempt && opts.interval > 0){
                    attempts.push(retryInterval(opts.interval));
                }
            }

            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || opts.callback)(data.err, data.result);
            });
        }

        // If a callback is passed, run this as a controll flow
        return opts.callback ? wrappedTask() : wrappedTask;
    };

    async.waterfall = function (tasks, callback) {
        callback = _once(callback || noop);
        if (!_isArray(tasks)) {
            var err = new Error('First argument to waterfall must be an array of functions');
            return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        function wrapIterator(iterator) {
            return _restParam(function (err, args) {
                if (err) {
                    callback.apply(null, [err].concat(args));
                }
                else {
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    ensureAsync(iterator).apply(null, args);
                }
            });
        }
        wrapIterator(async.iterator(tasks))();
    };

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = _isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(_restParam(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    async.parallel = function (tasks, callback) {
        _parallel(async.eachOf, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
    };

    async.series = function(tasks, callback) {
        _parallel(async.eachOfSeries, tasks, callback);
    };

    async.iterator = function (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        }
        return makeCallback(0);
    };

    async.apply = _restParam(function (fn, args) {
        return _restParam(function (callArgs) {
            return fn.apply(
                null, args.concat(callArgs)
            );
        });
    });

    function _concat(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        callback = callback || noop;
        if (test()) {
            var next = _restParam(function(err, args) {
                if (err) {
                    callback(err);
                } else if (test.apply(this, args)) {
                    iterator(next);
                } else {
                    callback.apply(null, [null].concat(args));
                }
            });
            iterator(next);
        } else {
            callback(null);
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        var calls = 0;
        return async.whilst(function() {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iterator, callback);
    };

    async.until = function (test, iterator, callback) {
        return async.whilst(function() {
            return !test.apply(this, arguments);
        }, iterator, callback);
    };

    async.doUntil = function (iterator, test, callback) {
        return async.doWhilst(iterator, function() {
            return !test.apply(this, arguments);
        }, callback);
    };

    async.during = function (test, iterator, callback) {
        callback = callback || noop;

        var next = _restParam(function(err, args) {
            if (err) {
                callback(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function(err, truth) {
            if (err) {
                callback(err);
            } else if (truth) {
                iterator(next);
            } else {
                callback(null);
            }
        };

        test(check);
    };

    async.doDuring = function (iterator, test, callback) {
        var calls = 0;
        async.during(function(next) {
            if (calls++ < 1) {
                next(null, true);
            } else {
                test.apply(this, arguments);
            }
        }, iterator, callback);
    };

    function _queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        }
        else if(concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
            });
            async.setImmediate(q.process);
        }
        function _next(q, tasks) {
            return function(){
                workers -= 1;

                var removed = false;
                var args = arguments;
                _arrayEach(tasks, function (task) {
                    _arrayEach(workersList, function (worker, index) {
                        if (worker === task && !removed) {
                            workersList.splice(index, 1);
                            removed = true;
                        }
                    });

                    task.callback.apply(task, args);
                });
                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var workersList = [];
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            empty: noop,
            drain: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                while(!q.paused && workers < q.concurrency && q.tasks.length){

                    var tasks = q.payload ?
                        q.tasks.splice(0, q.payload) :
                        q.tasks.splice(0, q.tasks.length);

                    var data = _map(tasks, function (task) {
                        return task.data;
                    });

                    if (q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    workersList.push(tasks[0]);
                    var cb = only_once(_next(q, tasks));
                    worker(data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            workersList: function () {
                return workersList;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    async.setImmediate(q.process);
                }
            }
        };
        return q;
    }

    async.queue = function (worker, concurrency) {
        var q = _queue(function (items, cb) {
            worker(items[0], cb);
        }, concurrency, 1);

        return q;
    };

    async.priorityQueue = function (worker, concurrency) {

        function _compareTasks(a, b){
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + ((end - beg + 1) >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
                async.setImmediate(q.process);
            });
        }

        // Start with a normal queue
        var q = async.queue(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        return _queue(worker, 1, payload);
    };

    function _console_fn(name) {
        return _restParam(function (fn, args) {
            fn.apply(null, args.concat([_restParam(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        var has = Object.prototype.hasOwnProperty;
        hasher = hasher || identity;
        var memoized = _restParam(function memoized(args) {
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (has.call(memo, key)) {   
                async.setImmediate(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (has.call(queues, key)) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([_restParam(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    };

    function _times(mapper) {
        return function (count, iterator, callback) {
            mapper(_range(count), iterator, callback);
        };
    }

    async.times = _times(async.map);
    async.timesSeries = _times(async.mapSeries);
    async.timesLimit = function (count, limit, iterator, callback) {
        return async.mapLimit(_range(count), limit, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return _restParam(function (args) {
            var that = this;

            var callback = args[args.length - 1];
            if (typeof callback == 'function') {
                args.pop();
            } else {
                callback = noop;
            }

            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([_restParam(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        });
    };

    async.compose = function (/* functions... */) {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };


    function _applyEach(eachfn) {
        return _restParam(function(fns, args) {
            var go = _restParam(function(args) {
                var that = this;
                var callback = args.pop();
                return eachfn(fns, function (fn, _, cb) {
                    fn.apply(that, args.concat([cb]));
                },
                callback);
            });
            if (args.length) {
                return go.apply(this, args);
            }
            else {
                return go;
            }
        });
    }

    async.applyEach = _applyEach(async.eachOf);
    async.applyEachSeries = _applyEach(async.eachOfSeries);


    async.forever = function (fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureAsync(fn);
        function next(err) {
            if (err) {
                return done(err);
            }
            task(next);
        }
        next();
    };

    function ensureAsync(fn) {
        return _restParam(function (args) {
            var callback = args.pop();
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    async.setImmediate(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
        });
    }

    async.ensureAsync = ensureAsync;

    async.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function (callback) {
            return callback.apply(this, args);
        };
    });

    async.wrapSync =
    async.asyncify = function asyncify(func) {
        return _restParam(function (args) {
            var callback = args.pop();
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (_isObject(result) && typeof result.then === "function") {
                result.then(function(value) {
                    callback(null, value);
                })["catch"](function(err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    };

    // Node.js
    if ('object' === 'object' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof undefined === 'function' && undefined.amd) {
        undefined([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());
});

/**
 * Helper function for extending options objects.
 */
function extend() {
  for (var i=1; i<arguments.length; i++)
    for (var key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

/**
 * Asynchronously traverses the tree breadth first.
 */
function traverseBreadthFirst(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    userdataAccessor: function(node, userdata) { return userdata; },
    onNode: function(node, callback, userdata) { callback(); },
    onComplete: function(rootNode) {},
    userdata: null
  }, options);

  var queue = [];
  queue.push([rootNode, options.userdata]);

  (function next() {
    if (queue.length == 0) {
      options.onComplete(rootNode);
      return;
    }

    var front = queue.shift();
    var node = front[0];
    var data = front[1];

    options.onNode(node, function() {
      var subnodeData = options.userdataAccessor(node, data);
      var subnodes = options.subnodesAccessor(node);
      async.eachSeries(subnodes,
        function(subnode, nextNode) {
          queue.push([subnode, subnodeData]);
          async.setImmediate(nextNode);
        },
        function() {
          async.setImmediate(next);
        }
      );
    },
    data);
  })();
}

/**
 * Synchronously traverses the tree breadth first.
 */
function traverseBreadthFirstSync(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    userdataAccessor: function(node, userdata) { return userdata; },
    onNode: function(node, userdata) {},
    userdata: null
  }, options);

  var queue = [];
  queue.push([rootNode, options.userdata]);

  while (queue.length>0) {
    var front = queue.shift();
    var node = front[0];
    var data = front[1];

    options.onNode(node, data);

    var subnodeData = options.userdataAccessor(node, data);
    var subnodes = options.subnodesAccessor(node);
    for (var i=0; i<subnodes.length; i++) {
      queue.push([subnodes[i], subnodeData]);
    }
  }
  return rootNode;
}


/**
 * Asynchronously traverses the tree depth first.
 */
function traverseDepthFirst(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    userdataAccessor: function(node, userdata) { return userdata; },
    onNode: function(node, callback, userdata) { callback(); },
    onComplete: function(rootNode) {},
    userdata: null
  }, options);

  var stack = [];
  stack.push([rootNode, options.userdata]);

  (function next() {
    if (stack.length == 0) {
      options.onComplete(rootNode);
      return;
    }

    var top = stack.pop();
    var node = top[0];
    var data = top[1];

    options.onNode(node, function() {
      var subnodeData = options.userdataAccessor(node, data);
      var subnodes = options.subnodesAccessor(node);
      async.eachSeries(subnodes,
        function(subnode, nextNode) {
          stack.push([subnode, subnodeData]);
          async.setImmediate(nextNode);
        },
        function() {
          async.setImmediate(next);
        }
      );
    }, data);
  })();
}

/**
 * Synchronously traverses the tree depth first.
 */
function traverseDepthFirstSync(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    userdataAccessor: function(node, userdata) { return userdata; },
    onNode: function(node, userdata) {},
    userdata: null
  }, options);

  var stack = [];
  stack.push([rootNode, options.userdata]);
  while (stack.length>0) {
    var top = stack.pop();
    var node = top[0];
    var data = top[1];

    options.onNode(node, data);

    var subnodeData = options.userdataAccessor(node, data);
    var subnodes = options.subnodesAccessor(node);
    for (var i=0; i<subnodes.length; i++)
      stack.push([subnodes[i], subnodeData]);
  }
  return rootNode;
}


/**
 * Asynchronously traverses the tree recursively.
 */
function traverseRecursive(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    onNode: function(node, callback, userdata) {},
    onComplete: function(rootNode) {},
    userdata: null
  }, options);

  (function visitNode(node, callback) {
    var subnodes = options.subnodesAccessor(node);
    async.eachSeries(subnodes, function(subnode, next) {
      visitNode(subnode, function() {
        async.setImmediate(next);
      });
    },
    function() {
      options.onNode(node, function() {
        async.setImmediate(callback);
      }, options.userdata);
    });
  })(rootNode, function() {
    options.onComplete(rootNode);
  });
}

/**
 * Synchronously traverses the tree recursively.
 */
function traverseRecursiveSync(rootNode, options) {
  options = extend({
    subnodesAccessor: function(node) { return node.subnodes; },
    onNode: function(node, userdata) {},
    userdata: null
  }, options);

  (function visitNode(node) {
    var subnodes = options.subnodesAccessor(node);
    for (var i=0; i<subnodes.length; i++) {
      visitNode(subnodes[i]);
    }
    options.onNode(node, options.userdata);
  })(rootNode);

  return rootNode;
}


var treeTraversal = {
  breadth: traverseBreadthFirst,
  breadthSync: traverseBreadthFirstSync,
  depth: traverseDepthFirst,
  depthSync: traverseDepthFirstSync,
  recursive: traverseRecursive,
  recursiveSync: traverseRecursiveSync
};

function build(node, done) {
	treeTraversal.depth(node, {
		subnodesAccessor: function(node) {
			var list = subnodes(node);
			if (!list)
				return [];
			for (var i=0; i<list.length; i++)
				list[i].parent = node;
			return list;
		},
		onComplete: function(rootNode) {
			done(rootNode);
		}
	});
	return node;
}

function buildSync(node) {
	treeTraversal.depthSync(node, {
		subnodesAccessor: function(node) {
			var list = subnodes(node);
			if (!list)
				return [];
			for (var i=0; i<list.length; i++)
				list[i].parent = node;
			return list;
		}
	});
	return node;
}

var tree = {
	build: build,
	buildSync: buildSync
};

/**
 * Helper function for extending options objects.
 */
function extend$1() {
	for (var i=1; i<arguments.length; i++)
		for (var key in arguments[i])
			if (arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
}

var Whitespace = function(options, token) {
	this.options = {
		tab: '\t',
		space: ' ',
		newline: '\n',
		terminator: ';',
		comma: ',',
	};
	extend$1(this.options, options);

	this.token = token || function() {};
	this.level = 0;
	this.tabcache = [''];
};

Whitespace.prototype.space = function (force) {
	if (force)
		return this.token(' ');
	return this.token(this.options.space);
};

Whitespace.prototype.newline = function (force) {
	if (force)
		return this.token('\n');
	return this.token(this.options.newline);
};

Whitespace.prototype.terminateLine = function () {
	this.token(this.options.terminator);
	this.token(this.options.newline);
};

Whitespace.prototype.terminator = function () {
	return this.token(this.options.terminator);
};

Whitespace.prototype.separator = function () {
	this.token(this.options.comma);
	this.token(this.options.space);
};

Whitespace.prototype.tab = function () {
	if (this.level < this.tabcache.length)
		return this.token(this.tabcache[this.level]);
	var buffer = '';
	for (var i = 0, len = this.level, o = this.options.tab; i < len; ++i) {
		buffer += o;
	}
	return this.token(this.tabcache[this.level] = buffer);
};

Whitespace.prototype.indent = function () {
	return ++this.level;
};

Whitespace.prototype.dedent = function () {
	return --this.level;
};

var whitespace$1 = Whitespace;

var wrap = function(node) {
	var ast = parser.parse(''); // Creates empty root scope
	if (node)
		ast.statements.push(node);
	return tree.buildSync(ast);
};

var output = [];
var whitespace = null;

var string = function(node, options) {
	output.length = 0;
	whitespace = new whitespace$1(options, token);
	generate(node);
	whitespace = null;
	return output.join('');
};

var types = {
	'root': gen_root,
	'type': gen_type,
	'preprocessor': gen_preprocessor,
	'identifier': gen_identifier,
	'operator': gen_operator,
	'parameter': gen_parameter,
	'function_declaration': gen_function,
	'function_call': gen_function_call,
	'struct_definition': gen_struct_definition,
	'scope': gen_scope,
	'declarator': gen_declarator,
	'declarator_item': gen_declarator_item,
	'expression': gen_expression,
	'sequence': gen_sequence,
	'binary': gen_binary,
	'unary': gen_unary,
	'ternary': gen_ternary,
	'postfix': gen_postfix,
	'field_selector': gen_field_selector,
	'precision': gen_precision,
	'accessor': gen_accessor,
	'if_statement': gen_if_statement,
	'for_statement': gen_for_statement,
	'while_statement': gen_while_statement,
	'do_statement': gen_do_statement,
	'continue': gen_continue,
	'break': gen_break,
	'return': gen_return,
	'discard': gen_discard,
	'float': gen_float,
	'int': gen_int,
	'bool': gen_bool,
};

var noTerminator = {
	'root': true,
	'preprocessor': true,
	'function_declaration' : true,
	'if_statement' : true,
	'for_statement' : true,
	'while_statement' : true,
	'scope': true
};

var noParens = {
	'identifier': true,
	'function_call': true,
};

var unaryParens = {
	'unary': true,
	'binary': true,
	'ternary': true
};

var binaryParens = {
	'binary': true,
	'ternary': true
};

function token(s) {
	output.push(s);
}

function last_token() {
	if (output.length == 0)
		return null;
	return output[output.length - 1];
}

function list_parameters(a) {
	for (var i=0; i<a.length; i++) {
		generate(a[i]);
		if (i < a.length-1)
			whitespace.separator();
	}
}

function list_statements(a) {
	for (var i=0; i<a.length; i++) {
		if (a[i].type == 'expression' && !a[i].expression)
			continue;
		if (a[i].type != 'preprocessor')
			whitespace.tab();
		generate(a[i]);
		if (!(a[i].type in noTerminator))
			whitespace.terminateLine();
	}
}

function statement_body(node, forceSpace) {
	if (node.type == 'scope') {
		whitespace.space();
		generate(node);
	}
	else {
		if (forceSpace)
			whitespace.space(true);
		if (node.type == 'expression' && node.expression == null) {
			whitespace.terminator();
		}
		else {
			whitespace.newline();
			whitespace.indent();
			generate(wrap(node));
			whitespace.dedent();
		}
	}
}

function generate(node) {
	if (!node)
		return;
	var fn = types[node.type];
	if (!fn) {
		return console.warn('Warning: Encountered an AST node that has no generator:', node.type);
	}
	return fn(node);
}

function gen_root(node) {
	list_statements(node.statements);
}

function gen_bool(node) {
	token(node.value);
}

function gen_type(node) {
	if (node.qualifier) {
		token(node.qualifier);
		whitespace.space(true);
	}
	if (node.precision) {
		token(node.precision);
		whitespace.space(true);
	}
	token(node.name);
}

function gen_preprocessor(node) {
	if (last_token() != null && last_token() != '\n')
		whitespace.newline(true);

	switch (node.directive) {
		case '#define':
			token(node.directive);
			whitespace.space(true);
			token(node.identifier);
			if (node.parameters && node.parameters.length > 0) {
				token('(');
				list_parameters(node.parameters);
				token(')');
			}
			if (node.token_string && node.token_string.length > 0) {
				whitespace.space(true);
				token(node.token_string);
			}
			whitespace.newline(true);
			break;

		case '#ifdef':
		case '#ifndef':
		case '#if':
		case '#elif':
			token(node.directive);
			whitespace.space(true);
			token(node.value);
			whitespace.newline(true);
			list_statements(node.guarded_statements);
			if ('elseBody' in node)
				generate(node.elseBody);
			else {
				if (last_token() != null && last_token() != '\n')
					whitespace.newline(true);
				token('#endif');
				whitespace.newline(true);
			}
			break;
		case '#else':
			token(node.directive);
			whitespace.newline(true);
			list_statements(node.guarded_statements);
			if (last_token() != null && last_token() != '\n')
				whitespace.newline(true);
			token('#endif');
			whitespace.newline(true);
			break;

		case '#version':
		case '#undef':
		case '#pragma':
		case '#extension':
		case '#line':
		case '#error':
		case '#include':
			token(node.directive);
			whitespace.space(true);
			token(node.value);
			whitespace.newline(true);
			break;
	}
}

function gen_identifier(node) {
	token(node.name);
}

function gen_operator(node) {
	token(node.operator);
}

function gen_declarator(node) {
	generate(node.typeAttribute);
	whitespace.space(true);
	list_parameters(node.declarators);
}

function gen_declarator_item(node) {
	generate(node.name);
	if ('arraySize' in node) {
		token('[');
		generate(node.arraySize);
		token(']');
	}
	if ('initializer' in node) {
		whitespace.space();
		token('=');
		whitespace.space();
		generate(node.initializer);
	}
}

function gen_expression(node) {
	generate(node.expression);
}

function gen_sequence(node) {
	a = node.expressions;
	for (var i=0; i<a.length; i++) {
		generate(a[i]);
		if (i < a.length-1)
			whitespace.separator();
	}
}

function gen_binary(node) {
	switch (node.operator.operator) {
		case '=':
			generate(node.left);
			whitespace.space();
			generate(node.operator);
			whitespace.space();
			generate(node.right);
			break;

		default:
			if (node.left.type in binaryParens) {
				token('(');
				generate(node.left);
				token(')');
			}
			else {
				generate(node.left);
			}

			whitespace.space();
			generate(node.operator);
			whitespace.space();

			if (node.right.type in binaryParens) {
				token('(');
				generate(node.right);
				token(')');
			}
			else {
				generate(node.right);
			}
			break;
	}
}

function gen_unary(node) {
	generate(node.operator);
	if (node.expression.type in unaryParens) {
		token('(');
		generate(node.expression);
		token(')');
	}
	else {
		generate(node.expression);
	}
}


function gen_parameter(node) {
	if (node.typeQualifier) {
		token(node.typeQualifier);
		whitespace.space(true);
	}
	if (node.parameterQualifier) {
		token(node.parameterQualifier);
		whitespace.space(true);
	}
	token(node.type_name);
	whitespace.space(true);
	token(node.name);

	if ('arraySize' in node) {
		token('[');
		generate(node.arraySize);
		token(']');
	}
}

function gen_function(node) {
	generate(node.returnType);
	whitespace.space(true);
	token(node.name);
	token('(');
	list_parameters(node.parameters);
	token(')');
	whitespace.space();
	generate(node.body);
}

function gen_function_call(node) {
	token(node.function_name);
	token('(');
	list_parameters(node.parameters);
	token(')');
}

function gen_struct_definition(node) {
	token('struct');
	whitespace.space(true);
	token(node.name);
	whitespace.space();
	token('{');
	whitespace.newline();
	whitespace.indent();
	list_statements(node.members);
	whitespace.dedent();
	whitespace.tab();
	token('}');
	if ('declarators' in node && node.declarators.length > 0) {
		whitespace.space();
		list_parameters(node.declarators);
	}
}

function gen_scope(node, noNewline) {
	token('{');
	whitespace.newline();
	whitespace.indent();
	list_statements(node.statements);
	whitespace.dedent();
	whitespace.tab();
	token('}');
	if (!noNewline)
		whitespace.newline();
}

function gen_postfix(node) {
	if (node.expression.type in noParens) {
		generate(node.expression);
	}
	else {
		token('(');
		generate(node.expression);
		token(')');
	}

	generate(node.operator);
}

function gen_field_selector(node) {
	token('.');
	token(node.selection);
}

function gen_accessor(node) {
	token('[');
	generate(node.index);
	token(']');
}

function gen_float(node) {
	token(node.value);
}

function gen_int(node) {
	token(node.value);
}

function gen_bool(node) {
	token(node.value);
}

function gen_precision(node) {
	token(node.type);
	whitespace.space(true);
	token(node.precision);
	whitespace.space(true);
	token(node.typeName);
}

function gen_if_statement(node, isElseIf) {
	if (isElseIf) {
		whitespace.tab();
		token('else if');
	}
	else token('if');
	whitespace.space();
	token('(');
	generate(node.condition);
	token(')');
	statement_body(node.body);
	if (node.elseBody) {
		if (node.elseBody.type == 'if_statement') {
			gen_if_statement(node.elseBody, true);
		}
		else {
			whitespace.tab();
			token('else');
			// Only force space after statement if newlines are stripped
			// and we actually have a statement following the 'else'.
			var forceSpace = false;
			if (whitespace.options.newline == '')
				forceSpace = true;
			if (node.elseBody.type == 'expression' && node.elseBody.expression == null)
				forceSpace = false;
			statement_body(node.elseBody, forceSpace);
		}
	}
}

function gen_return(node) {
	token('return');
	whitespace.space(true);
	generate(node.value);
}

function gen_ternary(node) {
	generate(node.condition);
	whitespace.space();
	token('?');
	whitespace.space();
	generate(node.is_true);
	whitespace.space();
	token(':');
	whitespace.space();
	generate(node.is_false);
}

function gen_for_statement(node) {
	token('for');
	whitespace.space();
	token('(');
	generate(node.initializer);
	whitespace.terminator();
	whitespace.space();
	generate(node.condition);
	whitespace.terminator();
	whitespace.space();
	generate(node.increment);
	token(')');
	statement_body(node.body);
}

function gen_while_statement(node) {
	token('while');
	whitespace.space();
	token('(');
	generate(node.condition);
	token(')');
	statement_body(node.body);
}

function gen_do_statement(node) {
	token('do');
	whitespace.space();
	gen_scope(node.body, true);
	whitespace.space();
	token('while');
	whitespace.space();
	token('(');
	generate(node.condition);
	token(')');
}

function gen_continue(node) {
	token('continue');
}

function gen_break(node) {
	token('break');
}

function gen_discard(node) {
	token('discard');
}

var through_1 = createCommonjsModule(function (module, exports) {
// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through;
through.through = through;

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data); };
  end = end || function () { this.queue(null); };

  var ended = false, destroyed = false, buffer = [], _ended = false;
  var stream$$1 = new stream();
  stream$$1.readable = stream$$1.writable = true;
  stream$$1.paused = false;

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream$$1.autoDestroy = !(opts && opts.autoDestroy === false);

  stream$$1.write = function (data) {
    write.call(this, data);
    return !stream$$1.paused
  };

  function drain() {
    while(buffer.length && !stream$$1.paused) {
      var data = buffer.shift();
      if(null === data)
        return stream$$1.emit('end')
      else
        stream$$1.emit('data', data);
    }
  }

  stream$$1.queue = stream$$1.push = function (data) {
//    console.error(ended)
    if(_ended) return stream$$1
    if(data === null) _ended = true;
    buffer.push(data);
    drain();
    return stream$$1
  };

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream$$1.on('end', function () {
    stream$$1.readable = false;
    if(!stream$$1.writable && stream$$1.autoDestroy)
      process.nextTick(function () {
        stream$$1.destroy();
      });
  });

  function _end () {
    stream$$1.writable = false;
    end.call(stream$$1);
    if(!stream$$1.readable && stream$$1.autoDestroy)
      stream$$1.destroy();
  }

  stream$$1.end = function (data) {
    if(ended) return
    ended = true;
    if(arguments.length) stream$$1.write(data);
    _end(); // will emit or queue
    return stream$$1
  };

  stream$$1.destroy = function () {
    if(destroyed) return
    destroyed = true;
    ended = true;
    buffer.length = 0;
    stream$$1.writable = stream$$1.readable = false;
    stream$$1.emit('close');
    return stream$$1
  };

  stream$$1.pause = function () {
    if(stream$$1.paused) return
    stream$$1.paused = true;
    return stream$$1
  };

  stream$$1.resume = function () {
    if(stream$$1.paused) {
      stream$$1.paused = false;
      stream$$1.emit('resume');
    }
    drain();
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream$$1.paused)
      stream$$1.emit('drain');
    return stream$$1
  };
  return stream$$1
}
});

var tokenizer = tokenize;



var PSEUDOSTART = 'pseudo-start';
var ATTR_START = 'attr-start';
var ANY_CHILD = 'any-child';
var ATTR_COMP = 'attr-comp';
var ATTR_END = 'attr-end';
var PSEUDOPSEUDO = '::';
var PSEUDOCLASS = ':';
var READY = '(ready)';
var OPERATION = 'op';
var CLASS = 'class';
var COMMA = 'comma';
var ATTR = 'attr';
var SUBJECT = '!';
var TAG = 'tag';
var STAR = '*';
var ID = 'id';

function tokenize() {
  var escaped = false
    , gathered = []
    , state = READY 
    , data = []
    , idx = 0
    , stream$$1
    , length
    , quote
    , depth
    , lhs
    , rhs
    , cmp
    , c;

  return stream$$1 = through_1(ondata, onend)

  function ondata(chunk) {
    data = data.concat(chunk.split(''));
    length = data.length;

    while(idx < length && (c = data[idx++])) {
      switch(state) {
        case READY: state_ready(); break
        case ANY_CHILD: state_any_child(); break
        case OPERATION: state_op(); break
        case ATTR_START: state_attr_start(); break
        case ATTR_COMP: state_attr_compare(); break
        case ATTR_END: state_attr_end(); break
        case PSEUDOCLASS:
        case PSEUDOPSEUDO: state_pseudo(); break
        case PSEUDOSTART: state_pseudostart(); break
        case ID:
        case TAG:
        case CLASS: state_gather(); break
      }
    }

    data = data.slice(idx);
  }

  function onend(chunk) {
    if(arguments.length) {
      ondata(chunk);
    }

    if(gathered.length) {
      stream$$1.queue(token());
    }
  }

  function state_ready() {
    switch(true) {
      case '#' === c: state = ID; break
      case '.' === c: state = CLASS; break
      case ':' === c: state = PSEUDOCLASS; break
      case '[' === c: state = ATTR_START; break
      case '!' === c: subject(); break
      case '*' === c: star(); break
      case ',' === c: comma(); break
      case /[>\+~]/.test(c): state = OPERATION; break
      case /\s/.test(c): state = ANY_CHILD; break
      case /[\w\d\-_]/.test(c): state = TAG; --idx; break
    }
  }

  function subject() {
    state = SUBJECT;
    gathered = ['!'];
    stream$$1.queue(token());
    state = READY;
  }

  function star() {
    state = STAR;
    gathered = ['*'];
    stream$$1.queue(token());
    state = READY;
  }

  function comma() {
    state = COMMA;
    gathered = [','];
    stream$$1.queue(token());
    state = READY;
  }

  function state_op() {
    if(/[>\+~]/.test(c)) {
      return gathered.push(c)
    }

    // chomp down the following whitespace.
    if(/\s/.test(c)) {
      return
    }

    stream$$1.queue(token());
    state = READY;
    --idx;
  }

  function state_any_child() {
    if(/\s/.test(c)) {
      return
    }

    if(/[>\+~]/.test(c)) {
      return --idx, state = OPERATION
    }

    stream$$1.queue(token());
    state = READY;
    --idx;
  }

  function state_pseudo() {
    rhs = state;
    state_gather(true);

    if(state !== READY) {
      return
    }

    if(c === '(') {
      lhs = gathered.join('');
      state = PSEUDOSTART;
      gathered.length = 0;
      depth = 1;
      ++idx;

      return
    }

    state = PSEUDOCLASS;
    stream$$1.queue(token());
    state = READY;
  }

  function state_pseudostart() {
    if(gathered.length === 0 && !quote) {
      quote = /['"]/.test(c) ? c : null;

      if(quote) {
        return
      }
    }

    if(quote) {
      if(!escaped && c === quote) {
        quote = null;

        return
      }

      if(c === '\\') {
        escaped ? gathered.push(c) : (escaped = true);

        return
      }

      escaped = false;
      gathered.push(c);

      return
    }

    gathered.push(c);

    if(c === '(') {
      ++depth;
    } else if(c === ')') {
      --depth;
    }
    
    if(!depth) {
      gathered.pop();
      stream$$1.queue({
          type: rhs 
        , data: lhs + '(' + gathered.join('') + ')'
      });

      state = READY;
      lhs = rhs = cmp = null;
      gathered.length = 0;
    }

    return 
  }

  function state_attr_start() {
    state_gather(true);

    if(state !== READY) {
      return
    }

    if(c === ']') {
      state = ATTR;
      stream$$1.queue(token());
      state = READY;

      return
    }

    lhs = gathered.join('');
    gathered.length = 0;
    state = ATTR_COMP;
  }

  function state_attr_compare() {
    if(/[=~|$^*]/.test(c)) {
      gathered.push(c);
    }

    if(gathered.length === 2 || c === '=') {
      cmp = gathered.join('');
      gathered.length = 0;
      state = ATTR_END;
      quote = null;

      return
    }
  }

  function state_attr_end() {
    if(!gathered.length && !quote) {
      quote = /['"]/.test(c) ? c : null;

      if(quote) {
        return
      }
    }

    if(quote) {
      if(!escaped && c === quote) {
        quote = null;

        return
      }

      if(c === '\\') {
        if(escaped) {
          gathered.push(c);
        }

        escaped = !escaped;

        return
      }

      escaped = false;
      gathered.push(c);

      return
    }

    state_gather(true);

    if(state !== READY) {
      return
    }

    stream$$1.queue({
        type: ATTR
      , data: {
            lhs: lhs
          , rhs: gathered.join('')
          , cmp: cmp
        }
    });

    state = READY;
    lhs = rhs = cmp = null;
    gathered.length = 0;

    return 
  }

  function state_gather(quietly) {
    if(/[^\d\w\-_]/.test(c) && !escaped) {
      if(c === '\\') {
        escaped = true;
      } else {
        !quietly && stream$$1.queue(token());
        state = READY;
        --idx;
      }

      return
    }

    escaped = false;
    gathered.push(c);
  }

  function token() {
    var data = gathered.join('');

    gathered.length = 0;

    return {
        type: state
      , data: data
    }
  }
}

var cssauron = language;



function language(lookups, matchComparison) {
  return function(selector) {
    return parse$1(selector, remap(lookups),
                 matchComparison || caseSensitiveComparison)
  }
}

function remap(opts) {
  for(var key in opts) if(opt_okay(opts, key)) {
    opts[key] = Function(
        'return function(node, attr) { return node.' + opts[key] + ' }'
    );
    opts[key] = opts[key]();
  }

  return opts
}

function opt_okay(opts, key) {
  return opts.hasOwnProperty(key) && typeof opts[key] === 'string'
}

function parse$1(selector, options, matchComparison) {
  var stream$$1 = tokenizer()
    , default_subj = true
    , selectors = [[]]
    , traversal
    , bits;

  bits = selectors[0];

  traversal = {
      '': any_parents
    , '>': direct_parent
    , '+': direct_sibling
    , '~': any_sibling
  };

  stream$$1
    .on('data', group)
    .end(selector);

  function group(token) {
    var crnt;

    if(token.type === 'comma') {
      selectors.unshift(bits = []);

      return
    }

    if(token.type === 'op' || token.type === 'any-child') {
      bits.unshift(traversal[token.data]);
      bits.unshift(check());

      return
    }

    bits[0] = bits[0] || check();
    crnt = bits[0];

    if(token.type === '!') {
      crnt.subject =
      selectors[0].subject = true;

      return
    }

    crnt.push(
        token.type === 'class' ? listContains(token.type, token.data) :
        token.type === 'attr' ? attr(token) :
        token.type === ':' || token.type === '::' ? pseudo(token) :
        token.type === '*' ? Boolean :
        matches(token.type, token.data, matchComparison)
    );
  }

  return selector_fn

  function selector_fn(node, as_boolean) {
    var current
      , length
      , orig
      , subj
      , set;

    orig = node;
    set = [];

    for(var i = 0, len = selectors.length; i < len; ++i) {
      bits = selectors[i];
      current = entry;
      length = bits.length;
      node = orig;
      subj = [];

      for(var j = 0; j < length; j += 2) {
        node = current(node, bits[j], subj);

        if(!node) {
          break
        }

        current = bits[j + 1];
      }

      if(j >= length) {
        if(as_boolean) {
          return true
        }

        add(!bits.subject ? [orig] : subj);
      }
    }

    if(as_boolean) {
      return false
    }

    return !set.length ? false :
            set.length === 1 ? set[0] :
            set

    function add(items) {
      var next;

      while(items.length) {
        next = items.shift();

        if(set.indexOf(next) === -1) {
          set.push(next);
        }
      }
    }
  }

  function check() {
    _check.bits = [];
    _check.subject = false;
    _check.push = function(token) {
      _check.bits.push(token);
    };

    return _check

    function _check(node, subj) {
      for(var i = 0, len = _check.bits.length; i < len; ++i) {
        if(!_check.bits[i](node)) {
          return false
        }
      }

      if(_check.subject) {
        subj.push(node);
      }

      return true
    }
  }

  function listContains(type, data) {
    return function(node) {
      var val = options[type](node);
      val =
        Array.isArray(val) ? val :
        val ? val.toString().split(/\s+/) :
        [];
      return val.indexOf(data) >= 0
    }
  }

  function attr(token) {
    return token.data.lhs ?
      valid_attr(
          options.attr
        , token.data.lhs
        , token.data.cmp
        , token.data.rhs
      ) :
      valid_attr(options.attr, token.data)
  }

  function matches(type, data, matchComparison) {
    return function(node) {
      return matchComparison(type, options[type](node), data);
    }
  }

  function any_parents(node, next, subj) {
    do {
      node = options.parent(node);
    } while(node && !next(node, subj))

    return node
  }

  function direct_parent(node, next, subj) {
    node = options.parent(node);

    return node && next(node, subj) ? node : null
  }

  function direct_sibling(node, next, subj) {
    var parent = options.parent(node)
      , idx = 0
      , children;

    children = options.children(parent);

    for(var i = 0, len = children.length; i < len; ++i) {
      if(children[i] === node) {
        idx = i;

        break
      }
    }

    return children[idx - 1] && next(children[idx - 1], subj) ?
      children[idx - 1] :
      null
  }

  function any_sibling(node, next, subj) {
    var parent = options.parent(node)
      , children;

    children = options.children(parent);

    for(var i = 0, len = children.length; i < len; ++i) {
      if(children[i] === node) {
        return null
      }

      if(next(children[i], subj)) {
        return children[i]
      }
    }

    return null
  }

  function pseudo(token) {
    return valid_pseudo(options, token.data, matchComparison)
  }

}

function entry(node, next, subj) {
  return next(node, subj) ? node : null
}

function valid_pseudo(options, match, matchComparison) {
  switch(match) {
    case 'empty': return valid_empty(options)
    case 'first-child': return valid_first_child(options)
    case 'last-child': return valid_last_child(options)
    case 'root': return valid_root(options)
  }

  if(match.indexOf('contains') === 0) {
    return valid_contains(options, match.slice(9, -1))
  }

  if(match.indexOf('any') === 0) {
    return valid_any_match(options, match.slice(4, -1), matchComparison)
  }

  if(match.indexOf('not') === 0) {
    return valid_not_match(options, match.slice(4, -1), matchComparison)
  }

  if(match.indexOf('nth-child') === 0) {
    return valid_nth_child(options, match.slice(10, -1))
  }

  return function() {
    return false
  }
}

function valid_not_match(options, selector, matchComparison) {
  var fn = parse$1(selector, options, matchComparison);

  return not_function

  function not_function(node) {
    return !fn(node, true)
  }
}

function valid_any_match(options, selector, matchComparison) {
  var fn = parse$1(selector, options, matchComparison);

  return fn
}

function valid_attr(fn, lhs, cmp, rhs) {
  return function(node) {
    var attr = fn(node, lhs);

    if(!cmp) {
      return !!attr
    }

    if(cmp.length === 1) {
      return attr == rhs
    }

    if(attr === void 0 || attr === null) {
      return false
    }

    return checkattr[cmp.charAt(0)](attr, rhs)
  }
}

function valid_first_child(options) {
  return function(node) {
    return options.children(options.parent(node))[0] === node
  }
}

function valid_last_child(options) {
  return function(node) {
    var children = options.children(options.parent(node));

    return children[children.length - 1] === node
  }
}

function valid_empty(options) {
  return function(node) {
    return options.children(node).length === 0
  }
}

function valid_root(options) {
  return function(node) {
    return !options.parent(node)
  }
}

function valid_contains(options, contents) {
  return function(node) {
    return options.contents(node).indexOf(contents) !== -1
  }
}

function valid_nth_child(options, nth) {
  var test = function(){ return false };
  if (nth == 'odd') {
    nth = '2n+1';
  } else if (nth == 'even') {
    nth = '2n';
  }
  var regexp = /( ?([-|\+])?(\d*)n)? ?((\+|-)? ?(\d+))? ?/;
  var matches = nth.match(regexp);
  if (matches) {
    var growth = 0;
    if (matches[1]) {
      var positiveGrowth = (matches[2] != '-');
      growth = parseInt(matches[3] == '' ? 1 : matches[3]);
      growth = growth * (positiveGrowth ? 1 : -1);
    }
    var offset = 0;
    if (matches[4]) {
      offset = parseInt(matches[6]);
      var positiveOffset = (matches[5] != '-');
      offset = offset * (positiveOffset ? 1 : -1);
    }
    if (growth == 0) {
      if (offset != 0) {
        test = function(children, node) {
          return children[offset - 1] === node
        };
      }
    } else {
      test = function(children, node) {
        var validPositions = [];
        var len = children.length;
        for (var position=1; position <= len; position++) {
          var divisible = ((position - offset) % growth) == 0;
          if (divisible) {
            if (growth > 0) {
              validPositions.push(position);
            } else {
              if ((position - offset) / growth >= 0) {
                validPositions.push(position);
              }
            }
          }
        }
        for(var i=0; i < validPositions.length; i++) {
          if (children[validPositions[i] - 1] === node) {
            return true
          }
        }
        return false
      };
    }
  }
  return function(node) {
    var children = options.children(options.parent(node));

    return test(children, node)
  }
}

var checkattr = {
    '$': check_end
  , '^': check_beg
  , '*': check_any
  , '~': check_spc
  , '|': check_dsh
};

function check_end(l, r) {
  return l.slice(l.length - r.length) === r
}

function check_beg(l, r) {
  return l.slice(0, r.length) === r
}

function check_any(l, r) {
  return l.indexOf(r) > -1
}

function check_spc(l, r) {
  return l.split(/\s+/).indexOf(r) > -1
}

function check_dsh(l, r) {
  return l.split('-').indexOf(r) > -1
}

function caseSensitiveComparison(type, pattern, data) {
  return pattern === data;
}

function attr(node, attr) {
	if (attr in node)
		return node[attr];
	return null;
}

var factory = cssauron({
	tag: 'type',
	id: 'id',
	children: subnodes,
	parent : 'parent',
	attr: attr
});

function all(node, selector, matches) {
	if (!matches)
		matches = [];
	if (selector(node))
		matches.push(node);

	var nodes = subnodes(node);
	if (nodes) {
		for (var i=0; i<nodes.length; i++) {
			all(nodes[i], selector, matches);
		}
	}

	return matches;
}

function first(node, selector) {
	if (selector(node))
		return node;

	var nodes = subnodes(node);
	if (nodes) {
		for (var i=0; i<nodes.length; i++) {
			var selected = first(nodes[i], selector);
			if (selected !== false)
				return selected;
		}
	}
	return false;
}

function children(node, selector, matches) {
	if (!matches)
		matches = [];
	var nodes = subnodes(node);
	if (!nodes)
		return matches;
	for (var i=0; i<nodes.length; i++) {
		var child = nodes[i];
		if (selector(child))
			matches.push(child);
	}
	return matches;
}

function firstChild(node, selector) {
	var nodes = subnodes(node);
	if (!nodes)
		return null;
	for (var i=0; i<nodes.length; i++) {
		var child = nodes[i];
		if (selector(child))
			return child;
	}
	return null;
}

var query = {
	subnodes: subnodes,
	selector: factory,
	all: all,
	first: first,
	children: children,
	firstChild: firstChild
};

function find(node) {
	var parent = node.parent;
	var index = parent.statements.indexOf(node);
	if (index < 0) {
		throw new Error('node not found on parent statements');
	}
	return {
		index: index,
		statements: parent.statements
	};
}


function remove(node) {
	var findRes = find(node);
	findRes.statements.splice(findRes.index, 1);
}


function replace(node, newNode) {
	var findRes = find(node);
	var spliceIndex = findRes.index;
	var spliceLength = 1;
	if (Array.isArray(newNode)) {
		var args = [spliceIndex, spliceLength].concat(newNode);
		findRes.statements.splice.apply(findRes.statements, args);
	} else {
		findRes.statements.splice(spliceIndex, spliceLength, newNode);
	}
}


function add(node, newNode, after) {
	var findRes = find(node);
	var spliceIndex = findRes.index;
	if (after) {
		spliceIndex++;
	}
	var spliceLength = 0;
	if (Array.isArray(newNode)) {
		var args = [spliceIndex, spliceLength].concat(newNode);
		findRes.statements.splice.apply(findRes.statements, args);
	} else {
		findRes.statements.splice(spliceIndex, spliceLength, newNode);
	}
}


function addBefore(node, newNode) {
	return add(node, newNode, false);
}


function addAfter(node, newNode) {
	return add(node, newNode, true);
}


var mod = {
	find: find,
	remove: remove,
	add: add,
	addAfter: addAfter,
	addBefore: addBefore,
	replace: replace
};

function parse(source) {
	var ast = parser.parse(source);
	tree.buildSync(ast);
	return ast;
}

var glslMan = {
	parse: parse,
	string: string,
	query: query,
	mod: mod,
	wrap: wrap
};

/**
 * birgde to attach shader
 * reference:
 * https://github.com/KhronosGroup/glslang/blob/04f4566f285beb1e3619eb40baa7629eb5eb3946/glslang/MachineIndependent/Initialize.cpp
 * https://www.cnblogs.com/bitzhuwei/p/LALR1-library-and-a-GLSL-parser-in-csharp.html
 * https://github.com/aras-p/glsl-optimizer
 * 
 * @author yellow
 */

/**
 * use glsl-man to parse .glsl file
 */

/**
 * the prefix of Shader type
 */
var prefix$2 = 'SHADER';
/**
 * convert DOMString to value
 */
var GLSL_TYPE_ENUM = {
  'float': 0x1406,
  'vec2': 0x8b50,
  'vec3': 0x8b51,
  'vec4': 0x8b52,
  'mat2': 0x8b5a,
  'mat3': 0x8b5b,
  'mat4': 0x8b5c,
  'sampler2D': 0x8b5e,
  'sampler_external_oes': 0x8d66,
  'sampler_cube': '0x8b60',
  'int': 0x1404,
  'bool': 0x8b56
  /**
   * @class
   */
};
var GLShader = function (_Dispose) {
  inherits(GLShader, _Dispose);

  /**
   * 
   * @param {GLenum} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
   * @param {GLContext} glContext 
   */
  function GLShader(type, glContext) {
    classCallCheck(this, GLShader);

    /**
     * @type {GLenum}
     */
    var _this = possibleConstructorReturn(this, (GLShader.__proto__ || Object.getPrototypeOf(GLShader)).call(this, prefix$2));

    _this._type = type;
    /**
     * @type {GLContext}
     */
    _this._glContext = glContext;
    /**
     * @type {String} shaderSource 
     */
    _this._source = null;
    /**
     * @type {boolean}
     */
    _this._isDelete = false;
    /**
     * @type {boolean}
     */
    _this._isComplied = false;
    return _this;
  }
  /**
   * @returns {GLenum}
   */


  createClass(GLShader, [{
    key: 'getParameters',

    /**
     * bridge to shader
     * @param {GLenum} pname 
     */
    value: function getParameters(pname) {
      if (pname === GLConstants_1.DELETE_STATUS) return this._isDelete;else if (pname === GLConstants_1.COMPILE_STATUS) return this._isComplied;else if (pname === GLConstants_1.SHADER_TYPE) return this._type;
    }
    /**
     * reference:
     * https://github.com/WebKit/webkit/blob/4c0ce4f62b30a6d39140ac9841c416dee3bd07e0/Source/ThirdParty/ANGLE/util/shader_utils.cpp
     * https://github.com/SDL-mirror/SDL/blob/865821287c68ff8039544a35e86eb56289bd162d/src/render/opengl/SDL_shaders_gl.c
     * 
     * }{yellow 寻找power vr sdk下 opengl es的实现
     * use regex pattern to analy active attri/uniforms
     */

  }, {
    key: 'complie',
    value: function complie() {
      var source = this._source;

      var _parseShaderStrings2 = this._parseShaderStrings(source),
          _parseShaderStrings3 = slicedToArray(_parseShaderStrings2, 2),
          uniforms = _parseShaderStrings3[0],
          attributes = _parseShaderStrings3[1];

      this._uniforms = uniforms;
      this._attributes = attributes;
    }
    /**
     * @returns {Array}
     */

  }, {
    key: '_parseShaderStrings',

    /**
     * reference:
     * https://github.com/KhronosGroup/glslang/blob/eb2c0c72bf4c2f7a972883003b5f5fca3f8c94bd/glslang/MachineIndependent/ParseHelper.cpp#L186
     */
    value: function _parseShaderStrings(str) {
      var ast = glslMan.parse(str);
      var uniforms = glslMan.query.all(ast, glslMan.query.selector('declarator[typeAttribute] > type[qualifier=uniform]'));
      var attributes = glslMan.query.all(ast, glslMan.query.selector('declarator[typeAttribute] > type[qualifier=attribute]'));
      return [this._convert(uniforms), this._convert(attributes)];
    }
    /**
     * @param {Array} nodes
     * @param {Array} attributeNodes
     */

  }, {
    key: '_convert',
    value: function _convert(nodes) {
      var collection = [];
      //deal with no struct type only 
      nodes.forEach(function (element) {
        collection.push({
          name: element.parent.declarators[0].name.name,
          type: GLSL_TYPE_ENUM[element.name]
        });
      });
      return collection;
    }
  }, {
    key: 'type',
    get: function get$$1() {
      return this._type;
    }
    /**
     * @type {String}
     */

  }, {
    key: 'source',
    set: function set$$1(v) {
      this._source = v;
    }
    /**
     * @returns {String}
     */
    ,
    get: function get$$1() {
      return this._source;
    }
  }, {
    key: 'uniforms',
    get: function get$$1() {
      return this._uniforms;
    }
    /**
     * @returns {Array}
     */

  }, {
    key: 'attributes',
    get: function get$$1() {
      return this._attributes;
    }
  }]);
  return GLShader;
}(Dispose_1);

var GLShader_1 = GLShader;

var prefix$3 = 'BUFFER';

/**
 * @class
 */

var GLBuffer = function (_Dispose) {
  inherits(GLBuffer, _Dispose);

  /**
   * 
   * @param {GLContext} glContext 
   */
  function GLBuffer(glContext) {
    classCallCheck(this, GLBuffer);

    /**
     * @type {GLContext}
     */
    var _this = possibleConstructorReturn(this, (GLBuffer.__proto__ || Object.getPrototypeOf(GLBuffer)).call(this, prefix$3));

    _this._glContext = glContext;
    return _this;
  }

  return GLBuffer;
}(Dispose_1);

var GLBuffer_1 = GLBuffer;

/**
 * birgde to attach texture
 */

/**
 * the prefix of Texture type
 */
var prefix$4 = 'TEXTURE';

var GLTexture = function (_Dispose) {
  inherits(GLTexture, _Dispose);

  /**
   * @param {GLContext} glContext 
   */
  function GLTexture(glContext) {
    classCallCheck(this, GLTexture);

    /**
     * @type {GLContext}
     */
    var _this = possibleConstructorReturn(this, (GLTexture.__proto__ || Object.getPrototypeOf(GLTexture)).call(this, prefix$4));

    _this._glContext = glContext;
    return _this;
  }

  return GLTexture;
}(Dispose_1);

var GLTexture_1 = GLTexture;

/**
 * @author yellow
 */

var prefixProgram = 'PROGRAM';
var prefixAttribute = 'ATTRIBUTE';
var prefixUniform = 'UNIFOMR';
/**
 * @class
 */

var GLProgram = function (_Dispose) {
  inherits(GLProgram, _Dispose);

  /**
   * 
   * @param {GLContext} glContext 
   */
  function GLProgram(glContext) {
    classCallCheck(this, GLProgram);

    /**
     * 索引glContext对象
     */
    var _this = possibleConstructorReturn(this, (GLProgram.__proto__ || Object.getPrototypeOf(GLProgram)).call(this, prefixProgram));

    _this._glContext = glContext;
    /**
     * 映射attribute 和返回值
     */
    _this._attributes = {};
    /**
     * 映射uniforms
     */
    _this._uniforms = {};
    /**
     * @type {GLShader}
     */
    _this._vs = null;
    /**
     * @type {GLShader}
     */
    _this._fs = null;
    return _this;
  }
  /**
   * @returns {Number}
   */


  createClass(GLProgram, [{
    key: 'attachShader',

    /**
     * attach shader
     * @param {GLShader} shader 
     */
    value: function attachShader(shader) {
      if (shader.type === GLConstants_1.FRAGMENT_SHADER) this._fs = shader;else if (shader.type === GLConstants_1.VERTEX_SHADER) this._vs = shader;
    }
    /**
     * initial shader and analysis uniform/attribute
     */

  }, {
    key: 'link',
    value: function link() {
      this._vs.complie();
      this._fs.complie();
      this._uniformsInfo = [].concat(this._vs.uniforms).concat(this._fs.uniforms);
      this._attributesInfo = [].concat(this._vs.attributes).concat(this._fs.attributes);
    }
    /**
     * 
     * @param {GLenum} pname 
     */

  }, {
    key: 'getAttribLocation',
    value: function getAttribLocation(pname) {
      this._attributes[pname] = this._attributes[pname] || stamp_1({}, prefixAttribute);
      return this._attributes[pname];
    }
    /**
     * 
     * @param {DOMString} pname 
     */

  }, {
    key: 'getUnifromLocation',
    value: function getUnifromLocation(pname) {
      if (this._uniforms[pname]) return this._uniforms[pname];
      var uniformLocation = {};
      stamp_1(uniformLocation, prefixUniform);
      this._uniforms[pname] = this._uniforms[pname] || uniformLocation;
      return this._uniforms[pname];
    }
  }, {
    key: 'attachNum',
    get: function get$$1() {
      var num = 0;
      if (this._vs) num++;
      if (this._fs) num++;
      return num;
    }
    /**
     * @returns {Array}
     */

  }, {
    key: 'uniforms',
    get: function get$$1() {
      return this._uniformsInfo;
    }
    /**
     * @returns {Array}
     */

  }, {
    key: 'attributes',
    get: function get$$1() {
      return this._attributesInfo;
    }
  }]);
  return GLProgram;
}(Dispose_1);

var GLProgram_1 = GLProgram;

/**
 * 执行器，用于执行Record操作，全局自带一个Actuator
 * @author yellow date 2018/1/3
 */

/**
 * Cahce store
 */
var CHACHE = {
    /**
     * use id to store program
     */
    PROGRAM: {},
    /**
    * use id to store shader
    */
    SHADER: {},
    /**
    * use id to store texture
    */
    TEXTURE: {},
    /**
     * use id to store attribute location
     */
    ATTRIBUTE: {},
    /**
     * use id to store BUFFER
     */
    BUFFER: {}
    /**
     * @class
     */
};
var Actuator = function () {
    function Actuator() {
        classCallCheck(this, Actuator);

        /**
         * @type {Array}
         */
        this._records = [];
        /**
         * @type {WebGLRenderingContext}
         */
        this._gl = null;
    }
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */


    createClass(Actuator, [{
        key: 'setGl',
        value: function setGl(v) {
            this._gl = v;
            this.play();
        }
        /**
         * 执行
         * @param {Array} records 
         */

    }, {
        key: 'play',
        value: function play() {
            var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this._records = this._records.concat(records);
            var gl = this._gl;
            if (gl) {
                var record = this._records.shift();
                while (record) {
                    var opName = record.opName,
                        encrypt = Encrypt[opName] || {};
                    //replace the reference object
                    if (encrypt.replace > 0) {
                        var refObjects = {};
                        for (var key in record.ptMapIndex) {
                            var target = record.ptMapIndex[key],
                                ptIndex = target.index,
                                ptName = target.id,
                                cacheName = target.prefix,
                                refObject = CHACHE[cacheName][ptName];
                            refObjects[ptIndex] = refObject;
                        }
                        record.replace(refObjects);
                    }
                    //if need to return and cache
                    if (encrypt.return) {
                        var returnId = record.returnId,
                            returanIdPrefix = record.returanIdPrefix;
                        CHACHE[returanIdPrefix][returnId] = gl[opName].apply(gl, record.args);
                    } else {
                        gl[opName].apply(gl, record.args);
                    }
                    //next record
                    record = this._records.shift();
                }
            }
        }
    }]);
    return Actuator;
}();
/**
 * instance of Actuator
 */


var actuator = new Actuator();

var Actuator_1 = actuator;

/**
 * @author yellow
 */

/**
 * bridge object
 */

/**
 * singleton
 */

/**
 * the prefix of GLContext
 */
var prefix$1 = "WEBGLRENDERGINGCONTEXT";
/**
 * @class
 */

var GLContext = function (_Dispose) {
    inherits(GLContext, _Dispose);

    /**
     * 
     * @param {String} id parentId,just as the glCanvas'id
     * @param {String} renderType support 'webgl' or 'webgl2'
     * @param {Object} [options] 
     */
    function GLContext(id, renderType) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, GLContext);

        /**
         * @type {String}
         */
        var _this = possibleConstructorReturn(this, (GLContext.__proto__ || Object.getPrototypeOf(GLContext)).call(this, prefix$1));

        _this._renderType = renderType;
        /**
         * @type {Object}
         */
        _this._options = options;
        /**
         * @type {Recorder}
         */
        _this._recorder = new Recorder_1(_this);
        /**
         * @type {GLLimits}
         */
        _this._glLimits = new GLLimits_1(_this);
        /**
         * @type {GLExtension}
         */
        _this._glExtension = new GLExtension_1(_this);
        /**
         * real WebGLRenderingContext
         * @type {WebGLRenderingContext}
         */
        _this._gl = null;
        /**
         * map funciont
         */
        _this._map();
        return _this;
    }
    /**
     * map function and constants to Class
     */


    createClass(GLContext, [{
        key: '_map',
        value: function _map() {
            var _this2 = this;

            var recorder = this._recorder;
            //1.map constants
            for (var key in GLConstants_1) {
                if (!this.hasOwnProperty(key)) {
                    var target = GLConstants_1[key];
                    if (!this[key]) this[key] = target;
                }
            }
            //2.map void function(include replace and no replace)

            var _loop = function _loop(_key) {
                if (!_this2.hasOwnProperty(_key)) {
                    var _target = Encrypt[_key];
                    //2.1 void and no replace
                    if (!_target.return && _target.replace === 0) {
                        if (!_this2[_key] && !!_target) {
                            _this2[_key] = function () {
                                for (var _len = arguments.length, rest = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                                    rest[_key2] = arguments[_key2];
                                }

                                var record = new (Function.prototype.bind.apply(Record_1, [null].concat([_key], rest)))();
                                recorder.increase(record);
                            };
                        }
                    }
                    //2.2 void and replace 
                    else if (!_target.return && _target.replace > 0) {
                            if (!_this2[_key] && !!_target) {
                                _this2[_key] = function () {
                                    for (var _len2 = arguments.length, rest = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
                                        rest[_key3] = arguments[_key3];
                                    }

                                    var record = new (Function.prototype.bind.apply(Record_1, [null].concat([_key], rest)))(),
                                        index = _target.ptIndex;
                                    record.exactIndexByObject(index);
                                    recorder.increase(record);
                                };
                            }
                        }
                    //2.3 return(make birdge to origin,should not to be implemented)
                }
            };

            for (var _key in Encrypt) {
                _loop(_key);
            }
        }
        /*
         * private ,only used in GLCanvas.link[Cnavas/GL] funcitons
         * @param {WebGLRenderingContext} gl 
         */

    }, {
        key: '_setgl',
        value: function _setgl(gl) {
            this._gl = gl;
            this._glLimits._include();
            this._glExtension._include();
            //替换绘制实体
            Actuator_1.setGl(gl);
        }
        /**
         * @returns {String} 'webgl' or 'webgl2'
         */

    }, {
        key: 'createShader',

        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
         * @param {String} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER 
         */
        value: function createShader(type) {
            var glShader = new GLShader_1(type, this),
                record = new Record_1('createShader', type);
            //createShader 操作必需返回值
            record.setReturnId(glShader.id);
            this._recorder.increase(record);
            return glShader;
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource
         * @param {GLShader} shader 
         * @param {String} source 
         */

    }, {
        key: 'shaderSource',
        value: function shaderSource(shader, source) {
            shader.source = source;
            var returnId = shader.id,
                record = new Record_1('shaderSource', shader, source);
            record.exactIndexByValue(0, returnId);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compileShader
         * @param {GLShader} shader 
         */

    }, {
        key: 'compileShader',
        value: function compileShader(shader) {
            var returnId = shader.id,
                record = new Record_1('compileShader', shader);
            record.exactIndexByValue(0, returnId);
            shader._isComplied = true;
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
         * 创建program对象
         */

    }, {
        key: 'createProgram',
        value: function createProgram() {
            var glProgram = new GLProgram_1(this),
                record = new Record_1('createProgram');
            record.setReturnId(glProgram.id);
            this._recorder.increase(record);
            return glProgram;
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
         */

    }, {
        key: 'createBuffer',
        value: function createBuffer() {
            var glBuffer = new GLBuffer_1(),
                record = new Record_1('createBuffer');
            record.setReturnId(glBuffer.id);
            this._recorder.increase(record);
            return glBuffer;
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
         */

    }, {
        key: 'createTexture',
        value: function createTexture() {
            var glTexture = new GLTexture_1(this),
                record = new Record_1('createTexture');
            record.setReturnId(glTexture.id);
            this._recorder.increase(record);
            return glTexture;
        }
        /**
         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/attachShader
         * @param {GLProgram} program 
         * @param {GLShader} shader 
         */

    }, {
        key: 'attachShader',
        value: function attachShader(program, shader) {
            var record = new Record_1('attachShader', program, shader);
            record.exactIndexByValue(0, program.id);
            record.exactIndexByValue(1, shader.id);
            this._recorder.increase(record);
            //
            program.attachShader(shader);
        }
        /**
         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/linkProgram
         * @param {GLProgram} program 
         */

    }, {
        key: 'linkProgram',
        value: function linkProgram(program) {
            var record = new Record_1('linkProgram', program);
            record.exactIndexByValue(0, program.id);
            this._recorder.increase(record);
            program.link();
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
         * @param {GLProgram} program 
         * @param {String} name 
         */

    }, {
        key: 'getAttribLocation',
        value: function getAttribLocation(program, name) {
            var returnId = program.getAttribLocation(name),
                record = new Record_1('getAttribLocation', program, name);
            record.exactIndexByValue(0, program.id);
            record.setReturnId(returnId);
            this._recorder.increase(record);
            return returnId;
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getUniformLocation
         * @param {GLProgram} program 
         * @param {DOMString} name 
         */

    }, {
        key: 'getUniformLocation',
        value: function getUniformLocation(program, name) {
            var returnId = program.getUnifromLocation(name),
                record = new Record_1('getUniformLocation', program, name);
            record.exactIndexByValue(0, program.id);
            record.setReturnId(returnId);
            this._recorder.increase(record);
            return returnId;
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderParameter
         * @param {GLShader} shader 
         * @param {GLenum} pname 
         */

    }, {
        key: 'getShaderParameter',
        value: function getShaderParameter(shader, pname) {
            return shader.getParameters(pname);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog
         * @param {GLShader} shader 
         */

    }, {
        key: 'getShaderInfoLog',
        value: function getShaderInfoLog(shader) {
            return '';
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramInfoLog
         * @param {GLProgram} program 
         */

    }, {
        key: 'getProgramInfoLog',
        value: function getProgramInfoLog(program) {
            return '';
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveAttrib
         * @param {GLProgram} program 
         * @param {GLuint} index 
         */

    }, {
        key: 'getActiveAttrib',
        value: function getActiveAttrib(program, index) {
            return program.attributes[index];
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveUniform
         * @param {GLProgram} program 
         * @param {GLuint} index 
         */

    }, {
        key: 'getActiveUniform',
        value: function getActiveUniform(program, index) {
            return program.uniforms[index];
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramParameter
         * @type {GLProgram} program
         * @type {GLenum} pname
         */

    }, {
        key: 'getProgramParameter',
        value: function getProgramParameter(program, pname) {
            if (pname === GLConstants_1.ACTIVE_UNIFORMS) {
                return program.uniforms.length;
            } else if (pname === GLConstants_1.ACTIVE_ATTRIBUTES) {
                return program.attributes.length;
            } else if (pname === GLConstants_1.ATTACHED_SHADERS) {
                return program.attachNum;
            } else if (pname === GLConstants_1.LINK_STATUS) {
                return true;
            } else if (pname === GLConstants_1.DELETE_STATUS) {
                return true;
            }
        }
        /**
         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindBuffer
         * @param {GLenum} target  gl.ARRAY_BUFFER | gl.ELEMENT_ARRAY_BUFFER |等
         * @param {GLBuffer} buffer 
         */

    }, {
        key: 'bindBuffer',
        value: function bindBuffer(target, buffer) {
            var record = new Record_1('bindBuffer', target, buffer);
            record.exactIndexByValue(1, buffer.id);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
         */

    }, {
        key: 'bufferData',
        value: function bufferData(target, srcData, usage) {
            var record = new Record_1('bufferData', target, srcData, usage);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
         * @param {*} x 
         * @param {*} y 
         * @param {*} width 
         * @param {*} height 
         */

    }, {
        key: 'viewport',
        value: function viewport(x, y, width, height) {
            var record = new Record_1('viewport', x, y, width, height);
            this._recorder.increase(record);
        }
        /**
         * 
         * @param {GLProgram} program 
         */

    }, {
        key: 'useProgram',
        value: function useProgram(program) {
            var record = new Record_1('useProgram', program);
            record.exactIndexByValue(0, program.id);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray
         * @param {GLuint} index 
         */

    }, {
        key: 'enableVertexAttribArray',
        value: function enableVertexAttribArray(index) {
            var record = new Record_1('enableVertexAttribArray', index);
            record.exactIndexByValue(0, index);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
         */

    }, {
        key: 'vertexAttribPointer',
        value: function vertexAttribPointer(index, size, type, normalized, stride, offset) {
            var record = new Record_1('vertexAttribPointer', index, size, type, normalized, stride, offset);
            record.exactIndexByValue(0, index);
            this._recorder.increase(record);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getExtension
         * @param {String} name 
         */

    }, {
        key: 'getExtension',
        value: function getExtension(name) {
            var glExtension = this._glExtension;
            return glExtension[name];
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
         * @param {String} pname 
         */

    }, {
        key: 'getParameter',
        value: function getParameter(pname) {
            //parameter search from limits
            var glLimits = this._glLimits;
            return glLimits[pname];
        }
        /**
         * 特别的方法
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
         * @param {*} mode 
         * @param {*} first 
         * @param {*} count 
         */

    }, {
        key: 'drawArrays',
        value: function drawArrays(mode, first, count) {
            var record = new Record_1('drawArrays', mode, first, count);
            this._recorder.increase(record);
            Actuator_1.play(this._recorder.toInstruction());
        }
        /**
         * 特别的方法
         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
         * @param {*} mode 
         * @param {*} count 
         * @param {*} type 
         * @param {*} offset 
         */

    }, {
        key: 'drawElements',
        value: function drawElements(mode, count, type, offset) {
            var record = new Record_1('drawElements', mode, count, type, offset);
            this._recorder.increase(record);
            Actuator_1.play(this._recorder.toInstruction());
        }
    }, {
        key: 'renderType',
        get: function get$$1() {
            return this._renderType;
        }
        /**
         * 
         * @returns {WebGLRenderingContext}
         */

    }, {
        key: 'gl',
        get: function get$$1() {
            return this._gl;
        }
    }]);
    return GLContext;
}(Dispose_1);

var GLContext_1 = GLContext;

/**
 * 虚拟htmlCanvas对象，用于记录webgl在htmlCanvas时的过程
 * @author yellow date 2018/1/1
 */

/**
 * 
 */

/**
 * store glContext cache
 */
var CACHE_GLCONTEXT = {};
/**
 * store WebGLRenderingContext
 */
var CACHE_GL = {};
/**
 * the prefix of GLCanvas
 */
var prefix = 'CANVASELEMENT';
/**
 * @class
 */

var GLCanvas = function (_Dispose) {
  inherits(GLCanvas, _Dispose);

  /**
   * 
   * @param {String} id the real htmlCanvasElement id 
   * @param {Object} options 
   */
  function GLCanvas(id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, GLCanvas);

    /**
     * @type {String}
     */
    var _this = possibleConstructorReturn(this, (GLCanvas.__proto__ || Object.getPrototypeOf(GLCanvas)).call(this, prefix));

    _this._canvasId = id;
    /**
     * @type {Object}
     */
    _this._options = merge_1({}, options);
    /**
     * 
     */
    _this._glType = 'webgl';
    /**
     * store the 'getContext' options
     * @type {Object}
     */
    _this._contextOptions = {};
    /**
     * real html canvas element
     * @type {HtmlCanvasElement}
     */
    _this._canvas = null;
    /**
     * @type {Object}
     */
    _this._style = {};
    return _this;
  }
  /**
   * get context attributes
   * include webgl2 attributes
   * reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {Object} [options] 
   */


  createClass(GLCanvas, [{
    key: '_getContextAttributes',
    value: function _getContextAttributes() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        alpha: options.alpha || false,
        depth: options.depth || true,
        stencil: options.stencil || true,
        antialias: options.antialias || false,
        premultipliedAlpha: options.premultipliedAlpha || true,
        preserveDrawingBuffer: options.preserveDrawingBuffer || false,
        failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat || false
      };
    }
    /**
     * @type {Object}
     */

  }, {
    key: 'getContext',

    /**
     * 
     * @param {*} renderType 
     * @param {*} options 
     * @returns {GLContext}
     */
    value: function getContext() {
      var renderType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'webgl';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var canvasId = this._canvasId,
          id = this.id;
      this._glType = this._glType || renderType;
      this._contextOptions = this._contextOptions || this._getContextAttributes(options);
      if (!CACHE_GLCONTEXT[canvasId]) {
        CACHE_GLCONTEXT[canvasId] = new GLContext_1(id, this._glType, this._contextOptions);
      }
      return CACHE_GLCONTEXT[canvasId];
    }
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
     * @param {*} type 
     * @param {*} listener 
     * @param {*} options 
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, listener, options) {}
    /**
     * link virtual rendering context to real htmlCanvas
     * @param {HtmlCanvasElement} canvas 
     */

  }, {
    key: 'linkToCanvas',
    value: function linkToCanvas(canvas) {
      var id = stamp_1(canvas);
      this._canvas = canvas;
      this._canvasId = id;
      //1. set style
      this._canvas.style.width = this.style.width || this._canvas.style.width;
      this._canvas.style.height = this.style.height || this._canvas.style.width;
      //2. set gl
      CACHE_GL[id] = CACHE_GL[id] || canvas.getContext(this._glType, this._contextOptions) || canvas.getContext('experimental-' + this._glType, this._contextOptions);
      var glContext = this.getContext('webgl');
      glContext._setgl(CACHE_GL[id]);
    }
    /**
     * link virtual rendering context to real htmlCanvas
     * @param {WebGLRenderingContext} gl 
     */

  }, {
    key: 'linkToWebGLRenderingContext',
    value: function linkToWebGLRenderingContext(gl) {
      if (this._canvas) throw new Error('exist htmlcanvaselement');
      var glContext = this.getContext('webgl');
      glContext._setgl(gl);
    }
  }, {
    key: 'style',
    get: function get$$1() {
      return this._style;
    }
  }]);
  return GLCanvas;
}(Dispose_1);

var GLCanvas_1 = GLCanvas;

var init = {
    gl: {
        GLCanvas: GLCanvas_1,
        GLContext: GLContext_1
    }
};

var init_1 = init.gl;

exports['default'] = init;
exports.gl = init_1;

return exports;

}({},stream));
