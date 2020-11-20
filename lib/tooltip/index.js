import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import React, { isValidElement, Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { trimList, getOtherProps, $, SVG } from '../util';

var TYPE_ELEMENT_MAP = {
  inline: 'span',
  link: 'a',
  block: 'div'
};

var EVENT_NAME_LIST = ['hover', 'click'];
var TIP_ROOT_ID = 'IBOT_TOOLTIP_ROOT';
var $tipRoot = document.getElementById(TIP_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: TIP_ROOT_ID
});
var $body = document.body;

if (!$body.contains($tipRoot)) {
  $body.appendChild($tipRoot);
}

function parseContent(content) {
  var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hover';
  return isString(content) || isArray(content) || /*#__PURE__*/isValidElement(content) ? content : EVENT_NAME_LIST.includes(eventName) && isObject(content) ? content[eventName] || content.hover : null;
}

var Tooltip = /*#__PURE__*/function (_PureComponent) {
  _inherits(Tooltip, _PureComponent);

  var _super = _createSuper(Tooltip);

  function Tooltip() {
    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      isClicked: false,
      $text: null
    });

    _defineProperty(_assertThisInitialized(_this), "ref", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      _this.setState({
        isOpen: !!parseContent(_this.props.content, 'click'),
        isClicked: true
      });

      e.persist();

      _this.props.onClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      return Object.assign(_assertThisInitialized(_this), {
        hoverTimeout: setTimeout(function () {
          return _this.setState({
            isOpen: !!parseContent(_this.props.content, 'hover')
          }, _this.props.onMouseEnter);
        }, _this.props.delay)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      clearTimeout(_this.hoverTimeout);

      _this.setState({
        isOpen: false,
        isClicked: false
      }, _this.props.onMouseLeave);
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setRef(this.ref.current);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref) {
      var _this2 = this;

      var wasOpen = _ref.isOpen;
      var duration = this.props.duration;
      var isOpen = this.state.isOpen;

      if (duration > 0 && !wasOpen && isOpen) {
        this.timeout = setTimeout(function () {
          return _this2.setState({
            isOpen: false
          });
        }, duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      clearTimeout(this.hoverTimeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          theme = _this$props.theme,
          position = _this$props.position,
          inflexible = _this$props.inflexible,
          arrowed = _this$props.arrowed,
          className = _this$props.className,
          tipClassName = _this$props.tipClassName,
          content = _this$props.content,
          html = _this$props.html,
          children = _this$props.children;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isClicked = _this$state.isClicked;
      var klass = trimList(['Tooltip', className, isOpen ? 'is-open' : '', isClicked ? 'is-clicked' : '']);
      var eventName = isClicked ? 'click' : 'hover';
      return /*#__PURE__*/React.createElement( // Name:
      TYPE_ELEMENT_MAP[type], // Props:
      _objectSpread({
        ref: this.ref,
        className: klass,
        onMouseEnter: this.onMouseEnter,
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave
      }, getOtherProps(this.constructor, this.props)),
      /*#__PURE__*/
      // Children:
      jsxs(Fragment, {
        children: [html ? /*#__PURE__*/jsx("span", {
          dangerouslySetInnerHTML: {
            __html: html
          }
        }) : children, /*#__PURE__*/jsx(Tip, {
          $text: this.ref.current,
          isOpen: isOpen,
          className: tipClassName,
          eventName: eventName,
          theme: theme,
          position: position,
          inflexible: inflexible,
          arrowed: arrowed,
          children: parseContent(content, eventName)
        })]
      }));
    }
  }]);

  return Tooltip;
}(PureComponent);

_defineProperty(Tooltip, "propTypes", {
  type: PropTypes.oneOf(Object.keys(TYPE_ELEMENT_MAP)).isRequired,
  theme: PropTypes.oneOf(['core', 'plain']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  arrowed: PropTypes.bool,
  inflexible: PropTypes.bool,
  className: PropTypes.string,
  tipClassName: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.shape(EVENT_NAME_LIST.reduce(function (res, n) {
    return Object.assign(res, _defineProperty({}, n, PropTypes.node));
  }, {}))]),
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  html: PropTypes.string,
  setRef: PropTypes.func
});

_defineProperty(Tooltip, "defaultProps", {
  type: 'inline',
  theme: 'plain',
  position: 'right',
  arrowed: true,
  inflexible: false,
  delay: 200,
  className: '',
  tipClassName: '',
  setRef: function setRef() {
    return null;
  },
  onClick: function onClick() {
    return null;
  }
});

