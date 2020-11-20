import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import react, { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classCallCheck from '@babel/runtime/helpers/classCallCheck';
import createClass from '@babel/runtime/helpers/createClass';
import possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import inherits from '@babel/runtime/helpers/inherits';
import _typeof from '@babel/runtime/helpers/typeof';
import objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _extends from '@babel/runtime/helpers/extends';
import isEqual from 'lodash/isEqual';
import Button from '../button';
import Switch from '../switch';
import Icon from '../icon';
import { preparePortal, trimList, addModalToStack, deleteModalFromStack, checkNoOpenModalInStack, toggleGlobalScroll, $, checkModalIndexInStack } from '../util';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

var reactEventListener_cjs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(classCallCheck);
var _createClass = _interopDefault(createClass);
var _possibleConstructorReturn = _interopDefault(possibleConstructorReturn);
var _getPrototypeOf = _interopDefault(getPrototypeOf);
var _inherits = _interopDefault(inherits);
var _typeof$1 = _interopDefault(_typeof);
var _objectWithoutProperties = _interopDefault(objectWithoutProperties);
var _extends$1 = _interopDefault(_extends);
var React = _interopDefault(react);
var PropTypes$1 = _interopDefault(PropTypes);
var warning = _interopDefault(warning_1);

function defineProperty(object, property, attr) {
  return Object.defineProperty(object, property, attr);
} // Passive options
// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js


var passiveOption = function () {
  var cache = null;
  return function () {
    if (cache !== null) {
      return cache;
    }

    var supportsPassiveOption = false;

    try {
      window.addEventListener('test', null, defineProperty({}, 'passive', {
        get: function get() {
          supportsPassiveOption = true;
        }
      }));
    } catch (err) {//
    }

    cache = supportsPassiveOption;
    return supportsPassiveOption;
  }();
}();

var defaultEventOptions = {
  capture: false,
  passive: false
};

function mergeDefaultEventOptions(options) {
  return _extends$1({}, defaultEventOptions, options);
}

function getEventListenerArgs(eventName, callback, options) {
  var args = [eventName, callback];
  args.push(passiveOption ? options : options.capture);
  return args;
}

function on(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function off(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function forEachListener(props, iteratee) {
  var children = props.children,
      target = props.target,
      eventProps = _objectWithoutProperties(props, ["children", "target"]);

  Object.keys(eventProps).forEach(function (name) {
    if (name.substring(0, 2) !== 'on') {
      return;
    }

    var prop = eventProps[name];

    var type = _typeof$1(prop);

    var isObject = type === 'object';
    var isFunction = type === 'function';

    if (!isObject && !isFunction) {
      return;
    }

    var capture = name.substr(-7).toLowerCase() === 'capture';
    var eventName = name.substring(2).toLowerCase();
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    if (isObject) {
      iteratee(eventName, prop.handler, prop.options);
    } else {
      iteratee(eventName, prop, mergeDefaultEventOptions({
        capture: capture
      }));
    }
  });
}

function withOptions(handler, options) {
  process.env.NODE_ENV !== "production" ? warning(options, 'react-event-listener: should be specified options in withOptions.') : void 0;
  return {
    handler: handler,
    options: mergeDefaultEventOptions(options)
  };
}

var EventListener =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(EventListener, _React$PureComponent);

  function EventListener() {
    _classCallCheck(this, EventListener);

    return _possibleConstructorReturn(this, _getPrototypeOf(EventListener).apply(this, arguments));
  }

  _createClass(EventListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyListeners(on);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.applyListeners(off, prevProps);
      this.applyListeners(on);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.applyListeners(off);
    }
  }, {
    key: "applyListeners",
    value: function applyListeners(onOrOff) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var target = props.target;

      if (target) {
        var element = target;

        if (typeof target === 'string') {
          element = window[target];
        }

        forEachListener(props, onOrOff.bind(null, element));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return EventListener;
}(React.PureComponent);

EventListener.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can provide a single child too.
   */
  children: PropTypes$1.node,

  /**
   * The DOM target to listen to.
   */
  target: PropTypes$1.oneOfType([PropTypes$1.object, PropTypes$1.string]).isRequired
} : {};

exports.withOptions = withOptions;
exports.default = EventListener;
});

var EventListener = unwrapExports(reactEventListener_cjs);
var reactEventListener_cjs_1 = reactEventListener_cjs.withOptions;

var _window = window,
    _window$I18N = _window.I18N,
    I18N = _window$I18N === void 0 ? {} : _window$I18N;
var MODAL_ROOT_ID = 'IBOT_MODAL_ROOT';
var MODAL_PORTAL_CLASS = 'ModalPortal';

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var $body = document.body;
var $modalRoot = document.getElementById(MODAL_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MODAL_ROOT_ID
});

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot);
}

