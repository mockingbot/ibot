import { isValidElement } from 'react';

function _defineProperty(obj, key, value) {
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
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike_1(value) && _baseGetTag(value) == boolTag);
}

var isBoolean_1 = isBoolean;

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var compact_1 = compact;

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike_1(value) && _baseGetTag(value) == numberTag);
}

var isNumber_1 = isNumber;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
}

var isString_1 = isString;

/**
 * Element.fn.matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (selector) {
    var matches = document.querySelectorAll(selector);
    var i = matches.length;

    while (--i >= 0 && matches.item(i) !== this) {}

    return i > -1;
  };
}
/**
 * Node.fn.remove
 *
 * from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
 */


void [Node.prototype, Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (item) {
  if (item.hasOwnProperty('remove')) {
    return;
  }

  item.remove = function () {
    if (this.parentNode !== null) {
      this.parentNode.removeChild(this);
    }
  };
});
/**
 * Element.fn.closest
 */

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = document.querySelectorAll(s);
    var el = this;
    var i;

    do {
      i = matches.length;

      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));

    return el;
  };
}

var INPUT_ARROW = "<svg width=\"6\" height=\"4\" viewBox=\"0 0 6 4\"><path d=\"M3 0l3 4H0\"></path></svg>";
var DROPDOWN_ARROW = "<svg viewBox=\"0 0 8 3\"><path d=\"M4.654.233L8 3H0L3.383.23c.37-.303.902-.302 1.27.003z\" /></svg>";
var GUIDE_ARROW = "<svg width=\"27\" height=\"8\"><path d=\"M15.069 6.66a3.27 3.27 0 0 1-3.13 0L0 0h27.008l-11.94 6.66z\" /></svg>";
var CLOSE_FILLED = "<svg width=\"16\" height=\"16\"><path d=\"M8 6.945L6.218 5.163a.688.688 0 0 0-.973.972l1.783 1.782L5.245 9.7a.688.688 0 0 0 .973.972L8 8.89l1.782 1.782a.688.688 0 0 0 .973-.972L8.972 7.917l1.783-1.782a.688.688 0 0 0-.973-.972L8 6.945zm-5.185 6.24a7.333 7.333 0 1 1 10.37-10.37 7.333 7.333 0 0 1-10.37 10.37z\"/></svg>";

var svg = /*#__PURE__*/Object.freeze({
  __proto__: null,
  INPUT_ARROW: INPUT_ARROW,
  DROPDOWN_ARROW: DROPDOWN_ARROW,
  GUIDE_ARROW: GUIDE_ARROW,
  CLOSE_FILLED: CLOSE_FILLED
});

var EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9-]{2,63}$/i;
var IBOT = {
  OPEN_MODAL_STACK: []
};
function checkModalIndexInStack(modal) {
  return IBOT.OPEN_MODAL_STACK.indexOf(modal);
}
function checkNoOpenModalInStack() {
  var OPEN_MODAL_STACK = IBOT.OPEN_MODAL_STACK;
  return OPEN_MODAL_STACK.length === 0 || OPEN_MODAL_STACK.every(function (modal) {
    return !modal.state.isOpen;
  });
}
function addModalToStack(modal) {
  return Object.assign(IBOT, {
    OPEN_MODAL_STACK: [modal].concat(_toConsumableArray(IBOT.OPEN_MODAL_STACK))
  });
}
function deleteModalFromStack(modal) {
  return Object.assign(IBOT, {
    OPEN_MODAL_STACK: IBOT.OPEN_MODAL_STACK.filter(function (it) {
      return it !== modal;
    })
  });
}
function trimList(list) {
  return compact_1(list).join(' ');
}
function getOtherProps(_ref, props) {
  var _ref$propTypes = _ref.propTypes,
      propTypes = _ref$propTypes === void 0 ? {} : _ref$propTypes;
  var propKeyList = Object.keys(propTypes);
  return Object.entries(props).reduce(function (result, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        val = _ref3[1];

    return !propKeyList.includes(key) ? Object.assign(result, _defineProperty({}, key, val)) : result;
  }, {});
}
function $(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return context.querySelector(selector);
}
function $$(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(context.querySelectorAll(selector));
}
function preparePortal($root, className) {
  var $portal = Object.assign(document.createElement('div'), {
    className: className
  });
  $root.appendChild($portal);
  return $portal;
}
function preventScrollingPropagation($elmt) {
  if (!$elmt || !($elmt instanceof Element)) return;
  $elmt.addEventListener('wheel', function (e) {
    var scrollTop = $elmt.scrollTop,
        scrollHeight = $elmt.scrollHeight;

    var _$elmt$getBoundingCli = $elmt.getBoundingClientRect(),
        height = _$elmt$getBoundingCli.height;

    var delta = e.deltaY * -1;
    var isUp = delta > 0;

    var prevent = function prevent() {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }; // Scrolling down, but this will take us past the bottom.


    if (!isUp && -delta > scrollHeight - height - scrollTop) {
      $elmt.scrollTop = scrollHeight;
      return prevent(); // Scrolling up, but this will take us past the top.
    } else if (isUp && delta > scrollTop) {
      $elmt.scrollTop = 0;
      return prevent();
    }
  });
}
function toggleGlobalScroll(expected) {
  var $root = document.documentElement;
  var $body = document.body;
  var $content = $('.ContentRoot');
  var _window = window,
      vw = _window.innerWidth,
      scrollX = _window.scrollX,
      scrollY = _window.scrollY;
  var is = isBoolean_1(expected) ? expected : $body.classList.toggle('is-content-fixed');

  if (isBoolean_1(expected)) {
    $body.classList[expected ? 'add' : 'remove']('is-content-fixed');
  }

  if (!$content) return is;

  if (is) {
    $content.style.left = "-".concat(scrollX, "px");
    $content.style.top = "-".concat(scrollY, "px");
    window.scrollTo(Math.max(($root.scrollWidth - vw) / 2, 0), 0);
  } else {
    window.scrollTo(Math.abs(parseInt($content.style.left, 10)), Math.abs(parseInt($content.style.top, 10)));
  }

  return is;
}
function getOptionLabel(it) {
  return isString_1(it) || isNumber_1(it) || /*#__PURE__*/isValidElement(it) ? it : it.label || it.value ? it.label || it.value : undefined;
}
function getOptionValue(it) {
  return isString_1(it) || isNumber_1(it) ? String(it) : it.value || it.label ? String(it.value || it.label) : undefined;
}
function convertValueListToSet(valueList) {
  return new Set(Array.from(valueList || []).map(String));
}
function checkOptionByValue(it, value) {
  return !!value && getOptionValue(it) === String(value);
}
function checkOptionByValueList(it, valueList) {
  return convertValueListToSet(valueList).has(getOptionValue(it));
}
function setNumberValue(value) {
  return value !== '' && isNumber_1(Number(value)) ? Number(value) : '';
}

export { $, $$, EMAIL_REGEX, svg as SVG, addModalToStack, checkModalIndexInStack, checkNoOpenModalInStack, checkOptionByValue, checkOptionByValueList, convertValueListToSet, deleteModalFromStack, getOptionLabel, getOptionValue, getOtherProps, preparePortal, preventScrollingPropagation, setNumberValue, toggleGlobalScroll, trimList };