var Tip = /*#__PURE__*/function (_PureComponent2) {
  _inherits(Tip, _PureComponent2);

  var _super2 = _createSuper(Tip);

  function Tip() {
    var _this3;

    _classCallCheck(this, Tip);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "state", {
      prevProps: _this3.props,
      isOpen: _this3.props.isOpen,
      position: _this3.props.position
    });

    _defineProperty(_assertThisInitialized(_this3), "ref", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this3), "position", function () {
      var _this3$props = _this3.props,
          $text = _this3$props.$text,
          position = _this3$props.position,
          inflexible = _this3$props.inflexible;

      var _assertThisInitialize = _assertThisInitialized(_this3),
          $tipBase = _assertThisInitialize.$tipBase,
          $tip = _assertThisInitialize.$tip;

      if (!$text || !$tipBase || !$tip) return;
      var flexible = !inflexible;
      var minX = 10,
          minY = 10;
      var maxX = window.innerWidth - 10,
          maxY = window.innerHeight - 10;

      var _$text$getBoundingCli = $text.getBoundingClientRect(),
          top = _$text$getBoundingCli.top,
          right = _$text$getBoundingCli.right,
          bottom = _$text$getBoundingCli.bottom,
          left = _$text$getBoundingCli.left;

      var wOf$text = $text.offsetWidth,
          hOf$text = $text.offsetHeight;
      var wOf$tip = $tip.offsetWidth,
          hOf$tip = $tip.offsetHeight;
      var midXOf$text = left + wOf$text / 2;
      var midYOf$text = top + hOf$text / 2;
      var baseStyle = {};
      var tipStyle = {};

      var setStyleForBase = function setStyleForBase(src) {
        return Object.assign(baseStyle, src);
      };

      var setStyleForTip = function setStyleForTip(src) {
        return Object.assign(tipStyle, src);
      };

      setStyleForBase({
        top: "".concat(top, "px"),
        left: "".concat(left, "px"),
        width: "".concat(wOf$text, "px"),
        height: "".concat(hOf$text, "px")
      }); // Main-axis position adjustment:

      if (flexible) {
        if (position === 'top' && top - hOf$tip < minY) {
          _this3.setState({
            position: 'bottom'
          });
        } else if (position === 'bottom' && bottom + hOf$tip > maxY) {
          _this3.setState({
            position: 'top'
          });
        } else if (position === 'left' && left - wOf$tip < minX) {
          _this3.setState({
            position: 'right'
          });
        } else if (position === 'right' && right + wOf$tip > maxX) {
          _this3.setState({
            position: 'left'
          });
        }
      } // Cross-axis position adjustment:


      switch (position) {
        case 'top':
        case 'bottom':
          {
            var most = (wOf$tip - 18) / 2 + 6;
            var adjustment = // No enough space to the left:
            midXOf$text - wOf$tip / 2 < 10 ? Math.min(wOf$tip / 2 - midXOf$text - 6, most) // No enough space to the right:
            : midXOf$text + wOf$tip / 2 > maxX ? Math.max(-(wOf$tip / 2 - (maxX + 10 - midXOf$text)) + 6, -most) : 0;

            if (adjustment !== 0) {
              setStyleForTip({
                transform: "translateX(".concat(adjustment, "px)")
              });
            }

            break;
          }

        case 'left':
        case 'right':
          {
            var _most = (hOf$tip - 18) / 2 - 6;

            var _adjustment = hOf$tip > 50 && ( // No enough space to the top:
            midYOf$text - 5 <= maxY / 2 && midYOf$text - hOf$tip / 2 < 10 ? Math.min(hOf$tip / 2 - midYOf$text - 6, _most) // No enough space to the bottom:
            : midYOf$text - 5 > maxY / 2 && midYOf$text + hOf$tip / 2 > maxY ? Math.max(-(hOf$tip / 2 - (maxY + 10 - midYOf$text)), -_most) : 0);

            if (_adjustment !== 0) {
              setStyleForTip({
                transform: "translateY(".concat(_adjustment, "px)")
              });
            }

            break;
          }
      }

      Object.assign($tipBase.style, baseStyle);
      Object.assign($('.content', $tip).style, tipStyle);
      $tip.classList.add('is-open');
    });

    _defineProperty(_assertThisInitialized(_this3), "onTransitionEnd", function () {
      var isOpen = _this3.props.isOpen;

      if (isOpen) {
        _this3.$tip.classList.add('is-open');
      } else {
        _this3.setState({
          isOpen: false
        });
      }
    });

    return _this3;
  }

  _createClass(Tip, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var wasOpen = _ref2.isOpen;
      var isOpen = this.props.isOpen;

      if (!wasOpen && isOpen) {
        this.position();
      } else if (wasOpen && !isOpen) {
        if (this.$tip) {
          this.$tip.classList.remove('is-open');
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/createPortal(this.tip, $tipRoot);
    }
  }, {
    key: "$tipBase",
    get: function get() {
      return this.ref.current;
    }
  }, {
    key: "$tip",
    get: function get() {
      return this.$tipBase && $('.Tip', this.$tipBase);
    }
  }, {
    key: "tip",
    get: function get() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          theme = _this$props2.theme,
          inflexible = _this$props2.inflexible,
          arrowed = _this$props2.arrowed,
          children = _this$props2.children;
      var _this$state2 = this.state,
          isOpen = _this$state2.isOpen,
          position = _this$state2.position;
      var klass = trimList([theme === 'core' ? 'Tip CoreTip' : 'Tip', className, "on-".concat(position), inflexible && 'inflexible', arrowed && 'arrowed']);
      return isOpen && /*#__PURE__*/jsx("div", {
        className: "TipBase",
        ref: this.ref,
        children: /*#__PURE__*/jsxs("div", {
          className: klass,
          onTransitionEnd: this.onTransitionEnd,
          children: [arrowed && /*#__PURE__*/jsx("div", {
            className: "arrow",
            dangerouslySetInnerHTML: {
              __html: SVG.DROPDOWN_ARROW
            }
          }), /*#__PURE__*/jsx("div", {
            className: "content",
            children: children
          })]
        })
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref3) {
      var prevProps = _ref3.prevProps;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isOpen: props.isOpen,
          position: props.position
        };
      }

      return null;
    }
  }]);

  return Tip;
}(PureComponent);

_defineProperty(Tip, "propTypes", {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  eventName: PropTypes.oneOf(EVENT_NAME_LIST),
  $text: PropTypes.instanceOf(Element),
  theme: PropTypes.oneOf(['plain', 'core']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  inflexible: PropTypes.bool,
  arrowed: PropTypes.bool,
  children: PropTypes.node
});

export default Tooltip;
