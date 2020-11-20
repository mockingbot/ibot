import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import Button, { PrimaryCoreButton, TertiaryCoreButton } from '../button';
import Switch from '../switch';
import SVG from '../svg';
import { preparePortal, trimList, addModalToStack, toggleGlobalScroll, deleteModalFromStack, checkNoOpenModalInStack } from '../util';

var OVERLAY_ROOT_ID = 'IBOT_OVERLAY_ROOT';
var OVERLAY_PORTAL_CLASS = 'OverlayPortal';

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var $body = document.body;
var $overlayRoot = document.getElementById(OVERLAY_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: OVERLAY_ROOT_ID
});

if (!$body.contains($overlayRoot)) {
  $body.appendChild($overlayRoot);
}

var Overlay = /*#__PURE__*/function (_PureComponent) {
  _inherits(Overlay, _PureComponent);

  var _super = _createSuper(Overlay);

  function Overlay() {
    var _this;

    _classCallCheck(this, Overlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      isVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($overlayRoot, trimList([OVERLAY_PORTAL_CLASS, _this.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "didOpen", function () {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onToggle = _this$props.onToggle;

      var _assertThisInitialize = _assertThisInitialized(_this),
          portal = _assertThisInitialize.portal; // Store in the modal stack to monitor:


      addModalToStack(_assertThisInitialized(_this));
      onOpen();
      onToggle(true);
      toggleGlobalScroll(true);
    });

    _defineProperty(_assertThisInitialized(_this), "didClose", function () {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          onToggle = _this$props2.onToggle;
      onClose();
      onToggle(false);
      setTimeout(function () {
        // Remove from the stack in the next round:
        deleteModalFromStack(_assertThisInitialized(_this));

        if (checkNoOpenModalInStack()) {
          toggleGlobalScroll(false);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      var willBeOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.isOpen;
      return willBeOpen ? _this.open() : _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "confirm", function () {
      var onConfirm = _this.props.onConfirm;
      onConfirm();

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "cancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "onTransitionEnd", function (_ref) {
      var target = _ref.target;
      var isVisible = _this.state.isVisible;

      if (!isVisible && target.matches('.OverlayMask')) {
        _this.setState({
          isOpen: false
        });
      }
    });

    return _this;
  }

  _createClass(Overlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props3 = this.props,
          onOpen = _this$props3.onOpen,
          onToggle = _this$props3.onToggle;
      var isOpen = this.state.isOpen;

      if (isOpen) {
        setTimeout(function () {
          return _this2.setState({
            isVisible: true
          }, _this2.didOpen);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref2) {
      var _this3 = this;

      var wasOpen = _ref2.isOpen;
      var _this$props4 = this.props,
          onOpen = _this$props4.onOpen,
          onClose = _this$props4.onClose,
          onToggle = _this$props4.onToggle;
      var isOpen = this.state.isOpen;

      if (!wasOpen && isOpen) {
        setTimeout(function () {
          return _this3.setState({
            isVisible: true
          }, _this3.didOpen);
        });
      } else if (wasOpen && !isOpen) {
        this.didClose();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      this.didClose();
    }
  }, {
    key: "render",
    value: function render() {
      return this.opener;
    }
  }, {
    key: "opener",
    get: function get() {
      var _this$props5 = this.props,
          opener = _this$props5.opener,
          openerType = _this$props5.openerType;
      var isOpen = this.state.isOpen;
      var overlay = /*#__PURE__*/createPortal(this.overlay, this.portal);
      return openerType === 'none' ? overlay : openerType === 'custom' ? opener ? /*#__PURE__*/jsxs("span", {
        onClick: this.open,
        children: [opener, overlay]
      }) : overlay : openerType === 'switch' ? /*#__PURE__*/jsx(Switch, {
        isChecked: isOpen,
        onChange: this.toggle,
        children: overlay
      }) : /*#__PURE__*/jsxs(Button, {
        type: openerType,
        onClick: this.open,
        children: [opener, overlay]
      });
    }
  }, {
    key: "overlay",
    get: function get() {
      var _this$props6 = this.props,
          maskClassName = _this$props6.maskClassName,
          className = _this$props6.className,
          title = _this$props6.title,
          children = _this$props6.children,
          canClose = _this$props6.canClose,
          canConfirm = _this$props6.canConfirm,
          canCancel = _this$props6.canCancel,
          onConfirm = _this$props6.onConfirm,
          onCancel = _this$props6.onCancel,
          confirmText = _this$props6.confirmText,
          cancelText = _this$props6.cancelText;
      var _this$state = this.state,
          isVisible = _this$state.isVisible,
          isOpen = _this$state.isOpen;
      var shouldShowFooter = onConfirm || onCancel;
      return isOpen && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", {
          className: trimList(['OverlayMask', isVisible && 'is-open', maskClassName]),
          onTransitionEnd: this.onTransitionEnd,
          onClick: stopPropagation
        }), canClose && /*#__PURE__*/jsx(Button, {
          type: "text",
          className: "OverlayCloseButton",
          onClick: this.close,
          children: /*#__PURE__*/jsx(SVG, {
            name: "close",
            label: "Close the Overlay"
          })
        }), /*#__PURE__*/jsxs("div", {
          className: trimList(['Overlay', className]),
          children: [title && /*#__PURE__*/jsx("h1", {
            children: title
          }), children, shouldShowFooter && /*#__PURE__*/jsxs("footer", {
            children: [onConfirm && /*#__PURE__*/jsx(PrimaryCoreButton, {
              onClick: this.confirm,
              isDisabled: !canConfirm,
              children: confirmText
            }), onCancel && /*#__PURE__*/jsx(TertiaryCoreButton, {
              onClick: this.cancel,
              isDisabled: !canCancel,
              children: cancelText
            })]
          })]
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref3) {
      var prevProps = _ref3.prevProps,
          isOpen = _ref3.isOpen;

      if (!isEqual(prevProps, props)) {
        var willBeOpen = props.isOpen;

        if (isBoolean(willBeOpen)) {
          if (!isOpen && willBeOpen) {
            return {
              isOpen: true,
              prevProps: props
            };
          } else if (isOpen && !willBeOpen) {
            return {
              isVisible: false,
              prevProps: props
            };
          }
        }

        return {
          prevProps: props
        };
      }

      return null;
    }
  }]);

  return Overlay;
}(PureComponent);

_defineProperty(Overlay, "propTypes", {
  isOpen: PropTypes.bool,
  openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),
  portalClassName: PropTypes.string,
  maskClassName: PropTypes.string,
  className: PropTypes.string,
  canClose: PropTypes.bool,
  canConfirm: PropTypes.bool,
  canCancel: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node
});

_defineProperty(Overlay, "defaultProps", {
  openerType: 'none',
  canClose: true,
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  },
  confirmText: 'Confirm',
  cancelText: 'Cancel'
});

export default Overlay;
