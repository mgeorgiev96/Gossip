"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Navbar = _interopRequireDefault(require("react-bootstrap/Navbar"));

var _Nav = _interopRequireDefault(require("react-bootstrap/Nav"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/FormControl"));

var _DropdownButton = _interopRequireDefault(require("react-bootstrap/DropdownButton"));

var _axios = _interopRequireDefault(require("axios"));

var _Context = require("./Context");

var _SearchFriends = _interopRequireDefault(require("./SearchFriends"));

var _Friend = _interopRequireDefault(require("./Friend"));

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

function NavBar() {
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

  var socket = io.connect('https://gossip-c.herokuapp.com');
  var form = document.querySelector('.user-chat-form');

  var saveChatLogout = function saveChatLogout() {
    var chatContainer = document.querySelector('.chat_container');

    if (chatContainer.children[0] && user.username) {
      var receiverUser = chatContainer.children[0].classList[1];

      if (chatContainer.children[0].children[1].innerHTML !== '') {
        _axios.default.post('/api/save-chat', {
          container1: "window".concat(receiverUser, "window").concat(user.username),
          container2: "window".concat(user.username, "window").concat(receiverUser),
          sender: user.username,
          receiver: receiverUser,
          chatContent: chatContainer.children[0].children[1].innerHTML,
          logOFF: true
        }).then(function (i) {
          if (i.data === 'logout') {
            _axios.default.get('/api/logout').then(function (i) {
              return window.location.replace('/');
            });
          }
        });
      } else {
        _axios.default.get('/api/logout').then(function (i) {
          return window.location.replace('/');
        });
      }
    } else {
      _axios.default.get('/api/logout').then(function (i) {
        return window.location.replace('/');
      });
    }
  };

  var saveChatProfile = function saveChatProfile() {
    var chatContainer = document.querySelector('.chat_container');

    if (chatContainer.children[0] && user.username) {
      var receiverUser = chatContainer.children[0].classList[1];

      if (chatContainer.children[0].children[1].innerHTML !== '') {
        _axios.default.post('/api/save-chat', {
          container1: "window".concat(receiverUser, "window").concat(user.username),
          container2: "window".concat(user.username, "window").concat(receiverUser),
          sender: user.username,
          receiver: receiverUser,
          chatContent: chatContainer.children[0].children[1].innerHTML
        }).then(function (i) {
          window.location.replace('/profile');
        });
      } else {
        window.location.replace('/profile');
      }
    } else {
      window.location.replace('/profile');
    }
  };

  var saveChatPersonal = function saveChatPersonal() {
    var chatContainer = document.querySelector('.chat_container');

    if (chatContainer.children[0] && user.username) {
      var receiverUser = chatContainer.children[0].classList[1];

      if (chatContainer.children[0].children[1].innerHTML !== '') {
        _axios.default.post('/api/save-chat', {
          container1: "window".concat(receiverUser, "window").concat(user.username),
          container2: "window".concat(user.username, "window").concat(receiverUser),
          sender: user.username,
          receiver: receiverUser,
          chatContent: chatContainer.children[0].children[1].innerHTML
        }).then(function (i) {
          window.location.replace('/personal');
        });
      } else {
        window.location.replace('/personal');
      }
    } else {
      window.location.replace('/personal');
    }
  };

  var sendMessageEnter = function sendMessageEnter(e) {
    var chatContainer = document.querySelector('.chat_container');
    setPassMessage(true);

    if (chatContainer.children.length !== 0 && e.keyCode === 13) {
      var windowChat = chatContainer.children[0].children[1];
      var message = chatContainer.children[0].children[2].children[0];

      if (user && friendPost && index && passMessage && message.value !== '') {
        socket.emit('chat', {
          note: message.value,
          userSendingTo: chatContainer.classList[1],
          userSending: user.username,
          pic: user.thumbnail,
          container1: "window".concat(chatContainer.classList[1]),
          container2: "window".concat(user.username),
          id: message.id
        });
      }
    }
  };

  window.addEventListener('keydown', sendMessageEnter);

  var sendMessage = function sendMessage(e) {
    var target = e.target;
    var message = target.parentElement.children[0];
    setPassMessage(true);

    if (target.classList.contains('fa-share') && message.value !== '') {
      var privateChatWindow = target.parentElement.parentElement.id;
      var privateChatWindowUser = target.id;

      if (user && friendPost && index && passMessage) {
        socket.emit('chat', {
          note: message.value,
          userSendingTo: target.classList[2],
          userSending: user.username,
          pic: user.thumbnail,
          container1: privateChatWindow,
          container2: privateChatWindowUser,
          id: message.id
        });
      }
    }
  };

  (0, _react.useEffect)(function () {
    socket.on('context', function (data) {
      if (data && data.pic) {
        setPassMessage(false);

        if (user && friendPost && index && passMessage) {
          var windowContainer = document.getElementById("".concat(data.container1).concat(data.container2));
          var windowContainer1 = document.getElementById("".concat(data.container2).concat(data.container1));
          var chatBox = document.getElementById(data.id);
          var chatInfo = document.querySelector('.chat_container');

          if (windowContainer) {
            windowContainer.innerHTML += "<p class=\"message_chat_user\"><img src=\"".concat(data.pic, "\">").concat(data.note, "</p>");
            chatBox.value = '';
            windowContainer.scrollTop = windowContainer.scrollHeight;

            _axios.default.post('/api/save-chat', {
              container1: "window".concat(data.userSendingTo, "window").concat(user.username),
              container2: "window".concat(user.username, "window").concat(data.userSendingTo),
              sender: user.username,
              receiver: data.userSendingTo,
              chatContent: windowContainer.innerHTML
            });
          }

          if (windowContainer1) {
            windowContainer1.innerHTML += "<p class=\"message_chat_user\"><img src=\"".concat(data.pic, "\">").concat(data.note, "</p>");
            chatBox.value = '';
            windowContainer1.scrollTop = windowContainer1.scrollHeight;

            _axios.default.post('/api/save-chat', {
              container1: "window".concat(data.userSendingTo, "window").concat(user.username),
              container2: "window".concat(user.username, "window").concat(data.userSendingTo),
              sender: user.username,
              receiver: data.userSendingTo,
              chatContent: windowContainer1.innerHTML
            });
          }
        }
      }
    });
  });

  var searchPerson = function searchPerson(e) {
    e.preventDefault();
    var friendSearched = document.querySelector('.search_friend');
    var container = document.querySelector('.search-friend-container');
    friendSearched.classList.remove('fail-search');

    if (friendSearched.value === user.username) {
      friendSearched.classList.add('fail-search');
      container.style.display = 'none';
    } else {
      _axios.default.post('/api/friend-search', {
        searchFriend: friendSearched.value,
        user: user.username
      }).then(function (res) {
        if (res.data.friend) {
          container.style.display = 'flex';
          friendSearched.value = '';
          setFriend(res.data);
        } else {
          friendSearched.classList.add('fail-search');
          friendSearched.value = '';
          container.style.display = 'none';
        }
      });
    }
  };

  var showCreatePost = function showCreatePost() {
    var makePost = document.querySelector('.post_container');

    if (makePost.style.display == 'block') {
      makePost.style.display = 'none';
    } else {
      makePost.style.display = 'block';
    }
  };

  var showChats = function showChats() {
    var chat_container = document.querySelector(".chat_container");

    if (index) {
      chat_container.style.display = 'grid';
    } else {
      chat_container.style.display = 'none';
    }

    setIndex(!index);
  };

  var createPrivateChat = function createPrivateChat(e) {
    var chatContainer = document.querySelector('.chat_container');
    var target = e.target;

    if (target.classList[1] == 'fa-comment-dots') {
      var emoji = document.querySelector('.fa-smile-wink');
      var user_name = target.parentElement.children[1].classList[1];
      var user_pic = target.parentElement.children[1].classList[0];
      var email = target.parentElement.children[1].classList[2];

      if (target.classList.contains('fa-comment-dots')) {
        setCount(0);

        if (chatContainer.style.display === 'grid' && chatContainer.children.length > 0) {
          if (chatContainer.children[0].children[1].innerHTML !== '') {
            var content = chatContainer.children[0].children[1].innerHTML;
            window.location.reload();
          }
        } else {}

        chatContainer.innerHTML = "<div class=\"chat_window ".concat(email, "\" id=\"window").concat(email, "\">\n      <p class=\"current_user\"><img src='").concat(user_pic, "'>").concat(user_name, "<i class=\"fas fa-times\"></i></p>\n      <div class=\"window\" id=\"window").concat(email, "window").concat(user.username, "\">").concat(user.chats.map(function (i) {
          return i.with === "window".concat(email, "window").concat(user.username) ? i.context : '';
        }), "</div>\n      <div class=\"controls\">\n      <input type=\"text\" class=\"current_message\" id=\"").concat((0, _uniqid.default)(), "\">\n      <i class=\"fas fa-share ").concat(email, "\" id=\"window").concat(user.username, "\"></i>\n      <i class=\"fas fa-smile-wink\">\n      <i class=\"fas fa-smile\"></i>\n      <div class=\"emoji_container\">\n      <p class=\"emoji\">&#128540;</p>\n      <p class=\"emoji\">&#128512;</p>\n      <p class=\"emoji\">&#128513;</p>\n      <p class=\"emoji\">&#128514;</p>\n      <p class=\"emoji\">&#128515;</p>\n      <p class=\"emoji\">&#128516;</p>\n      <p class=\"emoji\">&#128517;</p>\n      <p class=\"emoji\">&#128518;</p>\n      <p class=\"emoji\">&#128519;</p>\n      <p class=\"emoji\">&#128520;</p>\n      <p class=\"emoji\">&#128521;</p>\n      <p class=\"emoji\">&#128522;</p>\n      <p class=\"emoji\">&#128523;</p>\n      <p class=\"emoji\">&#128524;</p>\n      <p class=\"emoji\">&#128525;</p>\n      <p class=\"emoji\">&#128526;</p>\n      <p class=\"emoji\">&#128527;</p>\n      <p class=\"emoji\">&#128528;</p>\n      <p class=\"emoji\">&#128529;</p>\n      <p class=\"emoji\">&#128530;</p>\n      <p class=\"emoji\">&#128526;</p>\n      <p class=\"emoji\">&#128527;</p>\n      <p class=\"emoji\">&#128528;</p>\n      <p class=\"emoji\">&#128529;</p>\n      <p class=\"emoji\">&#128530;</p>\n      <p class=\"emoji\">&#128531;</p>\n      <p class=\"emoji\">&#128536;</p>\n      <p class=\"emoji\">&#128533;</p>\n      <p class=\"emoji\">&#128538;</p>\n      <p class=\"emoji\">&#128552;</p>\n      <p class=\"emoji\">&#128557;</p>\n      <p class=\"emoji\">&#128564;</p>\n      <p class=\"emoji\">&#128567;</p>\n      <p class=\"emoji\">&#129297;</p>\n      <p class=\"emoji\">&#129488;</p>\n      </div>\n      </i>\n      </div>\n      </div>\n      ");
        var windowAdjust = chatContainer.children[0].children[1];
        chatContainer.style.display = 'grid';
        chatContainer.classList.add(email);
        setIndex(false);
        windowAdjust.scrollTop = windowAdjust.scrollHeight;
      }
    }
  };

  window.addEventListener('click', sendMessage);
  return /*#__PURE__*/_react.default.createElement(_Navbar.default, {
    bg: "light",
    expand: "lg"
  }, /*#__PURE__*/_react.default.createElement(_Navbar.default.Brand, null, "gossip"), /*#__PURE__*/_react.default.createElement(_Navbar.default.Toggle, {
    "aria-controls": "basic-navbar-nav"
  }), /*#__PURE__*/_react.default.createElement(_Navbar.default.Collapse, {
    id: "basic-navbar-nav"
  }, /*#__PURE__*/_react.default.createElement(_Nav.default, {
    className: "mr-auto"
  }, /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-home",
    onClick: saveChatProfile
  })), /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-user",
    onClick: saveChatPersonal
  })), /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, " ", /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-users"
  }, /*#__PURE__*/_react.default.createElement(_DropdownButton.default, {
    id: "dropdown-basic-button",
    title: ""
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "friend_list",
    onClick: createPrivateChat
  }, friendPost ? friendPost.pic.map(function (friend) {
    return /*#__PURE__*/_react.default.createElement(_Friend.default, {
      userActivity: friend.online === 'on' ? {
        backgroundColor: "seagreen"
      } : {
        backgroundColor: "gray"
      },
      key: (0, _uniqid.default)(),
      email: friend.username,
      friendImage: friend.thumbnail ? friend.thumbnail : '',
      friendName: friend.name.match(/^\S*/)
    });
  }) : '')))), /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-comments",
    onClick: showChats
  })), /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, /*#__PURE__*/_react.default.createElement("i", {
    onClick: showCreatePost,
    className: "fas fa-plus-circle"
  })), /*#__PURE__*/_react.default.createElement(_Nav.default.Link, null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-sign-out-alt",
    onClick: saveChatLogout
  }))), /*#__PURE__*/_react.default.createElement(_Form.default, {
    inline: true,
    className: "search-friend-form"
  }, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    type: "text",
    placeholder: "Email",
    className: "mr-sm-2 search_friend"
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "fas fa-user-friends",
    onClick: searchPerson
  }), /*#__PURE__*/_react.default.createElement(_SearchFriends.default, null))));
}

var _default = NavBar;
exports.default = _default;