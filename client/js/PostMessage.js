"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Card = _interopRequireDefault(require("react-bootstrap/Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PostMessage() {
  return /*#__PURE__*/_react.default.createElement(_Card.default, null, /*#__PURE__*/_react.default.createElement(_Card.default.Body, null, /*#__PURE__*/_react.default.createElement(_Card.default.Title, null, "Card Title"), /*#__PURE__*/_react.default.createElement(_Card.default.Subtitle, {
    className: "mb-2 text-muted"
  }, "Card Subtitle"), /*#__PURE__*/_react.default.createElement(_Card.default.Text, null, "Some quick example text to build on the card title and make up the bulk of the card's content."), /*#__PURE__*/_react.default.createElement(_Card.default.Link, {
    href: "#"
  }, "Card Link"), /*#__PURE__*/_react.default.createElement(_Card.default.Link, {
    href: "#"
  }, "Another Link")));
}

var _default = PostMessage;
exports.default = _default;