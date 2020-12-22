"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/row/style/css");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style/css");

var _col = _interopRequireDefault(require("antd/lib/col"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/grid/style/css");

var _grid = _interopRequireDefault(require("antd/lib/grid"));

require("antd/lib/tabs/style/css");

var _tabs = _interopRequireDefault(require("antd/lib/tabs"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

require("./pro-table-header.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TabPane = _tabs["default"].TabPane;
var useBreakpoint = _grid["default"].useBreakpoint; // interface HeaderProps {
//     title: string,
//     tabs: tabsType,
//     firstTabsChange: (key: string | number | undefined, value: string | number | undefined) => void,
//     secondTabsChange: (key: string | number | undefined, value: string | number | undefined) => void,
// }

var colSettingDefault = {
  xs: 12,
  sm: 8,
  md: 8,
  lg: 6,
  xl: 3,
  xxl: 2
}; // 列默认配置

var _default = /*#__PURE__*/(0, _react.memo)(function (props) {
  var _tabs$secondTabs, _tabs$secondTabs2, _tabs$secondTabs3;

  var screens = useBreakpoint();
  var title = props.title,
      tabs = props.tabs,
      firstTabsChange = props.firstTabsChange,
      secondTabsChange = props.secondTabsChange;

  var _useState = (0, _react.useState)((tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs = tabs.secondTabs) === null || _tabs$secondTabs === void 0 ? void 0 : _tabs$secondTabs.defaultKey) || 1),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      secondTab = _useState2[0],
      setSecondTab = _useState2[1]; // 二级菜单active


  var _useState3 = (0, _react.useState)(tabs !== null && tabs !== void 0 && (_tabs$secondTabs2 = tabs.secondTabs) !== null && _tabs$secondTabs2 !== void 0 && _tabs$secondTabs2.defaultOpen ? 0.5 : 0),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      rotate = _useState4[0],
      setRotate = _useState4[1]; // 旋转角度


  var _useState5 = (0, _react.useState)(8),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      hiddenNum = _useState6[0],
      setHiddenNum = _useState6[1]; // 隐藏条数


  var _useState7 = (0, _react.useState)(_objectSpread(_objectSpread({}, colSettingDefault), tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs3 = tabs.secondTabs) === null || _tabs$secondTabs3 === void 0 ? void 0 : _tabs$secondTabs3.col)),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 1),
      colSetting = _useState8[0]; // 列配置


  var screenlist = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']; // 响应尺寸

  (0, _react.useEffect)(function () {
    setHiddenNum(computeHideNum(screens));
  }, [screens]);
  /**
   * 计算隐藏行
   * @param screens 当前屏幕尺寸
   */

  var computeHideNum = function computeHideNum(screens) {
    var hideNum = 8;

    for (var i = 0; i < screenlist.length; i++) {
      if (screens[screenlist[i]]) {
        hideNum = 24 / colSetting[screenlist[i]];
        break;
      }
    }

    return hideNum;
  };
  /**
   * 一级tabs切换
   * @param key 
   */


  var tabFirstTabsChange = function tabFirstTabsChange(key, value) {
    var _tabs$secondTabs4, _tabs$secondTabs5;

    //该处为解决 antd 默认将 activeKey转成string型
    if (typeof (tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs4 = tabs.secondTabs) === null || _tabs$secondTabs4 === void 0 ? void 0 : _tabs$secondTabs4.defaultKey) === 'number') {
      value = parseFloat(value);
    }

    firstTabsChange(key, value);
    setSecondTab((tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs5 = tabs.secondTabs) === null || _tabs$secondTabs5 === void 0 ? void 0 : _tabs$secondTabs5.defaultKey) || 1);
  };
  /**
   * 二级tabs切换
   * @param key 
   */


  var tabSecondTabsChange = function tabSecondTabsChange(key, value) {
    secondTabsChange(key, value);
    setSecondTab(value);
  };

  return /*#__PURE__*/_react["default"].createElement("header", {
    className: "pro-table-header-wrap"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, title || ''), tabs && tabs.firstTabs && /*#__PURE__*/_react["default"].createElement("section", {
    className: "first"
  }, /*#__PURE__*/_react["default"].createElement(_tabs["default"], {
    defaultActiveKey: tabs.firstTabs.defaultKey,
    onChange: function onChange(e) {
      return tabFirstTabsChange(tabs.firstTabs.key, e);
    }
  }, tabs.firstTabs.data.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(TabPane, {
      tab: item.label,
      key: item.key
    });
  }))), tabs && tabs.secondTabs && /*#__PURE__*/_react["default"].createElement("section", {
    className: "second"
  }, /*#__PURE__*/_react["default"].createElement("span", null, tabs.secondTabs.title, "\uFF1A"), /*#__PURE__*/_react["default"].createElement(_row["default"], {
    className: "second-content",
    gutter: [0, 16]
  }, tabs.secondTabs.data.map(function (item, index) {
    if (rotate) {
      return /*#__PURE__*/_react["default"].createElement(_col["default"], (0, _extends2["default"])({
        key: item.key
      }, colSetting), /*#__PURE__*/_react["default"].createElement(_button["default"], {
        className: "second-btn",
        size: "small",
        type: secondTab === item.key ? 'primary' : 'text',
        onClick: function onClick() {
          return tabSecondTabsChange(tabs.secondTabs.key, item.key);
        }
      }, item.label));
    } else {
      if (index < hiddenNum) {
        return /*#__PURE__*/_react["default"].createElement(_col["default"], (0, _extends2["default"])({
          key: item.key
        }, colSetting), /*#__PURE__*/_react["default"].createElement(_button["default"], {
          className: "second-btn",
          size: "small",
          type: secondTab === item.key ? 'primary' : 'text',
          onClick: function onClick() {
            return tabSecondTabsChange(tabs.secondTabs.key, item.key);
          }
        }, item.label));
      } else {
        return null;
      }
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "toggle-wrap"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "link"
  }, "\u7F16\u8F91")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "toggle-item"
  }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "link",
    onClick: function onClick() {
      return rotate ? setRotate(0) : setRotate(0.5);
    }
  }, rotate ? '收起' : '展开', /*#__PURE__*/_react["default"].createElement(_icons.DownOutlined, {
    style: {
      "transition": "all 0.3s ease 0s",
      "transform": "rotate(".concat(rotate, "turn)")
    }
  }))))));
});

exports["default"] = _default;