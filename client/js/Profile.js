"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NavBar = _interopRequireDefault(require("./NavBar"));

var _PostTable = _interopRequireDefault(require("./PostTable"));

var _Chats = _interopRequireDefault(require("./Chats"));

var _CreatePost = _interopRequireDefault(require("./CreatePost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Profile() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile_container"
  }, /*#__PURE__*/_react.default.createElement(_NavBar.default, null), /*#__PURE__*/_react.default.createElement(_CreatePost.default, null), /*#__PURE__*/_react.default.createElement(_PostTable.default, null), /*#__PURE__*/_react.default.createElement(_Chats.default, null));
}

var _default = Profile;
exports.default = _default;