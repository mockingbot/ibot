import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsx } from 'react/jsx-runtime';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

var Root = /*#__PURE__*/function (_PureComponent) {
  _inherits(Root, _PureComponent);

  var _super = _createSuper(Root);

  function Root() {
    _classCallCheck(this, Root);

    return _super.apply(this, arguments);
  }

  _createClass(Root, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/jsx("div", {
        className: "iBotRoot ContentRoot",
        children: this.props.children
      });
    }
  }]);

  return Root;
}(PureComponent);

_defineProperty(Root, "propTypes", {
  children: PropTypes.node
});

_defineProperty(Root, "defaultProps", {
  children: null
});

export default Root;
