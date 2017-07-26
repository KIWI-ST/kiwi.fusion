var kiwi = (function (exports) {
'use strict';

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



var babelHelpers$1 = Object.freeze({
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

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (_dereq_, module, exports) {
    (function (global) {
      "use strict";

      _dereq_(295);

      _dereq_(296);

      _dereq_(2);

      if (global._babelPolyfill) {
        throw new Error("only one instance of babel-polyfill is allowed");
      }
      global._babelPolyfill = true;

      var DEFINE_PROPERTY = "defineProperty";
      function define(O, key, value) {
        O[key] || Object[DEFINE_PROPERTY](O, key, {
          writable: true,
          configurable: true,
          value: value
        });
      }

      define(String.prototype, "padLeft", "".padStart);
      define(String.prototype, "padRight", "".padEnd);

      "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
        [][key] && define(Array, key, Function.call.bind([][key]));
      });
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "2": 2, "295": 295, "296": 296 }], 2: [function (_dereq_, module, exports) {
    _dereq_(119);
    module.exports = _dereq_(23).RegExp.escape;
  }, { "119": 119, "23": 23 }], 3: [function (_dereq_, module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
  }, {}], 4: [function (_dereq_, module, exports) {
    var cof = _dereq_(18);
    module.exports = function (it, msg) {
      if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
      return +it;
    };
  }, { "18": 18 }], 5: [function (_dereq_, module, exports) {
    // 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = _dereq_(117)('unscopables'),
        ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) _dereq_(40)(ArrayProto, UNSCOPABLES, {});
    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
  }, { "117": 117, "40": 40 }], 6: [function (_dereq_, module, exports) {
    module.exports = function (it, Constructor, name, forbiddenField) {
      if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
        throw TypeError(name + ': incorrect invocation!');
      }return it;
    };
  }, {}], 7: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49);
    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
  }, { "49": 49 }], 8: [function (_dereq_, module, exports) {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    'use strict';

    var toObject = _dereq_(109),
        toIndex = _dereq_(105),
        toLength = _dereq_(108);

    module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
      var O = toObject(this),
          len = toLength(O.length),
          to = toIndex(target, len),
          from = toIndex(start, len),
          end = arguments.length > 2 ? arguments[2] : undefined,
          count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
          inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count-- > 0) {
        if (from in O) O[to] = O[from];else delete O[to];
        to += inc;
        from += inc;
      }return O;
    };
  }, { "105": 105, "108": 108, "109": 109 }], 9: [function (_dereq_, module, exports) {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    'use strict';

    var toObject = _dereq_(109),
        toIndex = _dereq_(105),
        toLength = _dereq_(108);
    module.exports = function fill(value /*, start = 0, end = @length */) {
      var O = toObject(this),
          length = toLength(O.length),
          aLen = arguments.length,
          index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
          end = aLen > 2 ? arguments[2] : undefined,
          endPos = end === undefined ? length : toIndex(end, length);
      while (endPos > index) {
        O[index++] = value;
      }return O;
    };
  }, { "105": 105, "108": 108, "109": 109 }], 10: [function (_dereq_, module, exports) {
    var forOf = _dereq_(37);

    module.exports = function (iter, ITERATOR) {
      var result = [];
      forOf(iter, false, result.push, result, ITERATOR);
      return result;
    };
  }, { "37": 37 }], 11: [function (_dereq_, module, exports) {
    // false -> Array#indexOf
    // true  -> Array#includes
    var toIObject = _dereq_(107),
        toLength = _dereq_(108),
        toIndex = _dereq_(105);
    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this),
            length = toLength(O.length),
            index = toIndex(fromIndex, length),
            value;
        // Array#includes uses SameValueZero equality algorithm
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          if (value != value) return true;
          // Array#toIndex ignores holes, Array#includes - not
        } else for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }return !IS_INCLUDES && -1;
      };
    };
  }, { "105": 105, "107": 107, "108": 108 }], 12: [function (_dereq_, module, exports) {
    // 0 -> Array#forEach
    // 1 -> Array#map
    // 2 -> Array#filter
    // 3 -> Array#some
    // 4 -> Array#every
    // 5 -> Array#find
    // 6 -> Array#findIndex
    var ctx = _dereq_(25),
        IObject = _dereq_(45),
        toObject = _dereq_(109),
        toLength = _dereq_(108),
        asc = _dereq_(15);
    module.exports = function (TYPE, $create) {
      var IS_MAP = TYPE == 1,
          IS_FILTER = TYPE == 2,
          IS_SOME = TYPE == 3,
          IS_EVERY = TYPE == 4,
          IS_FIND_INDEX = TYPE == 6,
          NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
          create = $create || asc;
      return function ($this, callbackfn, that) {
        var O = toObject($this),
            self = IObject(O),
            f = ctx(callbackfn, that, 3),
            length = toLength(self.length),
            index = 0,
            result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
            val,
            res;
        for (; length > index; index++) {
          if (NO_HOLES || index in self) {
            val = self[index];
            res = f(val, index, O);
            if (TYPE) {
              if (IS_MAP) result[index] = res; // map
              else if (res) switch (TYPE) {
                  case 3:
                    return true; // some
                  case 5:
                    return val; // find
                  case 6:
                    return index; // findIndex
                  case 2:
                    result.push(val); // filter
                } else if (IS_EVERY) return false; // every
            }
          }
        }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };
  }, { "108": 108, "109": 109, "15": 15, "25": 25, "45": 45 }], 13: [function (_dereq_, module, exports) {
    var aFunction = _dereq_(3),
        toObject = _dereq_(109),
        IObject = _dereq_(45),
        toLength = _dereq_(108);

    module.exports = function (that, callbackfn, aLen, memo, isRight) {
      aFunction(callbackfn);
      var O = toObject(that),
          self = IObject(O),
          length = toLength(O.length),
          index = isRight ? length - 1 : 0,
          i = isRight ? -1 : 1;
      if (aLen < 2) for (;;) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (isRight ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for (; isRight ? index >= 0 : length > index; index += i) {
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      }return memo;
    };
  }, { "108": 108, "109": 109, "3": 3, "45": 45 }], 14: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        isArray = _dereq_(47),
        SPECIES = _dereq_(117)('species');

    module.exports = function (original) {
      var C;
      if (isArray(original)) {
        C = original.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      }return C === undefined ? Array : C;
    };
  }, { "117": 117, "47": 47, "49": 49 }], 15: [function (_dereq_, module, exports) {
    // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
    var speciesConstructor = _dereq_(14);

    module.exports = function (original, length) {
      return new (speciesConstructor(original))(length);
    };
  }, { "14": 14 }], 16: [function (_dereq_, module, exports) {
    'use strict';

    var aFunction = _dereq_(3),
        isObject = _dereq_(49),
        invoke = _dereq_(44),
        arraySlice = [].slice,
        factories = {};

    var construct = function construct(F, len, args) {
      if (!(len in factories)) {
        for (var n = [], i = 0; i < len; i++) {
          n[i] = 'a[' + i + ']';
        }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
      }return factories[len](F, args);
    };

    module.exports = Function.bind || function bind(that /*, args... */) {
      var fn = aFunction(this),
          partArgs = arraySlice.call(arguments, 1);
      var bound = function bound() /* args... */{
        var args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
      };
      if (isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };
  }, { "3": 3, "44": 44, "49": 49 }], 17: [function (_dereq_, module, exports) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = _dereq_(18),
        TAG = _dereq_(117)('toStringTag')
    // ES3 wrong here
    ,
        ARG = cof(function () {
      return arguments;
    }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function tryGet(it, key) {
      try {
        return it[key];
      } catch (e) {/* empty */}
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
      // builtinTag case
      : ARG ? cof(O)
      // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
  }, { "117": 117, "18": 18 }], 18: [function (_dereq_, module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
  }, {}], 19: [function (_dereq_, module, exports) {
    'use strict';

    var dP = _dereq_(67).f,
        create = _dereq_(66),
        redefineAll = _dereq_(86),
        ctx = _dereq_(25),
        anInstance = _dereq_(6),
        defined = _dereq_(27),
        forOf = _dereq_(37),
        $iterDefine = _dereq_(53),
        step = _dereq_(55),
        setSpecies = _dereq_(91),
        DESCRIPTORS = _dereq_(28),
        fastKey = _dereq_(62).fastKey,
        SIZE = DESCRIPTORS ? '_s' : 'size';

    var getEntry = function getEntry(that, key) {
      // fast case
      var index = fastKey(key),
          entry;
      if (index !== 'F') return that._i[index];
      // frozen object case
      for (entry = that._f; entry; entry = entry.n) {
        if (entry.k == key) return entry;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._i = create(null); // index
          that._f = undefined; // first entry
          that._l = undefined; // last entry
          that[SIZE] = 0; // size
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          // 23.1.3.1 Map.prototype.clear()
          // 23.2.3.2 Set.prototype.clear()
          clear: function clear() {
            for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
              entry.r = true;
              if (entry.p) entry.p = entry.p.n = undefined;
              delete data[entry.i];
            }
            that._f = that._l = undefined;
            that[SIZE] = 0;
          },
          // 23.1.3.3 Map.prototype.delete(key)
          // 23.2.3.4 Set.prototype.delete(value)
          'delete': function _delete(key) {
            var that = this,
                entry = getEntry(that, key);
            if (entry) {
              var next = entry.n,
                  prev = entry.p;
              delete that._i[entry.i];
              entry.r = true;
              if (prev) prev.n = next;
              if (next) next.p = prev;
              if (that._f == entry) that._f = next;
              if (that._l == entry) that._l = prev;
              that[SIZE]--;
            }return !!entry;
          },
          // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
          // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
          forEach: function forEach(callbackfn /*, that = undefined */) {
            anInstance(this, C, 'forEach');
            var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
                entry;
            while (entry = entry ? entry.n : this._f) {
              f(entry.v, entry.k, this);
              // revert to the last existing entry
              while (entry && entry.r) {
                entry = entry.p;
              }
            }
          },
          // 23.1.3.7 Map.prototype.has(key)
          // 23.2.3.7 Set.prototype.has(value)
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });
        if (DESCRIPTORS) dP(C.prototype, 'size', {
          get: function get$$1() {
            return defined(this[SIZE]);
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var entry = getEntry(that, key),
            prev,
            index;
        // change existing entry
        if (entry) {
          entry.v = value;
          // create new entry
        } else {
          that._l = entry = {
            i: index = fastKey(key, true), // <- index
            k: key, // <- key
            v: value, // <- value
            p: prev = that._l, // <- previous entry
            n: undefined, // <- next entry
            r: false // <- removed
          };
          if (!that._f) that._f = entry;
          if (prev) prev.n = entry;
          that[SIZE]++;
          // add to index
          if (index !== 'F') that._i[index] = entry;
        }return that;
      },
      getEntry: getEntry,
      setStrong: function setStrong(C, NAME, IS_MAP) {
        // add .keys, .values, .entries, [@@iterator]
        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
        $iterDefine(C, NAME, function (iterated, kind) {
          this._t = iterated; // target
          this._k = kind; // kind
          this._l = undefined; // previous
        }, function () {
          var that = this,
              kind = that._k,
              entry = that._l;
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          } // get next entry
          if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
            // or finish the iteration
            that._t = undefined;
            return step(1);
          }
          // return step by kind
          if (kind == 'keys') return step(0, entry.k);
          if (kind == 'values') return step(0, entry.v);
          return step(0, [entry.k, entry.v]);
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // add [@@species], 23.1.2.2, 23.2.2.2
        setSpecies(NAME);
      }
    };
  }, { "25": 25, "27": 27, "28": 28, "37": 37, "53": 53, "55": 55, "6": 6, "62": 62, "66": 66, "67": 67, "86": 86, "91": 91 }], 20: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var classof = _dereq_(17),
        from = _dereq_(10);
    module.exports = function (NAME) {
      return function toJSON() {
        if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
        return from(this);
      };
    };
  }, { "10": 10, "17": 17 }], 21: [function (_dereq_, module, exports) {
    'use strict';

    var redefineAll = _dereq_(86),
        getWeak = _dereq_(62).getWeak,
        anObject = _dereq_(7),
        isObject = _dereq_(49),
        anInstance = _dereq_(6),
        forOf = _dereq_(37),
        createArrayMethod = _dereq_(12),
        $has = _dereq_(39),
        arrayFind = createArrayMethod(5),
        arrayFindIndex = createArrayMethod(6),
        id = 0;

    // fallback for uncaught frozen keys
    var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
      return that._l || (that._l = new UncaughtFrozenStore());
    };
    var UncaughtFrozenStore = function UncaughtFrozenStore() {
      this.a = [];
    };
    var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
      return arrayFind(store.a, function (it) {
        return it[0] === key;
      });
    };
    UncaughtFrozenStore.prototype = {
      get: function get$$1(key) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) return entry[1];
      },
      has: function has(key) {
        return !!findUncaughtFrozen(this, key);
      },
      set: function set$$1(key, value) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) entry[1] = value;else this.a.push([key, value]);
      },
      'delete': function _delete(key) {
        var index = arrayFindIndex(this.a, function (it) {
          return it[0] === key;
        });
        if (~index) this.a.splice(index, 1);
        return !!~index;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._i = id++; // collection id
          that._l = undefined; // leak store for uncaught frozen objects
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          // 23.3.3.2 WeakMap.prototype.delete(key)
          // 23.4.3.3 WeakSet.prototype.delete(value)
          'delete': function _delete(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(this)['delete'](key);
            return data && $has(data, this._i) && delete data[this._i];
          },
          // 23.3.3.4 WeakMap.prototype.has(key)
          // 23.4.3.4 WeakSet.prototype.has(value)
          has: function has(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(this).has(key);
            return data && $has(data, this._i);
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var data = getWeak(anObject(key), true);
        if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
        return that;
      },
      ufstore: uncaughtFrozenStore
    };
  }, { "12": 12, "37": 37, "39": 39, "49": 49, "6": 6, "62": 62, "7": 7, "86": 86 }], 22: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        redefineAll = _dereq_(86),
        meta = _dereq_(62),
        forOf = _dereq_(37),
        anInstance = _dereq_(6),
        isObject = _dereq_(49),
        fails = _dereq_(34),
        $iterDetect = _dereq_(54),
        setToStringTag = _dereq_(92),
        inheritIfRequired = _dereq_(43);

    module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
      var Base = global[NAME],
          C = Base,
          ADDER = IS_MAP ? 'set' : 'add',
          proto = C && C.prototype,
          O = {};
      var fixMethod = function fixMethod(KEY) {
        var fn = proto[KEY];
        redefine(proto, KEY, KEY == 'delete' ? function (a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get$$1(a) {
          return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) {
          fn.call(this, a === 0 ? 0 : a);return this;
        } : function set$$1(a, b) {
          fn.call(this, a === 0 ? 0 : a, b);return this;
        });
      };
      if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
        new C().entries().next();
      }))) {
        // create collection constructor
        C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
        redefineAll(C.prototype, methods);
        meta.NEED = true;
      } else {
        var instance = new C()
        // early implementations not supports chaining
        ,
            HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
        // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
        ,
            THROWS_ON_PRIMITIVES = fails(function () {
          instance.has(1);
        })
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        ,
            ACCEPT_ITERABLES = $iterDetect(function (iter) {
          new C(iter);
        }) // eslint-disable-line no-new
        // for early implementations -0 and +0 not the same
        ,
            BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new C(),
              index = 5;
          while (index--) {
            $instance[ADDER](index, index);
          }return !$instance.has(-0);
        });
        if (!ACCEPT_ITERABLES) {
          C = wrapper(function (target, iterable) {
            anInstance(target, C, NAME);
            var that = inheritIfRequired(new Base(), target, C);
            if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
            return that;
          });
          C.prototype = proto;
          proto.constructor = C;
        }
        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }
        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
        // weak collections should not contains .clear method
        if (IS_WEAK && proto.clear) delete proto.clear;
      }

      setToStringTag(C, NAME);

      O[NAME] = C;
      $export($export.G + $export.W + $export.F * (C != Base), O);

      if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

      return C;
    };
  }, { "32": 32, "34": 34, "37": 37, "38": 38, "43": 43, "49": 49, "54": 54, "6": 6, "62": 62, "86": 86, "87": 87, "92": 92 }], 23: [function (_dereq_, module, exports) {
    var core = module.exports = { version: '2.4.0' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  }, {}], 24: [function (_dereq_, module, exports) {
    'use strict';

    var $defineProperty = _dereq_(67),
        createDesc = _dereq_(85);

    module.exports = function (object, index, value) {
      if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
    };
  }, { "67": 67, "85": 85 }], 25: [function (_dereq_, module, exports) {
    // optional / simple context binding
    var aFunction = _dereq_(3);
    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };
        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }
      return function () /* ...args */{
        return fn.apply(that, arguments);
      };
    };
  }, { "3": 3 }], 26: [function (_dereq_, module, exports) {
    'use strict';

    var anObject = _dereq_(7),
        toPrimitive = _dereq_(110),
        NUMBER = 'number';

    module.exports = function (hint) {
      if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
      return toPrimitive(anObject(this), hint != NUMBER);
    };
  }, { "110": 110, "7": 7 }], 27: [function (_dereq_, module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
  }, {}], 28: [function (_dereq_, module, exports) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !_dereq_(34)(function () {
      return Object.defineProperty({}, 'a', { get: function get$$1() {
          return 7;
        } }).a != 7;
    });
  }, { "34": 34 }], 29: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        document = _dereq_(38).document
    // in old IE typeof document.createElement is 'object'
    ,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
  }, { "38": 38, "49": 49 }], 30: [function (_dereq_, module, exports) {
    // IE 8- don't enum bug keys
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  }, {}], 31: [function (_dereq_, module, exports) {
    // all enumerable object keys, includes symbols
    var getKeys = _dereq_(76),
        gOPS = _dereq_(73),
        pIE = _dereq_(77);
    module.exports = function (it) {
      var result = getKeys(it),
          getSymbols = gOPS.f;
      if (getSymbols) {
        var symbols = getSymbols(it),
            isEnum = pIE.f,
            i = 0,
            key;
        while (symbols.length > i) {
          if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
      }return result;
    };
  }, { "73": 73, "76": 76, "77": 77 }], 32: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        core = _dereq_(23),
        hide = _dereq_(40),
        redefine = _dereq_(87),
        ctx = _dereq_(25),
        PROTOTYPE = 'prototype';

    var $export = function $export(type, name, source) {
      var IS_FORCED = type & $export.F,
          IS_GLOBAL = type & $export.G,
          IS_STATIC = type & $export.S,
          IS_PROTO = type & $export.P,
          IS_BIND = type & $export.B,
          target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
          exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
          expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
          key,
          own,
          out,
          exp;
      if (IS_GLOBAL) source = name;
      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined;
        // export native or passed
        out = (own ? target : source)[key];
        // bind timers to global for call from export context
        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
        // extend global
        if (target) redefine(target, key, out, type & $export.U);
        // export
        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };
    global.core = core;
    // type bitmap
    $export.F = 1; // forced
    $export.G = 2; // global
    $export.S = 4; // static
    $export.P = 8; // proto
    $export.B = 16; // bind
    $export.W = 32; // wrap
    $export.U = 64; // safe
    $export.R = 128; // real proto method for `library` 
    module.exports = $export;
  }, { "23": 23, "25": 25, "38": 38, "40": 40, "87": 87 }], 33: [function (_dereq_, module, exports) {
    var MATCH = _dereq_(117)('match');
    module.exports = function (KEY) {
      var re = /./;
      try {
        '/./'[KEY](re);
      } catch (e) {
        try {
          re[MATCH] = false;
          return !'/./'[KEY](re);
        } catch (f) {/* empty */}
      }return true;
    };
  }, { "117": 117 }], 34: [function (_dereq_, module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
  }, {}], 35: [function (_dereq_, module, exports) {
    'use strict';

    var hide = _dereq_(40),
        redefine = _dereq_(87),
        fails = _dereq_(34),
        defined = _dereq_(27),
        wks = _dereq_(117);

    module.exports = function (KEY, length, exec) {
      var SYMBOL = wks(KEY),
          fns = exec(defined, SYMBOL, ''[KEY]),
          strfn = fns[0],
          rxfn = fns[1];
      if (fails(function () {
        var O = {};
        O[SYMBOL] = function () {
          return 7;
        };
        return ''[KEY](O) != 7;
      })) {
        redefine(String.prototype, KEY, strfn);
        hide(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) {
          return rxfn.call(string, this, arg);
        }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) {
          return rxfn.call(string, this);
        });
      }
    };
  }, { "117": 117, "27": 27, "34": 34, "40": 40, "87": 87 }], 36: [function (_dereq_, module, exports) {
    'use strict';
    // 21.2.5.3 get RegExp.prototype.flags

    var anObject = _dereq_(7);
    module.exports = function () {
      var that = anObject(this),
          result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };
  }, { "7": 7 }], 37: [function (_dereq_, module, exports) {
    var ctx = _dereq_(25),
        call = _dereq_(51),
        isArrayIter = _dereq_(46),
        anObject = _dereq_(7),
        toLength = _dereq_(108),
        getIterFn = _dereq_(118),
        BREAK = {},
        RETURN = {};
    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {
        return iterable;
      } : getIterFn(iterable),
          f = ctx(fn, that, entries ? 2 : 1),
          index = 0,
          length,
          step,
          iterator,
          result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
      // fast case for arrays with default iterator
      if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = call(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  }, { "108": 108, "118": 118, "25": 25, "46": 46, "51": 51, "7": 7 }], 38: [function (_dereq_, module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  }, {}], 39: [function (_dereq_, module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
  }, {}], 40: [function (_dereq_, module, exports) {
    var dP = _dereq_(67),
        createDesc = _dereq_(85);
    module.exports = _dereq_(28) ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
  }, { "28": 28, "67": 67, "85": 85 }], 41: [function (_dereq_, module, exports) {
    module.exports = _dereq_(38).document && document.documentElement;
  }, { "38": 38 }], 42: [function (_dereq_, module, exports) {
    module.exports = !_dereq_(28) && !_dereq_(34)(function () {
      return Object.defineProperty(_dereq_(29)('div'), 'a', { get: function get$$1() {
          return 7;
        } }).a != 7;
    });
  }, { "28": 28, "29": 29, "34": 34 }], 43: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        setPrototypeOf = _dereq_(90).set;
    module.exports = function (that, target, C) {
      var P,
          S = target.constructor;
      if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }return that;
    };
  }, { "49": 49, "90": 90 }], 44: [function (_dereq_, module, exports) {
    // fast apply, http://jsperf.lnkit.com/fast-apply/5
    module.exports = function (fn, args, that) {
      var un = that === undefined;
      switch (args.length) {
        case 0:
          return un ? fn() : fn.call(that);
        case 1:
          return un ? fn(args[0]) : fn.call(that, args[0]);
        case 2:
          return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
        case 3:
          return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
        case 4:
          return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      }return fn.apply(that, args);
    };
  }, {}], 45: [function (_dereq_, module, exports) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = _dereq_(18);
    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }, { "18": 18 }], 46: [function (_dereq_, module, exports) {
    // check on default Array iterator
    var Iterators = _dereq_(56),
        ITERATOR = _dereq_(117)('iterator'),
        ArrayProto = Array.prototype;

    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
  }, { "117": 117, "56": 56 }], 47: [function (_dereq_, module, exports) {
    // 7.2.2 IsArray(argument)
    var cof = _dereq_(18);
    module.exports = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };
  }, { "18": 18 }], 48: [function (_dereq_, module, exports) {
    // 20.1.2.3 Number.isInteger(number)
    var isObject = _dereq_(49),
        floor = Math.floor;
    module.exports = function isInteger(it) {
      return !isObject(it) && isFinite(it) && floor(it) === it;
    };
  }, { "49": 49 }], 49: [function (_dereq_, module, exports) {
    module.exports = function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
    };
  }, {}], 50: [function (_dereq_, module, exports) {
    // 7.2.8 IsRegExp(argument)
    var isObject = _dereq_(49),
        cof = _dereq_(18),
        MATCH = _dereq_(117)('match');
    module.exports = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
    };
  }, { "117": 117, "18": 18, "49": 49 }], 51: [function (_dereq_, module, exports) {
    // call something on iterator step with safe closing on error
    var anObject = _dereq_(7);
    module.exports = function (iterator, fn, value, entries) {
      try {
        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
        // 7.4.6 IteratorClose(iterator, completion)
      } catch (e) {
        var ret = iterator['return'];
        if (ret !== undefined) anObject(ret.call(iterator));
        throw e;
      }
    };
  }, { "7": 7 }], 52: [function (_dereq_, module, exports) {
    'use strict';

    var create = _dereq_(66),
        descriptor = _dereq_(85),
        setToStringTag = _dereq_(92),
        IteratorPrototype = {};

    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    _dereq_(40)(IteratorPrototype, _dereq_(117)('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
  }, { "117": 117, "40": 40, "66": 66, "85": 85, "92": 92 }], 53: [function (_dereq_, module, exports) {
    'use strict';

    var LIBRARY = _dereq_(58),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        hide = _dereq_(40),
        has = _dereq_(39),
        Iterators = _dereq_(56),
        $iterCreate = _dereq_(52),
        setToStringTag = _dereq_(92),
        getPrototypeOf = _dereq_(74),
        ITERATOR = _dereq_(117)('iterator'),
        BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
    ,
        FF_ITERATOR = '@@iterator',
        KEYS = 'keys',
        VALUES = 'values';

    var returnThis = function returnThis() {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);
      var getMethod = function getMethod(kind) {
        if (!BUGGY && kind in proto) return proto[kind];
        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };
          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }return function entries() {
          return new Constructor(this, kind);
        };
      };
      var TAG = NAME + ' Iterator',
          DEF_VALUES = DEFAULT == VALUES,
          VALUES_BUG = false,
          proto = Base.prototype,
          $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
          $default = $native || getMethod(DEFAULT),
          $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
          $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
          methods,
          key,
          IteratorPrototype;
      // Fix native
      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
        if (IteratorPrototype !== Object.prototype) {
          // Set @@toStringTag to native iterators
          setToStringTag(IteratorPrototype, TAG, true);
          // fix for some old engines
          if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
        }
      }
      // fix Array#{values, @@iterator}.name in V8 / FF
      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
      // Define iterator
      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      }
      // Plug for library
      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;
      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }
      return methods;
    };
  }, { "117": 117, "32": 32, "39": 39, "40": 40, "52": 52, "56": 56, "58": 58, "74": 74, "87": 87, "92": 92 }], 54: [function (_dereq_, module, exports) {
    var ITERATOR = _dereq_(117)('iterator'),
        SAFE_CLOSING = false;

    try {
      var riter = [7][ITERATOR]();
      riter['return'] = function () {
        SAFE_CLOSING = true;
      };
      Array.from(riter, function () {
        throw 2;
      });
    } catch (e) {/* empty */}

    module.exports = function (exec, skipClosing) {
      if (!skipClosing && !SAFE_CLOSING) return false;
      var safe = false;
      try {
        var arr = [7],
            iter = arr[ITERATOR]();
        iter.next = function () {
          return { done: safe = true };
        };
        arr[ITERATOR] = function () {
          return iter;
        };
        exec(arr);
      } catch (e) {/* empty */}
      return safe;
    };
  }, { "117": 117 }], 55: [function (_dereq_, module, exports) {
    module.exports = function (done, value) {
      return { value: value, done: !!done };
    };
  }, {}], 56: [function (_dereq_, module, exports) {
    module.exports = {};
  }, {}], 57: [function (_dereq_, module, exports) {
    var getKeys = _dereq_(76),
        toIObject = _dereq_(107);
    module.exports = function (object, el) {
      var O = toIObject(object),
          keys = getKeys(O),
          length = keys.length,
          index = 0,
          key;
      while (length > index) {
        if (O[key = keys[index++]] === el) return key;
      }
    };
  }, { "107": 107, "76": 76 }], 58: [function (_dereq_, module, exports) {
    module.exports = false;
  }, {}], 59: [function (_dereq_, module, exports) {
    // 20.2.2.14 Math.expm1(x)
    var $expm1 = Math.expm1;
    module.exports = !$expm1
    // Old FF bug
    || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
    // Tor Browser bug
    || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
      return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
    } : $expm1;
  }, {}], 60: [function (_dereq_, module, exports) {
    // 20.2.2.20 Math.log1p(x)
    module.exports = Math.log1p || function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
    };
  }, {}], 61: [function (_dereq_, module, exports) {
    // 20.2.2.28 Math.sign(x)
    module.exports = Math.sign || function sign(x) {
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };
  }, {}], 62: [function (_dereq_, module, exports) {
    var META = _dereq_(114)('meta'),
        isObject = _dereq_(49),
        has = _dereq_(39),
        setDesc = _dereq_(67).f,
        id = 0;
    var isExtensible = Object.isExtensible || function () {
      return true;
    };
    var FREEZE = !_dereq_(34)(function () {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function setMeta(it) {
      setDesc(it, META, { value: {
          i: 'O' + ++id, // object ID
          w: {} // weak collections IDs
        } });
    };
    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!isObject(it)) return (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMeta(it);
        // return object ID
      }return it[META].i;
    };
    var getWeak = function getWeak(it, create) {
      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }return it[META].w;
    };
    // add metadata on freeze-family methods calling
    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  }, { "114": 114, "34": 34, "39": 39, "49": 49, "67": 67 }], 63: [function (_dereq_, module, exports) {
    var Map = _dereq_(149),
        $export = _dereq_(32),
        shared = _dereq_(94)('metadata'),
        store = shared.store || (shared.store = new (_dereq_(255))());

    var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
      var targetMetadata = store.get(target);
      if (!targetMetadata) {
        if (!create) return undefined;
        store.set(target, targetMetadata = new Map());
      }
      var keyMetadata = targetMetadata.get(targetKey);
      if (!keyMetadata) {
        if (!create) return undefined;
        targetMetadata.set(targetKey, keyMetadata = new Map());
      }return keyMetadata;
    };
    var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
    };
    var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    };
    var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
    };
    var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
      var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
          keys = [];
      if (metadataMap) metadataMap.forEach(function (_, key) {
        keys.push(key);
      });
      return keys;
    };
    var toMetaKey = function toMetaKey(it) {
      return it === undefined || (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol' ? it : String(it);
    };
    var exp = function exp(O) {
      $export($export.S, 'Reflect', O);
    };

    module.exports = {
      store: store,
      map: getOrCreateMetadataMap,
      has: ordinaryHasOwnMetadata,
      get: ordinaryGetOwnMetadata,
      set: ordinaryDefineOwnMetadata,
      keys: ordinaryOwnMetadataKeys,
      key: toMetaKey,
      exp: exp
    };
  }, { "149": 149, "255": 255, "32": 32, "94": 94 }], 64: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        macrotask = _dereq_(104).set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = _dereq_(18)(process) == 'process';

    module.exports = function () {
      var head, last, notify;

      var flush = function flush() {
        var parent, fn;
        if (isNode && (parent = process.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (e) {
            if (head) notify();else last = undefined;
            throw e;
          }
        }last = undefined;
        if (parent) parent.enter();
      };

      // Node.js
      if (isNode) {
        notify = function notify() {
          process.nextTick(flush);
        };
        // browsers with MutationObserver
      } else if (Observer) {
        var toggle = true,
            node = document.createTextNode('');
        new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
        notify = function notify() {
          node.data = toggle = !toggle;
        };
        // environments with maybe non-completely correct, but existent Promise
      } else if (Promise && Promise.resolve) {
        var promise = Promise.resolve();
        notify = function notify() {
          promise.then(flush);
        };
        // for other environments - macrotask based on:
        // - setImmediate
        // - MessageChannel
        // - window.postMessag
        // - onreadystatechange
        // - setTimeout
      } else {
        notify = function notify() {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global, flush);
        };
      }

      return function (fn) {
        var task = { fn: fn, next: undefined };
        if (last) last.next = task;
        if (!head) {
          head = task;
          notify();
        }last = task;
      };
    };
  }, { "104": 104, "18": 18, "38": 38 }], 65: [function (_dereq_, module, exports) {
    'use strict';
    // 19.1.2.1 Object.assign(target, source, ...)

    var getKeys = _dereq_(76),
        gOPS = _dereq_(73),
        pIE = _dereq_(77),
        toObject = _dereq_(109),
        IObject = _dereq_(45),
        $assign = Object.assign;

    // should work with symbols and should have deterministic property order (V8 bug)
    module.exports = !$assign || _dereq_(34)(function () {
      var A = {},
          B = {},
          S = Symbol(),
          K = 'abcdefghijklmnopqrst';
      A[S] = 7;
      K.split('').forEach(function (k) {
        B[k] = k;
      });
      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    }) ? function assign(target, source) {
      // eslint-disable-line no-unused-vars
      var T = toObject(target),
          aLen = arguments.length,
          index = 1,
          getSymbols = gOPS.f,
          isEnum = pIE.f;
      while (aLen > index) {
        var S = IObject(arguments[index++]),
            keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
            length = keys.length,
            j = 0,
            key;
        while (length > j) {
          if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }
      }return T;
    } : $assign;
  }, { "109": 109, "34": 34, "45": 45, "73": 73, "76": 76, "77": 77 }], 66: [function (_dereq_, module, exports) {
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject = _dereq_(7),
        dPs = _dereq_(68),
        enumBugKeys = _dereq_(30),
        IE_PROTO = _dereq_(93)('IE_PROTO'),
        Empty = function Empty() {/* empty */},
        PROTOTYPE = 'prototype';

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var _createDict = function createDict() {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = _dereq_(29)('iframe'),
          i = enumBugKeys.length,
          lt = '<',
          gt = '>',
          iframeDocument;
      iframe.style.display = 'none';
      _dereq_(41).appendChild(iframe);
      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
      // createDict = iframe.contentWindow.Object;
      // html.removeChild(iframe);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      _createDict = iframeDocument.F;
      while (i--) {
        delete _createDict[PROTOTYPE][enumBugKeys[i]];
      }return _createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = _createDict();
      return Properties === undefined ? result : dPs(result, Properties);
    };
  }, { "29": 29, "30": 30, "41": 41, "68": 68, "7": 7, "93": 93 }], 67: [function (_dereq_, module, exports) {
    var anObject = _dereq_(7),
        IE8_DOM_DEFINE = _dereq_(42),
        toPrimitive = _dereq_(110),
        dP = Object.defineProperty;

    exports.f = _dereq_(28) ? Object.defineProperty : function defineProperty$$1(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {/* empty */}
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
  }, { "110": 110, "28": 28, "42": 42, "7": 7 }], 68: [function (_dereq_, module, exports) {
    var dP = _dereq_(67),
        anObject = _dereq_(7),
        getKeys = _dereq_(76);

    module.exports = _dereq_(28) ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties),
          length = keys.length,
          i = 0,
          P;
      while (length > i) {
        dP.f(O, P = keys[i++], Properties[P]);
      }return O;
    };
  }, { "28": 28, "67": 67, "7": 7, "76": 76 }], 69: [function (_dereq_, module, exports) {
    // Forced replacement prototype accessors methods
    module.exports = _dereq_(58) || !_dereq_(34)(function () {
      var K = Math.random();
      // In FF throws only define methods
      __defineSetter__.call(null, K, function () {/* empty */});
      delete _dereq_(38)[K];
    });
  }, { "34": 34, "38": 38, "58": 58 }], 70: [function (_dereq_, module, exports) {
    var pIE = _dereq_(77),
        createDesc = _dereq_(85),
        toIObject = _dereq_(107),
        toPrimitive = _dereq_(110),
        has = _dereq_(39),
        IE8_DOM_DEFINE = _dereq_(42),
        gOPD = Object.getOwnPropertyDescriptor;

    exports.f = _dereq_(28) ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {/* empty */}
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
  }, { "107": 107, "110": 110, "28": 28, "39": 39, "42": 42, "77": 77, "85": 85 }], 71: [function (_dereq_, module, exports) {
    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var toIObject = _dereq_(107),
        gOPN = _dereq_(72).f,
        toString = {}.toString;

    var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function getWindowNames(it) {
      try {
        return gOPN(it);
      } catch (e) {
        return windowNames.slice();
      }
    };

    module.exports.f = function getOwnPropertyNames(it) {
      return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
    };
  }, { "107": 107, "72": 72 }], 72: [function (_dereq_, module, exports) {
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    var $keys = _dereq_(75),
        hiddenKeys = _dereq_(30).concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
  }, { "30": 30, "75": 75 }], 73: [function (_dereq_, module, exports) {
    exports.f = Object.getOwnPropertySymbols;
  }, {}], 74: [function (_dereq_, module, exports) {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has = _dereq_(39),
        toObject = _dereq_(109),
        IE_PROTO = _dereq_(93)('IE_PROTO'),
        ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }return O instanceof Object ? ObjectProto : null;
    };
  }, { "109": 109, "39": 39, "93": 93 }], 75: [function (_dereq_, module, exports) {
    var has = _dereq_(39),
        toIObject = _dereq_(107),
        arrayIndexOf = _dereq_(11)(false),
        IE_PROTO = _dereq_(93)('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object),
          i = 0,
          result = [],
          key;
      for (key in O) {
        if (key != IE_PROTO) has(O, key) && result.push(key);
      } // Don't enum bug & hidden keys
      while (names.length > i) {
        if (has(O, key = names[i++])) {
          ~arrayIndexOf(result, key) || result.push(key);
        }
      }return result;
    };
  }, { "107": 107, "11": 11, "39": 39, "93": 93 }], 76: [function (_dereq_, module, exports) {
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys = _dereq_(75),
        enumBugKeys = _dereq_(30);

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
  }, { "30": 30, "75": 75 }], 77: [function (_dereq_, module, exports) {
    exports.f = {}.propertyIsEnumerable;
  }, {}], 78: [function (_dereq_, module, exports) {
    // most Object methods by ES6 should accept primitives
    var $export = _dereq_(32),
        core = _dereq_(23),
        fails = _dereq_(34);
    module.exports = function (KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY],
          exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function () {
        fn(1);
      }), 'Object', exp);
    };
  }, { "23": 23, "32": 32, "34": 34 }], 79: [function (_dereq_, module, exports) {
    var getKeys = _dereq_(76),
        toIObject = _dereq_(107),
        isEnum = _dereq_(77).f;
    module.exports = function (isEntries) {
      return function (it) {
        var O = toIObject(it),
            keys = getKeys(O),
            length = keys.length,
            i = 0,
            result = [],
            key;
        while (length > i) {
          if (isEnum.call(O, key = keys[i++])) {
            result.push(isEntries ? [key, O[key]] : O[key]);
          }
        }return result;
      };
    };
  }, { "107": 107, "76": 76, "77": 77 }], 80: [function (_dereq_, module, exports) {
    // all object keys, includes non-enumerable and symbols
    var gOPN = _dereq_(72),
        gOPS = _dereq_(73),
        anObject = _dereq_(7),
        Reflect = _dereq_(38).Reflect;
    module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
      var keys = gOPN.f(anObject(it)),
          getSymbols = gOPS.f;
      return getSymbols ? keys.concat(getSymbols(it)) : keys;
    };
  }, { "38": 38, "7": 7, "72": 72, "73": 73 }], 81: [function (_dereq_, module, exports) {
    var $parseFloat = _dereq_(38).parseFloat,
        $trim = _dereq_(102).trim;

    module.exports = 1 / $parseFloat(_dereq_(103) + '-0') !== -Infinity ? function parseFloat(str) {
      var string = $trim(String(str), 3),
          result = $parseFloat(string);
      return result === 0 && string.charAt(0) == '-' ? -0 : result;
    } : $parseFloat;
  }, { "102": 102, "103": 103, "38": 38 }], 82: [function (_dereq_, module, exports) {
    var $parseInt = _dereq_(38).parseInt,
        $trim = _dereq_(102).trim,
        ws = _dereq_(103),
        hex = /^[\-+]?0[xX]/;

    module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
      var string = $trim(String(str), 3);
      return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
    } : $parseInt;
  }, { "102": 102, "103": 103, "38": 38 }], 83: [function (_dereq_, module, exports) {
    'use strict';

    var path = _dereq_(84),
        invoke = _dereq_(44),
        aFunction = _dereq_(3);
    module.exports = function () /* ...pargs */{
      var fn = aFunction(this),
          length = arguments.length,
          pargs = Array(length),
          i = 0,
          _ = path._,
          holder = false;
      while (length > i) {
        if ((pargs[i] = arguments[i++]) === _) holder = true;
      }return function () /* ...args */{
        var that = this,
            aLen = arguments.length,
            j = 0,
            k = 0,
            args;
        if (!holder && !aLen) return invoke(fn, pargs, that);
        args = pargs.slice();
        if (holder) for (; length > j; j++) {
          if (args[j] === _) args[j] = arguments[k++];
        }while (aLen > k) {
          args.push(arguments[k++]);
        }return invoke(fn, args, that);
      };
    };
  }, { "3": 3, "44": 44, "84": 84 }], 84: [function (_dereq_, module, exports) {
    module.exports = _dereq_(38);
  }, { "38": 38 }], 85: [function (_dereq_, module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }, {}], 86: [function (_dereq_, module, exports) {
    var redefine = _dereq_(87);
    module.exports = function (target, src, safe) {
      for (var key in src) {
        redefine(target, key, src[key], safe);
      }return target;
    };
  }, { "87": 87 }], 87: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        hide = _dereq_(40),
        has = _dereq_(39),
        SRC = _dereq_(114)('src'),
        TO_STRING = 'toString',
        $toString = Function[TO_STRING],
        TPL = ('' + $toString).split(TO_STRING);

    _dereq_(23).inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === global) {
        O[key] = val;
      } else {
        if (!safe) {
          delete O[key];
          hide(O, key, val);
        } else {
          if (O[key]) O[key] = val;else hide(O, key, val);
        }
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  }, { "114": 114, "23": 23, "38": 38, "39": 39, "40": 40 }], 88: [function (_dereq_, module, exports) {
    module.exports = function (regExp, replace) {
      var replacer = replace === Object(replace) ? function (part) {
        return replace[part];
      } : replace;
      return function (it) {
        return String(it).replace(regExp, replacer);
      };
    };
  }, {}], 89: [function (_dereq_, module, exports) {
    // 7.2.9 SameValue(x, y)
    module.exports = Object.is || function is(x, y) {
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };
  }, {}], 90: [function (_dereq_, module, exports) {
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */
    var isObject = _dereq_(49),
        anObject = _dereq_(7);
    var check = function check(O, proto) {
      anObject(O);
      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
    };
    module.exports = {
      set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set$$1) {
        try {
          set$$1 = _dereq_(25)(Function.call, _dereq_(70).f(Object.prototype, '__proto__').set, 2);
          set$$1(test, []);
          buggy = !(test instanceof Array);
        } catch (e) {
          buggy = true;
        }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;else set$$1(O, proto);
          return O;
        };
      }({}, false) : undefined),
      check: check
    };
  }, { "25": 25, "49": 49, "7": 7, "70": 70 }], 91: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        dP = _dereq_(67),
        DESCRIPTORS = _dereq_(28),
        SPECIES = _dereq_(117)('species');

    module.exports = function (KEY) {
      var C = global[KEY];
      if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
        configurable: true,
        get: function get$$1() {
          return this;
        }
      });
    };
  }, { "117": 117, "28": 28, "38": 38, "67": 67 }], 92: [function (_dereq_, module, exports) {
    var def = _dereq_(67).f,
        has = _dereq_(39),
        TAG = _dereq_(117)('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
    };
  }, { "117": 117, "39": 39, "67": 67 }], 93: [function (_dereq_, module, exports) {
    var shared = _dereq_(94)('keys'),
        uid = _dereq_(114);
    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
  }, { "114": 114, "94": 94 }], 94: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
      return store[key] || (store[key] = {});
    };
  }, { "38": 38 }], 95: [function (_dereq_, module, exports) {
    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
    var anObject = _dereq_(7),
        aFunction = _dereq_(3),
        SPECIES = _dereq_(117)('species');
    module.exports = function (O, D) {
      var C = anObject(O).constructor,
          S;
      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
  }, { "117": 117, "3": 3, "7": 7 }], 96: [function (_dereq_, module, exports) {
    var fails = _dereq_(34);

    module.exports = function (method, arg) {
      return !!method && fails(function () {
        arg ? method.call(null, function () {}, 1) : method.call(null);
      });
    };
  }, { "34": 34 }], 97: [function (_dereq_, module, exports) {
    var toInteger = _dereq_(106),
        defined = _dereq_(27);
    // true  -> String#at
    // false -> String#codePointAt
    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that)),
            i = toInteger(pos),
            l = s.length,
            a,
            b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
  }, { "106": 106, "27": 27 }], 98: [function (_dereq_, module, exports) {
    // helper for String#{startsWith, endsWith, includes}
    var isRegExp = _dereq_(50),
        defined = _dereq_(27);

    module.exports = function (that, searchString, NAME) {
      if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
      return String(defined(that));
    };
  }, { "27": 27, "50": 50 }], 99: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        fails = _dereq_(34),
        defined = _dereq_(27),
        quot = /"/g;
    // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
    var createHTML = function createHTML(string, tag, attribute, value) {
      var S = String(defined(string)),
          p1 = '<' + tag;
      if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
      return p1 + '>' + S + '</' + tag + '>';
    };
    module.exports = function (NAME, exec) {
      var O = {};
      O[NAME] = exec(createHTML);
      $export($export.P + $export.F * fails(function () {
        var test = ''[NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      }), 'String', O);
    };
  }, { "27": 27, "32": 32, "34": 34 }], 100: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-string-pad-start-end
    var toLength = _dereq_(108),
        repeat = _dereq_(101),
        defined = _dereq_(27);

    module.exports = function (that, maxLength, fillString, left) {
      var S = String(defined(that)),
          stringLength = S.length,
          fillStr = fillString === undefined ? ' ' : String(fillString),
          intMaxLength = toLength(maxLength);
      if (intMaxLength <= stringLength || fillStr == '') return S;
      var fillLen = intMaxLength - stringLength,
          stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
      return left ? stringFiller + S : S + stringFiller;
    };
  }, { "101": 101, "108": 108, "27": 27 }], 101: [function (_dereq_, module, exports) {
    'use strict';

    var toInteger = _dereq_(106),
        defined = _dereq_(27);

    module.exports = function repeat(count) {
      var str = String(defined(this)),
          res = '',
          n = toInteger(count);
      if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
      for (; n > 0; (n >>>= 1) && (str += str)) {
        if (n & 1) res += str;
      }return res;
    };
  }, { "106": 106, "27": 27 }], 102: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        defined = _dereq_(27),
        fails = _dereq_(34),
        spaces = _dereq_(103),
        space = '[' + spaces + ']',
        non = "\u200B\x85",
        ltrim = RegExp('^' + space + space + '*'),
        rtrim = RegExp(space + space + '*$');

    var exporter = function exporter(KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = fails(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export($export.P + $export.F * FORCE, 'String', exp);
    };

    // 1 -> String#trimLeft
    // 2 -> String#trimRight
    // 3 -> String#trim
    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    module.exports = exporter;
  }, { "103": 103, "27": 27, "32": 32, "34": 34 }], 103: [function (_dereq_, module, exports) {
    module.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
  }, {}], 104: [function (_dereq_, module, exports) {
    var ctx = _dereq_(25),
        invoke = _dereq_(44),
        html = _dereq_(41),
        cel = _dereq_(29),
        global = _dereq_(38),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function run() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listener = function listener(event) {
      run.call(event.data);
    };
    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (_dereq_(18)(process) == 'process') {
        defer = function defer(id) {
          process.nextTick(ctx(run, id, 1));
        };
        // Browsers with MessageChannel, includes WebWorkers
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = ctx(port.postMessage, port, 1);
        // Browsers with postMessage, skip WebWorkers
        // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function defer(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listener, false);
        // IE8-
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function defer(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
        // Rest old browsers
      } else {
        defer = function defer(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  }, { "18": 18, "25": 25, "29": 29, "38": 38, "41": 41, "44": 44 }], 105: [function (_dereq_, module, exports) {
    var toInteger = _dereq_(106),
        max = Math.max,
        min = Math.min;
    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
  }, { "106": 106 }], 106: [function (_dereq_, module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil,
        floor = Math.floor;
    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
  }, {}], 107: [function (_dereq_, module, exports) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = _dereq_(45),
        defined = _dereq_(27);
    module.exports = function (it) {
      return IObject(defined(it));
    };
  }, { "27": 27, "45": 45 }], 108: [function (_dereq_, module, exports) {
    // 7.1.15 ToLength
    var toInteger = _dereq_(106),
        min = Math.min;
    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
  }, { "106": 106 }], 109: [function (_dereq_, module, exports) {
    // 7.1.13 ToObject(argument)
    var defined = _dereq_(27);
    module.exports = function (it) {
      return Object(defined(it));
    };
  }, { "27": 27 }], 110: [function (_dereq_, module, exports) {
    // 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject = _dereq_(49);
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }, { "49": 49 }], 111: [function (_dereq_, module, exports) {
    'use strict';

    if (_dereq_(28)) {
      var LIBRARY = _dereq_(58),
          global = _dereq_(38),
          fails = _dereq_(34),
          $export = _dereq_(32),
          $typed = _dereq_(113),
          $buffer = _dereq_(112),
          ctx = _dereq_(25),
          anInstance = _dereq_(6),
          propertyDesc = _dereq_(85),
          hide = _dereq_(40),
          redefineAll = _dereq_(86),
          toInteger = _dereq_(106),
          toLength = _dereq_(108),
          toIndex = _dereq_(105),
          toPrimitive = _dereq_(110),
          has = _dereq_(39),
          same = _dereq_(89),
          classof = _dereq_(17),
          isObject = _dereq_(49),
          toObject = _dereq_(109),
          isArrayIter = _dereq_(46),
          create = _dereq_(66),
          getPrototypeOf = _dereq_(74),
          gOPN = _dereq_(72).f,
          getIterFn = _dereq_(118),
          uid = _dereq_(114),
          wks = _dereq_(117),
          createArrayMethod = _dereq_(12),
          createArrayIncludes = _dereq_(11),
          speciesConstructor = _dereq_(95),
          ArrayIterators = _dereq_(130),
          Iterators = _dereq_(56),
          $iterDetect = _dereq_(54),
          setSpecies = _dereq_(91),
          arrayFill = _dereq_(9),
          arrayCopyWithin = _dereq_(8),
          $DP = _dereq_(67),
          $GOPD = _dereq_(70),
          dP = $DP.f,
          gOPD = $GOPD.f,
          RangeError = global.RangeError,
          TypeError = global.TypeError,
          Uint8Array = global.Uint8Array,
          ARRAY_BUFFER = 'ArrayBuffer',
          SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
          BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
          PROTOTYPE = 'prototype',
          ArrayProto = Array[PROTOTYPE],
          $ArrayBuffer = $buffer.ArrayBuffer,
          $DataView = $buffer.DataView,
          arrayForEach = createArrayMethod(0),
          arrayFilter = createArrayMethod(2),
          arraySome = createArrayMethod(3),
          arrayEvery = createArrayMethod(4),
          arrayFind = createArrayMethod(5),
          arrayFindIndex = createArrayMethod(6),
          arrayIncludes = createArrayIncludes(true),
          arrayIndexOf = createArrayIncludes(false),
          arrayValues = ArrayIterators.values,
          arrayKeys = ArrayIterators.keys,
          arrayEntries = ArrayIterators.entries,
          arrayLastIndexOf = ArrayProto.lastIndexOf,
          arrayReduce = ArrayProto.reduce,
          arrayReduceRight = ArrayProto.reduceRight,
          arrayJoin = ArrayProto.join,
          arraySort = ArrayProto.sort,
          arraySlice = ArrayProto.slice,
          arrayToString = ArrayProto.toString,
          arrayToLocaleString = ArrayProto.toLocaleString,
          ITERATOR = wks('iterator'),
          TAG = wks('toStringTag'),
          TYPED_CONSTRUCTOR = uid('typed_constructor'),
          DEF_CONSTRUCTOR = uid('def_constructor'),
          ALL_CONSTRUCTORS = $typed.CONSTR,
          TYPED_ARRAY = $typed.TYPED,
          VIEW = $typed.VIEW,
          WRONG_LENGTH = 'Wrong length!';

      var $map = createArrayMethod(1, function (O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });

      var LITTLE_ENDIAN = fails(function () {
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });

      var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
        new Uint8Array(1).set({});
      });

      var strictToLength = function strictToLength(it, SAME) {
        if (it === undefined) throw TypeError(WRONG_LENGTH);
        var number = +it,
            length = toLength(it);
        if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
        return length;
      };

      var toOffset = function toOffset(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      var validate = function validate(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function allocate(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }return new C(length);
      };

      var speciesFromList = function speciesFromList(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function fromList(C, list) {
        var index = 0,
            length = list.length,
            result = allocate(C, length);
        while (length > index) {
          result[index] = list[index++];
        }return result;
      };

      var addGetter = function addGetter(it, key, internal) {
        dP(it, key, { get: function get$$1() {
            return this._d[internal];
          } });
      };

      var $from = function from(source /*, mapfn, thisArg */) {
        var O = toObject(source),
            aLen = arguments.length,
            mapfn = aLen > 1 ? arguments[1] : undefined,
            mapping = mapfn !== undefined,
            iterFn = getIterFn(O),
            i,
            length,
            values,
            result,
            step,
            iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      var $of = function of() /*...items*/{
        var index = 0,
            length = arguments.length,
            result = allocate(this, length);
        while (length > index) {
          result[index] = arguments[index++];
        }return result;
      };

      // iOS Safari 6.x fails here
      var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
        arrayToLocaleString.call(new Uint8Array(1));
      });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start /*, end */) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn /*, thisArg */) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value /*, start, end */) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn /*, thisArg */) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate /*, thisArg */) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate /*, thisArg */) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn /*, thisArg */) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement /*, fromIndex */) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement /*, fromIndex */) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn /*, thisArg */) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn /*, initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn /*, initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this,
              length = validate(that).length,
              middle = Math.floor(length / 2),
              index = 0,
              value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }return that;
        },
        some: function some(callbackfn /*, thisArg */) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this),
              length = O.length,
              $begin = toIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set$$1(arrayLike /*, offset */) {
        validate(this);
        var offset = toOffset(arguments[1], 1),
            length = this.length,
            src = toObject(arrayLike),
            len = toLength(src.length),
            index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) {
          this[offset + index] = src[index++];
        }
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function isTAIndex(target, key) {
        return isObject(target) && target[TYPED_ARRAY] && (typeof key === "undefined" ? "undefined" : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
      };
      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };
      var $setDesc = function defineProperty$$1(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
        // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
          target[key] = desc.value;
          return target;
        } else return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (fails(function () {
        arrayToString.call({});
      })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function constructor() {/* noop */},
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get: function get$$1() {
          return this[TYPED_ARRAY];
        }
      });

      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
            ISNT_UINT8 = NAME != 'Uint8Array',
            GETTER = 'get' + KEY,
            SETTER = 'set' + KEY,
            TypedArray = global[NAME],
            Base = TypedArray || {},
            TAC = TypedArray && getPrototypeOf(TypedArray),
            FORCED = !TypedArray || !$typed.ABV,
            O = {},
            TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        var getter = function getter(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        var setter = function setter(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        var addElement = function addElement(that, index) {
          dP(that, index, {
            get: function get$$1() {
              return getter(this, index);
            },
            set: function set$$1(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };
        if (FORCED) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            var index = 0,
                offset = 0,
                buffer,
                byteLength,
                length,
                klass;
            if (!isObject(data)) {
              length = strictToLength(data, true);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }
              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }
            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });
            while (index < length) {
              addElement(that, index++);
            }
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!$iterDetect(function (iter) {
          // V8 works with iterators, but fails in many other cases
          // https://code.google.com/p/v8/issues/detail?id=4552
          new TypedArray(null); // eslint-disable-line no-new
          new TypedArray(iter); // eslint-disable-line no-new
        }, true)) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass;
            // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645
            if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        var $nativeIterator = TypedArrayPrototype[ITERATOR],
            CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
            $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function get$$1() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES,
          from: $from,
          of: $of
        });

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

        $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

        $export($export.P + $export.F * fails(function () {
          new TypedArray(1).slice();
        }), NAME, { slice: $slice });

        $export($export.P + $export.F * (fails(function () {
          return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
        }) || !fails(function () {
          TypedArrayPrototype.toLocaleString.call([1, 2]);
        })), NAME, { toLocaleString: $toLocaleString });

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function () {/* empty */};
  }, { "105": 105, "106": 106, "108": 108, "109": 109, "11": 11, "110": 110, "112": 112, "113": 113, "114": 114, "117": 117, "118": 118, "12": 12, "130": 130, "17": 17, "25": 25, "28": 28, "32": 32, "34": 34, "38": 38, "39": 39, "40": 40, "46": 46, "49": 49, "54": 54, "56": 56, "58": 58, "6": 6, "66": 66, "67": 67, "70": 70, "72": 72, "74": 74, "8": 8, "85": 85, "86": 86, "89": 89, "9": 9, "91": 91, "95": 95 }], 112: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        DESCRIPTORS = _dereq_(28),
        LIBRARY = _dereq_(58),
        $typed = _dereq_(113),
        hide = _dereq_(40),
        redefineAll = _dereq_(86),
        fails = _dereq_(34),
        anInstance = _dereq_(6),
        toInteger = _dereq_(106),
        toLength = _dereq_(108),
        gOPN = _dereq_(72).f,
        dP = _dereq_(67).f,
        arrayFill = _dereq_(9),
        setToStringTag = _dereq_(92),
        ARRAY_BUFFER = 'ArrayBuffer',
        DATA_VIEW = 'DataView',
        PROTOTYPE = 'prototype',
        WRONG_LENGTH = 'Wrong length!',
        WRONG_INDEX = 'Wrong index!',
        $ArrayBuffer = global[ARRAY_BUFFER],
        $DataView = global[DATA_VIEW],
        Math = global.Math,
        RangeError = global.RangeError,
        Infinity = global.Infinity,
        BaseBuffer = $ArrayBuffer,
        abs = Math.abs,
        pow = Math.pow,
        floor = Math.floor,
        log = Math.log,
        LN2 = Math.LN2,
        BUFFER = 'buffer',
        BYTE_LENGTH = 'byteLength',
        BYTE_OFFSET = 'byteOffset',
        $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
        $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
        $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

    // IEEE754 conversions based on https://github.com/feross/ieee754
    var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
      var buffer = Array(nBytes),
          eLen = nBytes * 8 - mLen - 1,
          eMax = (1 << eLen) - 1,
          eBias = eMax >> 1,
          rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
          i = 0,
          s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
          e,
          m,
          c;
      value = abs(value);
      if (value != value || value === Infinity) {
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);
        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
      buffer[--i] |= s * 128;
      return buffer;
    };
    var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1,
          eMax = (1 << eLen) - 1,
          eBias = eMax >> 1,
          nBits = eLen - 7,
          i = nBytes - 1,
          s = buffer[i--],
          e = s & 127,
          m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }return (s ? -1 : 1) * m * pow(2, e - mLen);
    };

    var unpackI32 = function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    };
    var packI8 = function packI8(it) {
      return [it & 0xff];
    };
    var packI16 = function packI16(it) {
      return [it & 0xff, it >> 8 & 0xff];
    };
    var packI32 = function packI32(it) {
      return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
    };
    var packF64 = function packF64(it) {
      return packIEEE754(it, 52, 8);
    };
    var packF32 = function packF32(it) {
      return packIEEE754(it, 23, 4);
    };

    var addGetter = function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, { get: function get$$1() {
          return this[internal];
        } });
    };

    var get$$1 = function get$$1(view, bytes, index, isLittleEndian) {
      var numIndex = +index,
          intIndex = toInteger(numIndex);
      if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b,
          start = intIndex + view[$OFFSET],
          pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    };
    var set$$1 = function set$$1(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index,
          intIndex = toInteger(numIndex);
      if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b,
          start = intIndex + view[$OFFSET],
          pack = conversion(+value);
      for (var i = 0; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    };

    var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
      anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
      var numberLength = +length,
          byteLength = toLength(numberLength);
      if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
      return byteLength;
    };

    if (!$typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        var byteLength = validateArrayBufferArguments(this, length);
        this._b = arrayFill.call(Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        anInstance(this, $DataView, DATA_VIEW);
        anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        var bufferLength = buffer[$LENGTH],
            offset = toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (DESCRIPTORS) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get$$1(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get$$1(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset /*, littleEndian */) {
          var bytes = get$$1(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset /*, littleEndian */) {
          var bytes = get$$1(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset /*, littleEndian */) {
          return unpackI32(get$$1(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset /*, littleEndian */) {
          return unpackI32(get$$1(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
          return unpackIEEE754(get$$1(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
          return unpackIEEE754(get$$1(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set$$1(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set$$1(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
          set$$1(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
          set$$1(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
          set$$1(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
          set$$1(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
          set$$1(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
          set$$1(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (!fails(function () {
        new $ArrayBuffer(); // eslint-disable-line no-new
      }) || !fails(function () {
        new $ArrayBuffer(.5); // eslint-disable-line no-new
      })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          return new BaseBuffer(validateArrayBufferArguments(this, length));
        };
        var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
        }
        if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
      }
      // iOS Safari 7.x bug
      var view = new $DataView(new $ArrayBuffer(2)),
          $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
        setInt8: function setInt8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        },
        setUint8: function setUint8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        }
      }, true);
    }
    setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    setToStringTag($DataView, DATA_VIEW);
    hide($DataView[PROTOTYPE], $typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  }, { "106": 106, "108": 108, "113": 113, "28": 28, "34": 34, "38": 38, "40": 40, "58": 58, "6": 6, "67": 67, "72": 72, "86": 86, "9": 9, "92": 92 }], 113: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        hide = _dereq_(40),
        uid = _dereq_(114),
        TYPED = uid('typed_array'),
        VIEW = uid('view'),
        ABV = !!(global.ArrayBuffer && global.DataView),
        CONSTR = ABV,
        i = 0,
        l = 9,
        Typed;

    var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

    while (i < l) {
      if (Typed = global[TypedArrayConstructors[i++]]) {
        hide(Typed.prototype, TYPED, true);
        hide(Typed.prototype, VIEW, true);
      } else CONSTR = false;
    }

    module.exports = {
      ABV: ABV,
      CONSTR: CONSTR,
      TYPED: TYPED,
      VIEW: VIEW
    };
  }, { "114": 114, "38": 38, "40": 40 }], 114: [function (_dereq_, module, exports) {
    var id = 0,
        px = Math.random();
    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
  }, {}], 115: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        core = _dereq_(23),
        LIBRARY = _dereq_(58),
        wksExt = _dereq_(116),
        defineProperty$$1 = _dereq_(67).f;
    module.exports = function (name) {
      var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
      if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$$1($Symbol, name, { value: wksExt.f(name) });
    };
  }, { "116": 116, "23": 23, "38": 38, "58": 58, "67": 67 }], 116: [function (_dereq_, module, exports) {
    exports.f = _dereq_(117);
  }, { "117": 117 }], 117: [function (_dereq_, module, exports) {
    var store = _dereq_(94)('wks'),
        uid = _dereq_(114),
        _Symbol = _dereq_(38).Symbol,
        USE_SYMBOL = typeof _Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
  }, { "114": 114, "38": 38, "94": 94 }], 118: [function (_dereq_, module, exports) {
    var classof = _dereq_(17),
        ITERATOR = _dereq_(117)('iterator'),
        Iterators = _dereq_(56);
    module.exports = _dereq_(23).getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
  }, { "117": 117, "17": 17, "23": 23, "56": 56 }], 119: [function (_dereq_, module, exports) {
    // https://github.com/benjamingr/RexExp.escape
    var $export = _dereq_(32),
        $re = _dereq_(88)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

    $export($export.S, 'RegExp', { escape: function escape(it) {
        return $re(it);
      } });
  }, { "32": 32, "88": 88 }], 120: [function (_dereq_, module, exports) {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    var $export = _dereq_(32);

    $export($export.P, 'Array', { copyWithin: _dereq_(8) });

    _dereq_(5)('copyWithin');
  }, { "32": 32, "5": 5, "8": 8 }], 121: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $every = _dereq_(12)(4);

    $export($export.P + $export.F * !_dereq_(96)([].every, true), 'Array', {
      // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
      every: function every(callbackfn /* , thisArg */) {
        return $every(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 122: [function (_dereq_, module, exports) {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    var $export = _dereq_(32);

    $export($export.P, 'Array', { fill: _dereq_(9) });

    _dereq_(5)('fill');
  }, { "32": 32, "5": 5, "9": 9 }], 123: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $filter = _dereq_(12)(2);

    $export($export.P + $export.F * !_dereq_(96)([].filter, true), 'Array', {
      // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 124: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

    var $export = _dereq_(32),
        $find = _dereq_(12)(6),
        KEY = 'findIndex',
        forced = true;
    // Shouldn't skip holes
    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      findIndex: function findIndex(callbackfn /*, that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    _dereq_(5)(KEY);
  }, { "12": 12, "32": 32, "5": 5 }], 125: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

    var $export = _dereq_(32),
        $find = _dereq_(12)(5),
        KEY = 'find',
        forced = true;
    // Shouldn't skip holes
    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      find: function find(callbackfn /*, that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    _dereq_(5)(KEY);
  }, { "12": 12, "32": 32, "5": 5 }], 126: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $forEach = _dereq_(12)(0),
        STRICT = _dereq_(96)([].forEach, true);

    $export($export.P + $export.F * !STRICT, 'Array', {
      // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
      forEach: function forEach(callbackfn /* , thisArg */) {
        return $forEach(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 127: [function (_dereq_, module, exports) {
    'use strict';

    var ctx = _dereq_(25),
        $export = _dereq_(32),
        toObject = _dereq_(109),
        call = _dereq_(51),
        isArrayIter = _dereq_(46),
        toLength = _dereq_(108),
        createProperty = _dereq_(24),
        getIterFn = _dereq_(118);

    $export($export.S + $export.F * !_dereq_(54)(function (iter) {
      Array.from(iter);
    }), 'Array', {
      // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
      from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
        var O = toObject(arrayLike),
            C = typeof this == 'function' ? this : Array,
            aLen = arguments.length,
            mapfn = aLen > 1 ? arguments[1] : undefined,
            mapping = mapfn !== undefined,
            index = 0,
            iterFn = getIterFn(O),
            length,
            result,
            step,
            iterator;
        if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
        // if object isn't iterable or it's array with default iterator - use simple case
        if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
          }
        } else {
          length = toLength(O.length);
          for (result = new C(length); length > index; index++) {
            createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
          }
        }
        result.length = index;
        return result;
      }
    });
  }, { "108": 108, "109": 109, "118": 118, "24": 24, "25": 25, "32": 32, "46": 46, "51": 51, "54": 54 }], 128: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $indexOf = _dereq_(11)(false),
        $native = [].indexOf,
        NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
      // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
      indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
        return NEGATIVE_ZERO
        // convert -0 to +0
        ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
      }
    });
  }, { "11": 11, "32": 32, "96": 96 }], 129: [function (_dereq_, module, exports) {
    // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
    var $export = _dereq_(32);

    $export($export.S, 'Array', { isArray: _dereq_(47) });
  }, { "32": 32, "47": 47 }], 130: [function (_dereq_, module, exports) {
    'use strict';

    var addToUnscopables = _dereq_(5),
        step = _dereq_(55),
        Iterators = _dereq_(56),
        toIObject = _dereq_(107);

    // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()
    module.exports = _dereq_(53)(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
      var O = this._t,
          kind = this._k,
          index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }
      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    Iterators.Arguments = Iterators.Array;

    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
  }, { "107": 107, "5": 5, "53": 53, "55": 55, "56": 56 }], 131: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.13 Array.prototype.join(separator)

    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        arrayJoin = [].join;

    // fallback for not array-like strings
    $export($export.P + $export.F * (_dereq_(45) != Object || !_dereq_(96)(arrayJoin)), 'Array', {
      join: function join(separator) {
        return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
      }
    });
  }, { "107": 107, "32": 32, "45": 45, "96": 96 }], 132: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        toInteger = _dereq_(106),
        toLength = _dereq_(108),
        $native = [].lastIndexOf,
        NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
      // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
      lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
        // convert -0 to +0
        if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
        var O = toIObject(this),
            length = toLength(O.length),
            index = length - 1;
        if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
        if (index < 0) index = length + index;
        for (; index >= 0; index--) {
          if (index in O) if (O[index] === searchElement) return index || 0;
        }return -1;
      }
    });
  }, { "106": 106, "107": 107, "108": 108, "32": 32, "96": 96 }], 133: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $map = _dereq_(12)(1);

    $export($export.P + $export.F * !_dereq_(96)([].map, true), 'Array', {
      // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 134: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        createProperty = _dereq_(24);

    // WebKit Array.of isn't generic
    $export($export.S + $export.F * _dereq_(34)(function () {
      function F() {}
      return !(Array.of.call(F) instanceof F);
    }), 'Array', {
      // 22.1.2.3 Array.of( ...items)
      of: function of() /* ...args */{
        var index = 0,
            aLen = arguments.length,
            result = new (typeof this == 'function' ? this : Array)(aLen);
        while (aLen > index) {
          createProperty(result, index, arguments[index++]);
        }result.length = aLen;
        return result;
      }
    });
  }, { "24": 24, "32": 32, "34": 34 }], 135: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $reduce = _dereq_(13);

    $export($export.P + $export.F * !_dereq_(96)([].reduceRight, true), 'Array', {
      // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
      reduceRight: function reduceRight(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], true);
      }
    });
  }, { "13": 13, "32": 32, "96": 96 }], 136: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $reduce = _dereq_(13);

    $export($export.P + $export.F * !_dereq_(96)([].reduce, true), 'Array', {
      // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], false);
      }
    });
  }, { "13": 13, "32": 32, "96": 96 }], 137: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        html = _dereq_(41),
        cof = _dereq_(18),
        toIndex = _dereq_(105),
        toLength = _dereq_(108),
        arraySlice = [].slice;

    // fallback for not array-like ES3 strings and DOM objects
    $export($export.P + $export.F * _dereq_(34)(function () {
      if (html) arraySlice.call(html);
    }), 'Array', {
      slice: function slice(begin, end) {
        var len = toLength(this.length),
            klass = cof(this);
        end = end === undefined ? len : end;
        if (klass == 'Array') return arraySlice.call(this, begin, end);
        var start = toIndex(begin, len),
            upTo = toIndex(end, len),
            size = toLength(upTo - start),
            cloned = Array(size),
            i = 0;
        for (; i < size; i++) {
          cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
        }return cloned;
      }
    });
  }, { "105": 105, "108": 108, "18": 18, "32": 32, "34": 34, "41": 41 }], 138: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $some = _dereq_(12)(3);

    $export($export.P + $export.F * !_dereq_(96)([].some, true), 'Array', {
      // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
      some: function some(callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 139: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        aFunction = _dereq_(3),
        toObject = _dereq_(109),
        fails = _dereq_(34),
        $sort = [].sort,
        test = [1, 2, 3];

    $export($export.P + $export.F * (fails(function () {
      // IE8-
      test.sort(undefined);
    }) || !fails(function () {
      // V8 bug
      test.sort(null);
      // Old WebKit
    }) || !_dereq_(96)($sort)), 'Array', {
      // 22.1.3.25 Array.prototype.sort(comparefn)
      sort: function sort(comparefn) {
        return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
      }
    });
  }, { "109": 109, "3": 3, "32": 32, "34": 34, "96": 96 }], 140: [function (_dereq_, module, exports) {
    _dereq_(91)('Array');
  }, { "91": 91 }], 141: [function (_dereq_, module, exports) {
    // 20.3.3.1 / 15.9.4.4 Date.now()
    var $export = _dereq_(32);

    $export($export.S, 'Date', { now: function now() {
        return new Date().getTime();
      } });
  }, { "32": 32 }], 142: [function (_dereq_, module, exports) {
    'use strict';
    // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

    var $export = _dereq_(32),
        fails = _dereq_(34),
        getTime = Date.prototype.getTime;

    var lz = function lz(num) {
      return num > 9 ? num : '0' + num;
    };

    // PhantomJS / old WebKit has a broken implementations
    $export($export.P + $export.F * (fails(function () {
      return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
    }) || !fails(function () {
      new Date(NaN).toISOString();
    })), 'Date', {
      toISOString: function toISOString() {
        if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
        var d = this,
            y = d.getUTCFullYear(),
            m = d.getUTCMilliseconds(),
            s = y < 0 ? '-' : y > 9999 ? '+' : '';
        return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
      }
    });
  }, { "32": 32, "34": 34 }], 143: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110);

    $export($export.P + $export.F * _dereq_(34)(function () {
      return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
          return 1;
        } }) !== 1;
    }), 'Date', {
      toJSON: function toJSON(key) {
        var O = toObject(this),
            pv = toPrimitive(O);
        return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
      }
    });
  }, { "109": 109, "110": 110, "32": 32, "34": 34 }], 144: [function (_dereq_, module, exports) {
    var TO_PRIMITIVE = _dereq_(117)('toPrimitive'),
        proto = Date.prototype;

    if (!(TO_PRIMITIVE in proto)) _dereq_(40)(proto, TO_PRIMITIVE, _dereq_(26));
  }, { "117": 117, "26": 26, "40": 40 }], 145: [function (_dereq_, module, exports) {
    var DateProto = Date.prototype,
        INVALID_DATE = 'Invalid Date',
        TO_STRING = 'toString',
        $toString = DateProto[TO_STRING],
        getTime = DateProto.getTime;
    if (new Date(NaN) + '' != INVALID_DATE) {
      _dereq_(87)(DateProto, TO_STRING, function toString() {
        var value = getTime.call(this);
        return value === value ? $toString.call(this) : INVALID_DATE;
      });
    }
  }, { "87": 87 }], 146: [function (_dereq_, module, exports) {
    // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
    var $export = _dereq_(32);

    $export($export.P, 'Function', { bind: _dereq_(16) });
  }, { "16": 16, "32": 32 }], 147: [function (_dereq_, module, exports) {
    'use strict';

    var isObject = _dereq_(49),
        getPrototypeOf = _dereq_(74),
        HAS_INSTANCE = _dereq_(117)('hasInstance'),
        FunctionProto = Function.prototype;
    // 19.2.3.6 Function.prototype[@@hasInstance](V)
    if (!(HAS_INSTANCE in FunctionProto)) _dereq_(67).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
        if (typeof this != 'function' || !isObject(O)) return false;
        if (!isObject(this.prototype)) return O instanceof this;
        // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
        while (O = getPrototypeOf(O)) {
          if (this.prototype === O) return true;
        }return false;
      } });
  }, { "117": 117, "49": 49, "67": 67, "74": 74 }], 148: [function (_dereq_, module, exports) {
    var dP = _dereq_(67).f,
        createDesc = _dereq_(85),
        has = _dereq_(39),
        FProto = Function.prototype,
        nameRE = /^\s*function ([^ (]*)/,
        NAME = 'name';

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    // 19.2.4.2 name
    NAME in FProto || _dereq_(28) && dP(FProto, NAME, {
      configurable: true,
      get: function get$$1() {
        try {
          var that = this,
              name = ('' + that).match(nameRE)[1];
          has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
          return name;
        } catch (e) {
          return '';
        }
      }
    });
  }, { "28": 28, "39": 39, "67": 67, "85": 85 }], 149: [function (_dereq_, module, exports) {
    'use strict';

    var strong = _dereq_(19);

    // 23.1 Map Objects
    module.exports = _dereq_(22)('Map', function (get$$1) {
      return function Map() {
        return get$$1(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get$$1(key) {
        var entry = strong.getEntry(this, key);
        return entry && entry.v;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set$$1(key, value) {
        return strong.def(this, key === 0 ? 0 : key, value);
      }
    }, strong, true);
  }, { "19": 19, "22": 22 }], 150: [function (_dereq_, module, exports) {
    // 20.2.2.3 Math.acosh(x)
    var $export = _dereq_(32),
        log1p = _dereq_(60),
        sqrt = Math.sqrt,
        $acosh = Math.acosh;

    $export($export.S + $export.F * !($acosh
    // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
    && Math.floor($acosh(Number.MAX_VALUE)) == 710
    // Tor Browser bug: Math.acosh(Infinity) -> NaN 
    && $acosh(Infinity) == Infinity), 'Math', {
      acosh: function acosh(x) {
        return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
      }
    });
  }, { "32": 32, "60": 60 }], 151: [function (_dereq_, module, exports) {
    // 20.2.2.5 Math.asinh(x)
    var $export = _dereq_(32),
        $asinh = Math.asinh;

    function asinh(x) {
      return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
    }

    // Tor Browser bug: Math.asinh(0) -> -0 
    $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
  }, { "32": 32 }], 152: [function (_dereq_, module, exports) {
    // 20.2.2.7 Math.atanh(x)
    var $export = _dereq_(32),
        $atanh = Math.atanh;

    // Tor Browser bug: Math.atanh(-0) -> 0 
    $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
      atanh: function atanh(x) {
        return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
      }
    });
  }, { "32": 32 }], 153: [function (_dereq_, module, exports) {
    // 20.2.2.9 Math.cbrt(x)
    var $export = _dereq_(32),
        sign = _dereq_(61);

    $export($export.S, 'Math', {
      cbrt: function cbrt(x) {
        return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
      }
    });
  }, { "32": 32, "61": 61 }], 154: [function (_dereq_, module, exports) {
    // 20.2.2.11 Math.clz32(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      clz32: function clz32(x) {
        return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
      }
    });
  }, { "32": 32 }], 155: [function (_dereq_, module, exports) {
    // 20.2.2.12 Math.cosh(x)
    var $export = _dereq_(32),
        exp = Math.exp;

    $export($export.S, 'Math', {
      cosh: function cosh(x) {
        return (exp(x = +x) + exp(-x)) / 2;
      }
    });
  }, { "32": 32 }], 156: [function (_dereq_, module, exports) {
    // 20.2.2.14 Math.expm1(x)
    var $export = _dereq_(32),
        $expm1 = _dereq_(59);

    $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
  }, { "32": 32, "59": 59 }], 157: [function (_dereq_, module, exports) {
    // 20.2.2.16 Math.fround(x)
    var $export = _dereq_(32),
        sign = _dereq_(61),
        pow = Math.pow,
        EPSILON = pow(2, -52),
        EPSILON32 = pow(2, -23),
        MAX32 = pow(2, 127) * (2 - EPSILON32),
        MIN32 = pow(2, -126);

    var roundTiesToEven = function roundTiesToEven(n) {
      return n + 1 / EPSILON - 1 / EPSILON;
    };

    $export($export.S, 'Math', {
      fround: function fround(x) {
        var $abs = Math.abs(x),
            $sign = sign(x),
            a,
            result;
        if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
        a = (1 + EPSILON32 / EPSILON) * $abs;
        result = a - (a - $abs);
        if (result > MAX32 || result != result) return $sign * Infinity;
        return $sign * result;
      }
    });
  }, { "32": 32, "61": 61 }], 158: [function (_dereq_, module, exports) {
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    var $export = _dereq_(32),
        abs = Math.abs;

    $export($export.S, 'Math', {
      hypot: function hypot(value1, value2) {
        // eslint-disable-line no-unused-vars
        var sum = 0,
            i = 0,
            aLen = arguments.length,
            larg = 0,
            arg,
            div;
        while (i < aLen) {
          arg = abs(arguments[i++]);
          if (larg < arg) {
            div = larg / arg;
            sum = sum * div * div + 1;
            larg = arg;
          } else if (arg > 0) {
            div = arg / larg;
            sum += div * div;
          } else sum += arg;
        }
        return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
      }
    });
  }, { "32": 32 }], 159: [function (_dereq_, module, exports) {
    // 20.2.2.18 Math.imul(x, y)
    var $export = _dereq_(32),
        $imul = Math.imul;

    // some WebKit versions fails with big numbers, some has wrong arity
    $export($export.S + $export.F * _dereq_(34)(function () {
      return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
    }), 'Math', {
      imul: function imul(x, y) {
        var UINT16 = 0xffff,
            xn = +x,
            yn = +y,
            xl = UINT16 & xn,
            yl = UINT16 & yn;
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
      }
    });
  }, { "32": 32, "34": 34 }], 160: [function (_dereq_, module, exports) {
    // 20.2.2.21 Math.log10(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      log10: function log10(x) {
        return Math.log(x) / Math.LN10;
      }
    });
  }, { "32": 32 }], 161: [function (_dereq_, module, exports) {
    // 20.2.2.20 Math.log1p(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', { log1p: _dereq_(60) });
  }, { "32": 32, "60": 60 }], 162: [function (_dereq_, module, exports) {
    // 20.2.2.22 Math.log2(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      log2: function log2(x) {
        return Math.log(x) / Math.LN2;
      }
    });
  }, { "32": 32 }], 163: [function (_dereq_, module, exports) {
    // 20.2.2.28 Math.sign(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', { sign: _dereq_(61) });
  }, { "32": 32, "61": 61 }], 164: [function (_dereq_, module, exports) {
    // 20.2.2.30 Math.sinh(x)
    var $export = _dereq_(32),
        expm1 = _dereq_(59),
        exp = Math.exp;

    // V8 near Chromium 38 has a problem with very small numbers
    $export($export.S + $export.F * _dereq_(34)(function () {
      return !Math.sinh(-2e-17) != -2e-17;
    }), 'Math', {
      sinh: function sinh(x) {
        return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
      }
    });
  }, { "32": 32, "34": 34, "59": 59 }], 165: [function (_dereq_, module, exports) {
    // 20.2.2.33 Math.tanh(x)
    var $export = _dereq_(32),
        expm1 = _dereq_(59),
        exp = Math.exp;

    $export($export.S, 'Math', {
      tanh: function tanh(x) {
        var a = expm1(x = +x),
            b = expm1(-x);
        return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
      }
    });
  }, { "32": 32, "59": 59 }], 166: [function (_dereq_, module, exports) {
    // 20.2.2.34 Math.trunc(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      trunc: function trunc(it) {
        return (it > 0 ? Math.floor : Math.ceil)(it);
      }
    });
  }, { "32": 32 }], 167: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        has = _dereq_(39),
        cof = _dereq_(18),
        inheritIfRequired = _dereq_(43),
        toPrimitive = _dereq_(110),
        fails = _dereq_(34),
        gOPN = _dereq_(72).f,
        gOPD = _dereq_(70).f,
        dP = _dereq_(67).f,
        $trim = _dereq_(102).trim,
        NUMBER = 'Number',
        $Number = global[NUMBER],
        Base = $Number,
        proto = $Number.prototype
    // Opera ~12 has broken Object#toString
    ,
        BROKEN_COF = cof(_dereq_(66)(proto)) == NUMBER,
        TRIM = 'trim' in String.prototype;

    // 7.1.3 ToNumber(argument)
    var toNumber = function toNumber(argument) {
      var it = toPrimitive(argument, false);
      if (typeof it == 'string' && it.length > 2) {
        it = TRIM ? it.trim() : $trim(it, 3);
        var first = it.charCodeAt(0),
            third,
            radix,
            maxCode;
        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:case 98:
              radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
            case 79:case 111:
              radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
            default:
              return +it;
          }
          for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
            code = digits.charCodeAt(i);
            // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols
            if (code < 48 || code > maxCode) return NaN;
          }return parseInt(digits, radix);
        }
      }return +it;
    };

    if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
      $Number = function Number(value) {
        var it = arguments.length < 1 ? 0 : value,
            that = this;
        return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails(function () {
          proto.valueOf.call(that);
        }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
      };
      for (var keys = _dereq_(28) ? gOPN(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
        if (has(Base, key = keys[j]) && !has($Number, key)) {
          dP($Number, key, gOPD(Base, key));
        }
      }
      $Number.prototype = proto;
      proto.constructor = $Number;
      _dereq_(87)(global, NUMBER, $Number);
    }
  }, { "102": 102, "110": 110, "18": 18, "28": 28, "34": 34, "38": 38, "39": 39, "43": 43, "66": 66, "67": 67, "70": 70, "72": 72, "87": 87 }], 168: [function (_dereq_, module, exports) {
    // 20.1.2.1 Number.EPSILON
    var $export = _dereq_(32);

    $export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
  }, { "32": 32 }], 169: [function (_dereq_, module, exports) {
    // 20.1.2.2 Number.isFinite(number)
    var $export = _dereq_(32),
        _isFinite = _dereq_(38).isFinite;

    $export($export.S, 'Number', {
      isFinite: function isFinite(it) {
        return typeof it == 'number' && _isFinite(it);
      }
    });
  }, { "32": 32, "38": 38 }], 170: [function (_dereq_, module, exports) {
    // 20.1.2.3 Number.isInteger(number)
    var $export = _dereq_(32);

    $export($export.S, 'Number', { isInteger: _dereq_(48) });
  }, { "32": 32, "48": 48 }], 171: [function (_dereq_, module, exports) {
    // 20.1.2.4 Number.isNaN(number)
    var $export = _dereq_(32);

    $export($export.S, 'Number', {
      isNaN: function isNaN(number) {
        return number != number;
      }
    });
  }, { "32": 32 }], 172: [function (_dereq_, module, exports) {
    // 20.1.2.5 Number.isSafeInteger(number)
    var $export = _dereq_(32),
        isInteger = _dereq_(48),
        abs = Math.abs;

    $export($export.S, 'Number', {
      isSafeInteger: function isSafeInteger(number) {
        return isInteger(number) && abs(number) <= 0x1fffffffffffff;
      }
    });
  }, { "32": 32, "48": 48 }], 173: [function (_dereq_, module, exports) {
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    var $export = _dereq_(32);

    $export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
  }, { "32": 32 }], 174: [function (_dereq_, module, exports) {
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    var $export = _dereq_(32);

    $export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
  }, { "32": 32 }], 175: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseFloat = _dereq_(81);
    // 20.1.2.12 Number.parseFloat(string)
    $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
  }, { "32": 32, "81": 81 }], 176: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseInt = _dereq_(82);
    // 20.1.2.13 Number.parseInt(string, radix)
    $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
  }, { "32": 32, "82": 82 }], 177: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toInteger = _dereq_(106),
        aNumberValue = _dereq_(4),
        repeat = _dereq_(101),
        $toFixed = 1..toFixed,
        floor = Math.floor,
        data = [0, 0, 0, 0, 0, 0],
        ERROR = 'Number.toFixed: incorrect invocation!',
        ZERO = '0';

    var multiply = function multiply(n, c) {
      var i = -1,
          c2 = c;
      while (++i < 6) {
        c2 += n * data[i];
        data[i] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };
    var divide = function divide(n) {
      var i = 6,
          c = 0;
      while (--i >= 0) {
        c += data[i];
        data[i] = floor(c / n);
        c = c % n * 1e7;
      }
    };
    var numToString = function numToString() {
      var i = 6,
          s = '';
      while (--i >= 0) {
        if (s !== '' || i === 0 || data[i] !== 0) {
          var t = String(data[i]);
          s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
        }
      }return s;
    };
    var pow = function pow(x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    };
    var log = function log(x) {
      var n = 0,
          x2 = x;
      while (x2 >= 4096) {
        n += 12;
        x2 /= 4096;
      }
      while (x2 >= 2) {
        n += 1;
        x2 /= 2;
      }return n;
    };

    $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !_dereq_(34)(function () {
      // V8 ~ Android 4.3-
      $toFixed.call({});
    })), 'Number', {
      toFixed: function toFixed(fractionDigits) {
        var x = aNumberValue(this, ERROR),
            f = toInteger(fractionDigits),
            s = '',
            m = ZERO,
            e,
            z,
            j,
            k;
        if (f < 0 || f > 20) throw RangeError(ERROR);
        if (x != x) return 'NaN';
        if (x <= -1e21 || x >= 1e21) return String(x);
        if (x < 0) {
          s = '-';
          x = -x;
        }
        if (x > 1e-21) {
          e = log(x * pow(2, 69, 1)) - 69;
          z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
          z *= 0x10000000000000;
          e = 52 - e;
          if (e > 0) {
            multiply(0, z);
            j = f;
            while (j >= 7) {
              multiply(1e7, 0);
              j -= 7;
            }
            multiply(pow(10, j, 1), 0);
            j = e - 1;
            while (j >= 23) {
              divide(1 << 23);
              j -= 23;
            }
            divide(1 << j);
            multiply(1, 1);
            divide(2);
            m = numToString();
          } else {
            multiply(0, z);
            multiply(1 << -e, 0);
            m = numToString() + repeat.call(ZERO, f);
          }
        }
        if (f > 0) {
          k = m.length;
          m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
        } else {
          m = s + m;
        }return m;
      }
    });
  }, { "101": 101, "106": 106, "32": 32, "34": 34, "4": 4 }], 178: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $fails = _dereq_(34),
        aNumberValue = _dereq_(4),
        $toPrecision = 1..toPrecision;

    $export($export.P + $export.F * ($fails(function () {
      // IE7-
      return $toPrecision.call(1, undefined) !== '1';
    }) || !$fails(function () {
      // V8 ~ Android 4.3-
      $toPrecision.call({});
    })), 'Number', {
      toPrecision: function toPrecision(precision) {
        var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
        return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
      }
    });
  }, { "32": 32, "34": 34, "4": 4 }], 179: [function (_dereq_, module, exports) {
    // 19.1.3.1 Object.assign(target, source)
    var $export = _dereq_(32);

    $export($export.S + $export.F, 'Object', { assign: _dereq_(65) });
  }, { "32": 32, "65": 65 }], 180: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    $export($export.S, 'Object', { create: _dereq_(66) });
  }, { "32": 32, "66": 66 }], 181: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    $export($export.S + $export.F * !_dereq_(28), 'Object', { defineProperties: _dereq_(68) });
  }, { "28": 28, "32": 32, "68": 68 }], 182: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    $export($export.S + $export.F * !_dereq_(28), 'Object', { defineProperty: _dereq_(67).f });
  }, { "28": 28, "32": 32, "67": 67 }], 183: [function (_dereq_, module, exports) {
    // 19.1.2.5 Object.freeze(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('freeze', function ($freeze) {
      return function freeze(it) {
        return $freeze && isObject(it) ? $freeze(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 184: [function (_dereq_, module, exports) {
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    var toIObject = _dereq_(107),
        $getOwnPropertyDescriptor = _dereq_(70).f;

    _dereq_(78)('getOwnPropertyDescriptor', function () {
      return function getOwnPropertyDescriptor(it, key) {
        return $getOwnPropertyDescriptor(toIObject(it), key);
      };
    });
  }, { "107": 107, "70": 70, "78": 78 }], 185: [function (_dereq_, module, exports) {
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    _dereq_(78)('getOwnPropertyNames', function () {
      return _dereq_(71).f;
    });
  }, { "71": 71, "78": 78 }], 186: [function (_dereq_, module, exports) {
    // 19.1.2.9 Object.getPrototypeOf(O)
    var toObject = _dereq_(109),
        $getPrototypeOf = _dereq_(74);

    _dereq_(78)('getPrototypeOf', function () {
      return function getPrototypeOf(it) {
        return $getPrototypeOf(toObject(it));
      };
    });
  }, { "109": 109, "74": 74, "78": 78 }], 187: [function (_dereq_, module, exports) {
    // 19.1.2.11 Object.isExtensible(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isExtensible', function ($isExtensible) {
      return function isExtensible(it) {
        return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
      };
    });
  }, { "49": 49, "78": 78 }], 188: [function (_dereq_, module, exports) {
    // 19.1.2.12 Object.isFrozen(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isFrozen', function ($isFrozen) {
      return function isFrozen(it) {
        return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
      };
    });
  }, { "49": 49, "78": 78 }], 189: [function (_dereq_, module, exports) {
    // 19.1.2.13 Object.isSealed(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isSealed', function ($isSealed) {
      return function isSealed(it) {
        return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
      };
    });
  }, { "49": 49, "78": 78 }], 190: [function (_dereq_, module, exports) {
    // 19.1.3.10 Object.is(value1, value2)
    var $export = _dereq_(32);
    $export($export.S, 'Object', { is: _dereq_(89) });
  }, { "32": 32, "89": 89 }], 191: [function (_dereq_, module, exports) {
    // 19.1.2.14 Object.keys(O)
    var toObject = _dereq_(109),
        $keys = _dereq_(76);

    _dereq_(78)('keys', function () {
      return function keys(it) {
        return $keys(toObject(it));
      };
    });
  }, { "109": 109, "76": 76, "78": 78 }], 192: [function (_dereq_, module, exports) {
    // 19.1.2.15 Object.preventExtensions(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('preventExtensions', function ($preventExtensions) {
      return function preventExtensions(it) {
        return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 193: [function (_dereq_, module, exports) {
    // 19.1.2.17 Object.seal(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('seal', function ($seal) {
      return function seal(it) {
        return $seal && isObject(it) ? $seal(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 194: [function (_dereq_, module, exports) {
    // 19.1.3.19 Object.setPrototypeOf(O, proto)
    var $export = _dereq_(32);
    $export($export.S, 'Object', { setPrototypeOf: _dereq_(90).set });
  }, { "32": 32, "90": 90 }], 195: [function (_dereq_, module, exports) {
    'use strict';
    // 19.1.3.6 Object.prototype.toString()

    var classof = _dereq_(17),
        test = {};
    test[_dereq_(117)('toStringTag')] = 'z';
    if (test + '' != '[object z]') {
      _dereq_(87)(Object.prototype, 'toString', function toString() {
        return '[object ' + classof(this) + ']';
      }, true);
    }
  }, { "117": 117, "17": 17, "87": 87 }], 196: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseFloat = _dereq_(81);
    // 18.2.4 parseFloat(string)
    $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
  }, { "32": 32, "81": 81 }], 197: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseInt = _dereq_(82);
    // 18.2.5 parseInt(string, radix)
    $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
  }, { "32": 32, "82": 82 }], 198: [function (_dereq_, module, exports) {
    'use strict';

    var LIBRARY = _dereq_(58),
        global = _dereq_(38),
        ctx = _dereq_(25),
        classof = _dereq_(17),
        $export = _dereq_(32),
        isObject = _dereq_(49),
        aFunction = _dereq_(3),
        anInstance = _dereq_(6),
        forOf = _dereq_(37),
        speciesConstructor = _dereq_(95),
        task = _dereq_(104).set,
        microtask = _dereq_(64)(),
        PROMISE = 'Promise',
        TypeError = global.TypeError,
        process = global.process,
        $Promise = global[PROMISE],
        process = global.process,
        isNode = classof(process) == 'process',
        empty = function empty() {/* empty */},
        Internal,
        GenericPromiseCapability,
        Wrapper;

    var USE_NATIVE = !!function () {
      try {
        // correct subclassing with @@species support
        var promise = $Promise.resolve(1),
            FakePromise = (promise.constructor = {})[_dereq_(117)('species')] = function (exec) {
          exec(empty, empty);
        };
        // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
        return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
      } catch (e) {/* empty */}
    }();

    // helpers
    var sameConstructor = function sameConstructor(a, b) {
      // with library wrapper special case
      return a === b || a === $Promise && b === Wrapper;
    };
    var isThenable = function isThenable(it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var newPromiseCapability = function newPromiseCapability(C) {
      return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
    };
    var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve);
      this.reject = aFunction(reject);
    };
    var perform = function perform(exec) {
      try {
        exec();
      } catch (e) {
        return { error: e };
      }
    };
    var notify = function notify(promise, isReject) {
      if (promise._n) return;
      promise._n = true;
      var chain = promise._c;
      microtask(function () {
        var value = promise._v,
            ok = promise._s == 1,
            i = 0;
        var run = function run(reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              domain = reaction.domain,
              result,
              then;
          try {
            if (handler) {
              if (!ok) {
                if (promise._h == 2) onHandleUnhandled(promise);
                promise._h = 1;
              }
              if (handler === true) result = value;else {
                if (domain) domain.enter();
                result = handler(value);
                if (domain) domain.exit();
              }
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) {
          run(chain[i++]);
        } // variable length - can't use forEach
        promise._c = [];
        promise._n = false;
        if (isReject && !promise._h) onUnhandled(promise);
      });
    };
    var onUnhandled = function onUnhandled(promise) {
      task.call(global, function () {
        var value = promise._v,
            abrupt,
            handler,
            console;
        if (isUnhandled(promise)) {
          abrupt = perform(function () {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({ promise: promise, reason: value });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          promise._h = isNode || isUnhandled(promise) ? 2 : 1;
        }promise._a = undefined;
        if (abrupt) throw abrupt.error;
      });
    };
    var isUnhandled = function isUnhandled(promise) {
      if (promise._h == 1) return false;
      var chain = promise._a || promise._c,
          i = 0,
          reaction;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }return true;
    };
    var onHandleUnhandled = function onHandleUnhandled(promise) {
      task.call(global, function () {
        var handler;
        if (isNode) {
          process.emit('rejectionHandled', promise);
        } else if (handler = global.onrejectionhandled) {
          handler({ promise: promise, reason: promise._v });
        }
      });
    };
    var $reject = function $reject(value) {
      var promise = this;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise; // unwrap
      promise._v = value;
      promise._s = 2;
      if (!promise._a) promise._a = promise._c.slice();
      notify(promise, true);
    };
    var $resolve = function $resolve(value) {
      var promise = this,
          then;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise; // unwrap
      try {
        if (promise === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          microtask(function () {
            var wrapper = { _w: promise, _d: false }; // wrap
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          promise._v = value;
          promise._s = 1;
          notify(promise, false);
        }
      } catch (e) {
        $reject.call({ _w: promise, _d: false }, e); // wrap
      }
    };

    // constructor polyfill
    if (!USE_NATIVE) {
      // 25.4.3.1 Promise(executor)
      $Promise = function Promise(executor) {
        anInstance(this, $Promise, PROMISE, '_h');
        aFunction(executor);
        Internal.call(this);
        try {
          executor(ctx($resolve, this, 1), ctx($reject, this, 1));
        } catch (err) {
          $reject.call(this, err);
        }
      };
      Internal = function Promise(executor) {
        this._c = []; // <- awaiting reactions
        this._a = undefined; // <- checked in isUnhandled reactions
        this._s = 0; // <- state
        this._d = false; // <- done
        this._v = undefined; // <- value
        this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
        this._n = false; // <- notify
      };
      Internal.prototype = _dereq_(86)($Promise.prototype, {
        // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
        then: function then(onFulfilled, onRejected) {
          var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = isNode ? process.domain : undefined;
          this._c.push(reaction);
          if (this._a) this._a.push(reaction);
          if (this._s) notify(this, false);
          return reaction.promise;
        },
        // 25.4.5.1 Promise.prototype.catch(onRejected)
        'catch': function _catch(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      PromiseCapability = function PromiseCapability() {
        var promise = new Internal();
        this.promise = promise;
        this.resolve = ctx($resolve, promise, 1);
        this.reject = ctx($reject, promise, 1);
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
    _dereq_(92)($Promise, PROMISE);
    _dereq_(91)(PROMISE);
    Wrapper = _dereq_(23)[PROMISE];

    // statics
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
      // 25.4.4.5 Promise.reject(r)
      reject: function reject(r) {
        var capability = newPromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }
    });
    $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
      // 25.4.4.6 Promise.resolve(x)
      resolve: function resolve(x) {
        // instanceof instead of internal slot check because we should fix it without replacement native Promise core
        if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
        var capability = newPromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      }
    });
    $export($export.S + $export.F * !(USE_NATIVE && _dereq_(54)(function (iter) {
      $Promise.all(iter)['catch'](empty);
    })), PROMISE, {
      // 25.4.4.1 Promise.all(iterable)
      all: function all(iterable) {
        var C = this,
            capability = newPromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject;
        var abrupt = perform(function () {
          var values = [],
              index = 0,
              remaining = 1;
          forOf(iterable, false, function (promise) {
            var $index = index++,
                alreadyCalled = false;
            values.push(undefined);
            remaining++;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[$index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      },
      // 25.4.4.4 Promise.race(iterable)
      race: function race(iterable) {
        var C = this,
            capability = newPromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      }
    });
  }, { "104": 104, "117": 117, "17": 17, "23": 23, "25": 25, "3": 3, "32": 32, "37": 37, "38": 38, "49": 49, "54": 54, "58": 58, "6": 6, "64": 64, "86": 86, "91": 91, "92": 92, "95": 95 }], 199: [function (_dereq_, module, exports) {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    var $export = _dereq_(32),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        rApply = (_dereq_(38).Reflect || {}).apply,
        fApply = Function.apply;
    // MS Edge argumentsList argument is optional
    $export($export.S + $export.F * !_dereq_(34)(function () {
      rApply(function () {});
    }), 'Reflect', {
      apply: function apply(target, thisArgument, argumentsList) {
        var T = aFunction(target),
            L = anObject(argumentsList);
        return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
      }
    });
  }, { "3": 3, "32": 32, "34": 34, "38": 38, "7": 7 }], 200: [function (_dereq_, module, exports) {
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    var $export = _dereq_(32),
        create = _dereq_(66),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        isObject = _dereq_(49),
        fails = _dereq_(34),
        bind = _dereq_(16),
        rConstruct = (_dereq_(38).Reflect || {}).construct;

    // MS Edge supports only 2 arguments and argumentsList argument is optional
    // FF Nightly sets third argument as `new.target`, but does not create `this` from it
    var NEW_TARGET_BUG = fails(function () {
      function F() {}
      return !(rConstruct(function () {}, [], F) instanceof F);
    });
    var ARGS_BUG = !fails(function () {
      rConstruct(function () {});
    });

    $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
      construct: function construct(Target, args /*, newTarget*/) {
        aFunction(Target);
        anObject(args);
        var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
        if (Target == newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0:
              return new Target();
            case 1:
              return new Target(args[0]);
            case 2:
              return new Target(args[0], args[1]);
            case 3:
              return new Target(args[0], args[1], args[2]);
            case 4:
              return new Target(args[0], args[1], args[2], args[3]);
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null];
          $args.push.apply($args, args);
          return new (bind.apply(Target, $args))();
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype,
            instance = create(isObject(proto) ? proto : Object.prototype),
            result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    });
  }, { "16": 16, "3": 3, "32": 32, "34": 34, "38": 38, "49": 49, "66": 66, "7": 7 }], 201: [function (_dereq_, module, exports) {
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    var dP = _dereq_(67),
        $export = _dereq_(32),
        anObject = _dereq_(7),
        toPrimitive = _dereq_(110);

    // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
    $export($export.S + $export.F * _dereq_(34)(function () {
      Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
    }), 'Reflect', {
      defineProperty: function defineProperty$$1(target, propertyKey, attributes) {
        anObject(target);
        propertyKey = toPrimitive(propertyKey, true);
        anObject(attributes);
        try {
          dP.f(target, propertyKey, attributes);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "110": 110, "32": 32, "34": 34, "67": 67, "7": 7 }], 202: [function (_dereq_, module, exports) {
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    var $export = _dereq_(32),
        gOPD = _dereq_(70).f,
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      deleteProperty: function deleteProperty(target, propertyKey) {
        var desc = gOPD(anObject(target), propertyKey);
        return desc && !desc.configurable ? false : delete target[propertyKey];
      }
    });
  }, { "32": 32, "7": 7, "70": 70 }], 203: [function (_dereq_, module, exports) {
    'use strict';
    // 26.1.5 Reflect.enumerate(target)

    var $export = _dereq_(32),
        anObject = _dereq_(7);
    var Enumerate = function Enumerate(iterated) {
      this._t = anObject(iterated); // target
      this._i = 0; // next index
      var keys = this._k = [] // keys
      ,
          key;
      for (key in iterated) {
        keys.push(key);
      }
    };
    _dereq_(52)(Enumerate, 'Object', function () {
      var that = this,
          keys = that._k,
          key;
      do {
        if (that._i >= keys.length) return { value: undefined, done: true };
      } while (!((key = keys[that._i++]) in that._t));
      return { value: key, done: false };
    });

    $export($export.S, 'Reflect', {
      enumerate: function enumerate(target) {
        return new Enumerate(target);
      }
    });
  }, { "32": 32, "52": 52, "7": 7 }], 204: [function (_dereq_, module, exports) {
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    var gOPD = _dereq_(70),
        $export = _dereq_(32),
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return gOPD.f(anObject(target), propertyKey);
      }
    });
  }, { "32": 32, "7": 7, "70": 70 }], 205: [function (_dereq_, module, exports) {
    // 26.1.8 Reflect.getPrototypeOf(target)
    var $export = _dereq_(32),
        getProto = _dereq_(74),
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      getPrototypeOf: function getPrototypeOf(target) {
        return getProto(anObject(target));
      }
    });
  }, { "32": 32, "7": 7, "74": 74 }], 206: [function (_dereq_, module, exports) {
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    var gOPD = _dereq_(70),
        getPrototypeOf = _dereq_(74),
        has = _dereq_(39),
        $export = _dereq_(32),
        isObject = _dereq_(49),
        anObject = _dereq_(7);

    function get$$1(target, propertyKey /*, receiver*/) {
      var receiver = arguments.length < 3 ? target : arguments[2],
          desc,
          proto;
      if (anObject(target) === receiver) return target[propertyKey];
      if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
      if (isObject(proto = getPrototypeOf(target))) return get$$1(proto, propertyKey, receiver);
    }

    $export($export.S, 'Reflect', { get: get$$1 });
  }, { "32": 32, "39": 39, "49": 49, "7": 7, "70": 70, "74": 74 }], 207: [function (_dereq_, module, exports) {
    // 26.1.9 Reflect.has(target, propertyKey)
    var $export = _dereq_(32);

    $export($export.S, 'Reflect', {
      has: function has(target, propertyKey) {
        return propertyKey in target;
      }
    });
  }, { "32": 32 }], 208: [function (_dereq_, module, exports) {
    // 26.1.10 Reflect.isExtensible(target)
    var $export = _dereq_(32),
        anObject = _dereq_(7),
        $isExtensible = Object.isExtensible;

    $export($export.S, 'Reflect', {
      isExtensible: function isExtensible(target) {
        anObject(target);
        return $isExtensible ? $isExtensible(target) : true;
      }
    });
  }, { "32": 32, "7": 7 }], 209: [function (_dereq_, module, exports) {
    // 26.1.11 Reflect.ownKeys(target)
    var $export = _dereq_(32);

    $export($export.S, 'Reflect', { ownKeys: _dereq_(80) });
  }, { "32": 32, "80": 80 }], 210: [function (_dereq_, module, exports) {
    // 26.1.12 Reflect.preventExtensions(target)
    var $export = _dereq_(32),
        anObject = _dereq_(7),
        $preventExtensions = Object.preventExtensions;

    $export($export.S, 'Reflect', {
      preventExtensions: function preventExtensions(target) {
        anObject(target);
        try {
          if ($preventExtensions) $preventExtensions(target);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "32": 32, "7": 7 }], 211: [function (_dereq_, module, exports) {
    // 26.1.14 Reflect.setPrototypeOf(target, proto)
    var $export = _dereq_(32),
        setProto = _dereq_(90);

    if (setProto) $export($export.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        setProto.check(target, proto);
        try {
          setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "32": 32, "90": 90 }], 212: [function (_dereq_, module, exports) {
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    var dP = _dereq_(67),
        gOPD = _dereq_(70),
        getPrototypeOf = _dereq_(74),
        has = _dereq_(39),
        $export = _dereq_(32),
        createDesc = _dereq_(85),
        anObject = _dereq_(7),
        isObject = _dereq_(49);

    function set$$1(target, propertyKey, V /*, receiver*/) {
      var receiver = arguments.length < 4 ? target : arguments[3],
          ownDesc = gOPD.f(anObject(target), propertyKey),
          existingDescriptor,
          proto;
      if (!ownDesc) {
        if (isObject(proto = getPrototypeOf(target))) {
          return set$$1(proto, propertyKey, V, receiver);
        }
        ownDesc = createDesc(0);
      }
      if (has(ownDesc, 'value')) {
        if (ownDesc.writable === false || !isObject(receiver)) return false;
        existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
        existingDescriptor.value = V;
        dP.f(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }

    $export($export.S, 'Reflect', { set: set$$1 });
  }, { "32": 32, "39": 39, "49": 49, "67": 67, "7": 7, "70": 70, "74": 74, "85": 85 }], 213: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        inheritIfRequired = _dereq_(43),
        dP = _dereq_(67).f,
        gOPN = _dereq_(72).f,
        isRegExp = _dereq_(50),
        $flags = _dereq_(36),
        $RegExp = global.RegExp,
        Base = $RegExp,
        proto = $RegExp.prototype,
        re1 = /a/g,
        re2 = /a/g
    // "new" creates a new object, old webkit buggy here
    ,
        CORRECT_NEW = new $RegExp(re1) !== re1;

    if (_dereq_(28) && (!CORRECT_NEW || _dereq_(34)(function () {
      re2[_dereq_(117)('match')] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
    }))) {
      $RegExp = function RegExp(p, f) {
        var tiRE = this instanceof $RegExp,
            piRE = isRegExp(p),
            fiU = f === undefined;
        return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
      };
      var proxy = function proxy(key) {
        key in $RegExp || dP($RegExp, key, {
          configurable: true,
          get: function get$$1() {
            return Base[key];
          },
          set: function set$$1(it) {
            Base[key] = it;
          }
        });
      };
      for (var keys = gOPN(Base), i = 0; keys.length > i;) {
        proxy(keys[i++]);
      }proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      _dereq_(87)(global, 'RegExp', $RegExp);
    }

    _dereq_(91)('RegExp');
  }, { "117": 117, "28": 28, "34": 34, "36": 36, "38": 38, "43": 43, "50": 50, "67": 67, "72": 72, "87": 87, "91": 91 }], 214: [function (_dereq_, module, exports) {
    // 21.2.5.3 get RegExp.prototype.flags()
    if (_dereq_(28) && /./g.flags != 'g') _dereq_(67).f(RegExp.prototype, 'flags', {
      configurable: true,
      get: _dereq_(36)
    });
  }, { "28": 28, "36": 36, "67": 67 }], 215: [function (_dereq_, module, exports) {
    // @@match logic
    _dereq_(35)('match', 1, function (defined, MATCH, $match) {
      // 21.1.3.11 String.prototype.match(regexp)
      return [function match(regexp) {
        'use strict';

        var O = defined(this),
            fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      }, $match];
    });
  }, { "35": 35 }], 216: [function (_dereq_, module, exports) {
    // @@replace logic
    _dereq_(35)('replace', 2, function (defined, REPLACE, $replace) {
      // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
      return [function replace(searchValue, replaceValue) {
        'use strict';

        var O = defined(this),
            fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
      }, $replace];
    });
  }, { "35": 35 }], 217: [function (_dereq_, module, exports) {
    // @@search logic
    _dereq_(35)('search', 1, function (defined, SEARCH, $search) {
      // 21.1.3.15 String.prototype.search(regexp)
      return [function search(regexp) {
        'use strict';

        var O = defined(this),
            fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      }, $search];
    });
  }, { "35": 35 }], 218: [function (_dereq_, module, exports) {
    // @@split logic
    _dereq_(35)('split', 2, function (defined, SPLIT, $split) {
      'use strict';

      var isRegExp = _dereq_(50),
          _split = $split,
          $push = [].push,
          $SPLIT = 'split',
          LENGTH = 'length',
          LAST_INDEX = 'lastIndex';
      if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
        var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
        // based on es5-shim implementation, need to rework it
        $split = function $split(separator, limit) {
          var string = String(this);
          if (separator === undefined && limit === 0) return [];
          // If `separator` is not a regex, use native split
          if (!isRegExp(separator)) return _split.call(string, separator, limit);
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var separator2, match, lastIndex, lastLength, i;
          // Doesn't need flags gy, but they don't hurt
          if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
          while (match = separatorCopy.exec(string)) {
            // `separatorCopy.lastIndex` is not reliable cross-browser
            lastIndex = match.index + match[0][LENGTH];
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
              if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
                for (i = 1; i < arguments[LENGTH] - 2; i++) {
                  if (arguments[i] === undefined) match[i] = undefined;
                }
              });
              if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
              lastLength = match[0][LENGTH];
              lastLastIndex = lastIndex;
              if (output[LENGTH] >= splitLimit) break;
            }
            if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
          }
          if (lastLastIndex === string[LENGTH]) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
        };
        // Chakra, V8
      } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
        $split = function $split(separator, limit) {
          return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
        };
      }
      // 21.1.3.17 String.prototype.split(separator, limit)
      return [function split(separator, limit) {
        var O = defined(this),
            fn = separator == undefined ? undefined : separator[SPLIT];
        return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
      }, $split];
    });
  }, { "35": 35, "50": 50 }], 219: [function (_dereq_, module, exports) {
    'use strict';

    _dereq_(214);
    var anObject = _dereq_(7),
        $flags = _dereq_(36),
        DESCRIPTORS = _dereq_(28),
        TO_STRING = 'toString',
        $toString = /./[TO_STRING];

    var define = function define(fn) {
      _dereq_(87)(RegExp.prototype, TO_STRING, fn, true);
    };

    // 21.2.5.14 RegExp.prototype.toString()
    if (_dereq_(34)(function () {
      return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
    })) {
      define(function toString() {
        var R = anObject(this);
        return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
      });
      // FF44- RegExp#toString has a wrong name
    } else if ($toString.name != TO_STRING) {
      define(function toString() {
        return $toString.call(this);
      });
    }
  }, { "214": 214, "28": 28, "34": 34, "36": 36, "7": 7, "87": 87 }], 220: [function (_dereq_, module, exports) {
    'use strict';

    var strong = _dereq_(19);

    // 23.2 Set Objects
    module.exports = _dereq_(22)('Set', function (get$$1) {
      return function Set() {
        return get$$1(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return strong.def(this, value = value === 0 ? 0 : value, value);
      }
    }, strong);
  }, { "19": 19, "22": 22 }], 221: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.2 String.prototype.anchor(name)

    _dereq_(99)('anchor', function (createHTML) {
      return function anchor(name) {
        return createHTML(this, 'a', 'name', name);
      };
    });
  }, { "99": 99 }], 222: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.3 String.prototype.big()

    _dereq_(99)('big', function (createHTML) {
      return function big() {
        return createHTML(this, 'big', '', '');
      };
    });
  }, { "99": 99 }], 223: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.4 String.prototype.blink()

    _dereq_(99)('blink', function (createHTML) {
      return function blink() {
        return createHTML(this, 'blink', '', '');
      };
    });
  }, { "99": 99 }], 224: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.5 String.prototype.bold()

    _dereq_(99)('bold', function (createHTML) {
      return function bold() {
        return createHTML(this, 'b', '', '');
      };
    });
  }, { "99": 99 }], 225: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $at = _dereq_(97)(false);
    $export($export.P, 'String', {
      // 21.1.3.3 String.prototype.codePointAt(pos)
      codePointAt: function codePointAt(pos) {
        return $at(this, pos);
      }
    });
  }, { "32": 32, "97": 97 }], 226: [function (_dereq_, module, exports) {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    'use strict';

    var $export = _dereq_(32),
        toLength = _dereq_(108),
        context = _dereq_(98),
        ENDS_WITH = 'endsWith',
        $endsWith = ''[ENDS_WITH];

    $export($export.P + $export.F * _dereq_(33)(ENDS_WITH), 'String', {
      endsWith: function endsWith(searchString /*, endPosition = @length */) {
        var that = context(this, searchString, ENDS_WITH),
            endPosition = arguments.length > 1 ? arguments[1] : undefined,
            len = toLength(that.length),
            end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
            search = String(searchString);
        return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
      }
    });
  }, { "108": 108, "32": 32, "33": 33, "98": 98 }], 227: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.6 String.prototype.fixed()

    _dereq_(99)('fixed', function (createHTML) {
      return function fixed() {
        return createHTML(this, 'tt', '', '');
      };
    });
  }, { "99": 99 }], 228: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.7 String.prototype.fontcolor(color)

    _dereq_(99)('fontcolor', function (createHTML) {
      return function fontcolor(color) {
        return createHTML(this, 'font', 'color', color);
      };
    });
  }, { "99": 99 }], 229: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.8 String.prototype.fontsize(size)

    _dereq_(99)('fontsize', function (createHTML) {
      return function fontsize(size) {
        return createHTML(this, 'font', 'size', size);
      };
    });
  }, { "99": 99 }], 230: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        toIndex = _dereq_(105),
        fromCharCode = String.fromCharCode,
        $fromCodePoint = String.fromCodePoint;

    // length should be 1, old FF problem
    $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
      // 21.1.2.2 String.fromCodePoint(...codePoints)
      fromCodePoint: function fromCodePoint(x) {
        // eslint-disable-line no-unused-vars
        var res = [],
            aLen = arguments.length,
            i = 0,
            code;
        while (aLen > i) {
          code = +arguments[i++];
          if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
          res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
        }return res.join('');
      }
    });
  }, { "105": 105, "32": 32 }], 231: [function (_dereq_, module, exports) {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    'use strict';

    var $export = _dereq_(32),
        context = _dereq_(98),
        INCLUDES = 'includes';

    $export($export.P + $export.F * _dereq_(33)(INCLUDES), 'String', {
      includes: function includes(searchString /*, position = 0 */) {
        return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
  }, { "32": 32, "33": 33, "98": 98 }], 232: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.9 String.prototype.italics()

    _dereq_(99)('italics', function (createHTML) {
      return function italics() {
        return createHTML(this, 'i', '', '');
      };
    });
  }, { "99": 99 }], 233: [function (_dereq_, module, exports) {
    'use strict';

    var $at = _dereq_(97)(true);

    // 21.1.3.27 String.prototype[@@iterator]()
    _dereq_(53)(String, 'String', function (iterated) {
      this._t = String(iterated); // target
      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
      var O = this._t,
          index = this._i,
          point;
      if (index >= O.length) return { value: undefined, done: true };
      point = $at(O, index);
      this._i += point.length;
      return { value: point, done: false };
    });
  }, { "53": 53, "97": 97 }], 234: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.10 String.prototype.link(url)

    _dereq_(99)('link', function (createHTML) {
      return function link(url) {
        return createHTML(this, 'a', 'href', url);
      };
    });
  }, { "99": 99 }], 235: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        toLength = _dereq_(108);

    $export($export.S, 'String', {
      // 21.1.2.4 String.raw(callSite, ...substitutions)
      raw: function raw(callSite) {
        var tpl = toIObject(callSite.raw),
            len = toLength(tpl.length),
            aLen = arguments.length,
            res = [],
            i = 0;
        while (len > i) {
          res.push(String(tpl[i++]));
          if (i < aLen) res.push(String(arguments[i]));
        }return res.join('');
      }
    });
  }, { "107": 107, "108": 108, "32": 32 }], 236: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);

    $export($export.P, 'String', {
      // 21.1.3.13 String.prototype.repeat(count)
      repeat: _dereq_(101)
    });
  }, { "101": 101, "32": 32 }], 237: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.11 String.prototype.small()

    _dereq_(99)('small', function (createHTML) {
      return function small() {
        return createHTML(this, 'small', '', '');
      };
    });
  }, { "99": 99 }], 238: [function (_dereq_, module, exports) {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    'use strict';

    var $export = _dereq_(32),
        toLength = _dereq_(108),
        context = _dereq_(98),
        STARTS_WITH = 'startsWith',
        $startsWith = ''[STARTS_WITH];

    $export($export.P + $export.F * _dereq_(33)(STARTS_WITH), 'String', {
      startsWith: function startsWith(searchString /*, position = 0 */) {
        var that = context(this, searchString, STARTS_WITH),
            index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
            search = String(searchString);
        return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
      }
    });
  }, { "108": 108, "32": 32, "33": 33, "98": 98 }], 239: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.12 String.prototype.strike()

    _dereq_(99)('strike', function (createHTML) {
      return function strike() {
        return createHTML(this, 'strike', '', '');
      };
    });
  }, { "99": 99 }], 240: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.13 String.prototype.sub()

    _dereq_(99)('sub', function (createHTML) {
      return function sub() {
        return createHTML(this, 'sub', '', '');
      };
    });
  }, { "99": 99 }], 241: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.14 String.prototype.sup()

    _dereq_(99)('sup', function (createHTML) {
      return function sup() {
        return createHTML(this, 'sup', '', '');
      };
    });
  }, { "99": 99 }], 242: [function (_dereq_, module, exports) {
    'use strict';
    // 21.1.3.25 String.prototype.trim()

    _dereq_(102)('trim', function ($trim) {
      return function trim() {
        return $trim(this, 3);
      };
    });
  }, { "102": 102 }], 243: [function (_dereq_, module, exports) {
    'use strict';
    // ECMAScript 6 symbols shim

    var global = _dereq_(38),
        has = _dereq_(39),
        DESCRIPTORS = _dereq_(28),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        META = _dereq_(62).KEY,
        $fails = _dereq_(34),
        shared = _dereq_(94),
        setToStringTag = _dereq_(92),
        uid = _dereq_(114),
        wks = _dereq_(117),
        wksExt = _dereq_(116),
        wksDefine = _dereq_(115),
        keyOf = _dereq_(57),
        enumKeys = _dereq_(31),
        isArray = _dereq_(47),
        anObject = _dereq_(7),
        toIObject = _dereq_(107),
        toPrimitive = _dereq_(110),
        createDesc = _dereq_(85),
        _create = _dereq_(66),
        gOPNExt = _dereq_(71),
        $GOPD = _dereq_(70),
        $DP = _dereq_(67),
        $keys = _dereq_(76),
        gOPD = $GOPD.f,
        dP = $DP.f,
        gOPN = gOPNExt.f,
        $Symbol = global.Symbol,
        $JSON = global.JSON,
        _stringify = $JSON && $JSON.stringify,
        PROTOTYPE = 'prototype',
        HIDDEN = wks('_hidden'),
        TO_PRIMITIVE = wks('toPrimitive'),
        isEnum = {}.propertyIsEnumerable,
        SymbolRegistry = shared('symbol-registry'),
        AllSymbols = shared('symbols'),
        OPSymbols = shared('op-symbols'),
        ObjectProto = Object[PROTOTYPE],
        USE_NATIVE = typeof $Symbol == 'function',
        QObject = global.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDesc = DESCRIPTORS && $fails(function () {
      return _create(dP({}, 'a', {
        get: function get$$1() {
          return dP(this, 'a', { value: 7 }).a;
        }
      })).a != 7;
    }) ? function (it, key, D) {
      var protoDesc = gOPD(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP(it, key, D);
      if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;

    var wrap = function wrap(tag) {
      var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
      sym._k = tag;
      return sym;
    };

    var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol';
    } : function (it) {
      return it instanceof $Symbol;
    };

    var $defineProperty = function defineProperty$$1(it, key, D) {
      if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
      anObject(it);
      key = toPrimitive(key, true);
      anObject(D);
      if (has(AllSymbols, key)) {
        if (!D.enumerable) {
          if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
          it[HIDDEN][key] = true;
        } else {
          if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
          D = _create(D, { enumerable: createDesc(0, false) });
        }return setSymbolDesc(it, key, D);
      }return dP(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
      anObject(it);
      var keys = enumKeys(P = toIObject(P)),
          i = 0,
          l = keys.length,
          key;
      while (l > i) {
        $defineProperty(it, key = keys[i++], P[key]);
      }return it;
    };
    var $create = function create(it, P) {
      return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
      var E = isEnum.call(this, key = toPrimitive(key, true));
      if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
      return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
      it = toIObject(it);
      key = toPrimitive(key, true);
      if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
      var D = gOPD(it, key);
      if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
      return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
      var names = gOPN(toIObject(it)),
          result = [],
          i = 0,
          key;
      while (names.length > i) {
        if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
      }return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
      var IS_OP = it === ObjectProto,
          names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
          result = [],
          i = 0,
          key;
      while (names.length > i) {
        if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
      }return result;
    };

    // 19.4.1.1 Symbol([description])
    if (!USE_NATIVE) {
      $Symbol = function _Symbol2() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
        var $set = function $set(value) {
          if (this === ObjectProto) $set.call(OPSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDesc(this, tag, createDesc(1, value));
        };
        if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
        return wrap(tag);
      };
      redefine($Symbol[PROTOTYPE], 'toString', function toString() {
        return this._k;
      });

      $GOPD.f = $getOwnPropertyDescriptor;
      $DP.f = $defineProperty;
      _dereq_(72).f = gOPNExt.f = $getOwnPropertyNames;
      _dereq_(77).f = $propertyIsEnumerable;
      _dereq_(73).f = $getOwnPropertySymbols;

      if (DESCRIPTORS && !_dereq_(58)) {
        redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
      }

      wksExt.f = function (name) {
        return wrap(wks(name));
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

    for (var symbols =
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
      wks(symbols[i++]);
    }for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
      wksDefine(symbols[i++]);
    }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
      // 19.4.2.1 Symbol.for(key)
      'for': function _for(key) {
        return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
      },
      // 19.4.2.5 Symbol.keyFor(sym)
      keyFor: function keyFor(key) {
        if (isSymbol(key)) return keyOf(SymbolRegistry, key);
        throw TypeError(key + ' is not a symbol!');
      },
      useSetter: function useSetter() {
        setter = true;
      },
      useSimple: function useSimple() {
        setter = false;
      }
    });

    $export($export.S + $export.F * !USE_NATIVE, 'Object', {
      // 19.1.2.2 Object.create(O [, Properties])
      create: $create,
      // 19.1.2.4 Object.defineProperty(O, P, Attributes)
      defineProperty: $defineProperty,
      // 19.1.2.3 Object.defineProperties(O, Properties)
      defineProperties: $defineProperties,
      // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
      // 19.1.2.7 Object.getOwnPropertyNames(O)
      getOwnPropertyNames: $getOwnPropertyNames,
      // 19.1.2.8 Object.getOwnPropertySymbols(O)
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // 24.3.2 JSON.stringify(value [, replacer [, space]])
    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
      var S = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      // WebKit converts symbol values to JSON as null
      // V8 throws on boxed symbols
      return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
    })), 'JSON', {
      stringify: function stringify(it) {
        if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        var args = [it],
            i = 1,
            replacer,
            $replacer;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }replacer = args[1];
        if (typeof replacer == 'function') $replacer = replacer;
        if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
          if ($replacer) value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    });

    // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_(40)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    // 19.4.3.5 Symbol.prototype[@@toStringTag]
    setToStringTag($Symbol, 'Symbol');
    // 20.2.1.9 Math[@@toStringTag]
    setToStringTag(Math, 'Math', true);
    // 24.3.3 JSON[@@toStringTag]
    setToStringTag(global.JSON, 'JSON', true);
  }, { "107": 107, "110": 110, "114": 114, "115": 115, "116": 116, "117": 117, "28": 28, "31": 31, "32": 32, "34": 34, "38": 38, "39": 39, "40": 40, "47": 47, "57": 57, "58": 58, "62": 62, "66": 66, "67": 67, "7": 7, "70": 70, "71": 71, "72": 72, "73": 73, "76": 76, "77": 77, "85": 85, "87": 87, "92": 92, "94": 94 }], 244: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $typed = _dereq_(113),
        buffer = _dereq_(112),
        anObject = _dereq_(7),
        toIndex = _dereq_(105),
        toLength = _dereq_(108),
        isObject = _dereq_(49),
        ArrayBuffer = _dereq_(38).ArrayBuffer,
        speciesConstructor = _dereq_(95),
        $ArrayBuffer = buffer.ArrayBuffer,
        $DataView = buffer.DataView,
        $isView = $typed.ABV && ArrayBuffer.isView,
        $slice = $ArrayBuffer.prototype.slice,
        VIEW = $typed.VIEW,
        ARRAY_BUFFER = 'ArrayBuffer';

    $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

    $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
      // 24.1.3.1 ArrayBuffer.isView(arg)
      isView: function isView(it) {
        return $isView && $isView(it) || isObject(it) && VIEW in it;
      }
    });

    $export($export.P + $export.U + $export.F * _dereq_(34)(function () {
      return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
    }), ARRAY_BUFFER, {
      // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
      slice: function slice(start, end) {
        if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
        var len = anObject(this).byteLength,
            first = toIndex(start, len),
            final = toIndex(end === undefined ? len : end, len),
            result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
            viewS = new $DataView(this),
            viewT = new $DataView(result),
            index = 0;
        while (first < final) {
          viewT.setUint8(index++, viewS.getUint8(first++));
        }return result;
      }
    });

    _dereq_(91)(ARRAY_BUFFER);
  }, { "105": 105, "108": 108, "112": 112, "113": 113, "32": 32, "34": 34, "38": 38, "49": 49, "7": 7, "91": 91, "95": 95 }], 245: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    $export($export.G + $export.W + $export.F * !_dereq_(113).ABV, {
      DataView: _dereq_(112).DataView
    });
  }, { "112": 112, "113": 113, "32": 32 }], 246: [function (_dereq_, module, exports) {
    _dereq_(111)('Float32', 4, function (init) {
      return function Float32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 247: [function (_dereq_, module, exports) {
    _dereq_(111)('Float64', 8, function (init) {
      return function Float64Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 248: [function (_dereq_, module, exports) {
    _dereq_(111)('Int16', 2, function (init) {
      return function Int16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 249: [function (_dereq_, module, exports) {
    _dereq_(111)('Int32', 4, function (init) {
      return function Int32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 250: [function (_dereq_, module, exports) {
    _dereq_(111)('Int8', 1, function (init) {
      return function Int8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 251: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint16', 2, function (init) {
      return function Uint16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 252: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint32', 4, function (init) {
      return function Uint32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 253: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint8', 1, function (init) {
      return function Uint8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 254: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint8', 1, function (init) {
      return function Uint8ClampedArray(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    }, true);
  }, { "111": 111 }], 255: [function (_dereq_, module, exports) {
    'use strict';

    var each = _dereq_(12)(0),
        redefine = _dereq_(87),
        meta = _dereq_(62),
        assign = _dereq_(65),
        weak = _dereq_(21),
        isObject = _dereq_(49),
        getWeak = meta.getWeak,
        isExtensible = Object.isExtensible,
        uncaughtFrozenStore = weak.ufstore,
        tmp = {},
        InternalMap;

    var wrapper = function wrapper(get$$1) {
      return function WeakMap() {
        return get$$1(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get$$1(key) {
        if (isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(this).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set$$1(key, value) {
        return weak.def(this, key, value);
      }
    };

    // 23.3 WeakMap Objects
    var $WeakMap = module.exports = _dereq_(22)('WeakMap', wrapper, methods, weak, true, true);

    // IE11 WeakMap frozen keys fix
    if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
      InternalMap = weak.getConstructor(wrapper);
      assign(InternalMap.prototype, methods);
      meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype,
            method = proto[key];
        redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            var result = this._f[key](a, b);
            return key == 'set' ? this : result;
            // store all the rest on native weakmap
          }return method.call(this, a, b);
        });
      });
    }
  }, { "12": 12, "21": 21, "22": 22, "49": 49, "62": 62, "65": 65, "87": 87 }], 256: [function (_dereq_, module, exports) {
    'use strict';

    var weak = _dereq_(21);

    // 23.4 WeakSet Objects
    _dereq_(22)('WeakSet', function (get$$1) {
      return function WeakSet() {
        return get$$1(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return weak.def(this, value, true);
      }
    }, weak, false, true);
  }, { "21": 21, "22": 22 }], 257: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/Array.prototype.includes

    var $export = _dereq_(32),
        $includes = _dereq_(11)(true);

    $export($export.P, 'Array', {
      includes: function includes(el /*, fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    _dereq_(5)('includes');
  }, { "11": 11, "32": 32, "5": 5 }], 258: [function (_dereq_, module, exports) {
    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
    var $export = _dereq_(32),
        microtask = _dereq_(64)(),
        process = _dereq_(38).process,
        isNode = _dereq_(18)(process) == 'process';

    $export($export.G, {
      asap: function asap(fn) {
        var domain = isNode && process.domain;
        microtask(domain ? domain.bind(fn) : fn);
      }
    });
  }, { "18": 18, "32": 32, "38": 38, "64": 64 }], 259: [function (_dereq_, module, exports) {
    // https://github.com/ljharb/proposal-is-error
    var $export = _dereq_(32),
        cof = _dereq_(18);

    $export($export.S, 'Error', {
      isError: function isError(it) {
        return cof(it) === 'Error';
      }
    });
  }, { "18": 18, "32": 32 }], 260: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var $export = _dereq_(32);

    $export($export.P + $export.R, 'Map', { toJSON: _dereq_(20)('Map') });
  }, { "20": 20, "32": 32 }], 261: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      iaddh: function iaddh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0,
            $x1 = x1 >>> 0,
            $y0 = y0 >>> 0;
        return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
      }
    });
  }, { "32": 32 }], 262: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      imulh: function imulh(u, v) {
        var UINT16 = 0xffff,
            $u = +u,
            $v = +v,
            u0 = $u & UINT16,
            v0 = $v & UINT16,
            u1 = $u >> 16,
            v1 = $v >> 16,
            t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
      }
    });
  }, { "32": 32 }], 263: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      isubh: function isubh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0,
            $x1 = x1 >>> 0,
            $y0 = y0 >>> 0;
        return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
      }
    });
  }, { "32": 32 }], 264: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      umulh: function umulh(u, v) {
        var UINT16 = 0xffff,
            $u = +u,
            $v = +v,
            u0 = $u & UINT16,
            v0 = $v & UINT16,
            u1 = $u >>> 16,
            v1 = $v >>> 16,
            t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
      }
    });
  }, { "32": 32 }], 265: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        aFunction = _dereq_(3),
        $defineProperty = _dereq_(67);

    // B.2.2.2 Object.prototype.__defineGetter__(P, getter)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __defineGetter__: function __defineGetter__(P, getter) {
        $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
      }
    });
  }, { "109": 109, "28": 28, "3": 3, "32": 32, "67": 67, "69": 69 }], 266: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        aFunction = _dereq_(3),
        $defineProperty = _dereq_(67);

    // B.2.2.3 Object.prototype.__defineSetter__(P, setter)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __defineSetter__: function __defineSetter__(P, setter) {
        $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
      }
    });
  }, { "109": 109, "28": 28, "3": 3, "32": 32, "67": 67, "69": 69 }], 267: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-values-entries
    var $export = _dereq_(32),
        $entries = _dereq_(79)(true);

    $export($export.S, 'Object', {
      entries: function entries(it) {
        return $entries(it);
      }
    });
  }, { "32": 32, "79": 79 }], 268: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-getownpropertydescriptors
    var $export = _dereq_(32),
        ownKeys = _dereq_(80),
        toIObject = _dereq_(107),
        gOPD = _dereq_(70),
        createProperty = _dereq_(24);

    $export($export.S, 'Object', {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIObject(object),
            getDesc = gOPD.f,
            keys = ownKeys(O),
            result = {},
            i = 0,
            key;
        while (keys.length > i) {
          createProperty(result, key = keys[i++], getDesc(O, key));
        }return result;
      }
    });
  }, { "107": 107, "24": 24, "32": 32, "70": 70, "80": 80 }], 269: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110),
        getPrototypeOf = _dereq_(74),
        getOwnPropertyDescriptor = _dereq_(70).f;

    // B.2.2.4 Object.prototype.__lookupGetter__(P)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __lookupGetter__: function __lookupGetter__(P) {
        var O = toObject(this),
            K = toPrimitive(P, true),
            D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.get;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "109": 109, "110": 110, "28": 28, "32": 32, "69": 69, "70": 70, "74": 74 }], 270: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110),
        getPrototypeOf = _dereq_(74),
        getOwnPropertyDescriptor = _dereq_(70).f;

    // B.2.2.5 Object.prototype.__lookupSetter__(P)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __lookupSetter__: function __lookupSetter__(P) {
        var O = toObject(this),
            K = toPrimitive(P, true),
            D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.set;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "109": 109, "110": 110, "28": 28, "32": 32, "69": 69, "70": 70, "74": 74 }], 271: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-values-entries
    var $export = _dereq_(32),
        $values = _dereq_(79)(false);

    $export($export.S, 'Object', {
      values: function values(it) {
        return $values(it);
      }
    });
  }, { "32": 32, "79": 79 }], 272: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/zenparsing/es-observable

    var $export = _dereq_(32),
        global = _dereq_(38),
        core = _dereq_(23),
        microtask = _dereq_(64)(),
        OBSERVABLE = _dereq_(117)('observable'),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        anInstance = _dereq_(6),
        redefineAll = _dereq_(86),
        hide = _dereq_(40),
        forOf = _dereq_(37),
        RETURN = forOf.RETURN;

    var getMethod = function getMethod(fn) {
      return fn == null ? undefined : aFunction(fn);
    };

    var cleanupSubscription = function cleanupSubscription(subscription) {
      var cleanup = subscription._c;
      if (cleanup) {
        subscription._c = undefined;
        cleanup();
      }
    };

    var subscriptionClosed = function subscriptionClosed(subscription) {
      return subscription._o === undefined;
    };

    var closeSubscription = function closeSubscription(subscription) {
      if (!subscriptionClosed(subscription)) {
        subscription._o = undefined;
        cleanupSubscription(subscription);
      }
    };

    var Subscription = function Subscription(observer, subscriber) {
      anObject(observer);
      this._c = undefined;
      this._o = observer;
      observer = new SubscriptionObserver(this);
      try {
        var cleanup = subscriber(observer),
            subscription = cleanup;
        if (cleanup != null) {
          if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
            subscription.unsubscribe();
          };else aFunction(cleanup);
          this._c = cleanup;
        }
      } catch (e) {
        observer.error(e);
        return;
      }if (subscriptionClosed(this)) cleanupSubscription(this);
    };

    Subscription.prototype = redefineAll({}, {
      unsubscribe: function unsubscribe() {
        closeSubscription(this);
      }
    });

    var SubscriptionObserver = function SubscriptionObserver(subscription) {
      this._s = subscription;
    };

    SubscriptionObserver.prototype = redefineAll({}, {
      next: function next(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          try {
            var m = getMethod(observer.next);
            if (m) return m.call(observer, value);
          } catch (e) {
            try {
              closeSubscription(subscription);
            } finally {
              throw e;
            }
          }
        }
      },
      error: function error(value) {
        var subscription = this._s;
        if (subscriptionClosed(subscription)) throw value;
        var observer = subscription._o;
        subscription._o = undefined;
        try {
          var m = getMethod(observer.error);
          if (!m) throw value;
          value = m.call(observer, value);
        } catch (e) {
          try {
            cleanupSubscription(subscription);
          } finally {
            throw e;
          }
        }cleanupSubscription(subscription);
        return value;
      },
      complete: function complete(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          subscription._o = undefined;
          try {
            var m = getMethod(observer.complete);
            value = m ? m.call(observer, value) : undefined;
          } catch (e) {
            try {
              cleanupSubscription(subscription);
            } finally {
              throw e;
            }
          }cleanupSubscription(subscription);
          return value;
        }
      }
    });

    var $Observable = function Observable(subscriber) {
      anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
    };

    redefineAll($Observable.prototype, {
      subscribe: function subscribe(observer) {
        return new Subscription(observer, this._f);
      },
      forEach: function forEach(fn) {
        var that = this;
        return new (core.Promise || global.Promise)(function (resolve, reject) {
          aFunction(fn);
          var subscription = that.subscribe({
            next: function next(value) {
              try {
                return fn(value);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      }
    });

    redefineAll($Observable, {
      from: function from(x) {
        var C = typeof this === 'function' ? this : $Observable;
        var method = getMethod(anObject(x)[OBSERVABLE]);
        if (method) {
          var observable = anObject(method.call(x));
          return observable.constructor === C ? observable : new C(function (observer) {
            return observable.subscribe(observer);
          });
        }
        return new C(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              try {
                if (forOf(x, false, function (it) {
                  observer.next(it);
                  if (done) return RETURN;
                }) === RETURN) return;
              } catch (e) {
                if (done) throw e;
                observer.error(e);
                return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      },
      of: function of() {
        for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
          items[i] = arguments[i++];
        }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              for (var i = 0; i < items.length; ++i) {
                observer.next(items[i]);
                if (done) return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      }
    });

    hide($Observable.prototype, OBSERVABLE, function () {
      return this;
    });

    $export($export.G, { Observable: $Observable });

    _dereq_(91)('Observable');
  }, { "117": 117, "23": 23, "3": 3, "32": 32, "37": 37, "38": 38, "40": 40, "6": 6, "64": 64, "7": 7, "86": 86, "91": 91 }], 273: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        toMetaKey = metadata.key,
        ordinaryDefineOwnMetadata = metadata.set;

    metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
      } });
  }, { "63": 63, "7": 7 }], 274: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        toMetaKey = metadata.key,
        getOrCreateMetadataMap = metadata.map,
        store = metadata.store;

    metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
            metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
        if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
        if (metadataMap.size) return true;
        var targetMetadata = store.get(target);
        targetMetadata['delete'](targetKey);
        return !!targetMetadata.size || store['delete'](target);
      } });
  }, { "63": 63, "7": 7 }], 275: [function (_dereq_, module, exports) {
    var Set = _dereq_(220),
        from = _dereq_(10),
        metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryOwnMetadataKeys = metadata.keys,
        toMetaKey = metadata.key;

    var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
      var oKeys = ordinaryOwnMetadataKeys(O, P),
          parent = getPrototypeOf(O);
      if (parent === null) return oKeys;
      var pKeys = ordinaryMetadataKeys(parent, P);
      return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
    };

    metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
        return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "10": 10, "220": 220, "63": 63, "7": 7, "74": 74 }], 276: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryHasOwnMetadata = metadata.has,
        ordinaryGetOwnMetadata = metadata.get,
        toMetaKey = metadata.key;

    var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
    };

    metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7, "74": 74 }], 277: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryOwnMetadataKeys = metadata.keys,
        toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
        return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "63": 63, "7": 7 }], 278: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryGetOwnMetadata = metadata.get,
        toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7 }], 279: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryHasOwnMetadata = metadata.has,
        toMetaKey = metadata.key;

    var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
    };

    metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7, "74": 74 }], 280: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryHasOwnMetadata = metadata.has,
        toMetaKey = metadata.key;

    metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7 }], 281: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        aFunction = _dereq_(3),
        toMetaKey = metadata.key,
        ordinaryDefineOwnMetadata = metadata.set;

    metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
        return function decorator(target, targetKey) {
          ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
        };
      } });
  }, { "3": 3, "63": 63, "7": 7 }], 282: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var $export = _dereq_(32);

    $export($export.P + $export.R, 'Set', { toJSON: _dereq_(20)('Set') });
  }, { "20": 20, "32": 32 }], 283: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/mathiasbynens/String.prototype.at

    var $export = _dereq_(32),
        $at = _dereq_(97)(true);

    $export($export.P, 'String', {
      at: function at(pos) {
        return $at(this, pos);
      }
    });
  }, { "32": 32, "97": 97 }], 284: [function (_dereq_, module, exports) {
    'use strict';
    // https://tc39.github.io/String.prototype.matchAll/

    var $export = _dereq_(32),
        defined = _dereq_(27),
        toLength = _dereq_(108),
        isRegExp = _dereq_(50),
        getFlags = _dereq_(36),
        RegExpProto = RegExp.prototype;

    var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
      this._r = regexp;
      this._s = string;
    };

    _dereq_(52)($RegExpStringIterator, 'RegExp String', function next() {
      var match = this._r.exec(this._s);
      return { value: match, done: match === null };
    });

    $export($export.P, 'String', {
      matchAll: function matchAll(regexp) {
        defined(this);
        if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
        var S = String(this),
            flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
            rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
        rx.lastIndex = toLength(regexp.lastIndex);
        return new $RegExpStringIterator(rx, S);
      }
    });
  }, { "108": 108, "27": 27, "32": 32, "36": 36, "50": 50, "52": 52 }], 285: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/proposal-string-pad-start-end

    var $export = _dereq_(32),
        $pad = _dereq_(100);

    $export($export.P, 'String', {
      padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
      }
    });
  }, { "100": 100, "32": 32 }], 286: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/proposal-string-pad-start-end

    var $export = _dereq_(32),
        $pad = _dereq_(100);

    $export($export.P, 'String', {
      padStart: function padStart(maxLength /*, fillString = ' ' */) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
      }
    });
  }, { "100": 100, "32": 32 }], 287: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

    _dereq_(102)('trimLeft', function ($trim) {
      return function trimLeft() {
        return $trim(this, 1);
      };
    }, 'trimStart');
  }, { "102": 102 }], 288: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

    _dereq_(102)('trimRight', function ($trim) {
      return function trimRight() {
        return $trim(this, 2);
      };
    }, 'trimEnd');
  }, { "102": 102 }], 289: [function (_dereq_, module, exports) {
    _dereq_(115)('asyncIterator');
  }, { "115": 115 }], 290: [function (_dereq_, module, exports) {
    _dereq_(115)('observable');
  }, { "115": 115 }], 291: [function (_dereq_, module, exports) {
    // https://github.com/ljharb/proposal-global
    var $export = _dereq_(32);

    $export($export.S, 'System', { global: _dereq_(38) });
  }, { "32": 32, "38": 38 }], 292: [function (_dereq_, module, exports) {
    var $iterators = _dereq_(130),
        redefine = _dereq_(87),
        global = _dereq_(38),
        hide = _dereq_(40),
        Iterators = _dereq_(56),
        wks = _dereq_(117),
        ITERATOR = wks('iterator'),
        TO_STRING_TAG = wks('toStringTag'),
        ArrayValues = Iterators.Array;

    for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
      var NAME = collections[i],
          Collection = global[NAME],
          proto = Collection && Collection.prototype,
          key;
      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        for (key in $iterators) {
          if (!proto[key]) redefine(proto, key, $iterators[key], true);
        }
      }
    }
  }, { "117": 117, "130": 130, "38": 38, "40": 40, "56": 56, "87": 87 }], 293: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $task = _dereq_(104);
    $export($export.G + $export.B, {
      setImmediate: $task.set,
      clearImmediate: $task.clear
    });
  }, { "104": 104, "32": 32 }], 294: [function (_dereq_, module, exports) {
    // ie9- setTimeout & setInterval additional parameters fix
    var global = _dereq_(38),
        $export = _dereq_(32),
        invoke = _dereq_(44),
        partial = _dereq_(83),
        navigator = global.navigator,
        MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
    var wrap = function wrap(set$$1) {
      return MSIE ? function (fn, time /*, ...args */) {
        return set$$1(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
      } : set$$1;
    };
    $export($export.G + $export.B + $export.F * MSIE, {
      setTimeout: wrap(global.setTimeout),
      setInterval: wrap(global.setInterval)
    });
  }, { "32": 32, "38": 38, "44": 44, "83": 83 }], 295: [function (_dereq_, module, exports) {
    _dereq_(243);
    _dereq_(180);
    _dereq_(182);
    _dereq_(181);
    _dereq_(184);
    _dereq_(186);
    _dereq_(191);
    _dereq_(185);
    _dereq_(183);
    _dereq_(193);
    _dereq_(192);
    _dereq_(188);
    _dereq_(189);
    _dereq_(187);
    _dereq_(179);
    _dereq_(190);
    _dereq_(194);
    _dereq_(195);
    _dereq_(146);
    _dereq_(148);
    _dereq_(147);
    _dereq_(197);
    _dereq_(196);
    _dereq_(167);
    _dereq_(177);
    _dereq_(178);
    _dereq_(168);
    _dereq_(169);
    _dereq_(170);
    _dereq_(171);
    _dereq_(172);
    _dereq_(173);
    _dereq_(174);
    _dereq_(175);
    _dereq_(176);
    _dereq_(150);
    _dereq_(151);
    _dereq_(152);
    _dereq_(153);
    _dereq_(154);
    _dereq_(155);
    _dereq_(156);
    _dereq_(157);
    _dereq_(158);
    _dereq_(159);
    _dereq_(160);
    _dereq_(161);
    _dereq_(162);
    _dereq_(163);
    _dereq_(164);
    _dereq_(165);
    _dereq_(166);
    _dereq_(230);
    _dereq_(235);
    _dereq_(242);
    _dereq_(233);
    _dereq_(225);
    _dereq_(226);
    _dereq_(231);
    _dereq_(236);
    _dereq_(238);
    _dereq_(221);
    _dereq_(222);
    _dereq_(223);
    _dereq_(224);
    _dereq_(227);
    _dereq_(228);
    _dereq_(229);
    _dereq_(232);
    _dereq_(234);
    _dereq_(237);
    _dereq_(239);
    _dereq_(240);
    _dereq_(241);
    _dereq_(141);
    _dereq_(143);
    _dereq_(142);
    _dereq_(145);
    _dereq_(144);
    _dereq_(129);
    _dereq_(127);
    _dereq_(134);
    _dereq_(131);
    _dereq_(137);
    _dereq_(139);
    _dereq_(126);
    _dereq_(133);
    _dereq_(123);
    _dereq_(138);
    _dereq_(121);
    _dereq_(136);
    _dereq_(135);
    _dereq_(128);
    _dereq_(132);
    _dereq_(120);
    _dereq_(122);
    _dereq_(125);
    _dereq_(124);
    _dereq_(140);
    _dereq_(130);
    _dereq_(213);
    _dereq_(219);
    _dereq_(214);
    _dereq_(215);
    _dereq_(216);
    _dereq_(217);
    _dereq_(218);
    _dereq_(198);
    _dereq_(149);
    _dereq_(220);
    _dereq_(255);
    _dereq_(256);
    _dereq_(244);
    _dereq_(245);
    _dereq_(250);
    _dereq_(253);
    _dereq_(254);
    _dereq_(248);
    _dereq_(251);
    _dereq_(249);
    _dereq_(252);
    _dereq_(246);
    _dereq_(247);
    _dereq_(199);
    _dereq_(200);
    _dereq_(201);
    _dereq_(202);
    _dereq_(203);
    _dereq_(206);
    _dereq_(204);
    _dereq_(205);
    _dereq_(207);
    _dereq_(208);
    _dereq_(209);
    _dereq_(210);
    _dereq_(212);
    _dereq_(211);
    _dereq_(257);
    _dereq_(283);
    _dereq_(286);
    _dereq_(285);
    _dereq_(287);
    _dereq_(288);
    _dereq_(284);
    _dereq_(289);
    _dereq_(290);
    _dereq_(268);
    _dereq_(271);
    _dereq_(267);
    _dereq_(265);
    _dereq_(266);
    _dereq_(269);
    _dereq_(270);
    _dereq_(260);
    _dereq_(282);
    _dereq_(291);
    _dereq_(259);
    _dereq_(261);
    _dereq_(263);
    _dereq_(262);
    _dereq_(264);
    _dereq_(273);
    _dereq_(274);
    _dereq_(276);
    _dereq_(275);
    _dereq_(278);
    _dereq_(277);
    _dereq_(279);
    _dereq_(280);
    _dereq_(281);
    _dereq_(258);
    _dereq_(272);
    _dereq_(294);
    _dereq_(293);
    _dereq_(292);
    module.exports = _dereq_(23);
  }, { "120": 120, "121": 121, "122": 122, "123": 123, "124": 124, "125": 125, "126": 126, "127": 127, "128": 128, "129": 129, "130": 130, "131": 131, "132": 132, "133": 133, "134": 134, "135": 135, "136": 136, "137": 137, "138": 138, "139": 139, "140": 140, "141": 141, "142": 142, "143": 143, "144": 144, "145": 145, "146": 146, "147": 147, "148": 148, "149": 149, "150": 150, "151": 151, "152": 152, "153": 153, "154": 154, "155": 155, "156": 156, "157": 157, "158": 158, "159": 159, "160": 160, "161": 161, "162": 162, "163": 163, "164": 164, "165": 165, "166": 166, "167": 167, "168": 168, "169": 169, "170": 170, "171": 171, "172": 172, "173": 173, "174": 174, "175": 175, "176": 176, "177": 177, "178": 178, "179": 179, "180": 180, "181": 181, "182": 182, "183": 183, "184": 184, "185": 185, "186": 186, "187": 187, "188": 188, "189": 189, "190": 190, "191": 191, "192": 192, "193": 193, "194": 194, "195": 195, "196": 196, "197": 197, "198": 198, "199": 199, "200": 200, "201": 201, "202": 202, "203": 203, "204": 204, "205": 205, "206": 206, "207": 207, "208": 208, "209": 209, "210": 210, "211": 211, "212": 212, "213": 213, "214": 214, "215": 215, "216": 216, "217": 217, "218": 218, "219": 219, "220": 220, "221": 221, "222": 222, "223": 223, "224": 224, "225": 225, "226": 226, "227": 227, "228": 228, "229": 229, "23": 23, "230": 230, "231": 231, "232": 232, "233": 233, "234": 234, "235": 235, "236": 236, "237": 237, "238": 238, "239": 239, "240": 240, "241": 241, "242": 242, "243": 243, "244": 244, "245": 245, "246": 246, "247": 247, "248": 248, "249": 249, "250": 250, "251": 251, "252": 252, "253": 253, "254": 254, "255": 255, "256": 256, "257": 257, "258": 258, "259": 259, "260": 260, "261": 261, "262": 262, "263": 263, "264": 264, "265": 265, "266": 266, "267": 267, "268": 268, "269": 269, "270": 270, "271": 271, "272": 272, "273": 273, "274": 274, "275": 275, "276": 276, "277": 277, "278": 278, "279": 279, "280": 280, "281": 281, "282": 282, "283": 283, "284": 284, "285": 285, "286": 286, "287": 287, "288": 288, "289": 289, "290": 290, "291": 291, "292": 292, "293": 293, "294": 294 }], 296: [function (_dereq_, module, exports) {
    (function (global) {
      /**
       * Copyright (c) 2014, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
       * additional grant of patent rights can be found in the PATENTS file in
       * the same directory.
       */

      !function (global) {
        "use strict";

        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined; // More compressible than void 0.
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
        var runtime = global.regeneratorRuntime;
        if (runtime) {
          if (inModule) {
            // If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            module.exports = runtime;
          }
          // Don't bother evaluating the rest of this file if the runtime was
          // already defined globally.
          return;
        }

        // Define the runtime globally (as expected by generated code) as either
        // module.exports (if we're in a module) or a new, empty object.
        runtime = global.regeneratorRuntime = inModule ? module.exports : {};

        function wrap(innerFn, outerFn, self, tryLocsList) {
          // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);

          // The ._invoke method unifies the implementations of the .next,
          // .throw, and .return methods.
          generator._invoke = makeInvokeMethod(innerFn, self, context);

          return generator;
        }
        runtime.wrap = wrap;

        // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.
        var ContinueSentinel = {};

        // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}

        // This is a polyfill for %IteratorPrototype% for environments that
        // don't natively support it.
        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          // This environment has a native %IteratorPrototype%; use it instead
          // of the polyfill.
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function (method) {
            prototype[method] = function (arg) {
              return this._invoke(method, arg);
            };
          });
        }

        runtime.isGeneratorFunction = function (genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };

        runtime.mark = function (genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
            }
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.
        runtime.awrap = function (arg) {
          return { __await: arg };
        };

        function AsyncIterator(generator) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
                return Promise.resolve(value.__await).then(function (value) {
                  invoke("next", value, resolve, reject);
                }, function (err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration. If the Promise is rejected, however, the
                // result for this iteration will be rejected with the same
                // reason. Note that rejections of yielded Promises are not
                // thrown back into the generator function, as is the case
                // when an awaited Promise is rejected. This difference in
                // behavior between yield and await is important, because it
                // allows the consumer to decide what to do with the yielded
                // rejection (swallow it and continue, manually .throw it back
                // into the generator, abandon iteration, whatever). With
                // await, by contrast, there is no opportunity to examine the
                // rejection reason outside the generator function, so the
                // only option is to throw it from the await expression, and
                // let the generator function handle the exception.
                result.value = unwrapped;
                resolve(result);
              }, reject);
            }
          }

          if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
            invoke = process.domain.bind(invoke);
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }

          // Define the unified helper method that is used to implement .next,
          // .throw, and .return (see defineIteratorMethods).
          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);
        runtime.AsyncIterator = AsyncIterator;

        // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.
        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

          return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;

          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }

              // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
              return doneResult();
            }

            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                  // A return or throw (when the delegate iterator has no throw
                  // method) always terminates the yield* loop.
                  context.delegate = null;

                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  var returnMethod = delegate.iterator["return"];
                  if (returnMethod) {
                    var record = tryCatch(returnMethod, delegate.iterator, arg);
                    if (record.type === "throw") {
                      // If the return method threw an exception, let that
                      // exception prevail over the original return or throw.
                      method = "throw";
                      arg = record.arg;
                      continue;
                    }
                  }

                  if (method === "return") {
                    // Continue with the outer return, now that the delegate
                    // iterator has been terminated.
                    continue;
                  }
                }

                var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                if (record.type === "throw") {
                  context.delegate = null;

                  // Like returning generator.throw(uncaught), but without the
                  // overhead of an extra function call.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }

                // Delegate generator ran and handled its own exceptions so
                // regardless of what the method was, we continue as if it is
                // "next" with an undefined arg.
                method = "next";
                arg = undefined;

                var info = record.arg;
                if (info.done) {
                  context[delegate.resultName] = info.value;
                  context.next = delegate.nextLoc;
                } else {
                  state = GenStateSuspendedYield;
                  return info;
                }

                context.delegate = null;
              }

              if (method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = arg;
              } else if (method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw arg;
                }

                if (context.dispatchException(arg)) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  method = "next";
                  arg = undefined;
                }
              } else if (method === "return") {
                context.abrupt("return", arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                var info = {
                  value: record.arg,
                  done: context.done
                };

                if (record.arg === ContinueSentinel) {
                  if (context.delegate && method === "next") {
                    // Deliberately forget the last sent value so that we don't
                    // accidentally pass it on to the delegate.
                    arg = undefined;
                  }
                } else {
                  return info;
                }
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(arg) call above.
                method = "throw";
                arg = record.arg;
              }
            }
          };
        }

        // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.
        defineIteratorMethods(Gp);

        Gp[toStringTagSymbol] = "Generator";

        Gp.toString = function () {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          // The root entry object (effectively a try statement without a catch
          // or a finally block) gives us a place to store values thrown from
          // locations where there is no enclosing try statement.
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        runtime.keys = function (object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();

          // Rather than returning an object with a next method, we keep
          // things simple and return the next function itself.
          return function next() {
            while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            }

            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1,
                  next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

              return next.next = next;
            }
          }

          // Return an iterator with no values.
          return { next: doneResult };
        }
        runtime.values = values;

        function doneResult() {
          return { value: undefined, done: true };
        }

        Context.prototype = {
          constructor: Context,

          reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                // Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },

          stop: function stop() {
            this.done = true;

            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },

          dispatchException: function dispatchException(exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;
              return !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },

          abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.next = finallyEntry.finallyLoc;
            } else {
              this.complete(record);
            }

            return ContinueSentinel;
          },

          complete: function complete(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = record.arg;
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }
          },

          finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },

          "catch": function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }

            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
          },

          delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            return ContinueSentinel;
          }
        };
      }(
      // Among the various tricks for obtaining a reference to the global
      // object, this seems to be the most reliable technique that does not
      // use indirect eval (which violates Content Security Policy).
      (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : this);
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}] }, {}, [1]);

/**
 * reference http://www.css88.com/doc/underscore/docs/underscore.html
 * underScore 1.8
 */

var isObject = function isObject(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};

/**
 * reference http://www.css88.com/doc/underscore/docs/underscore.html
 * underScore 1.8
 */

var isString = function isString(str) {
  //return toString.call(obj) === '[object String]';
  return typeof str == 'string' && str.constructor == String;
};

/**
 * 
 * assign kiwi.gl object to be an unique id in the global
 * @author yellow 2017/5/26
 * 
 */

var prefix = '_fusion_';
var prefixId = prefix + 'id_';

var i = 1;

var getId = function getId() {
    return prefixId + i++;
};

/**
 * get the unique id
 * @method stamp
 * @param {Object} obj 
 * @return {String} error if returned 'null'
 */
var stamp = function stamp(obj) {
    if (isObject(obj)) {
        obj._fusion_id_ = obj._fusion_id_ || getId();
        return obj._fusion_id_;
    } else if (isString(obj)) {
        return prefix + obj;
    } else return null;
};

/**
* @description 字符串去除空格
* @param {String} input 输入字符串
* @returns {String} 返回处理后的字符串
*/
var trim = function (isNative) {
    return function (input) {
        return isNative ? isNative.apply(input) : ((input || '') + '').replace(/^\s+|\s+$/g, '');
    };
}(String.prototype.trim);

/**
 * @description  字符串内空格拆分为字符数组
 * @param {any} str
 * @returns {Array} 拆分后的数组
 */
var splitWords = function splitWords(str) {
    return trim(str).split(/\s+/);
};

/**
* @author }{yellow
* @date 2017/4/18
* @description 空函数
*/
function noop() {}

/**
*   @author }{yellow 2017/4/18
*   @returns {Object} 合并后对象
*/

var merge = function merge() {
  var _babelHelpers;

  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return (_babelHelpers = babelHelpers$1).extends.apply(_babelHelpers, [{}].concat(sources));
};

/**
*   set two keys for events: _idx,_len
*   _len means the count of handlers have bind with context
*   _event popNode
*   @author yellow date 2014/11/10
*   @class J.utils.Event
*   @inheritable
*/

var Event = function () {
    function Event() {
        classCallCheck(this, Event);
        this._eventPopNodes = {};
        this._events = {};
    }

    createClass(Event, [{
        key: '_on',
        value: function _on(type, fn, context) {
            var events = this._events,
                contextId = context && context !== this && stamp(context);
            if (contextId) {
                var indexKey = type + '_idx',
                    indexLenKey = type + '_len',
                    typeIndex = events[indexKey] = events[indexKey] || {},
                    id = stamp(fn) + '_' + contextId;
                if (!typeIndex[id]) {
                    typeIndex[id] = { fn: fn, ctx: context };
                    events[indexLenKey] = events[indexLenKey] || 0;
                    events[indexLenKey]++;
                }
            } else {
                events[type] = events[type] || [];
                events[type].push({ fn: fn });
            }
        }
    }, {
        key: '_off',
        value: function _off(type, fn, context) {
            var events = this._events,
                indexKey = type + '_idx',
                indexLenKey = type + '_len';
            if (!events) {
                return;
            }
            if (!fn) {
                delete events[type];
                delete events[indexKey];
                delete events[indexLenKey];
                return;
            }
            var contextId = context && context !== this && stamp(context),
                listeners,
                i,
                len,
                listener,
                id;
            if (contextId) {
                id = stamp(fn) + '_' + contextId;
                listeners = events[indexKey];
                if (listeners && listeners[id]) {
                    listener = listeners[id];
                    delete listeners[id];
                    --events[indexLenKey];
                }
            } else {
                listeners = events[type];
                if (listeners) {
                    for (i = 0, len = listeners.length; i < len; i++) {
                        if (listeners[i].fn === fn) {
                            listener = listeners[i];
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (listener) {
                listener.fn = noop;
            }
        }
    }, {
        key: 'once',
        value: function once(types, fn, context) {
            if ((typeof types === 'undefined' ? 'undefined' : _typeof(types)) === 'object') {
                for (var type in types) {
                    this.once(type, types[type], fn);
                }
                return this;
            }
            var handler = bind(function () {
                this.off(types, fn, context).off(types, handler, context);
            }, this);
            return this.on(types, fn, context).on(types, handler, context);
        }
    }, {
        key: 'on',
        value: function on(types, fn, context) {
            if ((typeof types === 'undefined' ? 'undefined' : _typeof(types)) === 'object') {
                for (var type in types) {
                    this._on(type, types[type], fn);
                }
            } else {
                types = splitWords(types);
                for (var i = 0, len = types.length; i < len; i++) {
                    this._on(types[i], fn, context);
                }
            }
            return this;
        }

        /**
        *   移除事件
        *   @method off
        *   @chainable
        *   @param {String} types 形如'mousemove click'
        *   @param {Funtion} fn
        *   @param {Object} context 上下文，用于存储事件
        *   @return {Object} this
        */

    }, {
        key: 'off',
        value: function off(types, fn, context) {
            if (!types) {
                delete this._events;
            } else if ((typeof types === 'undefined' ? 'undefined' : _typeof(types)) === 'object') {
                for (var type in types) {
                    this._off(type, types[type], fn);
                }
            } else {
                types = splitWords(types);
                for (var i = 0, len = types.length; i < len; i++) {
                    this._off(types[i], fn, context);
                }
            }
            return this;
        }
    }, {
        key: 'fire',
        value: function fire(type, data, propagate) {
            if (!this.listens(type, propagate)) {
                return this;
            }
            var event = merge({}, data, { type: type, target: this }),
                events = this._events;
            var typeIndex = events[type + '_idx'],
                i,
                len,
                listeners,
                id;
            if (events[type]) {
                listeners = events[type].slice();
                for (i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].fn.call(this, event);
                }
            }
            for (id in typeIndex) {
                typeIndex[id].fn.call(typeIndex[id].ctx, event);
            }
            if (propagate) {
                this._propagateEvent(event);
            }
            return this;
        }
    }, {
        key: 'listens',
        value: function listens(type, propagate) {
            var events = this._events;
            if (events[type] || events[type + '_len']) {
                return true;
            }
            if (propagate) {
                for (var id in this._eventPopNodes) {
                    if (this._eventPopNodes[id].listens(type, propagate)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'addEventPopNode',
        value: function addEventPopNode(obj) {
            this._eventPopNodes[stamp(obj)] = obj;
            return this;
        }
    }, {
        key: 'removeEventPopNode',
        value: function removeEventPopNode(obj) {
            if (!!this._eventPopNodes[stamp(obj)]) {
                delete this._eventPopNodes[stamp(obj)];
            }
            return this;
        }
    }, {
        key: '_propagateEvent',
        value: function _propagateEvent(e) {
            for (var id in this._eventPopNodes) {
                this._eventPopNodes[id].fire(e.type, merge({ popNode: e.target }, e), true);
            }
        }
    }]);
    return Event;
}();

/**
 * store events name to on/off/fire
 * cause of each const event name has been changed by 'stamp',we recommend using this method.
 * @author yellow 2017/5/26
 */

var _FUSION_EVENT_RESIZE = stamp('resize');

var _FUSION_EVENT_ANIMATION_ONCANCEL = stamp('animation_cancel');

var _FUSION_EVENT_ANIMATION_ONFINISH = stamp('animation_onfinish');

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

/**
 * @author yellow date 2017/6/15
 * management of GLExtension
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
 * 
 * @class
 * @example
 *  let extension = new GLExtension(gl);
 *  let standardDerivatives = extension['standardDerivatives']; 
 *  //or
 *  let standardDerivatives = extension.standardDerivatives; 
 */

var GLExtension = function () {
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {Array} [names] the arry of extension names
     */

    /**
     * map of extension
     */
    function GLExtension(gl) {
        classCallCheck(this, GLExtension);
        this._extensions = {};

        this._gl = gl;
        this._includeExtension(gl);
        this._map();
    }
    /**
     * 
     */


    createClass(GLExtension, [{
        key: '_includeExtension',
        value: function _includeExtension(gl) {
            for (var key in GL_STANDEXTENSIONS) {
                if (GL_STANDEXTENSIONS.hasOwnProperty(key)) {
                    var extensionName = GL_STANDEXTENSIONS[key],
                        extension = this._getExtension(gl, extensionName);
                    if (!!extension) this._extensions[key] = extension;
                }
            }
        }
    }, {
        key: '_getExtension',
        value: function _getExtension(gl, names) {
            for (var i = 0, len = names.length; i < len; ++i) {
                var extension = gl.getExtension(names[i]);
                if (extension) return extension;
            }
            return undefined;
        }
    }, {
        key: '_map',

        /**
         * map gl.extension to GLContext instance
         */
        value: function _map() {
            for (var key in this._extensions) {
                if (this._extensions.hasOwnProperty(key)) {
                    var target = this._extensions[key];
                    if (!this[key] && !!target) this[key] = target;
                }
            }
        }
    }]);
    return GLExtension;
}();

/**
 * detect hardware env to fix the number of Limits
 * @author yellow date 2017/6/15
 */

var Limits = {
    maximumCombinedTextureImageUnits: 0,
    maximumCubeMapSize: 0,
    maximumFragmentUniformVectors: 0,
    maximumTextureImageUnits: 0,
    maximumRenderbufferSize: 0,
    maximumTextureSize: 0,
    maximumVaryingVectors: 0,
    maximumVertexAttributes: 0,
    maximumVertexTextureImageUnits: 0,
    maximumVertexUniformVectors: 0,
    minimumAliasedLineWidth: 0,
    maximumAliasedLineWidth: 0,
    minimumAliasedPointSize: 0,
    maximumAliasedPointSize: 0,
    maximumViewportWidth: 0,
    maximumViewportHeight: 0,
    maximumTextureFilterAnisotropy: 0,
    maximumDrawBuffers: 0,
    maximumColorAttachments: 0,
    highpFloatSupported: false,
    highpIntSupported: false,
    //多线程获取,A Number indicating the number of logical processor cores.
    //用于创建webwork 
    // reference https://developer.mozilla.org/en-US/docs/Web/API/NavigatorConcurrentHardware/hardwareConcurrency
    //@example 
    //  let newWorker = {
    //      worker=new Worker('cpuWorker.js'),
    //      inUse:false
    //  }
    hardwareConcurrency: 0
};

var GLLimits = function () {
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */
    function GLLimits(gl) {
        classCallCheck(this, GLLimits);

        this._gl = gl;
        this._limits = merge({}, Limits);
        this._includeParamter(this._gl);
        this._map();
    }

    createClass(GLLimits, [{
        key: '_includeParamter',
        value: function _includeParamter(gl) {
            this._limits.hardwareConcurrency = window.navigator.hardwareConcurrency || 2;
            this._limits.maximumCombinedTextureImageUnits = gl.getParameter(GLConstants.MAX_COMBINED_TEXTURE_IMAGE_UNITS); // min: 8
            this._limits.maximumCubeMapSize = gl.getParameter(GLConstants.MAX_CUBE_MAP_TEXTURE_SIZE); // min: 16
            this._limits.maximumFragmentUniformVectors = gl.getParameter(GLConstants.MAX_FRAGMENT_UNIFORM_VECTORS); // min: 16
            this._limits.maximumTextureImageUnits = gl.getParameter(GLConstants.MAX_TEXTURE_IMAGE_UNITS); // min: 8
            this._limits.maximumRenderbufferSize = gl.getParameter(GLConstants.MAX_RENDERBUFFER_SIZE); // min: 1
            this._limits.maximumTextureSize = gl.getParameter(GLConstants.MAX_TEXTURE_SIZE); // min: 64
            this._limits.maximumVaryingVectors = gl.getParameter(GLConstants.MAX_VARYING_VECTORS); // min: 8
            this._limits.maximumVertexAttributes = gl.getParameter(GLConstants.MAX_VERTEX_ATTRIBS); // min: 8
            this._limits.maximumVertexTextureImageUnits = gl.getParameter(GLConstants.MAX_VERTEX_TEXTURE_IMAGE_UNITS); // min: 0
            this._limits.maximumVertexUniformVectors = gl.getParameter(GLConstants.MAX_VERTEX_UNIFORM_VECTORS); // min: 128
            this._limits.highpFloatSupported = gl.getShaderPrecisionFormat(GLConstants.FRAGMENT_SHADER, GLConstants.HIGH_FLOAT) !== 0;
            this._limits.highpIntSupported = gl.getShaderPrecisionFormat(GLConstants.FRAGMENT_SHADER, GLConstants.HIGH_INT) !== 0;
            this._limits.maximumTextureFilterAnisotropy = gl.getParameter(GLConstants.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

            //must include 1
            var _gl$getParameter = gl.getParameter(GLConstants.ALIASED_LINE_WIDTH_RANGE);

            var _gl$getParameter2 = slicedToArray(_gl$getParameter, 2);

            this._limits.minimumAliasedLineWidth = _gl$getParameter2[0];
            this._limits.maximumAliasedLineWidth = _gl$getParameter2[1];

            //must include 1
            var _gl$getParameter3 = gl.getParameter(GLConstants.ALIASED_POINT_SIZE_RANGE);

            var _gl$getParameter4 = slicedToArray(_gl$getParameter3, 2);

            this._limits.minimumAliasedPointSize = _gl$getParameter4[0];
            this._limits.maximumAliasedPointSize = _gl$getParameter4[1];

            var _gl$getParameter5 = gl.getParameter(GLConstants.MAX_VIEWPORT_DIMS);

            var _gl$getParameter6 = slicedToArray(_gl$getParameter5, 2);

            this._limits.maximumViewportWidth = _gl$getParameter6[0];
            this._limits.maximumViewportHeight = _gl$getParameter6[1];
        }
    }, {
        key: '_map',

        /**
         * map the limits to GLLimits instance
         */
        value: function _map() {
            for (var key in this._limits) {
                if (this._limits.hasOwnProperty(key)) {
                    var target = this._limits[key];
                    if (!this[key] && !!target) this[key] = target;
                }
            }
        }
    }]);
    return GLLimits;
}();

/**
 * 设计思路为.net framework 的 IDispose接口
 * 除此之外提供额外的属性：
 * -id
 * -handle
 * -create handle
 * -des
 * @class Dispose
 */

var Dispose = function () {
  /**
   * 构建一个可被销毁的资源对象
   */

  /**
   * 资源id
   */
  function Dispose() {
    classCallCheck(this, Dispose);

    this.id = stamp(this);
  }
  /**
   * 资源销毁方法，执行完一段后，统一调用
   * must be implement be child class
   * @abstract
   */

  /**
   * 资源对象句柄
   */


  createClass(Dispose, [{
    key: 'dispose',
    value: function dispose() {
      throw new Error('no implementation of function dispose');
    }
    /**
     * 获取资源核心对象
     * @readonly
     * @member
     */

  }, {
    key: '_createHandle',

    /**
     * 创建资源
     * @abstract
     */
    value: function _createHandle() {
      // arguments.callee.toString();
      throw new Error('no implementation of function _createHandle');
    }
  }, {
    key: 'handle',
    get: function get$$1() {
      return this._handle;
    }
  }]);
  return Dispose;
}();

/**
 * 提供shader程序创建，销毁，应用等
 * @author yellow 2017/6/12
 */
/** 
 * Shader抽象类
 * @class
 */

var GLShader = function (_Dispose) {
  inherits(GLShader, _Dispose);

  /**
   * Creates an instance of Shader.
   * @constructor
   * @param {WebGLRenderingContext} gl 
   * @param {Object} source
   * @param {String} [source.source]
   * @param {String} [source.name] 
   * @param {String} shaderType 
   * @param {GLExtension} extension
   */

  /**
   * the shader instance
   * @memberof Shader
   */

  /**
   * the shader text
   * @memberof Shader
   */
  function GLShader(gl, source, shaderType, extension) {
    classCallCheck(this, GLShader);

    var _this = possibleConstructorReturn(this, (GLShader.__proto__ || Object.getPrototypeOf(GLShader)).call(this));

    _this._gl = gl;
    _this._source = source;
    _this._shaderType = shaderType;
    _this._handle = _this._createHandle();
    _this._compile();
    return _this;
  }
  /**
   * @type {GLExtension}
   */

  /**
   * shader类型
   * @memberof Shader
   * @type {number} a instance of gl.Enum
   */

  /**
   * the glContext 
   * @type {WebGLRenderingContext}
   * @memberof Shader
   */


  createClass(GLShader, [{
    key: '_compile',

    /**
     * use gl to compile the shader
     * @memberof Shader
     */
    value: function _compile() {
      var gl = this._gl;
      gl.shaderSource(this._handle, this._source);
      gl.compileShader(this._handle);
      var compileStatus = gl.getShaderParameter(this._handle, GLConstants.COMPILE_STATUS);
      if (!compileStatus) {
        var infoLog = gl.getShaderInfoLog(this.handle);
        this.dispose();
        throw new Error(infoLog);
      }
    }
  }, {
    key: 'dispose',

    /**
     * delete shader form gl
     */
    value: function dispose() {
      this._gl.deleteShader(this._handle);
    }
    /**
     * overwrite 
     */

  }, {
    key: '_createHandle',
    value: function _createHandle() {
      var gl = this._gl;
      return gl.createShader(this._shaderType);
    }
  }, {
    key: 'translateSource',

    /**
     * return the complied source
     * @readonly
     * @memberof Shader
     */
    get: function get$$1() {
      var extension = this._extension['WEBGL_debug_shaders'];
      return extension ? extension.getTranslatedShaderSource(this.handle) : 'No translated source available. WEBGL_debug_shaders not implemented';
    }
  }, {
    key: 'source',

    /**
     * @readonly
     * @memberof Shader
     */
    get: function get$$1() {
      return this._source;
    }
  }]);
  return GLShader;
}(Dispose);



/**
 * @class
 */

var GLVertexShader = function (_GLShader) {
  inherits(GLVertexShader, _GLShader);

  /**
   * 创建vertex shader
   * @param {WebGLRenderingContext} gl 
   * @param {String} source 
   * @param {GLExtension} extension
   */
  function GLVertexShader(gl, source, extension) {
    classCallCheck(this, GLVertexShader);
    return possibleConstructorReturn(this, (GLVertexShader.__proto__ || Object.getPrototypeOf(GLVertexShader)).call(this, gl, source, GLConstants.VERTEX_SHADER, extension));
  }

  return GLVertexShader;
}(GLShader);

/**
 * @class
 */


var GLFragmentShader = function (_GLShader2) {
  inherits(GLFragmentShader, _GLShader2);

  /**
   * 创建fragment shader
   * @param {WebGLRenderingContext} gl 
   * @param {String} source 
   * @param {GLExtension} extension
   */
  function GLFragmentShader(gl, source, extension) {
    classCallCheck(this, GLFragmentShader);
    return possibleConstructorReturn(this, (GLFragmentShader.__proto__ || Object.getPrototypeOf(GLFragmentShader)).call(this, gl, source, GLConstants.FRAGMENT_SHADER, extension));
  }

  return GLFragmentShader;
}(GLShader);

/**
 * 
 * 提供 buffer,vertexbuffer,indexbuffer 三种类型
 * -vertexbuffer对应draw
 * -indexbuffer对应element draw
 */
var EMPTY_BUFFER = new ArrayBuffer(0);

/**
 * @class
 */

var GLBuffer = function (_Dispose) {
  inherits(GLBuffer, _Dispose);

  /**
   * 
   * @param {WebGLRenderingContext} gl 
   * @param {gl.ArrayBuffer|gl.ELEMENT_ARRAY_BUFFER} type 
   * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView} data an array of data
   * @param {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW} drawType 
   */

  /**
   * @type {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
   */

  /**
   * @type {WebGLRenderingContext}
   */
  function GLBuffer(gl, type, data, drawType) {
    classCallCheck(this, GLBuffer);

    var _this = possibleConstructorReturn(this, (GLBuffer.__proto__ || Object.getPrototypeOf(GLBuffer)).call(this));

    _this._gl = gl;
    _this._type = type || GLConstants.ARRAY_BUFFER;
    _this._data = data || EMPTY_BUFFER;
    _this._drawType = drawType || GLConstants.STATIC_DRAW;
    _this._handle = _this._createHandle();
    return _this;
  }
  /**
   * 创建句柄/对象
   */

  /**
   * @type {ArrayBuffer| SharedArrayBuffer|ArrayBufferView}
   */

  /**
   * @type {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
   */


  createClass(GLBuffer, [{
    key: '_createHandle',
    value: function _createHandle() {
      var gl = this._gl;
      return gl.createBuffer();
    }
    /**
     * 资源销毁
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      var gl = this._gl;
      gl.deleteBuffer(this.handle);
    }
    /**
     * bind buffer
     */

  }, {
    key: 'bind',
    value: function bind() {
      var gl = this._gl;
      gl.bindBuffer(this._type, this._handle);
    }
    /**
     * 获取buffer的长度
     */

  }, {
    key: 'len',
    get: function get$$1() {
      return this._data.length;
    }
    /**
     * 获取buffer data 的type,例如 gl.Float
     */

  }, {
    key: 'type',
    get: function get$$1() {
      return this._type;
    }
    /**
     * 绘制类型
     */

  }, {
    key: 'drawType',
    get: function get$$1() {
      return this._drawType;
    }
    /**
     * 获取buffer的Float32aArray类型数据
     * @readonly
     * @memberof GLBuffer
     * @return {Float32Array} 
     */

  }, {
    key: 'float32',
    get: function get$$1() {
      var array = this._data;
      return new Float32Array(array);
    }
  }]);
  return GLBuffer;
}(Dispose);
/**
 * @class
 */


var GLVertexBuffer = function (_GLBuffer) {
  inherits(GLVertexBuffer, _GLBuffer);

  /**
   * 
   * @param {WebGLRenderingContext} gl 
   * @param {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} data 
   * @param {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW} drawType 
   */
  function GLVertexBuffer(gl, data, drawType) {
    classCallCheck(this, GLVertexBuffer);
    return possibleConstructorReturn(this, (GLVertexBuffer.__proto__ || Object.getPrototypeOf(GLVertexBuffer)).call(this, gl, GLConstants.ARRAY_BUFFER, data, drawType));
  }

  return GLVertexBuffer;
}(GLBuffer);
/**
 * @class
 */


var GLIndexBuffer = function (_GLBuffer2) {
  inherits(GLIndexBuffer, _GLBuffer2);

  /**
   * 
   * @param {WebGLRenderingContext} gl 
   * @param {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} data 
   * @param {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW} drawType 
   */
  function GLIndexBuffer(gl, data, drawType) {
    classCallCheck(this, GLIndexBuffer);
    return possibleConstructorReturn(this, (GLIndexBuffer.__proto__ || Object.getPrototypeOf(GLIndexBuffer)).call(this, gl, GLConstants.ELEMENT_ARRAY_BUFFER, data.drawType));
  }

  return GLIndexBuffer;
}(GLBuffer);

/**
 * 使用 ext 扩展的VertexArrayObject
 * reference https://developer.mozilla.org/zh-CN/docs/Web/API/OES_vertex_array_object
 * 
 * @class GLVertexArrayObject
 */
/**
 * @class
 */

var GLVertexArrayObject = function (_Dispose) {
    inherits(GLVertexArrayObject, _Dispose);

    /**
     * @param {WebGLRenderingContext} gl 
     * @param {GLExtension} extension 
     * @param {GLLimits} limits
     */

    /**
     * @type {WebGLRenderingContext}
     */

    /**
     * 存储 vertexbuffer和其相关属性
     */
    function GLVertexArrayObject(gl, extension, limits) {
        classCallCheck(this, GLVertexArrayObject);

        var _this = possibleConstructorReturn(this, (GLVertexArrayObject.__proto__ || Object.getPrototypeOf(GLVertexArrayObject)).call(this));

        _this._indexBuffer = null;
        _this._attributes = [];
        _this._needsToActive = false;

        _this._gl = gl;
        _this._ext = extension['vertexArrayObject'];
        _this._handle = _this._createHandle();
        return _this;
    }
    /**
     * 创建vao对象
     * @description polyfill
     * @return va
     */

    /**
     * 默认情况下，未新增attribute时不需要active，如果新增了active，则整个vao对象里的绘制方法混合，需要重新active
     * @type {boolean}
     */

    /**
     * @type {GLExtension}
     */

    /**
     * 存储 indexbuffer ，用于重新排列 vertexbuffer顶点
     */


    createClass(GLVertexArrayObject, [{
        key: '_createHandle',
        value: function _createHandle() {
            var gl = this._gl,
                ext = this._ext;
            if (!!ext) return ext.createVertexArrayOES();
            if (!!gl.createVertexArray) return gl.createVertexArray();
            return null;
        }
        /**
         * 销毁vao对象
         */

    }, {
        key: 'dispose',
        value: function dispose() {}
        /**
         * 绑定上下文
         */

    }, {
        key: 'bind',
        value: function bind() {
            var ext = this._ext,
                gl = this._gl;
            if (!!ext) ext.bindVertexArrayOES(this._handle);else gl.bindVertexArray(this._handle);
        }
        /**
         * 解除上下文绑定
         */

    }, {
        key: 'unbind',
        value: function unbind() {
            var ext = this._ext,
                gl = this._gl;
            if (!!ext) ext.bindVertexArrayOES(null);else gl.bindVertexArray(null);
        }
        /**
         * 启动vertexbuffer和indexbuffer
         */

    }, {
        key: '_active',
        value: function _active() {
            this._activeVertexBuffer();
            this._activeIndexBuffer();
        }
        /**
         * 启用indexbuffer
         */

    }, {
        key: '_activeIndexBuffer',
        value: function _activeIndexBuffer() {
            this._indexBuffer.bind();
        }
        /**
         * bufferData到指定vao
         */

    }, {
        key: '_activeVertexBuffer',
        value: function _activeVertexBuffer() {
            var gl = this._gl;
            //设置 vertexbuffer 
            for (var i = 0, len = this._attributes.length; i < len; i++) {
                var att = this._attributes[i];
                //1.bind buffer
                att.buffer.bind();
                //2.setting vertexAttrib
                gl.vertexAttribPointer(att.location, att.size, att.type, att.normalized, att.stride, att.offset);
            }
        }
        /**
         * 
         * @param {GLVertexBuffer} buffer ,buffer数据存储器
         * @param {number} location ,需要修改的订单属性的索引值，例如 gPositionLocation
         * @param {number} size, 指定数据的纬度，如 [x,y] 则size=2 ,[x,y,z,w] 则size=4
         * @param {boolean} normalized 
         * @param {number} stride 指定连续顶点属性之间的偏移量。如果为0，那么顶点属性会被理解为：它们是紧密排列在一起的。初始值为0。
         * @param {number} offset 指定第一个组件在数组的第一个顶点属性中的偏移量。该数组与GL_ARRAY_BUFFER绑定，储存于缓冲区中。初始值为0；
         */

    }, {
        key: 'addAttribute',
        value: function addAttribute(buffer, location, size, normalized, stride, offset) {
            this._attributes.push({
                glBuffer: buffer,
                location: location,
                size: size,
                type: buffer.type || GLConstants.FLOAT,
                normalized: normalized || false,
                stride: stride || 0,
                offset: offset || 0
            });
        }
        /**
         * reference
         * http://www.cnblogs.com/excalibur/articles/1573892.html
         * 使用indexbuffer优势：
         * - 不改动vertexbuffer的情况下，排列绘制顶点顺序
         * - 复用转换后的顶点
         * 但是vertex cache数量有限，尽力将indexbuffer的数据放在相互靠近的地方。
         * @param {GLIndexBuffer} buffer 
         */

    }, {
        key: 'addIndex',
        value: function addIndex(buffer) {
            this._indexBuffer = buffer;
        }
        /**
         * 清空vao对象
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.unbind();
            this.bind();
            this._attributes = [];
            this._indexBuffer = null;
        }
        /**
         * 
         * @param {*} type 
         * @param {*} size 
         * @param {number} offset 
         */

    }, {
        key: 'draw',
        value: function draw(type, size, offset) {
            var gl = this._gl;
            if (!!this._indexBuffer) {
                gl.drawElements(type, size || this._indexBuffer.length, this._indexBuffer.type, (offset || 0) << 1);
            } else {
                gl.drawArrays(type, offset, size || this.size);
            }
        }
        /**
         * 获取vao规格
         */

    }, {
        key: 'size',
        get: function get$$1() {
            var attrib = this._attributes[0];
            return attrib.buffer.length / (attrib.stride / 4 || attrib.size);
        }
    }]);
    return GLVertexArrayObject;
}(Dispose);

/**
 * the program 
 * reference 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLProgram
 * https://github.com/pixijs/pixi-gl-core/blob/master/src/GLShader.js
 * https://github.com/pixijs/pixi-gl-core/blob/master/src/shader/extractAttributes.js
 * https://github.com/pixijs/pixi-gl-core/blob/master/src/shader/extractUniforms.js
 * 
 * 合并shader，并缓存进gl，便于之后使用
 * 不提倡luma.gl的写法，即对gl对象添加属性，形如 gl.luma = {}
 * 所以在此类提供两个方法，为不同的实例化
 *
 * -解决 uniform 和 attribute 通过属性即可设置的问题
 * -unifrom 涉及数据类型转换，所以规定属性使用 GLUniform
 * -attribuet 涉及数据转换，规定attribute使用 GLBuffer
 * 
 * @author yellow date 2017/6/12
 */

/**
 * 统一使用array方式调用， ..args
 */
var GLSL_UNIFORM = {
  'float': 'uniform1fv', //(location, value)
  'vec2': 'uniform2fv', //(location, value)
  'vec3': 'uniform3fv', //(location, value)
  'vec4': 'uniform4fv', //(location, value)
  'int': 'uniform1iv', //(location, value)
  'ivec2': 'uniform2iv', //(location, value)
  'ivec3': 'uniform3iv', //(location, value)
  'ivec4': 'uniform4iv', //(location, value)
  'bool': 'uniform1iv', //(location, value)
  'bvec2': 'uniform2iv', //(location, value)
  'bvec3': 'uniform3iv', //(location, value)
  'bvec4': 'uniform4iv', //
  'sampler2D': 'uniform1iv' //(location, value)
};

var GL_GLSL = {
  'FLOAT': 'float',
  'FLOAT_VEC2': 'vec2',
  'FLOAT_VEC3': 'vec3',
  'FLOAT_VEC4': 'vec4',
  'INT': 'int',
  'INT_VEC2': 'ivec2',
  'INT_VEC3': 'ivec3',
  'INT_VEC4': 'ivec4',
  'BOOL': 'bool',
  'BOOL_VEC2': 'bvec2',
  'BOOL_VEC3': 'bvec3',
  'BOOL_VEC4': 'bvec4',
  'FLOAT_MAT2': 'mat2',
  'FLOAT_MAT3': 'mat3',
  'FLOAT_MAT4': 'mat4',
  'SAMPLER_2D': 'sampler2D'
};

var GLSL_SIZE = {
  'float': 1,
  'vec2': 2,
  'vec3': 3,
  'vec4': 4,
  'int': 1,
  'ivec2': 2,
  'ivec3': 3,
  'ivec4': 4,
  'bool': 1,
  'bvec2': 2,
  'bvec3': 3,
  'bvec4': 4,
  'mat2': 4,
  'mat3': 9,
  'mat4': 16,
  'sampler2D': 1
};

/**
 * 构建gl类型（number）和 glsl类型映射表
 */
var NATIVE_GL_TABLE = function (keys) {
  var _gl_table = {};
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    _gl_table[GLConstants[key]] = GL_GLSL[key];
  }
  return _gl_table;
}(Object.keys(GL_GLSL));
/**
 * 获取glsl对象类型的size
 * @param {String} glslType 
 * @return {number}
 */
var getGLSLTypeSize = function getGLSLTypeSize(glslType) {
  return GLSL_SIZE[glslType];
};
/**
 * 获取gltype对应glsl的type
 * @param {number} glType 
 */
var getGLSLType = function getGLSLType(glType) {
  return NATIVE_GL_TABLE[glType];
};
/**
 * glsl类型转换成获取uniform设置属性的方法
 * @param {String} glslType 
 */
var getUniformFunc = function getUniformFunc(glslType) {
  return GLSL_UNIFORM[glslType];
};
/**
 * @class
 */

var GLProgram = function (_Dispose) {
  inherits(GLProgram, _Dispose);

  /**
   * 创建program
   * @param {WebGLRenderingContext} gl 
   * @param {GLVertexShader} fragmentSource glsl shader文本
   * @param {GLFragmentShader} vertexSource glsl shader文本
   * @param {GLExtension} extension
   * @param {GLLimits} [limits] the context limtis
   * @param {Boolean} [isWebGL2] detect the evn support webgl2
   */

  /**
   * 混合存储 oes_vertex_array_object
   * @type {GLVertexArrayObject}
   * @memberof GLProgram
   */

  /**
   * vertex_shader
   * @type {GLVertexShader}
   */

  /**
   * @type {GLExtension}
   */

  /**
   * program active attribute
   */
  function GLProgram(gl, vs, fs, extension, limits) {
    var isWebGL2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    classCallCheck(this, GLProgram);

    var _this = possibleConstructorReturn(this, (GLProgram.__proto__ || Object.getPrototypeOf(GLProgram)).call(this));

    _this._gl = gl;
    _this._extension = extension;
    _this._limits = limits;
    _this._vao = new GLVertexArrayObject(gl, extension, limits);
    _this._vs = vs;
    _this._fs = fs;
    _this._handle = _this._createHandle();
    _this._gl.attachShader(_this._handle, _this._vs.handle);
    _this._gl.attachShader(_this._handle, _this._fs.handle);
    _this._isWebGL2 = isWebGL2 && !!_this._vao.handle;
    return _this;
  }
  /**
   * 获取attribues
   * @readonly
   * @memberof GLProgram
   */

  /**
   * 指示是否支持webgl2
   */

  /**
   * fragment_shader
   * @type {GLFragmentShader}
   */

  /**
   * @type {WebGLRenderingContext}
   */

  /**
   * program active 
   */


  createClass(GLProgram, [{
    key: '_extractAttributes',

    /**
     * extract attributes
     * 展开attributes
     */
    value: function _extractAttributes() {
      var isWebGL2 = this._isWebGL2,
          gl = this._gl,
          vao = this._vao,
          attribLen = gl.getProgramParameter(this._handle, GLConstants.ACTIVE_ATTRIBUTES);
      var attributes = {};
      //get attributes and store mapdata
      for (var i = 0; i < attribLen; i++) {
        var attrib = gl.getActiveAttrib(this._handle, i),
            type = getGLSLType(attrib.type),
            name = attrib.name,
            size = getGLSLTypeSize(type),
            location = gl.getAttribLocation(this._handle, name);
        gl.enableVertexAttribArray(location);
        //
        Object.defineProperty(attributes, name, {
          set: function (gl2, loc, typ, ne, se) {
            return gl2 ? function (value) {
              var glBuffer = value;
              gl.bindBuffer(glBuffer.type, glBuffer.handle);
              gl.bufferData(glBuffer.type, glBuffer.float32, glBuffer.drawType);
              vao.addAttribute(glBuffer, loc, se);
            } : function (value) {
              var glBuffer = value;
              gl.bindBuffer(glBuffer.type, glBuffer.handle);
              gl.bufferData(glBuffer.type, glBuffer.float32, glBuffer.drawType);
              gl.vertexAttribPointer(loc, se, glBuffer.type, false, 0, 0);
            };
          }(isWebGL2, location, type, name, size)
        });
      }
      //
      this._attributes = attributes;
    }
    /**
     * 展开uniforms并map到对象
     * @memberof GLProgram
     */

  }, {
    key: '_extractUniforms',
    value: function _extractUniforms() {
      var _this2 = this;

      var isWebGL2 = this._isWebGL2,
          gl = this._gl,
          uniformsLen = gl.getProgramParameter(this._handle, GLConstants.ACTIVE_UNIFORMS);
      var uniforms = {};
      //1.get uniforms and store mapdata

      var _loop = function _loop(i) {
        var uniform = gl.getActiveUniform(_this2._handle, i),
            type = getGLSLType(uniform.type),
            name = uniform.name.replace(/\[.*?\]/, ""),
            size = uniform.size,
            location = gl.getUniformLocation(_this2._handle, name);
        //提供attribute属性访问
        Object.defineProperty(uniforms, name, {
          /**
          * @param {glMatrix.*} value
          */
          set: function set$$1(value) {
            var funcName = getUniformFunc(type);
            //gl[funcName](location,)
            gl[funcName](location, value);
          }
        });
      };

      for (var i = 0; i < uniformsLen; i++) {
        _loop(i);
      }
      //
      this._uniforms = uniforms;
    }
  }, {
    key: '_createHandle',
    value: function _createHandle() {
      return this._gl.createProgram();
    }
  }, {
    key: 'useProgram',
    value: function useProgram() {
      var gl = this._gl;
      gl.useProgram(this.handle);
      this._extractAttributes();
      this._extractUniforms();
    }
    /**
     * 获取attribute地址
     * @param {String} name
     * @return {number} 
     */

  }, {
    key: 'getAttribLocation',
    value: function getAttribLocation(name) {
      var attributeLocation = this._gl.getAttribLocation(this.handle, name);
      return attributeLocation;
    }
    /**
     * 获取uniform地址
     * @param {String} name 
     * @return {number} 
     */

  }, {
    key: 'getUniformLocation',
    value: function getUniformLocation(name) {
      var uniformLocation = this._gl.getUniformLocation(this.handle, name);
      return uniformLocation;
    }
    /**
     * 清理绑定信息，销毁program对象
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      var gl = this._gl;
      gl.deleteProgram(this._handle);
    }
    /**
     * 绘制
     * @param {gl.TRIANGLES|gl.POINTS} primitiveType 
     * @param {number} offset 
     * @param {number} count 
     */

  }, {
    key: 'drawArrays',
    value: function drawArrays(primitiveType, offset, count) {
      var gl = this._gl;
      gl.drawArrays(primitiveType || GLConstants.TRIANGLES, offset || 0, count || 6);
    }
  }, {
    key: 'attributes',
    get: function get$$1() {
      return this._attributes;
    }
  }, {
    key: 'uniforms',

    /**
     * 获取unfiroms
     * @readonly
     * @memberof GLProgram
     */
    get: function get$$1() {
      return this._uniforms;
    }
  }]);
  return GLProgram;
}(Dispose);

/**
 * warpped the WebGLRenderingContext
 * 管理
 * -cache
 * -program
 * -matrix
 * -extension
 * -limits
 * 
 * 特点：
 * reference https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap
 * 使用 OffscreenCanvas 创建不可见绘制canvas,后基于此canvas绘制图像，并保存成bitmap缓存帧
 * var htmlCanvas = document.getElementById("htmlCanvas").getContext("bitmaprenderer");
 * //
 * var offscreen = new OffscreenCanvas(256, 256);
 * var gl = offscreen.getContext("webgl");
 * var bitmap = offscreen.transferToImageBitmap();
 * //
 * 预留一定的帧数后，使用bitmaprender绘制bitmap到前端canvas即可
 * htmlCanvas.transferFromImageBitmap(bitmap);
 * 
 * context相当于webglRender
 * 
 * @author yellow 2017/6/11
 */
/**
 * @class
 * @example
 *   let cvs = document.createElement('canvas'),
 *       ctx = new Context(cvs);
 */

var Context = function () {
  /**
   * @param {htmlCanvas} canvas
   * @param {Object} [options]
   * @param {number} [options.width]
   * @param {number} [options.height]
   * @param {String} [options.renderType] 'webgl'、'webgl2'
   * @param {boolean} [options.alpha] default is false,but gl default is true
   * @param {boolean} [options.stencil] default is true,but gl default is false.the stencilBuffer to draw color and depth
   * @param {boolean} [options.depth] enable gl depth
   * @param {boolean} [options.antialias] enable antialias,default is false
   * @param {boolean} [options.premultipliedAlpha] enable premultipliedAlpha,default is true , webgl2
   * @param {boolean} [options.preserveDrawingBuffer] enable preserveDrawingBuffer,default is false , webgl2
   */

  /**
   * webgl扩展
   * @type {GLExtension}
   */

  /**
   * get context setting
   * @memberof Context
   */

  /**
   * 抗锯齿
   * @type {boolean}
   */

  /**
   * 是否启用缓冲区
   * @type {boolean}
   */

  /**
   * context类型，支持webgl,webgl2
   * @type {String}
   */

  /**
   * canvas width
   */

  /**
   * @type {GLProgram}
   */

  /**
   * shaderCache
   */
  function Context(options) {
    classCallCheck(this, Context);
    this._shaderCache = {};
    this._programCache = {};

    options = options || {};
    var width = options.width || window.innerWidth,
        height = options.height || window.innerHeight;
    //兼容性欠佳，故改用canvas = new OffscreenCanvas(width,height);
    this._offScreenCanvas(width, height);
    this._renderType = options.renderType || 'webgl2';
    this._alpha = options.alpha || false;
    this._stencil = options.stencil || true;
    this._depth = options.depth || true;
    this._antialias = options.antialias || false;
    this._premultipliedAlpha = options.premultipliedAlpha || true;
    this._preserveDrawingBuffer = options.preserveDrawingBuffer || false;
    this._allowTextureFilterAnisotropic = options.allowTextureFilterAnisotropic || true;
    //validation and logging disabled by default for speed.
    this._validateFramebuffer = false;
    this._validateShaderProgram = false;
    this._logShaderCompilation = false;
    //get glContext
    this._gl = this._canvas.getContext(this._renderType, this.getContextAttributes()) || this._canvas.getContext('experimental-' + this._renderType, this.getContextAttributes()) || undefined;
    //get extension
    this._includeExtension();
    //get parameter and extensions
    this._includeParameter();
    //inilization shaders
    this._includeShaders();
    //inilization programs
    this._includePrograms();
    //setup env
    this._setup();
  }
  /**
   * webgl detected
   * @type {GLLimits}
   */

  /**
   * 绘制上下文
   * @type {WebGLRenderingContext}
   */

  /**
   * 设置材质属性
   */

  /**
   * 设置绘制depth属性
   * @type {boolean}
   */

  /**
   * @type {number}
   */

  /**
   * canvas height
   */

  /**
   * the buffer canvas,
   * @type {OffscreenCanvas}
   */

  /**
   * @type {Object}
   */


  createClass(Context, [{
    key: '_offScreenCanvas',

    /**
     * 兼容写法，创建非可见区域canvas，用户做缓冲绘制
     * 待绘制完成后，使用bitmaprender绘制到实际页面上
     * @memberof Context
     * @param {number} width buffer canvas width
     * @param {number} height buffer canvas height
     */
    value: function _offScreenCanvas(width, height) {
      var htmlCanvas = document.createElement('canvas');
      htmlCanvas.width = width;
      htmlCanvas.height = height;
      this._canvas = htmlCanvas;
      //bug only firfox 44 + support
      //this._canvas = htmlCanvas.transferControlToOffscreen();
      this._width = width;
      this._height = height;
    }
  }, {
    key: 'renderToCanvas',

    /**
     * 兼容写法
     * -如果支持最新的bitmaprenderer则使用此方法
     * -如果不支持，则使用 canvas2d 贴图绘制
     * @param {HTMLCanvasElement} canvas
     * @memberof Context
     */
    value: function renderToCanvas(canvas) {
      //}{debug adjust canvas to fit the output
      canvas.width = this._width;
      canvas.height = this._height;
      var _canvas = this._canvas;
      //
      var image = new Image();
      image.src = _canvas.toDataURL("image/png");
      //
      var renderContext = canvas.getContext('bitmaprenderer') || canvas.getContext('2d');
      !!renderContext.transferFromImageBitmap ? renderContext.transferFromImageBitmap(image) : renderContext.drawImage(image, 0, 0);
      //
    }
    /**
     * get context attributes
     * include webgl2 attributes
     * reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     * 
     */

  }, {
    key: 'getContextAttributes',
    value: function getContextAttributes() {
      return {
        alpha: this._alpha,
        depth: this._depth,
        stencil: this._stencil,
        antialias: this._antialias,
        premultipliedAlpha: this._premultipliedAlpha,
        preserveDrawingBuffer: this._preserveDrawingBuffer,
        //如果系统性能较低，也会创建context
        failIfMajorPerformanceCaveat: true
      };
    }
  }, {
    key: '_setup',

    /**
     * 设置绘制区域的规则
     * 1. 混合颜色
     * 2. 深度
     * 3.
     * @param {WebGLRenderingContext} gl [WebGL2RenderingContext]
     */
    value: function _setup() {
      var gl = this._gl;
      //reference http://www.cppblog.com/wc250en007/archive/2012/07/18/184088.html
      //gl.ONE 使用1.0作为因子，相当于完全使用了这种颜色参与混合运算
      //gl.ONE_MINUS_SRC_ALPHA 使用1.0-源颜色alpha值作为因子，
      //作用为：源颜色的alpha作为不透明度，即源颜色alpha值越大，混合时占比越高，混合时最常用的方式
      gl.enable(GLConstants.BLEND);
      gl.blendFunc(GLConstants.ONE, GLConstants.ONE_MINUS_SRC_ALPHA);
      //为了模仿真实物体和透明物体的混合颜色，需要使用深度信息
      //http://www.cnblogs.com/aokman/archive/2010/12/13/1904723.html
      //模版缓存区测试，用来对比当前值与预设值，用以判断是否更新此值
      //顺序为：(framment + associated data) - pixel ownership test - scissor test
      //       - alpha test - stencil test - depth test
      //       - blending - dithering - logic op - framebuffer
      //在模板测试的过程中，可以先使用一个比较用掩码（comparison mask）与模板缓冲区中的值进行位与运算，
      //再与参考值进行比较，从而实现对模板缓冲区中的值的某一位上的置位状态的判断。
      gl.enable(GLConstants.STENCIL_TEST);
      //gl.stencilFunc(gl)
      gl.enable(GLConstants.DEPTH_TEST);
      gl.depthFunc(GLConstants.LEQUAL); //深度参考值小于模版值时，测试通过
      gl.depthMask(false);
    }
    /**
     * Query and initialize extensions
     */

  }, {
    key: '_includeExtension',
    value: function _includeExtension() {
      var gl = this._gl;
      this._glExtension = new GLExtension(gl);
    }
  }, {
    key: '_includeParameter',

    /**
     * hardware
     */
    value: function _includeParameter() {
      var gl = this._gl;
      this._glLimits = new GLLimits(gl);
    }
  }, {
    key: '_includeShaders',

    /**
     *  加载shaders
     */
    value: function _includeShaders() {
      var gl = this._gl,
          names = shadersName,

      //limits=this._glLimits,
      extension = this._glExtension;

      // for (let i = 0, len = names.length; i < len; i++) {
      //     const name = names[i];
      //     this._shaderCache[name] = ShaderFactory.create(name, gl, extension);
      // }
    }
    /**
     * 加载prgorams
     */

  }, {
    key: '_includePrograms',
    value: function _includePrograms() {
      var gl = this._gl,
          limits = this._glLimits,
          names = shadersName,
          extension = this._glExtension,
          shaderCache = this._shaderCache;

      for (var i = 0, len = names.length; i < len; i++) {
        var name = names[i];
        var shaders = shaderCache[name];
        var program = new GLProgram(gl, shaders[0], shaders[1], extension, limits);
        this._programCache[name] = program;
        gl.linkProgram(program.handle);
      }
    }
    /**
     * 清理颜色缓冲
     * @param {Array} rgba
     * @example 
     *  clearColor(1,1,1,1);
     */

  }, {
    key: 'clearColor',
    value: function clearColor() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var gl = this._gl,
          r = args[0],
          g = args[1],
          b = args[2],
          a = args[3];

      gl.clearColor(r || 0, g || 0, b || 0, a || 0);
      gl.clear(GLConstants.COLOR_BUFFER_BIT);
    }
  }, {
    key: 'clearStencil',

    /**
     * 清理模版缓冲
     */
    value: function clearStencil() {
      var gl = this._gl;
      gl.clearStencil(0x0);
      gl.stencilMask(0xFF);
      gl.clear(GLConstants.STENCIL_BUFFER_BIT);
    }
  }, {
    key: 'clearDepth',

    /**
     * 清理深度缓冲
     */
    value: function clearDepth() {
      var gl = this._gl;
      gl.clearDepth(0x1);
      gl.clear(GLConstants.DEPTH_BUFFER_BIT);
    }
  }, {
    key: '_getProgram',
    value: function _getProgram(programName, programConfiguration) {
      var cache = this._programCache;
      var key = '' + programName;
      if (!!cache[key]) return cache[key];else {
        //create program
      }
    }
  }, {
    key: 'resize',

    /**
     * resize the gl.viewPort
     * }{yellow wait to be implemented
     * @param {number} width 
     * @param {number} height 
     */
    value: function resize(width, height) {}
    /**
     * 返回渲染缓冲的宽度
     */

  }, {
    key: 'useProgram',

    /**
     * 使用指定program
     * @param {String} name 
     * @return {GLProgram}
     */
    value: function useProgram(name) {
      var shaders = this._shaderCache[name],
          program = this._programCache[name];
      program.useProgram();
      return program;
    }
  }, {
    key: 'width',
    get: function get$$1() {
      return this._width;
    }
    /**
     * 返回渲染缓冲的高度
     */

  }, {
    key: 'height',
    get: function get$$1() {
      return this._height;
    }
    /**
     * 返回物理上下文
     * @return {WebGLRenderingConext}
     */

  }, {
    key: 'gl',
    get: function get$$1() {
      return this._gl;
    }
  }]);
  return Context;
}();

/**
 * 生产和处理绘制数据，丢给render队列待output
 */
/**
 * contain two dimensional
 * -renderer,the paint renderer method
 * -data production queue
 * so,if we want to render geometry,we shoud produce data by customer DataManage
 * 
 * -将RenderNode内的数据取出，生成与逻辑无关的顶点用于渲染。
 *  绘制好后放入待output队列，等待RenderLoop操作逐帧渲染。
 * 
 * @class
 */

var RenderManager = function (_Event) {
    inherits(RenderManager, _Event);

    /**
     * 
     * @param {Object} [options] 
     * @param {String} [options.renderType] default is 'webgl'
     * @param {number} [options.width] 
     * @param {number} [options.height]
     */

    /**
     * render数据集
     */
    function RenderManager(options) {
        classCallCheck(this, RenderManager);

        var _this = possibleConstructorReturn(this, (RenderManager.__proto__ || Object.getPrototypeOf(RenderManager)).call(this));

        _this._renderNodes = [];

        _this._ctx = new Context(options);
        //renderManager监听 _KIWI_EVENT_RESIZE 事件
        //this.addEventPopNode(this._ctx);
        _this.on(_FUSION_EVENT_RESIZE, _this._onResize);
        return _this;
    }
    /**
     * render instance
     * @memberof RenderManager
     * @type {Context}
     */


    createClass(RenderManager, [{
        key: '_onResize',
        value: function _onResize(width, height) {
            var ctx = this._ctx;
            ctx.resize(width, height);
        }
    }, {
        key: 'addRenderNode',
        value: function addRenderNode(renderNode) {
            this._renderNodes.push(renderNode);
        }
    }, {
        key: 'context',
        get: function get$$1() {
            var ctx = this._ctx;
            return ctx;
        }
    }, {
        key: 'width',
        get: function get$$1() {
            var ctx = this._ctx;
            return ctx.width;
        }
    }, {
        key: 'height',
        get: function get$$1() {
            var ctx = this._ctx;
            return ctx.height;
        }
    }]);
    return RenderManager;
}(Event);

/**
 * reference https://github.com/mapbox/earcut
 * #RenderNode actor as an core object in gl
 * each geometry should be converted to #RenderNode
 * you can also building a update tree to cut down the cost in redraw by adding child nodes.
 * 
 * 每个Node包含自己的切割转换Buffer Array方法，提供给RenderManager下的work进行数据转换与裁剪
 * 
 * -vertexarraybuffer
 * -shader
 * -
 * 
 * @modify 2017/6/20
 * @author yellow 2017/5/24
 * @class RenderNode
 * 
 */
/**
 * @class
 */

var RenderNode = function (_Event) {
  inherits(RenderNode, _Event);

  /**
   * 
   */
  function RenderNode(gl) {
    classCallCheck(this, RenderNode);

    var _this = possibleConstructorReturn(this, (RenderNode.__proto__ || Object.getPrototypeOf(RenderNode)).call(this));

    _this._textures = {};
    _this._programs = {};
    _this._shaders = {};
    return _this;
  }
  /**
   * 默认构建一个渲染node类型的主对象
   */

  /**
   * 
   */

  /**
   * 
   */


  createClass(RenderNode, [{
    key: '_prepareRender',
    value: function _prepareRender() {}
  }]);
  return RenderNode;
}(Event);

/**
 * @author yellow 2017/5/15
 */
//基础

var defaultOptions = {
    width: window.innerHeight,
    height: window.innerHeight,
    renderType: 'webgl',
    roundPixels: false
};

/**
 * container 
 * used to transform accordance
 * @class
 */

var Container = function (_Event) {
    inherits(Container, _Event);

    /**
     * 
     * @param {Object} [options] the settings of container 
     * @param {number} [options.width] the html canvas width
     * @param {number} [options.height] the html canvas height
     * @param {String} [options.renderType='webgl'] the renderType,support 'webgl' only currently
     * @param {HTMLCanvasElement} [options.view] the html canvas to use as a view,usually created by container self.
     * @param {boolean} [options.roundPixels] use Math.floor(x/y) values when rendering if true
     */

    /**
     * container's width
     * @memberof Container
     * @member {number}
     */
    function Container(options) {
        classCallCheck(this, Container);

        var _this = possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

        options = options || {};
        var _options = merge(defaultOptions, options);
        _this._width = _options.width;
        _this._height = _options.height;
        _this._renderManager = new RenderManager(_options);
        _this.addEventPopNode(_this._renderManager);
        return _this;
    }
    /**
     * 获取绘制上下文（逻辑）
     * @return {Context}
     */

    /**
     * container's height
     * @memberof Container
     * @member {number}
     */

    /**
     * readerManager
     * @memberof Container
     * @type {RenderManager}
     * @readOnly
     */


    createClass(Container, [{
        key: 'crateRenderNode',

        /**
         * RenderNode对象不能直接创建
         * 1.通过 Container.createRenderNode
         * 2.通过 load 方法创建
         */
        value: function crateRenderNode() {
            var gl = this.context.gl,
                renderManager = this._renderManager;
            var renderNode = new RenderNode(gl);
            renderManager.addRenderNode(renderNode);
            return renderNode;
        }
    }, {
        key: 'context',
        get: function get$$1() {
            var renderManager = this._renderManager;
            return renderManager.context;
        }
        /**
         * set container's height
         */

    }, {
        key: 'width',
        set: function set$$1(value) {
            this._width = value;
            this.fire(_FUSION_EVENT_RESIZE, { width: value }, true);
        }
        /**
         * set container's width
         */
        ,
        get: function get$$1() {
            return this._width;
        }
    }, {
        key: 'height',
        set: function set$$1(value) {
            this._height = value;
            this.fire(_FUSION_EVENT_RESIZE, { height: value }, true);
        },
        get: function get$$1() {
            return this._height;
        }
    }, {
        key: 'camera',
        get: function get$$1() {}
    }]);
    return Container;
}(Event);

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/common.js
 * switch to es6 syntax
 * @author yellow 2017/5/8
 */

var degree = Math.PI / 180;

var matrix = function () {
    function matrix() {
        classCallCheck(this, matrix);
    }

    createClass(matrix, null, [{
        key: 'setMatrixArrayType',

        /**
         * Set ArrayType,such as Float32Array or Array ([])
         * @param {Type} type Array type,such as Float32Array or Array
         */

        //precision
        value: function setMatrixArrayType(type) {
            matrix.ARRAY_TYPE = type;
        }
        //support ie9

    }, {
        key: 'toRadian',

        /**
         * Convert degree to radian
         * @param {Number} deg Angle in Degrees
         */
        value: function toRadian(deg) {
            return deg * degree;
        }
    }, {
        key: 'toDegree',

        /**
         * Convert rad to degree
         * @param {Number} rad Angle in Radian
         */
        value: function toDegree(rad) {
            return rad / degree;
        }
    }, {
        key: 'formatDisplay',

        /**
         * #debug
         * @param {*} obj 
         */
        value: function formatDisplay(obj) {
            var output = "\n";
            if (obj.constructor.name === 'mat4') {
                for (var i = 0; i < 4; i++) {
                    output += '[' + obj.value[i * 4] + ',' + obj.value[i * 4 + 1] + ',' + obj.value[i * 4 + 2] + ',' + obj.value[i * 4 + 3] + ']\n';
                }
            }
            console.log(output);
        }
    }, {
        key: 'equals',

        /**
         * @param {Number} a The first number to test.
         * @param {Number} b The first number to test.
         * @return {Boolean} True if the numbers are approximately equal, false otherwise.
         */
        value: function equals(a, b) {
            return Math.abs(a - b) <= matrix.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
        }
    }]);
    return matrix;
}();

matrix.EPSILON = 1e-6;
matrix.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
matrix.RANDOM = Math.random;
matrix.ENABLE_SIMD = true;
matrix.SIMD_AVAILABLE = matrix.ARRAY_TYPE === Float32Array && typeof SIMD != 'undefined';
matrix.USE_SIMD = matrix.ENABLE_SIMD && matrix.SIMD_AVAILABLE;

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat3.js
 * switch to es6 syntax,and change to quote
 * warning:if you don't want to change the source value,please use mat3.clone().* instead of mat3.*
 * @author yellow 2017/5/8
 */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = function () {
    /**
     * Creates a new identity mat3
     */
    function mat3() {
        classCallCheck(this, mat3);

        _out = new matrix.ARRAY_TYPE(9);
        _out[0] = 1;
        _out[1] = 0;
        _out[2] = 0;
        _out[3] = 0;
        _out[4] = 1;
        _out[5] = 0;
        _out[6] = 0;
        _out[7] = 0;
        _out[8] = 1;
        return this;
    }
    /**
     * an array to store the 3*3 matrix data
     * [1,0,0]
     * [0,1,0]
     * [0,0,1]
     * @private 
     */


    createClass(mat3, [{
        key: 'set',

        /**
         * set matrix value
         */
        value: function set$$1(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
            _out[0] = m00;
            _out[1] = m01;
            _out[2] = m02;
            _out[3] = m10;
            _out[4] = m11;
            _out[5] = m12;
            _out[6] = m20;
            _out[7] = m21;
            _out[8] = m22;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * clone the mat3 matrix
         * @return {mat3}
         */
        value: function clone() {
            var mat = new mat3().set(this._out[0], this._out[1], this._out[2], this._out[3], this._out[4], this._out[5], this._out[6], this._out[7], this._out[8]);
            return mat;
        }
    }, {
        key: 'identity',

        /**
        * Set a mat3 to the identity matrix
        * @method identity
        * @param {mat3} out the receiving matrix
        * @returns {mat3} out
        */
        value: function identity() {
            _out[0] = 1;
            _out[1] = 0;
            _out[2] = 0;
            _out[3] = 0;
            _out[4] = 1;
            _out[5] = 0;
            _out[6] = 0;
            _out[7] = 0;
            _out[8] = 1;
            return this;
        }
    }, {
        key: 'transpose',

        /**
         * Transpose the values of a mat3
         * @method transpose
         */
        value: function transpose() {
            //temporary array
            var a = new matrix.ARRAY_TYPE(9);
            var _ref = [this._out[0], this._out[3], this._out[6], this._out[1], this._out[4], this._out[7], this._out[2], this._out[5], this._out[8]];
            this._out[0] = _ref[0];
            this._out[1] = _ref[1];
            this._out[2] = _ref[2];
            this._out[3] = _ref[3];
            this._out[4] = _ref[4];
            this._out[5] = _ref[5];
            this._out[6] = _ref[6];
            this._out[7] = _ref[7];
            this._out[8] = _ref[8];

            return this;
        }
    }, {
        key: 'invert',

        /**
         * Inverts a mat3
         * @method invert
         */
        value: function invert() {
            var _out2 = slicedToArray(this._out, 9),
                a00 = _out2[0],
                a01 = _out2[1],
                a02 = _out2[2],
                a10 = _out2[3],
                a11 = _out2[4],
                a12 = _out2[5],
                a20 = _out2[6],
                a21 = _out2[7],
                a22 = _out2[8];

            var b01 = a22 * a11 - a12 * a21,
                b11 = -a22 * a10 + a12 * a20,
                b21 = a21 * a10 - a11 * a20,
                det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) return null;
            det = 1.0 / det;
            this._out[0] = b01 * det;
            this._out[1] = (-a22 * a01 + a02 * a21) * det;
            this._out[2] = (a12 * a01 - a02 * a11) * det;
            this._out[3] = b11 * det;
            this._out[4] = (a22 * a00 - a02 * a20) * det;
            this._out[5] = (-a12 * a00 + a02 * a10) * det;
            this._out[6] = b21 * det;
            this._out[7] = (-a21 * a00 + a01 * a20) * det;
            this._out[8] = (a11 * a00 - a01 * a10) * det;
            return this;
        }
    }, {
        key: 'adjoint',

        /**
         * Calculates the adjugate of a mat3
         * 
         */
        value: function adjoint() {
            var _out3 = slicedToArray(this._out, 9),
                a00 = _out3[0],
                a01 = _out3[1],
                a02 = _out3[2],
                a10 = _out3[3],
                a11 = _out3[4],
                a12 = _out3[5],
                a20 = _out3[6],
                a21 = _out3[7],
                a22 = _out3[8];

            this._out[0] = a11 * a22 - a12 * a21;
            this._out[1] = a02 * a21 - a01 * a22;
            this._out[2] = a01 * a12 - a02 * a11;
            this._out[3] = a12 * a20 - a10 * a22;
            this._out[4] = a00 * a22 - a02 * a20;
            this._out[5] = a02 * a10 - a00 * a12;
            this._out[6] = a10 * a21 - a11 * a20;
            this._out[7] = a01 * a20 - a00 * a21;
            this._out[8] = a00 * a11 - a01 * a10;
            return this;
        }
    }, {
        key: 'determinant',

        /**
         * Calculates the determinant of a mat3
         */
        value: function determinant() {
            var _out4 = slicedToArray(this._out, 9),
                a00 = _out4[0],
                a01 = _out4[1],
                a02 = _out4[2],
                a10 = _out4[3],
                a11 = _out4[4],
                a12 = _out4[5],
                a20 = _out4[6],
                a21 = _out4[7],
                a22 = _out4[8];

            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        }
    }, {
        key: 'multiply',

        /**
         * Multiplies other mat3
         * @param {mat3} mat a matrix 3*3 wait to multiply
         */
        value: function multiply(mat) {
            var _out5 = slicedToArray(this._out, 9),
                a00 = _out5[0],
                a01 = _out5[1],
                a02 = _out5[2],
                a10 = _out5[3],
                a11 = _out5[4],
                a12 = _out5[5],
                a20 = _out5[6],
                a21 = _out5[7],
                a22 = _out5[8];

            var _mat$value = slicedToArray(mat.value, 9),
                b00 = _mat$value[0],
                b01 = _mat$value[1],
                b02 = _mat$value[2],
                b10 = _mat$value[3],
                b11 = _mat$value[4],
                b12 = _mat$value[5],
                b20 = _mat$value[6],
                b21 = _mat$value[7],
                b22 = _mat$value[8];

            this._out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            this._out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            this._out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            this._out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            this._out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            this._out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            this._out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            this._out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            this._out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        }
    }, {
        key: 'translate',

        /**
         * Translate a mat3 by the given vector
         * @param {vec2} vec vetor to translate by
         * @return {mat3} 
         */
        value: function translate(vec) {
            var _out6 = slicedToArray(this._out, 9),
                a00 = _out6[0],
                a01 = _out6[1],
                a02 = _out6[2],
                a10 = _out6[3],
                a11 = _out6[4],
                a12 = _out6[5],
                a20 = _out6[6],
                a21 = _out6[7],
                a22 = _out6[8];

            var _vec$value = slicedToArray(vec.value, 2),
                x = _vec$value[0],
                y = _vec$value[1];

            this._out[0] = a00;
            this._out[1] = a01;
            this._out[2] = a02;
            this._out[3] = a10;
            this._out[4] = a11;
            this._out[5] = a12;
            this._out[6] = x * a00 + y * a10 + a20;
            this._out[7] = x * a01 + y * a11 + a21;
            this._out[8] = x * a02 + y * a12 + a22;
            return this;
        }
    }, {
        key: 'rotate',

        /**
         * Rotates a mat3 by the given angle
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function rotate(rad) {
            var _out7 = slicedToArray(this._out, 9),
                a00 = _out7[0],
                a01 = _out7[1],
                a02 = _out7[2],
                a10 = _out7[3],
                a11 = _out7[4],
                a12 = _out7[5],
                a20 = _out7[6],
                a21 = _out7[7],
                a22 = _out7[8];

            var s = Math.sin(rad),
                c = Math.cos(rad);
            this._out[0] = c * a00 + s * a10;
            this._out[1] = c * a01 + s * a11;
            this._out[2] = c * a02 + s * a12;
            this._out[3] = c * a10 - s * a00;
            this._out[4] = c * a11 - s * a01;
            this._out[5] = c * a12 - s * a02;
            this._out[6] = a20;
            this._out[7] = a21;
            this._out[8] = a22;
            return this;
        }
    }, {
        key: 'scale',

        /**
         * Scales the mat3 by the dimensions in the given vec2
         * @param {vec2} v the vec2 to scale the matrix by
         */
        value: function scale(vec) {
            var _vec$value2 = slicedToArray(vec.value, 2),
                x = _vec$value2[0],
                y = _vec$value2[1];

            this._out[0] = x * this._out[0];
            this._out[1] = x * this._out[1];
            this._out[2] = x * this._out[2];
            this._out[3] = y * this._out[3];
            this._out[4] = y * this._out[4];
            this._out[5] = y * this._out[5];
            // this._out[6] = this._out[6];
            // this._out[7] = this._out[7];
            // this._out[8] = this._out[8];
            return this;
        }
    }, {
        key: 'fromQuat',

        /**
         * Calculates a 3x3 matrix from the given quaternion
         * @param {quat} q Quaternion to create matrix from
         */
        value: function fromQuat(q) {
            var _q$value = slicedToArray(q.value, 4),
                x = _q$value[0],
                y = _q$value[1],
                z = _q$value[2],
                w = _q$value[3];

            var x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;
            var _mat = new mat3();
            _mat.set(1 - yy - zz, yx + wz, zx - wy, yx - wz, 1 - xx - zz, zy + wx, zx + wy, zy - wx, 1 - xx - yy);
            return _mat;
        }
    }, {
        key: 'normalFromMat4',

        /**
         * 
         * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
         * @param {mat4} mat 
         */
        value: function normalFromMat4(mat) {
            var _mat$value2 = slicedToArray(mat.value, 16),
                a00 = _mat$value2[0],
                a01 = _mat$value2[1],
                a02 = _mat$value2[2],
                a03 = _mat$value2[3],
                a10 = _mat$value2[4],
                a11 = _mat$value2[5],
                a12 = _mat$value2[6],
                a13 = _mat$value2[7],
                a20 = _mat$value2[8],
                a21 = _mat$value2[9],
                a22 = _mat$value2[10],
                a23 = _mat$value2[11],
                a30 = _mat$value2[12],
                a31 = _mat$value2[13],
                a32 = _mat$value2[14],
                a33 = _mat$value2[15];

            var b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,

            //
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) return null;
            det = 1.0 / det;
            var m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det,
                m01 = (a12 * b08 - a10 * b11 - a13 * b07) * det,
                m02 = (a10 * b10 - a11 * b08 + a13 * b06) * det,
                m10 = (a02 * b10 - a01 * b11 - a03 * b09) * det,
                m11 = (a00 * b11 - a02 * b08 + a03 * b07) * det,
                m12 = (a01 * b08 - a00 * b10 - a03 * b06) * det,
                m20 = (a31 * b05 - a32 * b04 + a33 * b03) * det,
                m21 = (a32 * b02 - a30 * b05 - a33 * b01) * det,
                m22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;

            var m3 = new mat3();
            m3.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
            return m3;
        }
    }, {
        key: 'toString',

        /**
         * Returns a string representation of a mat3
         */
        value: function toString() {
            return 'mat3(' + this._out[0] + ', ' + this._out[1] + ', ' + this._out[2] + ', ' + this._out[3] + ', ' + this._out[4] + ', ' + this._out[5] + ', ' + this._out[6] + ', ' + this._out[7] + ', ' + this._out[8] + ')';
        }
    }, {
        key: 'frob',

        /**
         * Returns Frobenius norm of a mat3 
         * mat3 Frobenius norm
         */
        value: function frob() {
            return Math.sqrt(Math.pow(this._out[0], 2) + Math.pow(this._out[1], 2) + Math.pow(this._out[2], 2) + Math.pow(this._out[3], 2) + Math.pow(this._out[4], 2) + Math.pow(this._out[5], 2) + Math.pow(this._out[6], 2) + Math.pow(this._out[7], 2) + Math.pow(this._out[8], 2));
        }
    }, {
        key: 'add',

        /**
         *  Adds two mat3's
         * @param {mat3} mat 
         * @memberof mat3
         */
        value: function add(mat) {
            this._out[0] += mat.value[0];
            this._out[1] += mat.value[1];
            this._out[2] += mat.value[2];
            this._out[3] += mat.value[3];
            this._out[4] += mat.value[4];
            this._out[5] += mat.value[5];
            this._out[6] += mat.value[6];
            this._out[7] += mat.value[7];
            this._out[8] += mat.value[8];
            return this;
        }
    }, {
        key: 'sub',

        /**
         * Subtracts matrix b from matrix a
         * 
         * @param {any} mat 
         * @returns 
         * 
         * @memberof mat3
         */
        value: function sub(mat) {
            this._out[0] -= mat.value[0];
            this._out[1] -= mat.value[1];
            this._out[2] -= mat.value[2];
            this._out[3] -= mat.value[3];
            this._out[4] -= mat.value[4];
            this._out[5] -= mat.value[5];
            this._out[6] -= mat.value[6];
            this._out[7] -= mat.value[7];
            this._out[8] -= mat.value[8];
            return this;
        }
    }, {
        key: 'scale',

        /**
         * 
         * Multiply each element of the matrix by a vec3.
         * @param {vec3} vec 
         * 
         * @memberof mat3
         */
        value: function scale(vec) {
            this._out[0] *= vec.value[0];
            this._out[0] *= vec.value[0];
            this._out[0] *= vec.value[0];
            this._out[0] *= vec.value[1];
            this._out[0] *= vec.value[1];
            this._out[0] *= vec.value[1];
            this._out[0] *= vec.value[2];
            this._out[0] *= vec.value[2];
            this._out[0] *= vec.value[2];
            return this;
        }
    }, {
        key: 'equals',

        /**
         * @param {any} mat 
         * @memberof mat3
         */
        value: function equals(mat) {
            var _out8 = slicedToArray(this._out, 9),
                a0 = _out8[0],
                a1 = _out8[1],
                a2 = _out8[2],
                a3 = _out8[3],
                a4 = _out8[4],
                a5 = _out8[5],
                a6 = _out8[6],
                a7 = _out8[7],
                a8 = _out8[8],
                _mat$value3 = slicedToArray(mat.value, 9),
                b0 = _mat$value3[0],
                b1 = _mat$value3[1],
                b2 = _mat$value3[2],
                b3 = _mat$value3[3],
                b4 = _mat$value3[4],
                b5 = _mat$value3[5],
                b6 = _mat$value3[6],
                b7 = _mat$value3[7],
                b8 = _mat$value3[8];

            return Math.abs(a0 - b0) <= matrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= matrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= matrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= matrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= matrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= matrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= matrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= matrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= matrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof mat3
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'fromMat4',

        /**
         *  Copies the upper-left 3x3 values into the given mat3.
         *  construct from mat4
         *  @method fromMat4
         *  @param {mat3} m
         *  @return {mat3}
         */
        value: function fromMat4(m) {
            var mat = new mat3();
            mat.set(m.value[0], m.value[1], m.value[2], m.value[4], m.value[5], m.value[6], m.value[8], m.value[9], m.value[10]);
            return mat;
        }
    }]);
    return mat3;
}();



/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {};

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec3.js
 * switch to es6 syntax
 * warning:if you don't want to change the source value,please use vec3.clone().* instead of vec3.*
 * @author yellow 2017/5/8
 * 
 */
/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = function () {
    /**
     * Creates a new, empty vec3
     */
    function vec3() {
        classCallCheck(this, vec3);

        this._out = new matrix.ARRAY_TYPE(3);
        this._out[0] = 0;
        this._out[1] = 0;
        this._out[2] = 0;
        return this;
    }
    /**
     * private array store for vec3
     */


    createClass(vec3, [{
        key: 'set',


        /**
         * set value of v0 v1 v2
         */
        value: function set$$1(x, y, z) {
            this._out[0] = x;
            this._out[1] = y;
            this._out[2] = z;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * Creates a new vec3 initialized with values from an existing vector
         */
        value: function clone() {
            var vec = new vec3();
            vec.set(this._out[0], this._out[1], this._out[2]);
            return vec;
        }
    }, {
        key: 'add',

        /**
         * Adds two vec3's
         * @param {vec3} vec 
         */
        value: function add(vec) {
            this._out[0] += vec._out[0];
            this._out[1] += vec._out[1];
            this._out[2] += vec._out[2];
            return this;
        }
    }, {
        key: 'sub',

        /**
         * Subtracts vector vec from vector this
         * @param {vec3} vec
         */
        value: function sub(vec) {
            this._out[0] -= vec._out[0];
            this._out[1] -= vec._out[1];
            this._out[2] -= vec._out[2];
            return this;
        }
    }, {
        key: 'multiply',

        /**
         * Multiplies two vec3's
         */
        value: function multiply(vec) {
            this._out[0] *= vec._out[0];
            this._out[1] *= vec._out[1];
            this._out[2] *= vec._out[2];
            return this;
        }
    }, {
        key: 'divide',

        /**
         * Divides two vec3's
         */
        value: function divide(vec) {
            this._out[0] /= vec._out[0];
            this._out[1] /= vec._out[1];
            this._out[2] /= vec._out[2];
            return this;
        }
    }, {
        key: 'ceil',

        /**
         * Math.ceil the components of a vec3
         */
        value: function ceil() {
            this._out[0] = Math.ceil(this._out[0]);
            this._out[1] = Math.ceil(this._out[1]);
            this._out[2] = Math.ceil(this._out[2]);
            return this;
        }
    }, {
        key: 'floor',

        /**
         * Math.floor the components of a vec3
         */
        value: function floor() {
            this._out[0] = Math.floor(this._out[0]);
            this._out[1] = Math.floor(this._out[1]);
            this._out[2] = Math.floor(this._out[2]);
            return this;
        }
    }, {
        key: 'round',

        /**
         * Math.round the components of a vec3
         */
        value: function round() {
            this._out[0] = Math.round(this._out[0]);
            this._out[1] = Math.round(this._out[1]);
            this._out[2] = Math.round(this._out[2]);
            return this;
        }
    }, {
        key: 'min',

        /**
         * Returns the minimum of two vec3's
         */
        value: function min(vec) {
            this._out[0] = Math.min(this._out[0], vec._out[0]);
            this._out[1] = Math.min(this._out[1], vec._out[1]);
            this._out[2] = Math.min(this._out[2], vec._out[2]);
            return this;
        }
    }, {
        key: 'max',

        /**
         * Returns the maximum of two vec3's
         */
        value: function max(vec) {
            this._out[0] = Math.max(this._out[0], vec._out[0]);
            this._out[1] = Math.max(this._out[1], vec._out[1]);
            this._out[2] = Math.max(this._out[2], vec._out[2]);
            return this;
        }
    }, {
        key: 'scale',

        /**
         * Scales a vec3 by a scalar number
         * @param {number} v amount to scale the vector by
         */
        value: function scale(v) {
            this._out[0] *= v;
            this._out[1] *= v;
            this._out[2] *= v;
            return this;
        }
    }, {
        key: 'distance',

        /**
         * Calculates the euclidian distance between two vec3's
         * @param {vec3} vec
         */
        value: function distance(vec) {
            var _out = slicedToArray(this._out, 3),
                x0 = _out[0],
                y0 = _out[1],
                z0 = _out[2],
                _vec$_out = slicedToArray(vec._out, 3),
                x1 = _vec$_out[0],
                y1 = _vec$_out[1],
                z1 = _vec$_out[2],
                x = x0 - x1,
                y = y0 - y1,
                z = z0 - z1;

            return Math.sqrt(x * x + y * y + z * z);
        }
    }, {
        key: 'len',

        /**
         * Calculates the length of a vec3
         */
        value: function len() {
            return distance(new vec3());
        }
    }, {
        key: 'negate',

        /**
         * Negates the components of a vec3
         */
        value: function negate() {
            this._out[0] = -this._out[0];
            this._out[1] = -this._out[1];
            this._out[2] = -this._out[2];
            return this;
        }
    }, {
        key: 'inverse',

        /**
         * Returns the inverse of the components of a vec3
         */
        value: function inverse() {
            this._out[0] = 1.0 / this._out[0];
            this._out[1] = 1.0 / this._out[1];
            this._out[2] = 1.0 / this._out[2];
            return this;
        }
    }, {
        key: 'normalize',

        /**
         * Normalize a vec3
         */
        value: function normalize() {
            var len = this.len();
            if (len > 0) {
                len = 1.0 / len;
                this._out[0] *= len;
                this._out[1] *= len;
                this._out[2] *= len;
            }
            return this;
        }
    }, {
        key: 'dot',

        /**
         * Calculates the dot product of two vec3's
         * @param {vec3} vec
         */
        value: function dot(vec) {
            var _out2 = slicedToArray(this._out, 3),
                x0 = _out2[0],
                y0 = _out2[1],
                z0 = _out2[2],
                _vec$_out2 = slicedToArray(vec._out, 3),
                x1 = _vec$_out2[0],
                y1 = _vec$_out2[1],
                z1 = _vec$_out2[2];

            return x0 * x1 + y0 * y1 + z0 * z1;
        }
    }, {
        key: 'cross',

        /**
         * Computes the cross product of two vec3's
         * https://webgl2fundamentals.org/webgl/lessons/webgl-3d-camera.html
         * calcue the perpendicular vec3 
         * @param {vec3} v3
         * @return {vec3}
         * @example
         * let v3_out = v3_in1.clone().cross(v3_in2);
         * the v3_out perpendicular to v3_in1 and v3_in2
         */
        value: function cross(v3) {
            var _out3 = slicedToArray(this._out, 3),
                ax = _out3[0],
                ay = _out3[1],
                az = _out3[2],
                _v3$value = slicedToArray(v3.value, 3),
                bx = _v3$value[0],
                by = _v3$value[1],
                bz = _v3$value[2];

            this._out[0] = ay * bz - az * by;
            this._out[1] = az * bx - ax * bz;
            this._out[2] = ax * by - ay * bx;
            return this;
        }
    }, {
        key: 'lerp',

        /**
         * Performs a linear interpolation between two vec3's
         * @param {vec3} vec
         * @param {number} t
         */
        value: function lerp(vec, t) {
            var _out4 = slicedToArray(this._out, 3),
                ax = _out4[0],
                ay = _out4[1],
                az = _out4[2],
                _vec$_out3 = slicedToArray(vec._out, 3),
                bx = _vec$_out3[0],
                by = _vec$_out3[1],
                bz = _vec$_out3[2];

            this._out[0] = ax + t * (bx - ax);
            this._out[1] = ay + t * (by - ay);
            this._out[2] = az + t * (bz - az);
            return this;
        }
    }, {
        key: 'hermite',

        /**
         * Performs a hermite interpolation with two control points
         * @param {vec3} vecI
         * @param {vec3} vecI
         * @param {vec3} vecI
         * @param {number} t interpolation amount between the two inputs
         */
        value: function hermite(vecI, vecII, vecIII, t) {
            var factorTimes2 = t * t,
                factor1 = factorTimes2 * (2 * t - 3) + 1,
                factor2 = factorTimes2 * (t - 2) + t,
                factor3 = factorTimes2 * (t - 1),
                factor4 = factorTimes2 * (3 - 2 * t);
            this._out[0] = this._out[0] * factor1 + vecI._out[0] * factor2 + vecII._out[0] * factor3 + vecIII._out[0] * factor4;
            this._out[1] = this._out[1] * factor1 + vecI._out[1] * factor2 + vecII._out[1] * factor3 + vecIII._out[1] * factor4;
            this._out[2] = this._out[2] * factor1 + vecI._out[2] * factor2 + vecII._out[2] * factor3 + vecIII._out[2] * factor4;
            return this;
        }
    }, {
        key: 'bezier',

        /**
         * Performs a bezier interpolation with two control points
         * @param {vec3} vecI
         * @param {vec3} vecII
         * @param {vec3} vecIII
         * @param {Number} t interpolation amount between the two inputs
         */
        value: function bezier(vecI, vecII, vecIII, t) {
            var inverseFactor = 1 - t,
                inverseFactorTimesTwo = inverseFactor * inverseFactor,
                factorTimes2 = t * t,
                factor1 = inverseFactorTimesTwo * inverseFactor,
                factor2 = 3 * t * inverseFactorTimesTwo,
                factor3 = 3 * factorTimes2 * inverseFactor,
                factor4 = factorTimes2 * t;
            out[0] = this._out[0] * factor1 + vecI._out[0] * factor2 + vecII._out[0] * factor3 + vecIII._out[0] * factor4;
            out[1] = this._out[1] * factor1 + vecI._out[1] * factor2 + vecII._out[1] * factor3 + vecIII._out[1] * factor4;
            out[2] = this._out[2] * factor1 + vecI._out[2] * factor2 + vecII._out[2] * factor3 + vecIII._out[2] * factor4;
            return this;
        }
    }, {
        key: 'transformMat4',

        /**
         * Transforms the vec3 with a mat4.
         * 4th vector component is implicitly '1'
         * @param {mat4} mat the 4x4 matrix to transform with
         */
        value: function transformMat4(mat) {
            var _out5 = slicedToArray(this._out, 3),
                x = _out5[0],
                y = _out5[1],
                z = _out5[2],
                w = mat._out[3] * x + mat._out[7] * y + mat._out[11] * z + mat._out[15] || 1.0;

            this._out[0] = (mat._out[0] * x + mat._out[4] * y + mat._out[8] * z + mat._out[12]) / w;
            this._out[1] = (mat._out[1] * x + mat._out[5] * y + mat._out[9] * z + mat._out[13]) / w;
            this._out[2] = (mat._out[2] * x + mat._out[6] * y + mat._out[10] * z + mat._out[14]) / w;
            return this;
        }
    }, {
        key: 'transformMat3',

        /**
         * Transforms the vec3 with a mat3.
         * @param {mat3} mat  the 3x3 matrix to transform with
         */
        value: function transformMat3(mat) {
            var _out6 = slicedToArray(this._out, 3),
                x = _out6[0],
                y = _out6[1],
                z = _out6[2];

            this._out[0] = x * mat._out[0] + y * mat._out[3] + z * mat._out[6];
            this._out[1] = x * mat._out[1] + y * mat._out[4] + z * mat._out[7];
            this._out[2] = x * mat._out[2] + y * mat._out[5] + z * mat._out[8];
            return this;
        }
    }, {
        key: 'toString',

        /**
         * returns a string represent vec3
         */
        value: function toString() {
            return 'vec3(' + this._out[0] + ', ' + this._out[1] + ', ' + this._out[2] + ')';
        }
    }, {
        key: 'transformQuat',

        /**
         * ransforms the vec3 with a quat
         * benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
         * @param {quat} q quaternion to transform with
         */
        value: function transformQuat(q) {
            var _out7 = slicedToArray(this._out, 3),
                x = _out7[0],
                y = _out7[1],
                z = _out7[2],
                _q$_out = slicedToArray(q._out, 4),
                qx = _q$_out[0],
                qy = _q$_out[1],
                qz = _q$_out[2],
                qw = _q$_out[3],
                ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            this._out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this._out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this._out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return this;
        }
    }, {
        key: 'rotateX',

        /**
         * Rotate a 3D vector around the x-axis
         * @param {vec3} vec the origin of the rotation
         * @param {number} c the angle of rotation
         */
        value: function rotateX(vec, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = this._out[0] - vec._out[0];
            p[1] = this._out[1] - vec._out[1];
            p[2] = this._out[2] - vec._out[2];
            //perform rotation
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
            //translate to correct position
            this._out[0] = r[0] + b[0];
            this._out[1] = r[1] + b[1];
            this._out[2] = r[2] + b[2];
            return this;
        }
    }, {
        key: 'rotateY',

        /**
         * Rotate a 3D vector around the y-axis
         * @param {vec3} vec The origin of the rotation
         * @param {number} c The angle of rotation
         */
        value: function rotateY(vec, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = this._out[0] - vec._out[0];
            p[1] = this._out[1] - vec._out[1];
            p[2] = this._out[2] - vec._out[2];
            //perform rotation
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
            //translate to correct position
            this._out[0] = r[0] + b[0];
            this._out[1] = r[1] + b[1];
            this._out[2] = r[2] + b[2];
            return this;
        }
    }, {
        key: 'rotateZ',

        /**
         * Rotate a 3D vector around the z-axis
         * @param {vec3} vec The origin of the rotation
         * @param {number} c the angle of rotation
         */
        value: function rotateZ(vec, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = this._out[0] - vec._out[0];
            p[1] = this._out[1] - vec._out[1];
            p[2] = this._out[2] - vec._out[2];
            //perform rotation
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];
            //translate to correct position
            this._out[0] = r[0] + b[0];
            this._out[1] = r[1] + b[1];
            this._out[2] = r[2] + b[2];
            return this;
        }
    }, {
        key: 'angle',

        /**
         * calcute the angle between two 3D vectors
         * @param {vec3} vec the second vector
         */
        value: function angle(vec) {
            var vecI = this.clone().normalize(),
                vecII = vec.clone().normalize();
            var cosine = vec3.dot(vecI, vecII);
            if (cosine > 1.0) return 0;else if (cosine < -1.0) return Math.PI;else return Math.acos(cosine);
        }
    }, {
        key: 'equals',

        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         */
        value: function equals(vec) {
            var _out8 = slicedToArray(this._out, 3),
                a0 = _out8[0],
                a1 = _out8[1],
                a2 = _out8[2],
                _vec$_out4 = slicedToArray(vec._out, 3),
                b0 = _vec$_out4[0],
                b1 = _vec$_out4[1],
                b2 = _vec$_out4[2];

            return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof vec3
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'random',

        /**
         * Generates a random vector with the given scale
         * @param {number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         */
        value: function random() {
            var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

            var vec = new vec3();
            scale = scale || 1.0;
            var r = matrix.RANDOM() * 2.0 * Math.PI;
            var z = matrix.RANDOM() * 2.0 - 1.0;
            var z = Math.sqrt(1.0 - z * z) * scale;
            ax = Math.cos(r) * zScale;
            ay = Math.sin(r) * zScale;
            az = z * scale;
            vec.set(ax, ay, az);
            return vec;
        }
    }]);
    return vec3;
}();

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec4.js
 * switch to es6 syntax
 * warning:if you don't want to change the source value,please use vec4.clone().* instead of vec4.*
 * @author yellow 2017.5.9
 */
/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = function () {
    /**
     *  Creates a new, empty vec4
     */
    function vec4() {
        classCallCheck(this, vec4);

        this._out = new matrix.ARRAY_TYPE(4);
        this._out[0] = 0;
        this._out[1] = 0;
        this._out[2] = 0;
        this._out[3] = 0;
        return this;
    }
    /**
     * private vec4 array store
     */


    createClass(vec4, [{
        key: 'set',

        /**
         * set the value of vec4
         */
        value: function set$$1(x, y, z, w) {
            this._out[0] = x;
            this._out[1] = y;
            this._out[2] = z;
            this._out[3] = w;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * Creates a new vec4 initialized with values from an existing vector
         */
        value: function clone() {
            var vec = new vec4();
            vec.set(this._out[0], this._out[1], this._out[2], this._out[3]);
            return vec;
        }
    }, {
        key: 'add',

        /**
         * Adds two vec4's
         * @param {vec4} vec
         */
        value: function add(vec) {
            this._out[0] += vec.value[0];
            this._out[1] += vec.value[1];
            this._out[2] += vec.value[2];
            this._out[3] += vec.value[3];
            return this;
        }
    }, {
        key: 'sub',

        /**
         * Subtracts vector vec from vector this
         */
        value: function sub(vec) {
            this._out[0] -= vec.value[0];
            this._out[1] -= vec.value[1];
            this._out[2] -= vec.value[2];
            this._out[3] -= vec.value[3];
            return this;
        }
    }, {
        key: 'multiply',

        /**
         * Multiplies two vec4's
         */
        value: function multiply(vec) {
            this._out[0] *= vec.value[0];
            this._out[1] *= vec.value[1];
            this._out[2] *= vec.value[2];
            this._out[3] *= vec.value[3];
            return this;
        }
    }, {
        key: 'divide',

        /**
        * Divides two vec4's
        */
        value: function divide(vec) {
            this._out[0] /= vec.value[0];
            this._out[1] /= vec.value[1];
            this._out[2] /= vec.value[2];
            this._out[3] /= vec.value[3];
            return this;
        }
    }, {
        key: 'ceil',

        /**
         * Math.ceil the components of a vec4
         */
        value: function ceil() {
            this._out[0] = Math.ceil(this._out[0]);
            this._out[1] = Math.ceil(this._out[1]);
            this._out[2] = Math.ceil(this._out[2]);
            this._out[3] = Math.ceil(this._out[3]);
            return this;
        }
    }, {
        key: 'round',

        /**
         * Math.round the components of a vec4
         */
        value: function round() {
            this._out[0] = Math.round(this._out[0]);
            this._out[1] = Math.round(this._out[1]);
            this._out[2] = Math.round(this._out[2]);
            this._out[3] = Math.round(this._out[3]);
            return this;
        }
    }, {
        key: 'floor',

        /**
        * Math.floor the components of a vec4
        */
        value: function floor() {
            this._out[0] = Math.floor(this._out[0]);
            this._out[1] = Math.floor(this._out[1]);
            this._out[2] = Math.floor(this._out[2]);
            this._out[3] = Math.floor(this._out[3]);
            return this;
        }
    }, {
        key: 'min',

        /**
         * Returns the minimum of two vec4's
         * @param {vec4} vec
         */
        value: function min(vec) {
            this._out[0] = Math.min(this._out[0], vec.value[0]);
            this._out[1] = Math.min(this._out[1], vec.value[1]);
            this._out[2] = Math.min(this._out[2], vec.value[2]);
            this._out[3] = Math.min(this._out[3], vec.value[3]);
            return this;
        }
    }, {
        key: 'max',

        /**
         * Returns the maximum of two vec4's
         * @param {vec4} vec
         */
        value: function max(vec) {
            this._out[0] = Math.max(this._out[0], vec.value[0]);
            this._out[1] = Math.max(this._out[1], vec.value[1]);
            this._out[2] = Math.max(this._out[2], vec.value[2]);
            this._out[3] = Math.max(this._out[3], vec._out[3]);
            return this;
        }
    }, {
        key: 'scale',

        /**
         * Scales a vec4 by a scalar number
         * @param {number} s the scale
         */
        value: function scale(s) {
            this._out[0] *= s;
            this._out[1] *= s;
            this._out[2] *= s;
            this._out[3] *= s;
            return this;
        }
    }, {
        key: 'distance',

        /**
         * Calculates the euclidian distance between two vec4's
         * @param {vec4} vec the distance to vec
         */
        value: function distance(vec) {
            var _out = slicedToArray(this._out, 4),
                x0 = _out[0],
                y0 = _out[1],
                z0 = _out[2],
                w0 = _out[3],
                _vec$_out = slicedToArray(vec._out, 4),
                x1 = _vec$_out[0],
                y1 = _vec$_out[1],
                z1 = _vec$_out[2],
                w1 = _vec$_out[3],
                x = x0 - x1,
                y = y0 - y1,
                z = z0 - z1,
                w = w0 - w1;

            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
    }, {
        key: 'len',

        /**
         * Calculates the length of a vec4
         */
        value: function len() {
            return this.distance(new vec4());
        }
    }, {
        key: 'negate',

        /**
         * Negates the components of a vec4
         */
        value: function negate() {
            this._out[0] = -this._out[0];
            this._out[1] = -this._out[1];
            this._out[2] = -this._out[2];
            this._out[3] = -this._out[3];
            return this;
        }
    }, {
        key: 'inverse',

        /**
         * Returns the inverse of the components of a vec4
         */
        value: function inverse() {
            this._out[0] = 1.0 / this._out[0];
            this._out[1] = 1.0 / this._out[1];
            this._out[2] = 1.0 / this._out[2];
            this._out[3] = 1.0 / this._out[3];
        }
    }, {
        key: 'normalize',

        /**
         * Normalize a vec4
         */
        value: function normalize() {
            var len = this.len();
            if (len > 0) {
                len = 1.0 / len;
                this._out[0] *= len;
                this._out[1] *= len;
                this._out[2] *= len;
                this._out[3] *= len;
            }
            return this;
        }
    }, {
        key: 'dot',

        /**
         * @param {vec4} vec
         */
        value: function dot(vec) {
            var _out2 = slicedToArray(this._out, 4),
                x0 = _out2[0],
                y0 = _out2[1],
                z0 = _out2[2],
                w0 = _out2[3],
                _vec$_out2 = slicedToArray(vec._out, 4),
                x1 = _vec$_out2[0],
                y1 = _vec$_out2[1],
                z1 = _vec$_out2[2],
                w1 = _vec$_out2[3];

            return x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
        }
    }, {
        key: 'lerp',

        /**
         *  Performs a linear interpolation between two vec4's
         */
        value: function lerp(vec, t) {
            var _out3 = slicedToArray(this._out, 4),
                ax = _out3[0],
                ay = _out3[1],
                az = _out3[2],
                aw = _out3[3];

            this._out[0] = ax + t * (vec._out[0] - ax);
            this._out[1] = ay + t * (vec._out[1] - ay);
            this._out[2] = az + t * (vec._out[2] - az);
            this._out[3] = aw + t * (vec._out[3] - aw);
            return this;
        }
    }, {
        key: 'transformMat4',

        /**
         * Transforms the vec4 with a mat4.
         * @param {mat4} mat matrix to transform with
         */
        value: function transformMat4(mat) {
            var _out4 = slicedToArray(this._out, 4),
                x = _out4[0],
                y = _out4[1],
                z = _out4[2],
                w = _out4[3];

            this._out[0] = mat._out[0] * x + mat._out[4] * y + mat._out[8] * z + mat._out[12] * w;
            this._out[1] = mat._out[1] * x + mat._out[5] * y + mat._out[9] * z + mat._out[13] * w;
            this._out[2] = mat._out[2] * x + mat._out[6] * y + mat._out[10] * z + mat._out[14] * w;
            this._out[3] = mat._out[3] * x + mat._out[7] * y + mat._out[11] * z + mat._out[15] * w;
            return this;
        }
    }, {
        key: 'transformQuat',

        /**
         * Transforms the vec4 with a quat
         * @param {quat} q quaternion to transform with
         */
        value: function transformQuat(q) {
            var _out5 = slicedToArray(this._out, 4),
                x = _out5[0],
                y = _out5[1],
                z = _out5[2],
                w = _out5[3],
                _q$_out = slicedToArray(q._out, 4),
                qx = _q$_out[0],
                qy = _q$_out[1],
                qz = _q$_out[2],
                qw = _q$_out[3],
                ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse quat


            this._out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this._out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this._out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            this._out[3] = a[3];
            return this;
        }
    }, {
        key: 'toString',

        /**
         * Returns a string representation of a vector
         */
        value: function toString() {
            return 'vec4(' + this._out[0] + ', ' + this._out[1] + ', ' + this._out[2] + ', ' + this._out[3] + ')';
        }
    }, {
        key: 'equals',

        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         * @param {vec4} vec
         */
        value: function equals(vec) {
            var _out6 = slicedToArray(this._out, 4),
                a0 = _out6[0],
                a1 = _out6[1],
                a2 = _out6[2],
                a3 = _out6[3],
                _vec$_out3 = slicedToArray(vec._out, 4),
                b0 = _vec$_out3[0],
                b1 = _vec$_out3[1],
                b2 = _vec$_out3[2],
                b3 = _vec$_out3[3];

            return Math.abs(a0 - b0) <= matrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= matrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= matrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= matrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof vec4
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'random',

        /**
         * Generates a random vector with the given scale
         * @param {number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         */
        value: function random() {
            var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

            scale = scale || 1.0;
            var vec = new vec4();
            //TODO: This is a pretty awful way of doing this. Find something better.
            vec.set(matrix.RANDOM(), matrix.RANDOM(), matrix.RANDOM(), matrix.RANDOM()).normalize().scale();
            return vec;
        }
    }]);
    return vec4;
}();

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/quat.js
 * switch to es6 syntax
 * warning:if you don't want to change the source value,please use quat.clone().* instead of quat.*
 * @author yellow 2017/5/10
 */

/**
 * @class Quaternion
 * @name quat
 */

var quat = function () {
    /**
     * Creates a new identity quat
     */
    function quat() {
        var _this = this;

        classCallCheck(this, quat);

        this.rotationTo = function () {
            var tmpvec3 = new vec3(),
                xUnitVec3 = new vec3().set(1, 0, 0),
                yUnitVec3 = new vec3().set(0, 1, 0);
            return function (vecI, vecII) {
                var dot = vecI.dot(vecII);
                if (dot < -0.999999) {
                    tmpvec3 = xUnitVec3.clone().cross(vecI);
                    if (tmpvec3.len() < 0.000001) {
                        tmpvec3 = yUnitVec3.clone().cross(vecI);
                    }
                    tmpvec3.normalize();
                    _this.setAxisAngle(tmpvec3, Math.PI);
                    return _this;
                } else if (dot > 0.999999) {
                    _this._out[0] = 0;
                    _this._out[1] = 0;
                    _this._out[2] = 0;
                    _this._out[3] = 1;
                    return _this;
                } else {
                    tmpvec3 = vecI.clone().cross(vecII);
                    _this._out[0] = tmpvec3[0];
                    _this._out[1] = tmpvec3[1];
                    _this._out[2] = tmpvec3[2];
                    _this._out[3] = 1 + dot;
                    return _this.normalize();
                }
            };
        }();

        this.setAxes = function () {
            var mat = new mat3();

            return function (vecView, vecRight, vecUp) {
                mat._out[0] = vecRight._out[0];
                mat._out[3] = vecRight._out[1];
                mat._out[6] = vecRight._out[2];
                mat._out[1] = vecUp._out[0];
                mat._out[4] = vecUp._out[1];
                mat._out[7] = vecUp._out[2];
                mat._out[2] = -vecView._out[0];
                mat._out[5] = -vecView._out[1];
                mat._out[8] = -vecView._out[2];
                return quat.fromMat3(mat);
            };
        }();

        this.sqlerp = function () {
            var temp1 = new quat(),
                temp2 = new quat();
            return function (quaI, quaII, quaIII, t) {
                //a.slerp(d,t)  b.slerp(c,t)
                temp1 = _this.clone().slerp(quaIII, t);
                temp2 = quaI.clone().slerp(quaII, t);
                var qua = temp1.clone().slerp(temp2, 2 * t * (1 - t));
                return qua;
            };
        }();

        this._out = new matrix.ARRAY_TYPE(4);
        this._out[0] = 0;
        this._out[1] = 0;
        this._out[2] = 0;
        this._out[3] = 1;
    }

    createClass(quat, [{
        key: 'set',

        /**
         * set the value of quat
         */
        value: function set$$1(x, y, z, w) {
            this._out[0] = x;
            this._out[1] = y;
            this._out[2] = z;
            this._out[3] = w;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * Creates a new quat initialized with values from an existing quaternion
         */
        value: function clone() {
            var qua = new quat();
            qua.set(qua._out[0], qua._out[1], qua._out[2], qua._out[3]);
            return qua;
        }
    }, {
        key: 'identity',

        /**
         * Set a quat to the identity quaternion
         */
        value: function identity() {
            this._out[0] = 0;
            this._out[1] = 0;
            this._out[2] = 0;
            this._out[3] = 1;
            return this;
        }
        /**
         * @param {vec3} vecI the initial vector
         * @param {vec3} vecII the destination vector
         * 
         */

        /**
         * Sets the specified quaternion with values corresponding to the given
         * axes. Each axis is a vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         * @param {vec3} vecView  the vector representing the viewing direction
         * @param {vec3} vecRight the vector representing the local "right" direction
         * @param {vec3} vecUp    the vector representing the local "up" direction
         */

    }, {
        key: 'setAxisAngle',

        /**
         * Sets a quat from the given angle and rotation axis,
         * then returns it.
         * @param {vec3} axis the axis around which to rotate
         * @param {number} rad
         */
        value: function setAxisAngle(axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            this._out[0] = s * axis._out[0];
            this._out[1] = s * axis._out[1];
            this._out[2] = s * axis._out[2];
            this._out[3] = Math.cos(rad);
            return this;
        }
    }, {
        key: 'getAxisAngle',

        /**
         * Gets the rotation axis and angle for a given quaternion. 
         * If a quaternion is created with setAxisAngle, 
         * this method will return the same values as providied in the original parameter list OR functionally equivalent values.
         * @example The quaternion formed by axis [0, 0, 1] and angle -90 is the same as the quaternion formed by [0, 0, 1] and 270. 
         *          This method favors the latter.
         * @return [axis,angle]
         */
        value: function getAxisAngle() {
            var rad = Math.acos(this._out[3]) * 2.0,
                s = Math.sin(rad / 2.0);
            var axis = new vec3();
            s === 0.0 ? axis.set(1, 0, 0) : axis.set(q[0] / s, q[1] / s, q[2] / s);
            return [axis, rad];
        }
    }, {
        key: 'add',

        /**
         * add two quat's
         * @param {quat} qua 
         */
        value: function add(qua) {
            this._out[0] += qua._out[0];
            this._out[1] += qua._out[1];
            this._out[2] += qua._out[2];
            this._out[3] += qua._out[3];
            return this;
        }
    }, {
        key: 'multiply',

        /**
         * Multiplies two quat's
         */
        value: function multiply(qua) {
            var _out = slicedToArray(this._out, 4),
                ax = _out[0],
                ay = _out[1],
                az = _out[2],
                aw = _out[3],
                _qua$_out = slicedToArray(qua._out, 4),
                bx = _qua$_out[0],
                by = _qua$_out[1],
                bz = _qua$_out[2],
                bw = _qua$_out[3];

            this._out[0] = ax * bw + aw * bx + ay * bz - az * by;
            this._out[1] = ay * bw + aw * by + az * bx - ax * bz;
            this._out[2] = az * bw + aw * bz + ax * by - ay * bx;
            this._out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return this;
        }
    }, {
        key: 'scale',

        /**
         * @param {number} s
         */
        value: function scale(s) {
            this._out[0] *= s;
            this._out[1] *= s;
            this._out[2] *= s;
            this._out[3] *= s;
            return this;
        }
    }, {
        key: 'rotateX',

        /**
         * Rotates a quaternion by the given angle about the X axis
         * @param {number} rad angle (in radians) to rotate
         */
        value: function rotateX(rad) {
            rad *= 0.5;

            var _out2 = slicedToArray(this._out, 4),
                ax = _out2[0],
                ay = _out2[1],
                az = _out2[2],
                aw = _out2[3],
                bx = Math.sin(rad),
                bw = Math.cos(rad);

            this._out[0] = ax * bw + aw * bx;
            this._out[1] = ay * bw + az * bx;
            this._out[2] = az * bw - ay * bx;
            this._out[3] = aw * bw - ax * bx;
            return this;
        }
    }, {
        key: 'rotateY',

        /**
         * Rotates a quaternion by the given angle about the Y axis
         * @param {number} rad angle (in radians) to rotate
         */
        value: function rotateY(rad) {
            rad *= 0.5;

            var _out3 = slicedToArray(this._out, 4),
                ax = _out3[0],
                ay = _out3[1],
                az = _out3[2],
                aw = _out3[3],
                by = Math.sin(rad),
                bw = Math.cos(rad);

            this._out[0] = ax * bw - az * by;
            this._out[1] = ay * bw + aw * by;
            this._out[2] = az * bw + ax * by;
            this._out[3] = aw * bw - ay * by;
            return this;
        }
    }, {
        key: 'rotateZ',

        /**
         * Rotates a quaternion by the given angle about the Z axis
         * @param {number} rad angle (in radians) to rotate
         */
        value: function rotateZ(rad) {
            rad *= 0.5;

            var _out4 = slicedToArray(this._out, 4),
                ax = _out4[0],
                ay = _out4[1],
                az = _out4[2],
                aw = _out4[3],
                bz = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw + ay * bz;
            this._out[1] = ay * bw - ax * bz;
            this._out[2] = az * bw + aw * bz;
            this._out[3] = aw * bw - az * bz;
            return this;
        }
    }, {
        key: 'calculateW',

        /**
         * Calculates the W component of a quat from the X, Y, and Z components.
         * Assumes that quaternion is 1 unit in length
         * Any existing W component will be ignored.
         */
        value: function calculateW() {
            var _out5 = slicedToArray(this._out, 4),
                x = _out5[0],
                y = _out5[1],
                z = _out5[2],
                w = _out5[3];

            this._out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return this;
        }
    }, {
        key: 'dot',

        /**
         * Calculates the dot product of two quat's
         * @return {number} dot product of two quat's
         */
        value: function dot(qua) {
            var _out6 = slicedToArray(this._out, 4),
                x0 = _out6[0],
                y0 = _out6[1],
                z0 = _out6[2],
                w0 = _out6[3],
                _qua$_out2 = slicedToArray(qua._out, 4),
                x1 = _qua$_out2[0],
                y1 = _qua$_out2[1],
                z1 = _qua$_out2[2],
                w1 = _qua$_out2[3];

            return x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
        }
    }, {
        key: 'lerp',

        /**
         * Performs a linear interpolation between two quat's
         * @param {quat} qua the second operand
         * @param {Number} t interpolation amount between the two inputs
         */
        value: function lerp(qua, t) {
            var _out7 = slicedToArray(this._out, 4),
                ax = _out7[0],
                ay = _out7[1],
                az = _out7[2],
                aw = _out7[3];

            this._out[0] = ax + t * (qua._out[0] - ax);
            this._out[1] = ay + t * (qua._out[1] - ay);
            this._out[2] = az + t * (qua._out[2] - az);
            this._out[3] = aw + t * (qua._out[3] - aw);
            return this;
        }
    }, {
        key: 'slerp',

        /**
         * Performs a spherical linear interpolation between two quat
         * benchmarks: http://jsperf.com/quaternion-slerp-implementations
         */
        value: function slerp(qua, t) {
            var _out8 = slicedToArray(this._out, 4),
                ax = _out8[0],
                ay = _out8[1],
                az = _out8[2],
                aw = _out8[3],
                _qua$_out3 = slicedToArray(qua._out, 4),
                bx = _qua$_out3[0],
                by = _qua$_out3[1],
                bz = _qua$_out3[2],
                bw = _qua$_out3[3];

            var omega = void 0,
                cosom = void 0,
                sinom = void 0,
                scale0 = void 0,
                scale1 = void 0;
            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            } else {
                // "from" and "to" quaternions are very close 
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            this._out[0] = scale0 * ax + scale1 * bx;
            this._out[1] = scale0 * ay + scale1 * by;
            this._out[2] = scale0 * az + scale1 * bz;
            this._out[3] = scale0 * aw + scale1 * bw;
            return this;
        }
        /**
         * Performs a spherical linear interpolation with two control points
         * @param {quat} quaI
         * @param {quat} quaII
         * @param {quat} quaIII
         * @return
         */

    }, {
        key: 'invert',

        /**
         * Calculates the inverse of a quat
         * @return {quat} the inversed quat 
         */
        value: function invert() {
            var _out9 = slicedToArray(this._out, 4),
                a0 = _out9[0],
                a1 = _out9[1],
                a2 = _out9[2],
                a3 = _out9[3],
                dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
                invDot = dot ? 1.0 / dot : 0;

            this._out[0] = -a0 * invDot;
            this._out[1] = -a1 * invDot;
            this._out[2] = -a2 * invDot;
            this._out[3] = a3 * invDot;
            return this;
        }
    }, {
        key: 'conjugate',

        /**
         * Calculates the conjugate of a quat
         * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
         */
        value: function conjugate() {
            this._out[0] = -this._out[0];
            this._out[1] = -this._out[1];
            this._out[2] = -this._out[2];
            //this._out[3] = this._out[3]; omit to reduce assignment operation
            return this;
        }
    }, {
        key: 'len',

        /**
         * retrun the length of quat
         * @return {number} 
         */
        value: function len() {
            var _out10 = slicedToArray(this._out, 4),
                x = _out10[0],
                y = _out10[1],
                z = _out10[2],
                w = _out10[3];

            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
    }, {
        key: 'normalize',

        /**
         * Normalize a quat
         */
        value: function normalize() {
            var len = this.len();
            if (len > 0) {
                len = 1.0 / len;
                this._out[0] *= len;
                this._out[0] *= len;
                this._out[0] *= len;
                this._out[0] *= len;
            }
            return this;
        }
    }, {
        key: 'toString',

        /**
         * Returns a string representation of a quatenion
         * @returns {String} string representation of the vector
         */
        value: function toString() {
            return 'quat(' + this._out[0] + ', ' + this._out[1] + ', ' + this._out[2] + ', ' + this._out[3] + ')';
        }
    }, {
        key: 'equals',

        /**
         * Returns whether or not the quat have approximately the same elements in the same position.
         * @param 
         */
        value: function equals(qua) {
            var _out11 = slicedToArray(this._out, 4),
                a0 = _out11[0],
                a1 = _out11[1],
                a2 = _out11[2],
                a3 = _out11[3],
                _qua$_out4 = slicedToArray(qua._out, 4),
                b0 = _qua$_out4[0],
                b1 = _qua$_out4[1],
                b2 = _qua$_out4[2],
                b3 = _qua$_out4[3];

            return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof quat
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'fromMat3',

        /**
         * generic a quat from mat3
         * @param {mat3} mat the 3x3 matrix 
         */
        value: function fromMat3(mat) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            var fTrace = mat._out[0] + mat._out[4] + mat._out[8],
                qua = new quat(),
                fRoot = void 0;
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                qua._out[0] = (mat._out[5] - mat._out[7]) * fRoot;
                qua._out[1] = (mat._out[6] - mat._out[2]) * fRoot;
                qua._out[2] = (mat._out[1] - mat._out[3]) * fRoot;
            } else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0]) i = 1;
                if (m[8] > m[i * 3 + i]) i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;
                fRoot = Math.sqrt(mat._out[i * 3 + i] - mat._out[j * 3 + j] - mat._out[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                qua._out[3] = (mat._out[j * 3 + k] - mat._out[k * 3 + j]) * fRoot;
                qua._out[j] = (mat._out[j * 3 + i] + mat._out[i * 3 + j]) * fRoot;
                qua._out[k] = (mat._out[k * 3 + i] + mat._out[i * 3 + k]) * fRoot;
            }
            return this;
        }
    }]);
    return quat;
}();

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
 * switch to es6 syntax
 * warning:if you don't want to change the source value,please use mat4.clone().* instead of mat4.* (* means matrix operations)
 * @author yellow 2017/5/10
 * translation:
 * [1, 0, 0, 0,
 *  0, 1, 0, 0,
 *  0, 0, 1, 0,
 *  tx,ty,tz,1]
 * x-rotation:
 * [1, 0, 0, 0,
 *  0, c, s, 0,
 *  0,-s, c, 0,
 *  0, 0, 0, 1]
 * y-rotation:
 * [c, 0,-s, 0,
 *  0, 1, 0, 0,
 *  s, 0, c, 0,
 *  0, 0, 0, 1]
 * z-rotation:
 * [c, s, 0, 0,
 *  -s,c, s, 0,
 *  0, 0, 1, 0,
 *  0, 0, 0, 1]
 * scale:
 * [sx,0, 0, 0,
 *  0, sy,0, 0,
 *  0, 0, sz,0,
 *  0, 0, 0, 1]
 * notice that multlpy as translation*vec
 */
/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = function () {
    /**
     *  Creates a new identity mat4
     */
    function mat4() {
        var _this = this;

        classCallCheck(this, mat4);

        this.transpose = function () {
            return matrix.USE_SIMD ? function () {
                var a0 = void 0,
                    a1 = void 0,
                    a2 = void 0,
                    a3 = void 0,
                    tmp01 = void 0,
                    tmp23 = void 0,
                    out0 = void 0,
                    out1 = void 0,
                    out2 = void 0,
                    out3 = void 0;
                //simd load all 4x4 matrix data
                r0 = SIMD.Float32x4.load(_this._out, 0);
                r1 = SIMD.Float32x4.load(_this._out, 4);
                r2 = SIMD.Float32x4.load(_this._out, 8);
                r3 = SIMD.Float32x4.load(_this._out, 12);
                //cause this._out[0],this._out[4],this._out[8],this._out[12] distribute in
                //r0 r1 r2 r3,but shuffle only accept two paramters,so...it need two tempary arrays
                tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
                tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
                out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
                out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
                SIMD.Float32x4.store(_this._out, 0, out0);
                SIMD.Float32x4.store(_this._out, 4, out1);
                //
                tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
                tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
                out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
                out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
                SIMD.Float32x4.store(_this._out, 8, out2);
                SIMD.Float32x4.store(_this._out, 12, out3);
                return _this;
            } : function () {
                var _ref = [_this._out[0], _this._out[4], _this._out[8], _this._out[12], _this._out[1], _this._out[5], _this._out[9], _this._out[13], _this._out[2], _this._out[6], _this._out[10], _this._out[14], _this._out[3], _this._out[7], _this._out[11], _this._out[15]];
                //deconstruction assignment

                _this._out[0] = _ref[0];
                _this._out[1] = _ref[1];
                _this._out[2] = _ref[2];
                _this._out[3] = _ref[3];
                _this._out[4] = _ref[4];
                _this._out[5] = _ref[5];
                _this._out[6] = _ref[6];
                _this._out[7] = _ref[7];
                _this._out[8] = _ref[8];
                _this._out[9] = _ref[9];
                _this._out[10] = _ref[10];
                _this._out[11] = _ref[11];
                _this._out[12] = _ref[12];
                _this._out[13] = _ref[13];
                _this._out[14] = _ref[14];
                _this._out[15] = _ref[15];

                return _this;
            };
        }();

        this.invert = function () {
            //deconstruction assignment
            return function () {
                var _out = slicedToArray(_this._out, 16),
                    a00 = _out[0],
                    a01 = _out[1],
                    a02 = _out[2],
                    a03 = _out[3],
                    a10 = _out[4],
                    a11 = _out[5],
                    a12 = _out[6],
                    a13 = _out[7],
                    a20 = _out[8],
                    a21 = _out[9],
                    a22 = _out[10],
                    a23 = _out[11],
                    a30 = _out[12],
                    a31 = _out[13],
                    a32 = _out[14],
                    a33 = _out[15],
                    b00 = a00 * a11 - a01 * a10,
                    b01 = a00 * a12 - a02 * a10,
                    b02 = a00 * a13 - a03 * a10,
                    b03 = a01 * a12 - a02 * a11,
                    b04 = a01 * a13 - a03 * a11,
                    b05 = a02 * a13 - a03 * a12,
                    b06 = a20 * a31 - a21 * a30,
                    b07 = a20 * a32 - a22 * a30,
                    b08 = a20 * a33 - a23 * a30,
                    b09 = a21 * a32 - a22 * a31,
                    b10 = a21 * a33 - a23 * a31,
                    b11 = a22 * a33 - a23 * a32,
                    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

                if (!det) return null;
                det = 1.0 / det;
                _this._out = [(a11 * b11 - a12 * b10 + a13 * b09) * det, (a02 * b10 - a01 * b11 - a03 * b09) * det, (a31 * b05 - a32 * b04 + a33 * b03) * det, (a22 * b04 - a21 * b05 - a23 * b03) * det, (a12 * b08 - a10 * b11 - a13 * b07) * det, (a00 * b11 - a02 * b08 + a03 * b07) * det, (a32 * b02 - a30 * b05 - a33 * b01) * det, (a20 * b05 - a22 * b02 + a23 * b01) * det, (a10 * b10 - a11 * b08 + a13 * b06) * det, (a01 * b08 - a00 * b10 - a03 * b06) * det, (a30 * b04 - a31 * b02 + a33 * b00) * det, (a21 * b02 - a20 * b04 - a23 * b00) * det, (a11 * b07 - a10 * b09 - a12 * b06) * det, (a00 * b09 - a01 * b07 + a02 * b06) * det, (a31 * b01 - a30 * b03 - a32 * b00) * det, (a20 * b03 - a21 * b01 + a22 * b00) * det];
                return _this;
            };
        }();

        this._out = new matrix.ARRAY_TYPE(16);
        this._out[0] = 1;
        this._out[1] = 0;
        this._out[2] = 0;
        this._out[3] = 0;
        this._out[4] = 0;
        this._out[5] = 1;
        this._out[6] = 0;
        this._out[7] = 0;
        this._out[8] = 0;
        this._out[9] = 0;
        this._out[10] = 1;
        this._out[11] = 0;
        this._out[12] = 0;
        this._out[13] = 0;
        this._out[14] = 0;
        this._out[15] = 1;
        return this;
    }
    /**
     * private 4x4 matrix array store
     */


    createClass(mat4, [{
        key: 'set',

        /**
         * set the value of 4x4 matrix
         */
        value: function set$$1(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
            this._out[0] = m00;
            this._out[1] = m01;
            this._out[2] = m02;
            this._out[3] = m03;
            this._out[4] = m10;
            this._out[5] = m11;
            this._out[6] = m12;
            this._out[7] = m13;
            this._out[8] = m20;
            this._out[9] = m21;
            this._out[10] = m22;
            this._out[11] = m23;
            this._out[12] = m30;
            this._out[13] = m31;
            this._out[14] = m32;
            this._out[15] = m33;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * Creates a new mat4 initialized with values from an existing matrix
         */
        value: function clone() {
            var mat = new mat4();
            mat.set(this._out[0], this._out[1], this._out[2], this._out[3], this._out[4], this._out[5], this._out[6], this._out[7], this._out[8], this._out[9], this._out[10], this._out[11], this._out[12], this._out[13], this._out[14], this._out[15]);
            return mat;
        }
    }, {
        key: 'identity',

        /**
         * Set a mat4 to the identity matrix
         */
        value: function identity() {
            this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * Transpose the values of a mat4 
         */

        /**
         * Inverts a mat4
         */

    }, {
        key: 'adjoint',

        /**
         * Calculates the adjugate of a mat4 not using SIMD
         */
        value: function adjoint() {
            var _out2 = slicedToArray(this._out, 16),
                a00 = _out2[0],
                a01 = _out2[1],
                a02 = _out2[2],
                a03 = _out2[3],
                a10 = _out2[4],
                a11 = _out2[5],
                a12 = _out2[6],
                a13 = _out2[7],
                a20 = _out2[8],
                a21 = _out2[9],
                a22 = _out2[10],
                a23 = _out2[11],
                a30 = _out2[12],
                a31 = _out2[13],
                a32 = _out2[14],
                a33 = _out2[15];

            this._out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            this._out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            this._out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            this._out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            this._out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            this._out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            this._out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            this._out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            this._out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            this._out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            this._out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            this._out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            this._out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            this._out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            this._out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            this._out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return this;
        }
    }, {
        key: 'determinant',

        /**
         * Calculates the determinant of a mat4
         * @return {number} determinant of this matrix
         */
        value: function determinant() {
            var _out3 = slicedToArray(this._out, 16),
                a00 = _out3[0],
                a01 = _out3[1],
                a02 = _out3[2],
                a03 = _out3[3],
                a10 = _out3[4],
                a11 = _out3[5],
                a12 = _out3[6],
                a13 = _out3[7],
                a20 = _out3[8],
                a21 = _out3[9],
                a22 = _out3[10],
                a23 = _out3[11],
                a30 = _out3[12],
                a31 = _out3[13],
                a32 = _out3[14],
                a33 = _out3[15];

            var b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        }
    }, {
        key: 'multiply',

        /**
         * Multiplies two mat4's explicitly not using SIMD
         * @param {mat4} mat
         */
        value: function multiply(mat) {
            var _out4 = slicedToArray(this._out, 16),
                a00 = _out4[0],
                a01 = _out4[1],
                a02 = _out4[2],
                a03 = _out4[3],
                a10 = _out4[4],
                a11 = _out4[5],
                a12 = _out4[6],
                a13 = _out4[7],
                a20 = _out4[8],
                a21 = _out4[9],
                a22 = _out4[10],
                a23 = _out4[11],
                a30 = _out4[12],
                a31 = _out4[13],
                a32 = _out4[14],
                a33 = _out4[15];
            // Cache only the current line of the second matrix


            var b0 = mat._out[0],
                b1 = mat._out[1],
                b2 = mat._out[2],
                b3 = mat._out[3];
            this._out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this._out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this._out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this._out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mat._out[4];b1 = mat._out[5];b2 = mat._out[6];b3 = mat._out[7];
            this._out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this._out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this._out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this._out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mat._out[8];b1 = mat._out[9];b2 = mat._out[10];b3 = mat._out[11];
            this._out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this._out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this._out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this._out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mat._out[12];b1 = mat._out[13];b2 = mat._out[14];b3 = mat._out[15];
            this._out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this._out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this._out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this._out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            return this;
        }
    }, {
        key: 'add',

        /**
         * add two 4x4 matrixs 
         */
        value: function add(mat) {
            this._out[0] += mat._out[0];
            this._out[1] += mat._out[1];
            this._out[2] += mat._out[2];
            this._out[3] += mat._out[3];
            this._out[4] += mat._out[4];
            this._out[5] += mat._out[5];
            this._out[6] += mat._out[6];
            this._out[7] += mat._out[7];
            this._out[8] += mat._out[8];
            this._out[9] += mat._out[9];
            this._out[10] += mat._out[10];
            this._out[11] += mat._out[11];
            this._out[12] += mat._out[12];
            this._out[13] += mat._out[13];
            this._out[14] += mat._out[14];
            this._out[15] += mat._out[15];
            return this;
        }
    }, {
        key: 'translate',

        /**
         * Translate a mat4 by the given vector not using SIMD
         * 
         *
         * @param {vec3} v3 vector to translate by
         * @return {mat4}
         * @example
         *  let m4=new mat4();
         *  m4.translate(new vec3(1,0,4));
         *  m4.getTranslation(); 
         */
        value: function translate(v3) {
            var _v3$value = slicedToArray(v3.value, 3),
                x = _v3$value[0],
                y = _v3$value[1],
                z = _v3$value[2],
                _out5 = slicedToArray(this._out, 16),
                a00 = _out5[0],
                a01 = _out5[1],
                a02 = _out5[2],
                a03 = _out5[3],
                a10 = _out5[4],
                a11 = _out5[5],
                a12 = _out5[6],
                a13 = _out5[7],
                a20 = _out5[8],
                a21 = _out5[9],
                a22 = _out5[10],
                a23 = _out5[11],
                a30 = _out5[12],
                a31 = _out5[13],
                a32 = _out5[14],
                a33 = _out5[15];

            this._out[12] = a00 * x + a10 * y + a20 * z + a30;
            this._out[13] = a01 * x + a11 * y + a21 * z + a31;
            this._out[14] = a02 * x + a12 * y + a22 * z + a32;
            this._out[15] = a03 * x + a13 * y + a23 * z + a33;
            return this;
        }
    }, {
        key: 'scale',

        /**
         * Scales the mat4 by the dimensions in the given vec3 not using vectorization
         * @param {vec3} vec the vec3 to scale the matrix by
         */
        value: function scale(vec) {
            var _vec$_out = slicedToArray(vec._out, 3),
                x = _vec$_out[0],
                y = _vec$_out[1],
                z = _vec$_out[2];

            this._out[0] *= x;
            this._out[1] *= x;
            this._out[2] *= x;
            this._out[3] *= x;
            this._out[4] *= y;
            this._out[5] *= y;
            this._out[6] *= y;
            this._out[7] *= y;
            this._out[8] *= z;
            this._out[9] *= z;
            this._out[10] *= z;
            this._out[11] *= z;
            return this;
        }
    }, {
        key: 'rotate',

        /**
         * Rotates a mat4 by the given angle around the given axis
         * @param {number} rad the angle to rotate the matrix by
         * @param {vec3} axis the axis to rotate around
         */
        value: function rotate(rad, axis) {
            var _axis$_out = slicedToArray(axis._out, 3),
                x = _axis$_out[0],
                y = _axis$_out[1],
                z = _axis$_out[2],
                len = axis.len(),
                s,
                c,
                t,
                a00,
                a01,
                a02,
                a03,
                a10,
                a11,
                a12,
                a13,
                a20,
                a21,
                a22,
                a23,
                b00,
                b01,
                b02,
                b10,
                b11,
                b12,
                b20,
                b21,
                b22;

            if (Math.abs(len) < matrix.EPSILON) {
                return null;
            }
            len = 1.0 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
            a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
            a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            this._out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            this._out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            this._out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            this._out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            this._out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            this._out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            this._out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            this._out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            this._out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            this._out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            this._out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            this._out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            return this;
        }
    }, {
        key: 'rotateX',

        /**
         * Rotates a matrix by the given angle around the X axis not using SIMD
         * @param {number} rad
         */
        value: function rotateX(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a10 = this._out[4],
                a11 = this._out[5],
                a12 = this._out[6],
                a13 = this._out[7],
                a20 = this._out[8],
                a21 = this._out[9],
                a22 = this._out[10],
                a23 = this._out[11];
            // Perform axis-specific matrix multiplication
            this._out[4] = a10 * c + a20 * s;
            this._out[5] = a11 * c + a21 * s;
            this._out[6] = a12 * c + a22 * s;
            this._out[7] = a13 * c + a23 * s;
            this._out[8] = a20 * c - a10 * s;
            this._out[9] = a21 * c - a11 * s;
            this._out[10] = a22 * c - a12 * s;
            this._out[11] = a23 * c - a13 * s;
            return this;
        }
    }, {
        key: 'rotateY',

        /**
         * Rotates a matrix by the given angle around the Y axis not using SIMD
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function rotateY(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = this._out[0],
                a01 = this._out[1],
                a02 = this._out[2],
                a03 = this._out[3],
                a20 = this._out[8],
                a21 = this._out[9],
                a22 = this._out[10],
                a23 = this._out[11];
            // Perform axis-specific matrix multiplication
            this._out[0] = a00 * c - a20 * s;
            this._out[1] = a01 * c - a21 * s;
            this._out[2] = a02 * c - a22 * s;
            this._out[3] = a03 * c - a23 * s;
            this._out[8] = a00 * s + a20 * c;
            this._out[9] = a01 * s + a21 * c;
            this._out[10] = a02 * s + a22 * c;
            this._out[11] = a03 * s + a23 * c;
            return this;
        }
    }, {
        key: 'rotateZ',

        /**
         * Rotates a matrix by the given angle around the Z axis not using SIMD
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function rotateZ(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = this._out[0],
                a01 = this._out[1],
                a02 = this._out[2],
                a03 = this._out[3],
                a10 = this._out[4],
                a11 = this._out[5],
                a12 = this._out[6],
                a13 = this._out[7];
            // Perform axis-specific matrix multiplication
            this._out[0] = a00 * c + a10 * s;
            this._out[1] = a01 * c + a11 * s;
            this._out[2] = a02 * c + a12 * s;
            this._out[3] = a03 * c + a13 * s;
            this._out[4] = a10 * c - a00 * s;
            this._out[5] = a11 * c - a01 * s;
            this._out[6] = a12 * c - a02 * s;
            this._out[7] = a13 * c - a03 * s;
            return this;
        }
    }, {
        key: 'getTranslation',

        /**
         * Returns the translation vector component of a transformation
         *  matrix. If a matrix is built with fromRotationTranslation,
         *  the returned vector will be the same as the translation vector
         *  originally supplied.
         * @return {vec3} out
        */
        value: function getTranslation() {
            var vec = new vec3();
            vec.set(mat._out[12], mat._out[13], mat._out[14]);
            return vec;
        }
    }, {
        key: 'getScaling',

        /**
         * Returns the scaling factor component of a transformation
         * matrix. If a matrix is built with fromRotationTranslationScale
         * with a normalized Quaternion paramter, the returned vector will be 
         * the same as the scaling vector
         * originally supplied.
         * @return {vec3} 
         */
        value: function getScaling() {
            var vec = new vec3(),
                m11 = mat[0],
                m12 = mat[1],
                m13 = mat[2],
                m21 = mat[4],
                m22 = mat[5],
                m23 = mat[6],
                m31 = mat[8],
                m32 = mat[9],
                m33 = mat[10];
            x = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
            y = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
            z = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
            vec.set(x, y, z);
            return vec;
        }
    }, {
        key: 'getRotation',

        /**
         * Returns a quaternion representing the rotational component
         * of a transformation matrix. If a matrix is built with
         * fromRotationTranslation, the returned quaternion will be the
         * same as the quaternion originally supplied.
         * Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
         * @return {quat} 
         */
        value: function getRotation() {
            var S = 0,
                x = void 0,
                y = void 0,
                z = void 0,
                w = void 0,
                qua = new quat(),
                trace = this._out[0] + this._out[5] + this._out[10];

            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                w = 0.25 * S;
                x = (this._out[6] - this._out[9]) / S;
                y = (this._out[8] - this._out[2]) / S;
                z = (this._out[1] - this._out[4]) / S;
            } else if (this._out[0] > this._out[5] & this._out[0] > this._out[10]) {
                S = Math.sqrt(1.0 + this._out[0] - this._out[5] - this._out[10]) * 2;
                w = (this._out[6] - this._out[9]) / S;
                x = 0.25 * S;
                y = (this._out[1] + this._out[4]) / S;
                z = (this._out[8] + this._out[2]) / S;
            } else if (this._out[5] > this._out[10]) {
                S = Math.sqrt(1.0 + this._out[5] - this._out[0] - this._out[10]) * 2;
                w = (this._out[8] - this._out[2]) / S;
                x = (this._out[1] + this._out[4]) / S;
                y = 0.25 * S;
                z = (this._out[6] + this._out[9]) / S;
            } else {
                S = Math.sqrt(1.0 + this._out[10] - this._out[0] - this._out[5]) * 2;
                w = (this._out[1] - this._out[4]) / S;
                x = (this._out[8] + this._out[2]) / S;
                y = (this._out[6] + this._out[9]) / S;
                z = 0.25 * S;
            }
            qua.set(x, y, z, w);
            return qua;
        }
    }, {
        key: 'lookAt',

        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         * @param {vec3} eye the camera Position of the viewer
         * @param {vec3} center the target point the viewer is looking at
         * @param {vec3} up vec3 pointing up
         * @return {mat4}
         */
        value: function lookAt(eye, center, up) {
            var x0 = void 0,
                x1 = void 0,
                x2 = void 0,
                y0 = void 0,
                y1 = void 0,
                y2 = void 0,
                z0 = void 0,
                z1 = void 0,
                z2 = void 0,
                len = void 0,
                _eye$value = slicedToArray(eye.value, 3),
                eyex = _eye$value[0],
                eyey = _eye$value[1],
                eyez = _eye$value[2],
                _up$value = slicedToArray(up.value, 3),
                upx = _up$value[0],
                upy = _up$value[1],
                upz = _up$value[2],
                _center$_out = slicedToArray(center._out, 3),
                centerx = _center$_out[0],
                centery = _center$_out[1],
                centerz = _center$_out[2];

            if (Math.abs(eyex - centerx) < matrix.EPSILON && Math.abs(eyey - centery) < matrix.EPSILON && Math.abs(eyez - centerz) < matrix.EPSILON) {
                return this.identity();
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            this.set(x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, -(x0 * eyex + x1 * eyey + x2 * eyez), -(y0 * eyex + y1 * eyey + y2 * eyez), -(z0 * eyex + z1 * eyey + z2 * eyez), 1);
            return this;
        }
    }, {
        key: 'toString',

        /**
         * Returns a string representation of a mat4
         * @return {String}
         */
        value: function toString() {
            return 'mat4(' + this._out[0] + ', ' + this._out[1] + ', ' + this._out[2] + ', ' + this._out[3] + ', ' + this._out[4] + ', ' + this._out[5] + ', ' + this._out[6] + ', ' + this._out[7] + ', ' + this._out[8] + ', ' + this._out[9] + ', ' + this._out[10] + ', ' + this._out[11] + ', ' + this._out[12] + ', ' + this._out[13] + ', ' + this._out[14] + ', ' + this._out[15] + ')';
        }
    }, {
        key: 'forb',

        /**
         * Returns Frobenius norm of a mat4
         * @return {Number} Frobenius norm
         */
        value: function forb() {
            return Math.sqrt(Math.pow(this._out[0], 2) + Math.pow(this._out[1], 2) + Math.pow(this._out[2], 2) + Math.pow(this._out[3], 2) + Math.pow(this._out[4], 2) + Math.pow(this._out[5], 2) + Math.pow(this._out[6], 2) + Math.pow(this._out[7], 2) + Math.pow(this._out[8], 2) + Math.pow(this._out[9], 2) + Math.pow(this._out[10], 2) + Math.pow(this._out[11], 2) + Math.pow(this._out[12], 2) + Math.pow(this._out[13], 2) + Math.pow(this._out[14], 2) + Math.pow(this._out[15], 2));
        }
    }, {
        key: 'add',

        /**
         * Adds two mat4's
         * @param {mat4} m4
         */
        value: function add(m4) {
            this._out[0] += m4.value[0];
            this._out[1] += m4.value[1];
            this._out[2] += m4.value[2];
            this._out[3] += m4.value[3];
            this._out[4] += m4.value[4];
            this._out[5] += m4.value[5];
            this._out[6] += m4.value[6];
            this._out[7] += m4.value[7];
            this._out[8] += m4.value[8];
            this._out[9] += m4.value[9];
            this._out[10] += m4.value[10];
            this._out[11] += m4.value[11];
            this._out[12] += m4.value[12];
            this._out[13] += m4.value[13];
            this._out[14] += m4.value[14];
            this._out[15] += m4.value[15];
            return this;
        }
    }, {
        key: 'sub',

        /**
         * Subtracts matrix b from matrix a
         * @param {mat4} m4
         * @return {mat4}
         */
        value: function sub(m4) {
            this._out[0] -= m4.value[0];
            this._out[1] -= m4.value[1];
            this._out[2] -= m4.value[2];
            this._out[3] -= m4.value[3];
            this._out[4] -= m4.value[4];
            this._out[5] -= m4.value[5];
            this._out[6] -= m4.value[6];
            this._out[7] -= m4.value[7];
            this._out[8] -= m4.value[8];
            this._out[9] -= m4.value[9];
            this._out[10] -= m4.value[10];
            this._out[11] -= m4.value[11];
            this._out[12] -= m4.value[12];
            this._out[13] -= m4.value[13];
            this._out[14] -= m4.value[14];
            this._out[15] -= m4.value[15];
            return this;
        }
    }, {
        key: 'equals',

        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         * @param {mat4} m4
         * @param {boolean}
         */
        value: function equals(m4) {
            var _out6 = slicedToArray(this._out, 16),
                a0 = _out6[0],
                a1 = _out6[1],
                a2 = _out6[2],
                a3 = _out6[3],
                a4 = _out6[4],
                a5 = _out6[5],
                a6 = _out6[6],
                a7 = _out6[7],
                a8 = _out6[8],
                a9 = _out6[9],
                a10 = _out6[10],
                a11 = _out6[11],
                a12 = _out6[12],
                a13 = _out6[13],
                a14 = _out6[14],
                a15 = _out6[15],
                _m4$value = slicedToArray(m4.value, 16),
                b0 = _m4$value[0],
                b1 = _m4$value[1],
                b2 = _m4$value[2],
                b3 = _m4$value[3],
                b4 = _m4$value[4],
                b5 = _m4$value[5],
                b6 = _m4$value[6],
                b7 = _m4$value[7],
                b8 = _m4$value[8],
                b9 = _m4$value[9],
                b10 = _m4$value[10],
                b11 = _m4$value[11],
                b12 = _m4$value[12],
                b13 = _m4$value[13],
                b14 = _m4$value[14],
                b15 = _m4$value[15];

            return Math.abs(a0 - b0) <= matrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= matrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= matrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= matrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= matrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= matrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= matrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= matrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= matrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= matrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= matrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= matrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= matrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= matrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= matrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= matrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof mat4
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'fromVec3Translation',

        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *      mat4.identity(dest);
         *      mat4.translate(dest, dest, vec);
         * @param {vec3} v3 Translation vector
         */
        value: function fromVec3Translation(v3) {
            var m4 = new mat4(),
                _v3$value2 = slicedToArray(v3.value, 3),
                x = _v3$value2[0],
                y = _v3$value2[1],
                z = _v3$value2[2];

            m4.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
            return m4;
        }
    }, {
        key: 'fromScaling',

        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.scale(dest, dest, vec);
         * @param {vec3} vec Scaling vector
         * @returns {mat4} 
         */
        value: function fromScaling(vec) {
            var mat = new mat4(),
                _vec$_out2 = slicedToArray(vec._out, 3),
                x = _vec$_out2[0],
                y = _vec$_out2[1],
                z = _vec$_out2[2];

            mat.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'fromRotation',

        /**
         * Creates a matrix from a given angle around a given axis
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.rotate(dest, dest, rad, axis);
         * @param {Number} rad the angle to rotate the matrix by
         * @param {vec3} axis the axis to rotate around
         */
        value: function fromRotation(rad, axis) {
            var _axis$_out2 = slicedToArray(axis._out, 3),
                x = _axis$_out2[0],
                y = _axis$_out2[1],
                z = _axis$_out2[2],
                len = axis.len(),
                mat = new mat4(),
                s,
                c,
                t;

            if (len < matrix.EPSILON) {
                return null;
            }
            len = 1.0 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            // Perform rotation-specific matrix multiplication
            mat.set(x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0, x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0, x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'fromXRotation',

        /**
         * Creates a matrix from the given angle around the X axis
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.rotateX(dest, dest, rad);
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function fromXRotation(rad) {
            var mat = new mat4(),
                s = Math.sin(rad),
                c = Math.cos(rad);
            mat.set(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'fromYRotation',

        /**
         * Creates a matrix from the given angle around the Y axis
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.rotateY(dest, dest, rad);
         * 
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function fromYRotation(rad) {
            var mat = new mat4(),
                s = Math.sin(rad),
                c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            mat.set(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'fromZRotation',

        /**
         * Creates a matrix from the given angle around the Z axis
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.rotateZ(dest, dest, rad);
         * 
         * @param {Number} rad the angle to rotate the matrix by
         */
        value: function fromZRotation(rad) {
            var mat = new mat4(),
                s = Math.sin(rad),
                c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            mat.set(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'fromRotationTranslation',

        /**
         * Creates a matrix from a quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.translate(dest, vec);
         *  var quatMat = mat4.create();
         *  quat4.toMat4(quat, quatMat);
         *  mat4.multiply(dest, quatMat);
         * 
         * @param {quat} qua Rotation quaternion
         * @param {vec3} vec Translation vector
         */
        value: function fromRotationTranslation(qua, vec) {
            // Quaternion math
            var mat = new mat4(),
                _qua$_out = slicedToArray(qua._out, 4),
                x = _qua$_out[0],
                y = _qua$_out[1],
                z = _qua$_out[2],
                w = _qua$_out[3],
                _vec$_out3 = slicedToArray(vec._out, 3),
                v0 = _vec$_out3[0],
                v1 = _vec$_out3[1],
                v2 = _vec$_out3[2],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            mat.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, v0, v1, v2, 1);
            return mat;
        }
    }, {
        key: 'fromRotationTranslationScale',


        /**
         * Creates a matrix from a quaternion rotation, vector translation and vector scale
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.translate(dest, vec);
         *  var quatMat = mat4.create();
         *  quat4.toMat4(quat, quatMat);
         *  mat4.multiply(dest, quatMat);
         *  mat4.scale(dest, scale)
         * @param {quat} q rotation quaternion
         * @param {vec3} v translation vector
         * @param {vec3} s scaling vectoer
         * @return {mat4} 
         */
        value: function fromRotationTranslationScale(q, v, s) {
            var mat = new mat4(),
                _qua$_out2 = slicedToArray(qua._out, 4),
                x = _qua$_out2[0],
                y = _qua$_out2[1],
                z = _qua$_out2[2],
                w = _qua$_out2[3],
                _v$_out = slicedToArray(v._out, 3),
                v0 = _v$_out[0],
                v1 = _v$_out[1],
                v2 = _v$_out[2],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2,
                sx = s[0],
                sy = s[1],
                sz = s[2];

            mat.set((1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0(xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0, (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0, v0, v1, v2, 1);
            return mat;
        }
    }, {
        key: 'fromRotationTranslationScaleOrigin',

        /**
         * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
         * This is equivalent to (but much faster than):
         *  mat4.identity(dest);
         *  mat4.translate(dest, vec);
         *  mat4.translate(dest, origin);
         *  var quatMat = mat4.create();
         *  quat4.toMat4(quat, quatMat);
         *  mat4.multiply(dest, quatMat);
         *  mat4.scale(dest, scale);
         *  mat4.translate(dest, negativeOrigin);
         * 
         * @param {quat} q Rotation quaternion
         * @param {vec3} v Translation vector
         * @param {vec3} s Scaling vector
         * @param {vec3} o The origin vector around which to scale and rotate
         * @return {mat4}
         */
        value: function fromRotationTranslationScaleOrigin(q, v, s, o) {
            // Quaternion math
            var mat = new mat4(),
                _q$_out = slicedToArray(q._out, 4),
                x = _q$_out[0],
                y = _q$_out[1],
                z = _q$_out[2],
                w = _q$_out[3],
                _v$_out2 = slicedToArray(v._out, 3),
                sx = _v$_out2[0],
                sy = _v$_out2[1],
                sz = _v$_out2[2],
                _o$_out = slicedToArray(o._out, 3),
                ox = _o$_out[0],
                oy = _o$_out[1],
                oz = _o$_out[2],
                _v$_out3 = slicedToArray(v._out, 3),
                vx = _v$_out3[0],
                vy = _v$_out3[1],
                vz = _v$_out3[2],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            mat.set((1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0, (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0, (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0, vx + ox - (out[0] * ox + out[4] * oy + out[8] * oz), vy + oy - (out[1] * ox + out[5] * oy + out[9] * oz), vz + oz - (out[2] * ox + out[6] * oy + out[10] * oz), 1);
            return mat;
        }
    }, {
        key: 'fromQuat',

        /**
         * Calculates a 4x4 matrix from the given quaternion
         * @param {quat} q Quaternion to create matrix from
         * @return {mat4}
         */
        value: function fromQuat(q) {
            var mat = new mat4(),
                _q$_out2 = slicedToArray(q._out, 4),
                x = _q$_out2[0],
                y = _q$_out2[1],
                z = _q$_out2[2],
                w = _q$_out2[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            mat.set(1 - yy - zz, yx + wz, zx - wy, 0, yx - wz, 1 - xx - zz, zy + wx, 0, zx + wy, zy - wx, 1 - xx - yy, 0, 0, 0, 0, 1);
            return mat;
        }
    }, {
        key: 'frustum',

        /**
         * Generates a frustum matrix with the given bounds
         * @param {Number} left Left bound of the frustum
         * @param {Number} right Right bound of the frustum
         * @param {Number} bottom Bottom bound of the frustum
         * @param {Number} top Top bound of the frustum
         * @param {Number} near Near bound of the frustum
         * @param {Number} far Far bound of the frustum
         * @return {mat4}
         */
        value: function frustum(left, right, bottom, top, near, far) {
            var mat = new mat4(),
                rl = 1 / (right - left),
                tb = 1 / (top - bottom),
                nf = 1 / (near - far);
            mat.set(near * 2 * rl, 0, 0, 0, 0, near * 2 * tb, 0, 0, (right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1, 0, 0, far * near * 2 * nf, 0);
            return mat;
        }
    }, {
        key: 'perspective',

        /**
         * Generates a perspective projection matrix with the given bounds
         * @param {number} fovy Vertical field of view in radians
         * @param {number} aspect Aspect ratio. typically viewport width/height
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @return {mat4}
         */
        value: function perspective(fovy, aspect, near, far) {
            var m4 = new mat4(),

            //f = 1.0 / Math.tan(fovy / 2), discard
            //tan（π/2-α）= cotα 
            //cot(fovy/2) = tan(pi/2 - fovy/2);
            f = Math.tan((Math.PI - fovy) * 0.5),
                nf = 1.0 / (near - far);
            m4.set(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0);
            return m4;
        }
    }, {
        key: 'perspectiveFromFieldOfView',

        /**
         * Generates a perspective projection matrix with the given field of view.
         * This is primarily useful for generating projection matrices to be used
         * with the still experiemental WebVR API.
         * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @return {mat4} out
         */
        value: function perspectiveFromFieldOfView(fov, near, far) {
            var m4 = new mat4(),
                upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
                downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
                leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
                rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
                xScale = 2.0 / (leftTan + rightTan),
                yScale = 2.0 / (upTan + downTan);
            m4.set(xScale, 0, 0, 0, 0, yScale, 0, 0, -((leftTan - rightTan) * xScale * 0.5), (upTan - downTan) * yScale * 0.5, far / (near - far), -1, 0, 0, far * near / (near - far), 0);
            return m4;
        }
    }, {
        key: 'ortho',

        /**
         * Generates a orthogonal projection matrix with the given bounds
         * reference https://webgl2fundamentals.org/webgl/lessons/webgl-3d-orthographic.html
         * @param {number} left Left bound of the frustum
         * @param {number} right Right bound of the frustum
         * @param {number} bottom Bottom bound of the frustum
         * @param {number} top Top bound of the frustum
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @return {mat4} 
         */
        value: function ortho(left, right, bottom, top, near, far) {
            var mat = new mat4(),
                lr = 1.0 / (left - right),
                bt = 1.0 / (bottom - top),
                nf = 1.0 / (near - far);
            mat.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
            return mat;
        }
    }]);
    return mat4;
}();

/**
 * reference https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec2.js
 * switch to es6 syntax
 * warning:if you don't want to change the source value,please use vec2.clone().* instead of vec2.*
 * @author yellow 2017/5/8
 */
var vec2 = function () {
    /**
     * Creates a new, empty vec2
     */
    function vec2() {
        classCallCheck(this, vec2);

        this._out = new matrix.ARRAY_TYPE(2);
        this._out[0] = 0;
        this._out[1] = 0;
        return this;
    }
    /**
     * private array store for vec2
     */


    createClass(vec2, [{
        key: 'set',

        /**
         * set value of vec2,such as [x,y]
         */
        value: function set$$1(x, y) {
            this._out[0] = x;
            this._out[1] = y;
            return this;
        }
    }, {
        key: 'clone',

        /**
         * Creates a new vec2 initialized with values from an existing vector
         */
        value: function clone() {
            var vec = new vec2();
            vec.set(this._out[0], this._out[1]);
            return vec;
        }
    }, {
        key: 'add',

        /**
         * Add two vec2's
         * @param {vec2} vec the vec2 which waiting for add
         */
        value: function add(vec) {
            this._out[0] += vec._out[0];
            this._out[1] += vec._out[1];
            return this;
        }
    }, {
        key: 'sub',

        /**
         * substract vector vec from this
         * @param {vec2} vec
         */
        value: function sub(vec) {
            this._out[0] -= vec._out[0];
            this._out[1] -= vec._out[1];
            return this;
        }
    }, {
        key: 'multiply',

        /**
         * multiplies two vec2's
         * @param {vec2} 
         */
        value: function multiply(vec) {
            this._out[0] *= vec._out[0];
            this._out[1] *= vec._out[1];
            return this;
        }
    }, {
        key: 'divide',

        /**
         * diveides two vec2's
         * 
         */
        value: function divide(vec) {
            this._out[0] /= vec._out[0];
            this._out[1] /= vec._out[1];
            return this;
        }
    }, {
        key: 'ceil',

        /**
         * use math.ceil to adjust the value of v0 v1
         * 
         */
        value: function ceil() {
            this._out[0] = Math.ceil(this._out[0]);
            this._out[1] = Math.ceil(this._out[1]);
            return this;
        }
    }, {
        key: 'floor',

        /**
         * use math.floor to adjust the value of v0 v1
         */
        value: function floor() {
            this._out[0] = Math.floor(this._out[0]);
            this._out[1] = Math.floor(this._out[1]);
            return this;
        }
    }, {
        key: 'round',

        /**
         * use math.round to adjust the value of v0 v1
         */
        value: function round() {
            this._out[0] = Math.round(this._out[0]);
            this._out[1] = Math.round(this._out[1]);
            return this;
        }
    }, {
        key: 'min',

        /**
         * merge two vector's min value
         * 
         */
        value: function min(vec) {
            this._out[0] = Math.min(this._out[0], vec._out[0]);
            this._out[1] = Math.min(this._out[1], vec._out[1]);
            return this;
        }
    }, {
        key: 'max',

        /**
         *  merge two vector's max value
         */
        value: function max(vec) {
            this._out[0] = Math.max(this._out[0], vec._out[0]);
            this._out[1] = Math.max(this._out[1], vec._out[1]);
            return this;
        }
    }, {
        key: 'scale',

        /**
         * Scales a vec2 by a scalar number
         * @param {Number} n
         */
        value: function scale(n) {
            this._out[0] *= n;
            this._out[1] *= n;
            return this;
        }
    }, {
        key: 'distance',

        /**
         * Calculates the euclidian distance between two vec2's
         */
        value: function distance(vec) {
            var x = this._out[0] - vec._out[0],
                y = this._out[1] - vec._out[2];
            return Math.sqrt(x * x + y * y);
        }
    }, {
        key: 'manhattanDistance',

        /**
         * Calculates the manhattan distance between two vec2's
         */
        value: function manhattanDistance(vec) {
            var x = Math.abs(this._out[0] - vec._out[0]),
                y = Math.abs(this._out[1] - vec._out[2]);
            return x + y;
        }
    }, {
        key: 'chebyshevDistance',

        /**
         * Calculates the chebyshev distance between two vec2's
         */
        value: function chebyshevDistance(vec) {
            var x = Math.abs(this._out[0] - vec._out[0]),
                y = Math.abs(this._out[1] - vec._out[2]);
            return Math.max(x, y);
        }
    }, {
        key: 'len',

        /**
         * Calculates the length of a vec2
         */
        value: function len() {
            return this.distance(new vec2());
        }
    }, {
        key: 'negate',

        /**
         * Negates the components of a vec2
         */
        value: function negate() {
            this._out[0] = -this._out[0];
            this._out[1] = -this._out[1];
            return this;
        }
    }, {
        key: 'inverse',

        /**
         * Returns the inverse of the components of a vec2
         */
        value: function inverse() {
            this._out[0] = 1.0 / this._out[0];
            this._out[1] = 1.0 / this._out[1];
            return this;
        }
    }, {
        key: 'normalize',

        /**
         * Normalize a vec2
         */
        value: function normalize() {
            var len = this.vec2Length();
            if (len > 0) {
                //for the reason * has a high performance than /
                len = 1.0 / len;
                this._out[0] *= len;
                this._out[1] *= len;
            }
            return this;
        }
    }, {
        key: 'dot',

        /**
         * Calculates the dot product of two vec2's
         */
        value: function dot(vec) {
            return this._out[0] * vec._out[0] + this._out[1] * vec._out[1];
        }
    }, {
        key: 'lerp',

        /**
         * performs a linear interpolation between two vec2's
         * @param {vec2} vec
         * @param {number} t interpolation amount between the two inputs
         */
        value: function lerp(vec, t) {
            var _out = slicedToArray(this._out, 2),
                ax = _out[0],
                ay = _out[1],
                _vec$_out = slicedToArray(vec._out, 2),
                bx = _vec$_out[0],
                by = _vec$_out[1];

            this._out[0] = ax + t * (bx - ax);
            this._out[1] = ay + t * (by - ay);
            return this;
        }
    }, {
        key: 'toString',

        /**
         * Returns a string representation of a vector
         */
        value: function toString() {
            return 'vec2(' + this._out[0] + ',' + this._out[1] + ')';
        }
    }, {
        key: 'transformMat3',

        /**
         * Transforms the vec2 with a mat3
         * @param {mat3} mat matrix to transform with
         */
        value: function transformMat3(mat) {
            var _out2 = slicedToArray(this._out, 2),
                x = _out2[0],
                y = _out2[1];

            this._out[0] = mat._out[0] * x + mat._out[3] * y + mat._out[6];
            this._out[1] = mat._out[1] * x + mat._out[4] * y + mat._out[7];
            return this;
        }
    }, {
        key: 'transformMat4',

        /**
         * Transforms the vec2 with a mat4
         */
        value: function transformMat4(mat) {
            var _out3 = slicedToArray(this._out, 2),
                x = _out3[0],
                y = _out3[1];

            this._out[0] = mat._out[0] * x + mat._out[4] * y + mat._out[5];
            this._out[1] = mat._out[1] * x + mat._out[5] * y + mat._out[13];
            return this;
        }
    }, {
        key: 'equals',

        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         * precision
         */
        value: function equals(vec) {
            var _out4 = slicedToArray(this._out, 2),
                a0 = _out4[0],
                a1 = _out4[1],
                _vec$_out2 = slicedToArray(vec._out, 2),
                b0 = _vec$_out2[0],
                b1 = _vec$_out2[1];

            return Math.abs(a0 - b0) <= matrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= matrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
        }
    }, {
        key: 'value',

        /**
         * adapter for webgl matrix
         * get the array directly
         * @memberof vec2
         * @return {Array}
         */
        get: function get$$1() {
            return this._out;
        }
    }], [{
        key: 'random',

        /**
         * generate a random vector
         */
        value: function random() {
            var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

            scale = scale || 1.0;
            var vec = new vec2(),
                r = matrix.RANDOM() * 2.0 * Math.PI;
            ax = Math.cos(r) * scale;
            ay = Math.sin(r) * scale;
            return vec;
        }
    }]);
    return vec2;
}();

/**
 * make a package of matrix
 * 
 */
var glMatrix$1 = { vec2: vec2, vec3: vec3, vec4: vec4, mat3: mat3, mat4: mat4, quat: quat, matrix: matrix };

/**
 * base camera class
 * reference https://webgl2fundamentals.org/webgl/lessons/webgl-3d-camera.html
 * @author yellow date 2017/6/12
 */
/**
 * @class
 */

var Camera =
/**
 * 
 * @param {glMarix.mat4} _viewProjection
 * @memberof Camera
 */

/**
 * the projection matrix,build of perspective
 * @param {glMarix.mat4} _projection
 * @memberof Camera
 */
function Camera() {
  classCallCheck(this, Camera);
};

/**
 * an implement of PerspectiveCamera
 */
/**
 * @class
 */

var PerspectiveCamera = function (_Camera) {
  inherits(PerspectiveCamera, _Camera);

  /**
   * Creates an instance of PerspectiveCamera.
   * @param {number} fov Vertical field of view in degree
   * @param {number} aspect this w/h ratio
   * @param {number} near 
   * @param {number} far 
   * @memberof PerspectiveCamera
   */

  /**
   * near
   * @memberof PerspectiveCamera
   */

  /**
   * Vertical field of view in radians
   * @memberof PerspectiveCamera
   */
  function PerspectiveCamera(fov, aspect, near, far) {
    classCallCheck(this, PerspectiveCamera);

    var _this = possibleConstructorReturn(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this));

    _this._fovy = fov ? glMatrix$1.matrix.toRadian(fov) : glMatrix$1.matrix.toRadian(45);
    _this._aspect = aspect || 1;
    _this._near = near || 0.1;
    _this._far = far || 2000;
    _this._up = new glMatrix$1.vec3().set(0, 1, 0);
    _this._target = new glMatrix$1.vec3().set(0, 0, -1);
    _this._position = new glMatrix$1.vec3();
    _this._view = new glMatrix$1.mat4();
    _this._update();
    return _this;
  }
  /**
   * far
   * @memberof PerspectiveCamera
   */

  /**
   * aspect this w/h ratio
   * @memberof PerspectiveCamera
   */


  createClass(PerspectiveCamera, [{
    key: '_updatePorjection',

    /**
     * update the perspective matrix for gl.canvas changed
     * @memberof PerspectiveCamera
     */
    value: function _updatePorjection() {
      this._projection = new glMatrix$1.mat4.perspective(this._fovy, this._aspect, this._near, this._far);
    }
  }, {
    key: '_updateView',

    /**
     * update
     * 
     * 
     * @memberof PerspectiveCamera
     */
    value: function _updateView() {
      this._view.lookAt(this._position, this._target, this._up);
    }
  }, {
    key: '_updateViewProjection',
    value: function _updateViewProjection() {
      this._viewProjection = this._view.clone().multiply(this._projection);
      this._viewProjectionInvert = this._viewProjection.invert();
    }
  }, {
    key: '_update',

    /**
     * update all matrix
     * @memberof PerspectiveCamera
     */
    value: function _update() {
      this._updatePorjection();
      this._updateView();
      this._updatePorjection();
    }
  }, {
    key: 'rotateX',

    /**
     * 
     * 
     * @param {number} rad 
     * 
     * @memberof PerspectiveCamera
     */
    value: function rotateX(rad) {}
  }, {
    key: 'rotate',

    /**
     * 
     * 
     * @param {any} y 
     * 
     * @memberof PerspectiveCamera
     */
    value: function rotate(y) {}
  }, {
    key: 'rotate',

    /**
     * 
     * 
     * @param {any} z 
     * 
     * @memberof PerspectiveCamera
     */
    value: function rotate(z) {}
  }, {
    key: 'z',

    /**
     * set the distance to origin
     * @memberof PerspectiveCamera
     */
    set: function set$$1(z) {
      this._position.value[2] = z;
      this._updateView();
      this._updateViewProjection();
    }
  }, {
    key: 'viewProjection',
    get: function get$$1() {
      return this._viewProjection;
    }
  }]);
  return PerspectiveCamera;
}(Camera);

//use polyfill
/**
 * improt from namespace core
 */
//import EventNames from './core/EventNames';
/**
 * import from namespace renderer
 */

exports.Container = Container;
exports.PerspectiveCamera = PerspectiveCamera;
exports.RenderManager = RenderManager;
exports.RenderNode = RenderNode;
exports.ShaderFactory = ShaderFactory;
exports.GLFragmentShader = GLFragmentShader;
exports.GLVertexShader = GLVertexShader;
exports.Context = Context;
exports.GLVertexBuffer = GLVertexBuffer;
exports.GLIndexBuffer = GLIndexBuffer;

return exports;

}({}));
//# sourceMappingURL=bundle.js.map
