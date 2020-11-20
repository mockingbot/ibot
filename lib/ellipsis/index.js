import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import { trimList } from '../util';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Ellipsis =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Ellipsis, _PureComponent);

  function Ellipsis() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Ellipsis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Ellipsis)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isTruncated: false,
      isDetected: false
    });

    _defineProperty(_assertThisInitialized(_this), "set$ellipsis", function ($ellipsis) {
      return Object.assign(_assertThisInitialized(_this), {
        $ellipsis: $ellipsis
      });
    });

    _defineProperty(_assertThisInitialized(_this), "detectTruncation", function () {
      var $e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.$ellipsis;
      return $e.offsetWidth < $e.scrollWidth;
    });

    return _this;
  }

  _createClass(Ellipsis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      return this.setState({
        isDetected: true,
        isTruncated: this.detectTruncation()
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var prevChildren = _ref.children,
          prevHTML = _ref.html;
      var _this$props = this.props,
          children = _this$props.children,
          html = _this$props.html;
      var isDetected = this.state.isDetected;

      if (prevChildren !== children || prevHTML !== html) {
        return this.setState({
          isDetected: false
        });
      }

      if (!isDetected) {
        return this.setState({
          isDetected: true,
          isTruncated: this.detectTruncation()
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          to = _this$props2.to,
          type = _this$props2.type,
          max = _this$props2.max,
          display = _this$props2.display,
          lang = _this$props2.lang,
          theme = _this$props2.theme,
          noTooltip = _this$props2.noTooltip,
          withTooltip = _this$props2.withTooltip,
          withQuote = _this$props2.withQuote,
          withPeriod = _this$props2.withPeriod,
          withComma = _this$props2.withComma,
          withQuestionMark = _this$props2.withQuestionMark,
          children = _this$props2.children,
          html = _this$props2.html,
          others = _objectWithoutProperties(_this$props2, ["className", "to", "type", "max", "display", "lang", "theme", "noTooltip", "withTooltip", "withQuote", "withPeriod", "withComma", "withQuestionMark", "children", "html"]);

      var _this$state = this.state,
          isTruncated = _this$state.isTruncated,
          isDetected = _this$state.isDetected;
      var contentProp = html ? {
        dangerouslySetInnerHTML: {
          __html: html
        }
      } : {
        children: children
      };
      var truncationClassName = isDetected && (isTruncated ? 'is-truncated' : 'isnt-truncated');

      var tooltipProps = _objectSpread2({
        type: to ? 'link' : 'inline',
        theme: theme,
        className: trimList(['Ellipsis', truncationClassName, className]),
        href: to,
        'data-type': type,
        'data-max': max,
        style: {
          display: display,
          maxWidth: isFinite(max) ? "".concat(max, "em") : max
        },
        content: (withTooltip || isTruncated && !noTooltip) && React.createElement("div", _extends({
          lang: lang,
          className: "EllipsisTip"
        }, contentProp)),
        html: html,
        children: children,
        setRef: this.set$ellipsis
      }, others);

      var tooltip = React.createElement(Tooltip, tooltipProps);
      return withQuote || withPeriod || withComma || withQuestionMark ? React.createElement("span", {
        className: trimList(['Punctuation', withQuote && 'with-quote', withPeriod && 'with-period', withComma && 'with-comma', withQuestionMark && 'with-question-mark', truncationClassName])
      }, tooltip) : tooltip;
    }
  }]);

  return Ellipsis;
}(PureComponent);

_defineProperty(Ellipsis, "propTypes", {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['core', 'plain']),
  type: PropTypes.oneOf(['user', 'id', 'email', 'org', 'team', 'app', 'widget']),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(['inline-block', 'block']),
  lang: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
  html: PropTypes.string,
  noTooltip: PropTypes.bool,
  withTooltip: PropTypes.bool,
  withQuote: PropTypes.bool,
  withComma: PropTypes.bool,
  withPeriod: PropTypes.bool,
  withQuestionMark: PropTypes.bool
});

_defineProperty(Ellipsis, "defaultProps", {
  lang: 'en',
  theme: 'core'
});

export default Ellipsis;
