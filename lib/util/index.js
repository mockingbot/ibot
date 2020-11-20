import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import isBoolean from 'lodash/isBoolean';
import compact from 'lodash/compact';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { isValidElement } from 'react';

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
  return compact(list).join(' ');
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
  var is = isBoolean(expected) ? expected : $body.classList.toggle('is-content-fixed');

  if (isBoolean(expected)) {
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
  return isString(it) || isNumber(it) || /*#__PURE__*/isValidElement(it) ? it : it.label || it.value ? it.label || it.value : undefined;
}
function getOptionValue(it) {
  return isString(it) || isNumber(it) ? String(it) : it.value || it.label ? String(it.value || it.label) : undefined;
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
  return value !== '' && isNumber(Number(value)) ? Number(value) : '';
}

export { $, $$, EMAIL_REGEX, svg as SVG, addModalToStack, checkModalIndexInStack, checkNoOpenModalInStack, checkOptionByValue, checkOptionByValueList, convertValueListToSet, deleteModalFromStack, getOptionLabel, getOptionValue, getOtherProps, preparePortal, preventScrollingPropagation, setNumberValue, toggleGlobalScroll, trimList };