var TYPE_CLASS_MAP = {
  alert: 'AlertModal',
  form: 'FormModal',
  functional: 'FunctionalModal',
  display: 'DisplayModal'
};

var Modal = /*#__PURE__*/function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  var _super = _createSuper(Modal);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen
    });

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($modalRoot, trimList([MODAL_PORTAL_CLASS, _this.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        isOpen: true
      }, _this.didOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.portal.classList.remove('is-open');
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      var willBeOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.isOpen;
      return willBeOpen ? _this.open() : _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "didOpen", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          portal = _assertThisInitialize.portal; // Store in the modal stack to monitor:


      addModalToStack(_assertThisInitialized(_this)); // Reassign Y position of the modal:

      _this.positionY();

      _this.focusOnInput(); // Transition:


      setTimeout(function () {
        return _this.portal.classList.add('is-open');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "didClose", function () {
      return setTimeout(function () {
        // Remove from the stack in the next round:
        deleteModalFromStack(_assertThisInitialized(_this));

        if (checkNoOpenModalInStack()) {
          toggleGlobalScroll(false);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTransitionEnd", function () {
      var isOpen = _this.portal.classList.contains('is-open');

      if (isOpen) {
        _this.props.onOpen();

        _this.props.onToggle(true);

        toggleGlobalScroll(true);
      } else {
        _this.setState({
          isOpen: false
        }, _this.didClose);

        _this.props.onClose();

        _this.props.onToggle(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onModalTransitionEnd", function (e) {
      var onModalTransitionEnd = _this.props.onModalTransitionEnd;
      stopPropagation(e);
      onModalTransitionEnd && onModalTransitionEnd(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      var _this$props = _this.props,
          onConfirm = _this$props.onConfirm,
          shouldCloseOnAction = _this$props.shouldCloseOnAction,
          isConfirmDisabled = _this$props.isConfirmDisabled;

      if (typeof onConfirm === 'function' && !isConfirmDisabled) {
        onConfirm();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      var _this$props2 = _this.props,
          onCancel = _this$props2.onCancel,
          shouldCloseOnAction = _this$props2.shouldCloseOnAction,
          isCancelDisabled = _this$props2.isCancelDisabled;

      if (typeof onCancel === 'function' && !isCancelDisabled) {
        onCancel();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "positionY", function () {
      return setTimeout(function () {
        var type = _this.props.type;
        var $modal = $('.Modal', _this.portal);
        if (!$modal || type === 'alert') return;
        var _window2 = window,
            vh = _window2.innerHeight;
        var h = $modal.offsetHeight;
        var action = vh <= h || (vh - h) / 2 < vh * .2 ? 'add' : 'remove';
        $modal.classList[action]('is-v-centered');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focusOnInput", function () {
      var $input = $('.content input', _this.portal);
      if ($input) $input.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (_ref) {
      var key = _ref.key,
          $elmt = _ref.target;
      var _this$props3 = _this.props,
          type = _this$props3.type,
          canClose = _this$props3.canClose,
          canCloseOnEsc = _this$props3.canCloseOnEsc,
          canConfirmOnEnter = _this$props3.canConfirmOnEnter,
          onConfirm = _this$props3.onConfirm;
      var isOpen = _this.state.isOpen;
      var isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open');

      if (key === 'Escape' // Not focus on form elements:
      && !$elmt.matches('input, textarea, select') && !isSelectMenuOpen // Current modal is open and can close via esc:
      && isOpen && canClose && canCloseOnEsc && !isSelectMenuOpen // Only work on the toppest modal:
      && checkModalIndexInStack(_assertThisInitialized(_this)) === 0) {
        _this.close();
      }

      if (key === 'Enter' // Not focus on form elements:
      && !$elmt.matches('textarea, button') && !isSelectMenuOpen // Current modal is open and can confirm via enter:
      && isOpen && canConfirmOnEnter // Only work on the toppest modal:
      && checkModalIndexInStack(_assertThisInitialized(_this)) === 0 // Only work whilst `onConfirm` callback is provided:
      && (!!onConfirm || type === 'alert')) {
        _this.onConfirm();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickMask", function (e) {
      stopPropagation(e);
      var _this$props4 = _this.props,
          canClose = _this$props4.canClose,
          canCloseOnClickMask = _this$props4.canCloseOnClickMask;
      var isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open');

      if (canClose && canCloseOnClickMask && !isSelectMenuOpen) {
        _this.close();
      }
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.state.isOpen;
      if (isOpen) this.didOpen();
      window.addEventListener('resize', this.positionY);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref2) {
      var wasOpen = _ref2.isOpen;
      var isOpen = this.state.isOpen;

      if (!wasOpen && isOpen) {
        this.open();
      } else if (wasOpen && !isOpen) {
        this.close();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      this.didClose();
      window.removeEventListener('resize', this.positionY);
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderOpener();
    }
  }, {
    key: "renderOpener",
    value: function renderOpener() {
      var _this$props5 = this.props,
          opener = _this$props5.opener,
          openerType = _this$props5.openerType;
      var isOpen = this.state.isOpen;
      var modal = this.renderModal();
      return openerType === 'none' ? modal : openerType === 'custom' ? opener ? /*#__PURE__*/jsxs("span", {
        onClick: this.toggle,
        children: [opener, modal]
      }) : modal : openerType === 'switch' ? /*#__PURE__*/jsx(Switch, {
        isChecked: isOpen,
        onChange: this.toggle,
        children: modal
      }) : /*#__PURE__*/jsxs(Button, {
        type: openerType,
        onClick: this.open,
        children: [opener, modal]
      });
    }
  }, {
    key: "renderModal",
    value: function renderModal() {
      var modal = this.props.modal;
      return modal || /*#__PURE__*/createPortal(this.renderModalDOM(), this.portal);
    }
  }, {
    key: "renderModalDOM",
    value: function renderModalDOM() {
      var _this$props6 = this.props,
          type = _this$props6.type,
          title = _this$props6.title,
          children = _this$props6.children,
          maskClassName = _this$props6.maskClassName,
          className = _this$props6.className,
          canClose = _this$props6.canClose,
          canCloseOnClickMask = _this$props6.canCloseOnClickMask,
          onCancel = _this$props6.onCancel,
          cancelText = _this$props6.cancelText,
          isCancelDisabled = _this$props6.isCancelDisabled,
          onConfirm = _this$props6.onConfirm,
          confirmText = _this$props6.confirmText,
          isConfirmDisabled = _this$props6.isConfirmDisabled;
      var isOpen = this.state.isOpen;
      var shouldRenderFooter = type === 'alert' && canClose || onCancel || onConfirm;
      return isOpen && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", {
          className: trimList(['ModalMask', maskClassName, canClose && canCloseOnClickMask ? 'can-close' : 'cant-close']),
          onClick: this.onClickMask,
          onTransitionEnd: this.onTransitionEnd
        }), /*#__PURE__*/jsxs("div", {
          className: trimList(['Modal', TYPE_CLASS_MAP[type], className]),
          onClick: stopPropagation,
          onTransitionEnd: this.onModalTransitionEnd,
          children: [/*#__PURE__*/jsxs("header", {
            children: [title, canClose && /*#__PURE__*/jsx("button", {
              className: "close-btn",
              onClick: this.close,
              children: /*#__PURE__*/jsx(Icon, {
                name: "times"
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "content",
            children: children
          }), shouldRenderFooter && /*#__PURE__*/jsxs("footer", {
            children: [onCancel && /*#__PURE__*/jsx("button", {
              className: "cancel-btn",
              onClick: this.onCancel,
              disabled: isCancelDisabled,
              children: cancelText
            }), (type === "alert" || onConfirm) && /*#__PURE__*/jsx("button", {
              className: "confirm-btn",
              onClick: this.onConfirm,
              disabled: isConfirmDisabled,
              children: confirmText
            })]
          })]
        }), /*#__PURE__*/jsx(EventListener, {
          target: document,
          onKeyDown: this.onKeyDown
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref3) {
      var prevProps = _ref3.prevProps;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isOpen: props.isOpen
        };
      }

      return null;
    }
  }]);

  return Modal;
}(PureComponent);

_defineProperty(Modal, "propTypes", {
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  children: PropTypes.node,
  modal: PropTypes.node,
  type: PropTypes.oneOf(['alert', 'form', 'functional', 'display']),
  opener: PropTypes.node,
  openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),
  className: PropTypes.string,
  maskClassName: PropTypes.string,
  portalClassName: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onToggle: PropTypes.func,
  onModalTransitionEnd: PropTypes.func,
  canClose: PropTypes.bool,
  canCloseOnClickMask: PropTypes.bool,
  shouldCloseOnAction: PropTypes.bool,
  canCloseOnEsc: PropTypes.bool,
  canConfirmOnEnter: PropTypes.bool,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  isConfirmDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  isCancelDisabled: PropTypes.bool,
  cancelText: PropTypes.string
});

_defineProperty(Modal, "defaultProps", {
  isOpen: false,
  type: 'functional',
  openerType: 'none',
  portalClassName: '',
  maskClassName: '',
  className: '',
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  },
  onModalTransitionEnd: function onModalTransitionEnd() {
    return null;
  },
  canClose: true,
  canCloseOnClickMask: true,
  canCloseOnEsc: true,
  shouldCloseOnAction: true,
  canConfirmOnEnter: true,
  cancelText: I18N.cancel || 'Cancel',
  confirmText: I18N.confirm || 'Confirm'
});

export default Modal;
