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

var _firebase = _interopRequireDefault(require("./firebase"));

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

function Personal() {
  var weekTime = 10080;

  var editDate = function editDate(e) {
    var date = document.querySelector('.edit_date');
    var save = document.querySelector('.save-date');

    if (e.target.classList.contains('edit-date')) {
      if (date.style.display === 'none') {
        date.style.display = 'block';
        save.style.display = 'block';
      } else {
        date.style.display = 'none';
        save.style.display = 'none';
      }
    }
  };

  var saveDate = function saveDate(e) {
    var date = document.querySelector(".user_birthday");
    var target = e.target;
    var upDate = (0, _moment.default)(new Date(target.parentElement.children[0].value)).format('LL');
    target.parentElement.children[0].style.display = 'none';
    target.style.display = 'none';

    _axios.default.post('/api/update-date', {
      username: user.username,
      param: upDate
    }).then(function (i) {
      setUser(i.data);
    });
  };

  var editGender = function editGender(e) {
    var gender = document.querySelector('.edit_gender');
    var save = document.querySelector('.save-gender');

    if (e.target.classList.contains('edit-gender')) {
      if (gender.style.display === 'none') {
        gender.style.display = 'block';
        save.style.display = 'block';
      } else {
        gender.style.display = 'none';
        save.style.display = 'none';
      }
    }
  };

  var saveGender = function saveGender(e) {
    var gender = document.querySelector(".user_gender");
    var target = e.target;
    var selectedGender = target.parentElement.children[0].value;
    target.parentElement.children[0].style.display = 'none';
    target.style.display = 'none';

    _axios.default.post('/api/update-gender', {
      username: user.username,
      param: selectedGender
    }).then(function (i) {
      setUser(i.data);
    });
  };

  var editAddress = function editAddress(e) {
    var address = document.querySelector('.edit_address');
    var save = document.querySelector('.save-address');

    if (e.target.classList.contains('edit-address')) {
      if (address.style.display === 'none') {
        address.style.display = 'block';
        save.style.display = 'block';
      } else {
        address.style.display = 'none';
        save.style.display = 'none';
      }
    }
  };

  var saveAddress = function saveAddress(e) {
    var address = document.querySelector(".user_address");
    var target = e.target;
    var selectedAddress = target.parentElement.children[0].value;
    target.parentElement.children[0].style.display = 'none';
    target.style.display = 'none';

    _axios.default.post('/api/update-address', {
      username: user.username,
      param: selectedAddress
    }).then(function (i) {
      setUser(i.data);
    });
  };

  var editProfile = function editProfile(e) {
    var saveProfile = document.querySelector('.save-profile-picture');
    saveProfile.style.display = 'block';
  };

  var loadProfileFile = function loadProfileFile(e) {
    var target = e.target;
    var img = document.querySelector('.edit-profile-picture');
    var span = document.querySelector('.profile-pic-file');
    span.innerHTML = img.files[0].name;
  };

  var saveProfile = function saveProfile(e) {
    var img = document.querySelector('.edit-profile-picture');
    var file = img.files[0];

    if (file) {
      var postCreatedTime = (0, _moment.default)(Date.now()).format('LTS');

      var storageRef = _firebase.default.storage().ref("".concat(user.username, "/").concat(file.name).concat(postCreatedTime));

      var uploadTask = storageRef.put(file).then(function (i) {
        var storage = _firebase.default.storage().ref();

        var spaceRef = storage.child("".concat(user.username, "/").concat(file.name).concat(postCreatedTime)).getDownloadURL().then(function (url) {
          if (spaceRef) {
            _axios.default.post('/api/edit-profile', {
              username: user.username,
              imageURL: url
            });

            window.location.reload();
          }
        });
      });
    } else {}
  };

  var _useContext = (0, _react.useContext)(_Context.ChatContext),
      _useContext2 = _slicedToArray(_useContext, 6),
      user = _useContext2[0],
      setUser = _useContext2[1],
      friend = _useContext2[2],
      setFriend = _useContext2[3],
      friendPost = _useContext2[4],
      setFriendPost = _useContext2[5];

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile_container"
  }, /*#__PURE__*/_react.default.createElement(_NavBar.default, null), /*#__PURE__*/_react.default.createElement(_CreatePost.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "personal_info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "inner_container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "information-user"
  }, /*#__PURE__*/_react.default.createElement("p", null, user.name), /*#__PURE__*/_react.default.createElement("p", {
    onClick: editDate,
    className: "user_birthday"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-birthday-cake"
  }), !user.dateOfBirth ? "- -/- -/- - - -" : user.dateOfBirth, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-edit edit-date"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    className: "edit_date",
    type: "date"
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-save save-date",
    onClick: saveDate
  })), /*#__PURE__*/_react.default.createElement("p", {
    onClick: editGender,
    className: "user_gender"
  }, !user.gender ? '--' : user.gender, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-edit edit-gender"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
    className: "edit_gender",
    type: "select"
  }, /*#__PURE__*/_react.default.createElement("option", null, "Male"), /*#__PURE__*/_react.default.createElement("option", null, "Female")), /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-save save-gender",
    onClick: saveGender
  })), /*#__PURE__*/_react.default.createElement("p", null, !user.friends ? '0 Following' : "".concat(Object.keys(user.friends).length, " Following"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "information-user1"
  }, /*#__PURE__*/_react.default.createElement("p", null, !user.posts ? '0 Posts' : "".concat(Object.keys(user.posts).length, " Posts")), /*#__PURE__*/_react.default.createElement("p", {
    className: "user_address",
    onClick: editAddress
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-map-marker-alt"
  }), !user.address ? '----' : user.address, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-edit edit-address"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    className: "edit_address",
    type: "text"
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-save save-address",
    onClick: saveAddress
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-picture-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: user.thumbnail,
    className: "thumbnail_pic"
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-camera-retro",
    onClick: editProfile
  }, /*#__PURE__*/_react.default.createElement("input", {
    onChange: loadProfileFile,
    type: "file",
    className: "edit-profile-picture"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "save-profile-picture far fa-save",
    onClick: saveProfile
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "profile-pic-file"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "personal_post"
  }, !user.posts ? '' : user.posts.map(function (item) {
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
      profilePIC: user.thumbnail,
      userName: user.name
    });
  })), /*#__PURE__*/_react.default.createElement(_Chats.default, null)));
}

var _default = Personal;
exports.default = _default;