import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsx } from 'react/jsx-runtime';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import { trimList } from '../util';

var Ellipsis = /*#__PURE__*/function (_PureComponent) {
  _inherits(Ellipsis, _PureComponent);

  var _super = _createSuper(Ellipsis);

  function Ellipsis() {
    var _this;

    _classCallCheck(this, Ellipsis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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

      var tooltipProps = _objectSpread({
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
        content: (withTooltip || isTruncated && !noTooltip) && /*#__PURE__*/jsx("div", _objectSpread({
          lang: lang,
          className: "EllipsisTip"
        }, contentProp)),
        html: html,
        children: children,
        setRef: this.set$ellipsis
      }, others);

      var tooltip = /*#__PURE__*/jsx(Tooltip, _objectSpread({}, tooltipProps));

      return withQuote || withPeriod || withComma || withQuestionMark ? /*#__PURE__*/jsx("span", {
        className: trimList(['Punctuation', withQuote && 'with-quote', withPeriod && 'with-period', withComma && 'with-comma', withQuestionMark && 'with-question-mark', truncationClassName]),
        children: tooltip
      }) : tooltip;
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
