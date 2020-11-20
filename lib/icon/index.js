import React from 'react';
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

var duoList = [
	{
		id: "save",
		layer: [
			"arrow",
			"cloud"
		]
	},
	{
		id: "inspect",
		layer: [
			"slash",
			"bracket"
		]
	},
	{
		id: "play",
		layer: [
			"arrow",
			"circle"
		]
	},
	{
		id: "evenly_distribute_h",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "evenly_distribute_v",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_bottom",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_center",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_left",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_right",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_top",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_v_center",
		layer: [
			"indicator",
			"object"
		]
	}
];

var ICON_SET_LIST = ['dora', 'mb', 'icon', 'fa', 'md', 'ci'];
var LIGA_ICON_SET_LIST = ['dora', 'md'];

var checkIfIconIsLiga = function checkIfIconIsLiga(type) {
  return LIGA_ICON_SET_LIST.includes(type);
};

function Icon(_ref) {
  var _ref$name = _ref.name,
      propName = _ref$name === void 0 ? '' : _ref$name,
      type = _ref.type,
      className = _ref.className,
      others = _objectWithoutProperties(_ref, ["name", "type", "className"]);

  var prefix = type === 'mb' ? 'icon' : type;
  var name = propName.replace(new RegExp("^(".concat(ICON_SET_LIST.join('|'), ")-"), 'i'), '');
  var isLiga = checkIfIconIsLiga(type);
  return React.createElement("span", _extends({
    className: trimList(['icon', type, !isLiga && "".concat(prefix, "-").concat(name), className])
  }, others), isLiga && name);
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string
};
Icon.defaultProps = {
  name: '',
  type: 'icon'
};
var DUO_ICON_NAME_MAP = {
  dora: 'duodora'
};

function DuoIcon(_ref2) {
  var name = _ref2.name,
      type = _ref2.type,
      className = _ref2.className,
      colorList = _ref2.colorList,
      others = _objectWithoutProperties(_ref2, ["name", "type", "className", "colorList"]);

  var icon = duoList.find(function (_ref3) {
    var id = _ref3.id;
    return id === name;
  });
  return !!icon && React.createElement("span", _extends({
    className: trimList(['duo-icon', DUO_ICON_NAME_MAP[type], className])
  }, others), icon.layer.map(function (l, idx) {
    return React.createElement("span", {
      key: l,
      className: "layer",
      style: {
        color: colorList[idx]
      }
    }, "".concat(name, "__").concat(l));
  }));
}

DuoIcon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(DUO_ICON_NAME_MAP)),
  className: PropTypes.string,
  colorList: PropTypes.array
};
DuoIcon.defaultProps = {
  name: '',
  type: 'dora',
  colorList: []
};
Icon.DuoIcon = DuoIcon;

export default Icon;
