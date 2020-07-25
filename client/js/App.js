"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Context = require("./Context");

var _reactRouterDom = require("react-router-dom");

var _Profile = _interopRequireDefault(require("./Profile"));

var _Personal = _interopRequireDefault(require("./Personal"));

var _ViewProfile = _interopRequireDefault(require("./ViewProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/_react.default.createElement(_Context.ChatProvider, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/profile",
    component: _Profile.default
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/personal",
    component: _Personal.default
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/view-user-profile",
    component: _ViewProfile.default
  })));
}

var _default = App;
exports.default = _default;