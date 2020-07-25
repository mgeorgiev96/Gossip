"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = require("./Context");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Chats() {
  var _useContext = (0, _react.useContext)(_Context.ChatContext),
      _useContext2 = _slicedToArray(_useContext, 16),
      user = _useContext2[0],
      setUser = _useContext2[1],
      friend = _useContext2[2],
      setFriend = _useContext2[3],
      friendPost = _useContext2[4],
      setFriendPost = _useContext2[5],
      profileUser = _useContext2[6],
      setProfileUser = _useContext2[7],
      index = _useContext2[8],
      setIndex = _useContext2[9],
      pass = _useContext2[10],
      setPass = _useContext2[11],
      passMessage = _useContext2[12],
      setPassMessage = _useContext2[13],
      count = _useContext2[14],
      setCount = _useContext2[15];

  var showEmoji = function showEmoji(e) {
    var target = e.target;
    var emoji = document.querySelector('.fa-smile-wink');

    if (target.classList.contains('fa-minus')) {
      var friendEmail = target.parentElement.children[1].classList[2];

      if (user.username && friendPost && index && pass && passMessage) {
        _axios.default.post('/api/remove-friend', {
          removingFriend: friendEmail,
          myEmail: user.username
        }).then(function (i) {
          if (i) {
            window.location.reload();
          }
        });
      }
    }

    if (target.classList.contains('fa-smile-wink')) {
      target.style.zIndex = '0';
      target.children[0].style.zIndex = '1';
      target.children[1].style.display = 'grid';
    }

    if (target.classList.contains('fa-smile')) {
      target.style.zIndex = '-1';
      target.parentElement.style.zIndex = '1';
      target.parentElement.children[1].style.display = 'none';
    }

    if (target.classList.contains('emoji')) {
      var message = target.parentElement.parentElement.parentElement.children[0];
      var result = '';
      result = Array.from(new Set(target.innerHTML)).join('');

      if (result && !friendPost && user) {
        if (pass) {
          message.value += result;
        } else if (!pass) {
          message.value += result;
        }
      }
    }

    if (target.classList.contains('fa-times')) {
      var closeChat = target.parentElement.parentElement;
      var container = target.parentElement.parentElement.parentElement;

      if (user.username) {
        var windowContainer = document.getElementById("window".concat(target.parentElement.parentElement.classList[1], "window").concat(user.username));

        if (windowContainer) {
          _axios.default.post('/api/save-chat', {
            container1: "window".concat(target.parentElement.parentElement.classList[1], "window").concat(user.username),
            container2: "window".concat(user.username, "window").concat(target.parentElement.parentElement.classList[1]),
            sender: user.username,
            receiver: target.parentElement.parentElement.classList[1],
            chatContent: windowContainer.innerHTML
          });

          if (container && closeChat) {
            container.removeChild(closeChat);
            window.location.reload();
          }
        }
      }
    }
  };

  window.addEventListener('click', showEmoji);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "chat_container"
  }));
}

var _default = Chats;
exports.default = _default;