import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { trimList } from '../util';

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

/**
 * <FormEntry>
 */

function FormEntry(_ref) {
  var className = _ref.className,
      key = _ref.name,
      val = _ref.children,
      type = _ref.type,
      isLabel = _ref.isLabel,
      isRequired = _ref.isRequired;
  return React.createElement(isLabel ? 'label' : 'div', {
    className: trimList(['FormEntry', className]),
    type: type
  }, React.createElement(Fragment, null, key && React.createElement("span", {
    className: "FormEntry-Key key"
  }, key, isRequired && React.createElement("span", {
    className: "required-sign"
  }, "*")), React.createElement("span", {
    className: "FormEntry-Val val"
  }, val)));
}
FormEntry.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.any,
  type: PropTypes.string,
  isLabel: PropTypes.bool,
  isRequired: PropTypes.bool
};
FormEntry.defaultProps = {
  className: '',
  isLabel: false
};
/**
 * <FormLabel>
 */

function FormLabel(props) {
  return React.createElement(FormEntry, _extends({}, props, {
    isLabel: true
  }));
}

export default FormEntry;
export { FormLabel };
