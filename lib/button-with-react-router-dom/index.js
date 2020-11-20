import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsx, jsxs } from 'react/jsx-runtime';
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import omit from 'lodash/omit';
import Icon from '../icon';
import SVG from '../svg';
import { trimList } from '../util';

var TYPE_MAP = {
  primary: 'Primary',
  regular: 'Regular',
  secondary: 'Regular',
  tertiary: 'Tertiary',
  text: 'Text'
};

var Button = /*#__PURE__*/function (_PureComponent) {
  _inherits(Button, _PureComponent);

  var _super = _createSuper(Button);

  function Button() {
    _classCallCheck(this, Button);

    return _super.apply(this, arguments);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          iconType = _this$props.iconType,
          children = _this$props.children,
          html = _this$props.html,
          others = _objectWithoutProperties(_this$props, ["icon", "iconType", "children", "html"]);

      var name = this.name,
          className = this.className,
          isDisabled = this.isDisabled,
          isLoading = this.isLoading,
          to = this.to,
          href = this.href;
      var contentProp = html ? {
        dangerouslySetInnerHTML: {
          __html: html
        }
      } : {
        children: /*#__PURE__*/jsxs(Fragment, {
          children: [isLoading && /*#__PURE__*/jsx(SVG, {
            name: "loading"
          }), icon && (iconType === 'svg' ? /*#__PURE__*/jsx(SVG, {
            name: icon
          }) : /*#__PURE__*/jsx(Icon, {
            type: iconType,
            name: icon
          }, "icon")), children]
        })
      };

      var props = _objectSpread(_objectSpread({
        type: name === 'button' ? 'button' : undefined,
        className: className,
        to: to,
        href: href,
        disabled: isDisabled,
        onClick: function onClick(e) {
          return isDisabled && e.preventDefault();
        }
      }, omit(others, ['className', 'type', 'theme', 'isDisabled', 'disabled', 'isLoading', 'loading', 'to', 'nativeLink'])), contentProp);

      return /*#__PURE__*/React.createElement(name, props);
    }
  }, {
    key: "name",
    get: function get() {
      var _this$props2 = this.props,
          to = _this$props2.to,
          nativeLink = _this$props2.nativeLink;
      var isDisabled = this.isDisabled;
      return to && !isDisabled ? nativeLink ? 'a' : Link : 'button';
    }
  }, {
    key: "className",
    get: function get() {
      var _this$props3 = this.props,
          type = _this$props3.type,
          theme = _this$props3.theme,
          size = _this$props3.size,
          className = _this$props3.className;
      var isDisabled = this.isDisabled,
          isLoading = this.isLoading;
      return trimList(['Button', "".concat(TYPE_MAP[type]).concat(theme === 'core' ? 'CoreButton' : 'Button'), size !== 'regular' && size, isLoading && 'is-loading', isDisabled && 'is-disabled', className]);
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var _this$props4 = this.props,
          isDisabled = _this$props4.isDisabled,
          disabled = _this$props4.disabled;
      return isDisabled || disabled;
    }
  }, {
    key: "isLoading",
    get: function get() {
      var _this$props5 = this.props,
          isLoading = _this$props5.isLoading,
          loading = _this$props5.loading;
      return isLoading || loading;
    }
  }, {
    key: "to",
    get: function get() {
      var _this$props6 = this.props,
          to = _this$props6.to,
          nativeLink = _this$props6.nativeLink;
      var isDisabled = this.isDisabled;
      return isDisabled ? undefined : nativeLink ? undefined : to;
    }
  }, {
    key: "href",
    get: function get() {
      var _this$props7 = this.props,
          to = _this$props7.to,
          nativeLink = _this$props7.nativeLink;
      var isDisabled = this.isDisabled;
      return isDisabled ? undefined : nativeLink ? to : undefined;
    }
  }]);

  return Button;
}(PureComponent);

_defineProperty(Button, "propTypes", {
  type: PropTypes.oneOf(['primary', 'regular', 'secondary', 'tertiary', 'text']),
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  iconType: PropTypes.oneOf(['svg', 'dora', 'mb', 'icon', 'fa', 'md']),
  icon: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loading: PropTypes.bool,
  to: PropTypes.string,
  nativeLink: PropTypes.bool,
  children: PropTypes.any,
  html: PropTypes.string
});

_defineProperty(Button, "defaultProps", {
  type: 'regular',
  size: 'regular',
  theme: 'plain',
  icon: '',
  className: '',
  isDisabled: false,
  nativeLink: false
});

function CoreButton(props) {
  return /*#__PURE__*/jsx(Button, _objectSpread(_objectSpread({}, props), {}, {
    theme: "core"
  }));
}

function PrimaryCoreButton(props) {
  return /*#__PURE__*/jsx(CoreButton, _objectSpread(_objectSpread({}, props), {}, {
    type: "primary"
  }));
}
function TertiaryCoreButton(props) {
  return /*#__PURE__*/jsx(CoreButton, _objectSpread(_objectSpread({}, props), {}, {
    type: "tertiary"
  }));
}

export default Button;
export { PrimaryCoreButton, TertiaryCoreButton };
