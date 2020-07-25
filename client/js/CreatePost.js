"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Emoji = _interopRequireDefault(require("./Emoji"));

var _Post = _interopRequireDefault(require("./Post"));

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

var _Context = require("./Context");

var _firebase = _interopRequireDefault(require("./firebase"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _Spinner = _interopRequireDefault(require("react-bootstrap/Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CreatePost() {
  var _useContext = (0, _react.useContext)(_Context.ChatContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      user = _useContext2[0],
      setUser = _useContext2[1];

  var loadFileName = function loadFileName() {
    var fileName = document.querySelector('.file_name');
    var img = document.querySelector('.current-post-image');
    fileName.innerHTML = img.files[0].name;
  };

  var createPost = function createPost(e) {
    var target = e.target;
    var post_container = document.querySelector('.profile_container');
    var msg = document.querySelector('.current-post-message');
    var img = document.querySelector('.current-post-image');
    var file = img.files[0];
    var spinner = document.querySelector('.spinner-border');
    spinner.style.display = 'block';

    if (file) {
      var postCreatedTime = (0, _moment.default)(Date.now()).format('LTS');

      var storageRef = _firebase.default.storage().ref("".concat(user.username, "/").concat(file.name).concat(postCreatedTime));

      var uploadTask = storageRef.put(file).then(function (i) {
        var storage = _firebase.default.storage().ref();

        var spaceRef = storage.child("".concat(user.username, "/").concat(file.name).concat(postCreatedTime)).getDownloadURL().then(function (url) {
          if (spaceRef) {
            _axios.default.post('/api/save-post', {
              username: user.username,
              name: user.name,
              imageURL: url,
              message: msg.value,
              time: Date.now(),
              id: (0, _uniqid.default)()
            });

            spinner.style.display = 'none';
            window.location.reload();
          }
        });
      });
    } else {
      _axios.default.post('/api/save-post', {
        username: user.username,
        profilePic: user.thumbnail,
        name: user.name,
        imageURL: '',
        message: msg.value,
        time: Date.now(),
        id: (0, _uniqid.default)()
      });

      window.location.reload();
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "post_container"
  }, /*#__PURE__*/_react.default.createElement("h3", null, "What's on your mind?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "post_content"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "current-post-message"
  }), /*#__PURE__*/_react.default.createElement(_Emoji.default, null), /*#__PURE__*/_react.default.createElement("i", {
    className: "far fa-images"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "current-post-image",
    type: "file",
    onChange: loadFileName
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "file_name"
  }), /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    animation: "border",
    role: "status"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "sr-only"
  }, "Loading..."))), /*#__PURE__*/_react.default.createElement("button", {
    className: "fas fa-share-alt",
    onClick: createPost
  }));
}

var _default = CreatePost;
exports.default = _default;