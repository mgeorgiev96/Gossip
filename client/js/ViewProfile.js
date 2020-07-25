"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _NavBar = _interopRequireDefault(require("./NavBar"));

var _Post = _interopRequireDefault(require("./Post"));

var _Chats = _interopRequireDefault(require("./Chats"));

var _Context = require("./Context");

var _moment = _interopRequireDefault(require("moment"));

var _axios = _interopRequireDefault(require("axios"));

var _CreatePost = _interopRequireDefault(require("./CreatePost"));

var _uniqid = _interopRequireDefault(require("uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ViewProfile() {
  var _useContext = (0, _react.useContext)(_Context.ChatContext),
      _useContext2 = _slicedToArray(_useContext, 8),
      user = _useContext2[0],
      setUser = _useContext2[1],
      friend = _useContext2[2],
      setFriend = _useContext2[3],
      friendPost = _useContext2[4],
      setFriendPost = _useContext2[5],
      profileUser = _useContext2[6],
      setProfileUser = _useContext2[7];

  var weekTime = 10080;
  (0, _react.useEffect)(function () {
    _axios.default.get('/api/view-profile-account').then(function (i) {
      setProfileUser(i.data);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile_container"
  }, /*#__PURE__*/_react.default.createElement(_NavBar.default, null), /*#__PURE__*/_react.default.createElement(_CreatePost.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "personal_info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "inner_container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "information-user"
  }, /*#__PURE__*/_react.default.createElement("p", null, profileUser.name), /*#__PURE__*/_react.default.createElement("p", {
    className: "user_birthday"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-birthday-cake"
  }), !profileUser.dateOfBirth ? "- -/- -/- - - -" : profileUser.dateOfBirth), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("p", {
    className: "user_gender"
  }, !profileUser.gender ? '--' : profileUser.gender), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("p", null, !profileUser.friends ? '0 Following' : "".concat(Object.keys(profileUser.friends).length, " Following"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "information-user1"
  }, /*#__PURE__*/_react.default.createElement("p", null, !profileUser.posts ? '0 Posts' : "".concat(Object.keys(profileUser.posts).length, " Posts")), /*#__PURE__*/_react.default.createElement("p", {
    className: "user_address"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-map-marker-alt"
  }), !profileUser.address ? '----' : profileUser.address), /*#__PURE__*/_react.default.createElement("div", null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-picture-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: profileUser.thumbnail,
    className: "thumbnail_pic"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "personal_post"
  }, !profileUser.posts ? '' : profileUser.posts.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Post.default, {
      styledItem: (new Date() - item.time) / 60000 < weekTime ? 'block' : 'none',
      styledImage: item.imageURL === '' ? 'none' : 'block',
      likes: item.likes.length,
      Id: item.id,
      owner: item.user,
      commentContainerId: item.id,
      key: (0, _uniqid.default)(),
      time: (0, _moment.default)(item.time).fromNow(),
      text: item.message,
      image: item.imageURL,
      profilePIC: profileUser.thumbnail,
      userName: profileUser.name
    });
  })), /*#__PURE__*/_react.default.createElement(_Chats.default, null)));
}

var _default = ViewProfile;
exports.default = _default;