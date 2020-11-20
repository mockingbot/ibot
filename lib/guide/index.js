import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsx, jsxs } from 'react/jsx-runtime';
import { isValidElement, cloneElement, Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';
import isEqual from 'lodash/isEqual';
import Button from '../button';
import Icon from '../icon';
import { preparePortal, trimList, SVG } from '../util';
import { positionMenu } from '../dropdown';

var _window = window,
    _window$I18N = _window.I18N,
    I18N = _window$I18N === void 0 ? {} : _window$I18N;
var GUIDE_ROOT_ID = 'IBOT_GUIDE_GUIDE_ROOT';
var $guideRoot = document.getElementById(GUIDE_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: GUIDE_ROOT_ID
});
var $body = document.body;

if (!$body.contains($guideRoot)) {
  $body.appendChild($guideRoot);
}

var GuideBase = /*#__PURE__*/function (_PureComponent) {
  _inherits(GuideBase, _PureComponent);

  var _super = _createSuper(GuideBase);

  function GuideBase() {
    var _this;

    _classCallCheck(this, GuideBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      isDownward: _this.props.Y === 'bottom'
    });

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($guideRoot, 'GuidePortal'));

    _defineProperty(_assertThisInitialized(_this), "position", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          $base = _assertThisInitialize.$base,
          $guide = _assertThisInitialize.$guide;

      var _this$props = _this.props,
          X = _this$props.X,
          Y = _this$props.Y,
          inflexible = _this$props.inflexible;

      var _positionMenu = positionMenu({
        $menuBase: $guide,
        $opener: $base,
        menuX: X,
        menuY: Y,
        inflexible: inflexible
      }),
          isDownward = _positionMenu.isDownward;

      _this.setState({
        isDownward: isDownward
      });
    });

    _defineProperty(_assertThisInitialized(_this), "set$base", function ($base) {
      return Object.assign(_assertThisInitialized(_this), {
        $base: $base
      });
    });

    _defineProperty(_assertThisInitialized(_this), "set$guide", function ($guide) {
      return Object.assign(_assertThisInitialized(_this), {
        $guide: $guide
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isOpen: false
      }, _this.props.onClose);
    });

    _defineProperty(_assertThisInitialized(_this), "onScrollOutside", _this.position);

    return _this;
  }

  _createClass(GuideBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.state.isOpen;
      if (isOpen) this.position();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref) {
      var wasOpen = _ref.isOpen;
      var isOpen = this.state.isOpen;

      if (!wasOpen && isOpen) {
        this.position();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$children = this.props.children,
          children = _this$props$children === void 0 ? null : _this$props$children;
      var base = /*#__PURE__*/isValidElement(children) ? /*#__PURE__*/cloneElement(children, {
        ref: this.set$base
      }) : /*#__PURE__*/jsx("span", {
        ref: this.set$base,
        children: children
      });
      var guide = /*#__PURE__*/createPortal(this.renderGuide(), this.portal);
      return /*#__PURE__*/jsxs(Fragment, {
        children: [base, guide]
      });
    }
  }, {
    key: "renderGuide",
    value: function renderGuide() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          noCloseBtn = _this$props2.noCloseBtn,
          X = _this$props2.X,
          header = _this$props2.header,
          gotItText = _this$props2.gotItText,
          gotItBtn = _this$props2.gotItBtn,
          guide = _this$props2.guide;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isDownward = _this$state.isDownward;
      var klass = trimList(['Guide', isOpen && 'is-open', isDownward ? 'is-downward' : 'is-upward', "x-".concat(X), className]);
      return /*#__PURE__*/jsx("div", {
        className: "GuideBase",
        ref: this.set$guide,
        children: /*#__PURE__*/jsxs("div", {
          className: klass,
          children: [/*#__PURE__*/jsx("span", {
            className: "arrow",
            dangerouslySetInnerHTML: {
              __html: SVG.GUIDE_ARROW
            }
          }), /*#__PURE__*/jsxs("div", {
            className: "content",
            children: [header && /*#__PURE__*/jsx("header", {
              children: header
            }), !noCloseBtn && /*#__PURE__*/jsx("button", {
              className: "close-btn",
              onClick: this.close,
              children: /*#__PURE__*/jsx(Icon, {
                name: "times_fc",
                type: "dora"
              })
            }), guide, gotItBtn && /*#__PURE__*/jsx("footer", {
              children: /*#__PURE__*/jsx(Button, {
                type: "text",
                onClick: this.close,
                children: gotItText
              })
            })]
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onScroll: withOptions(this.onScrollOutside, {
              capture: true
            })
          })]
        })
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          isOpen = _ref2.isOpen;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isOpen: props.isOpen
        };
      }

      return null;
    }
  }]);

  return GuideBase;
}(PureComponent);

_defineProperty(GuideBase, "propTypes", {
  isOpen: PropTypes.bool,
  header: PropTypes.any,
  noCloseBtn: PropTypes.bool,
  gotItBtn: PropTypes.bool,
  onClose: PropTypes.func,
  gotItText: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  guide: PropTypes.any,
  X: PropTypes.oneOf(['left', 'center', 'right']),
  Y: PropTypes.oneOf(['top', 'bottom']),
  inflexible: PropTypes.bool
});

_defineProperty(GuideBase, "defaultProps", {
  isOpen: false,
  noCloseBtn: false,
  iKonwBtn: false,
  onClose: function onClose() {
    return null;
  },
  gotItText: I18N.iknow || 'Got it!',
  X: 'left',
  Y: 'bottom',
  inflexible: false
});

export default GuideBase;
