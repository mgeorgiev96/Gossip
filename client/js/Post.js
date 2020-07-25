"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Card = _interopRequireDefault(require("react-bootstrap/Card"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Emoji = _interopRequireDefault(require("./Emoji"));

var _axios = _interopRequireDefault(require("axios"));

var _Context = require("./Context");

var _SingleComment = _interopRequireDefault(require("./SingleComment"));

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

function Post(props) {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      commentsHide = _useState2[0],
      setHide = _useState2[1];

  var _useContext = (0, _react.useContext)(_Context.ChatContext),
      _useContext2 = _slicedToArray(_useContext, 6),
      user = _useContext2[0],
      setUser = _useContext2[1],
      friend = _useContext2[2],
      setFriend = _useContext2[3],
      friendPost = _useContext2[4],
      setFriendPost = _useContext2[5];

  (0, _react.useEffect)(function () {
    var postedComment = document.querySelectorAll('.user-comment-post');
    var postLikes = document.querySelectorAll('.like-comment-button');

    if (user.posts && user.posts.length !== 0) {
      var _loop = function _loop(i) {
        user.posts.map(function (item) {
          return postedComment[i].classList[1] == item.id ? item.comments.map(function (com) {
            com.identifier == postedComment[i].classList[2] ? postedComment[i].children[2].innerHTML = com.likes.length : '';
          }) : '';
        });
        user.posts.map(function (item) {
          return postedComment[i].classList[1] == item.id ? item.comments.map(function (com) {
            com.identifier == postedComment[i].classList[2] ? com.likes.includes(user.username) ? postedComment[i].children[2].classList.add('liked-comment') : '' : '';
          }) : '';
        });
      };

      for (var i = 0; i < postedComment.length; i++) {
        _loop(i);
      }

      if (friendPost) {
        var _loop2 = function _loop2(_i2) {
          friendPost.friends.map(function (item) {
            return item.map(function (inner) {
              return inner.id == postedComment[_i2].classList[1] ? inner.comments.map(function (com) {
                com.identifier == postedComment[_i2].classList[2] ? com.likes.includes(user.username) ? postedComment[_i2].children[2].classList.add('liked-comment') : '' : '';
              }) : '';
            });
          });
          friendPost.friends.map(function (item) {
            return item.map(function (inner) {
              return inner.id == postedComment[_i2].classList[1] ? inner.comments.map(function (com) {
                com.identifier == postedComment[_i2].classList[2] ? postedComment[_i2].children[2].innerHTML = com.likes.length : '';
              }) : '';
            });
          });
        };

        for (var _i2 = 0; _i2 < postedComment.length; _i2++) {
          _loop2(_i2);
        }
      }

      var _loop3 = function _loop3(_i3) {
        if (user.posts) {
          user.posts.map(function (item) {
            return item.id == postLikes[_i3].classList[3] ? item.likes.includes(user.username) ? postLikes[_i3].classList.add('liked-post') : '' : '';
          });
        }

        if (friendPost) {
          friendPost.friends.map(function (item) {
            return item.map(function (inner) {
              return inner.id == postLikes[_i3].classList[3] ? inner.likes.includes(user.username) ? postLikes[_i3].classList.add('liked-post') : '' : '';
            });
          });
        }
      };

      for (var _i3 = 0; _i3 < postLikes.length; _i3++) {
        _loop3(_i3);
      }
    }
  }, []);

  var likeUnlikePost = function likeUnlikePost(e) {
    var target = e.target;
    var postOwner = target.classList[2];
    var postLiker = user.username;
    var postID = target.classList[3];

    if (target.classList.contains('liked-post')) {
      _axios.default.post('/api/unlike-post', {
        postOwner: postOwner,
        postLiker: postLiker,
        postID: postID
      });
    } else {
      _axios.default.post('/api/like-post', {
        postOwner: postOwner,
        postLiker: postLiker,
        postID: postID
      });
    }

    window.location.reload();
  };

  var openComment = function openComment(e) {
    var comments = e.target.parentElement.parentElement.children[5];
    var comment = e.target.parentElement.parentElement.children[6];

    if (comment.style.display === 'none' || comment.style.display === '') {
      comment.style.display = 'block';
      comments.style.display = 'block';
    } else {
      comment.style.display = 'none';
      comments.style.display = 'none';
    }
  };

  var hideComment = function hideComment(e) {
    var comments = e.target.parentElement.parentElement.children[5];
    var comment = e.target.parentElement.parentElement.children[6];

    if (e.target.classList.contains('fa-comment-slash')) {}

    comment.style.display = 'none';
  };

  var leaveComment = function leaveComment(e) {
    e.preventDefault();
    var message = e.target.children[0];
    var comments = e.target.parentElement.children[5];
    var id = (0, _uniqid.default)();
    comments.innerHTML += "<p class=\"user-comment-post ".concat(id, "\"><img class=\"current-image-comment\" src=").concat(user.thumbnail, ">").concat(message.value, "<br><i class=\"fas fa-heart\"></i></p>");

    _axios.default.post('/api/leave-comment', {
      userOwner: e.target.children[1].classList[2],
      userPosting: user.username,
      comment: {
        msg: message.value,
        pic: user.thumbnail,
        identifier: id,
        likes: []
      },
      id: e.target.children[1].classList[1]
    });

    message.value = '';
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
    style: {
      display: props.styledItem
    }
  }, /*#__PURE__*/_react.default.createElement(_Card.default.Img, {
    variant: "top",
    src: props.image,
    style: {
      display: props.styledImage
    }
  }), /*#__PURE__*/_react.default.createElement(_Card.default.Body, null, /*#__PURE__*/_react.default.createElement("h5", {
    style: {
      fontWeight: "bold"
    }
  }, props.userName), /*#__PURE__*/_react.default.createElement("img", {
    className: "profile_pic",
    src: props.profilePIC
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "time_post"
  }, props.time), /*#__PURE__*/_react.default.createElement(_Card.default.Text, null, props.text), /*#__PURE__*/_react.default.createElement("div", {
    className: "likes"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-heart ".concat(props.owner, " ").concat(props.Id, " like-comment-button"),
    onClick: likeUnlikePost
  }, props.likes), /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-comments",
    onClick: openComment
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "comments ".concat(props.commentContainerId)
  }, user.posts ? user.posts.map(function (item) {
    return item.comments.map(function (inner) {
      return props.commentContainerId == item.id ? /*#__PURE__*/_react.default.createElement(_SingleComment.default, {
        clas: item.id,
        commentIdentity: inner.identifier,
        key: (0, _uniqid.default)(),
        userImage: inner.pic,
        userMessage: inner.msg
      }) : '';
    });
  }) : '', friendPost ? friendPost.friends.map(function (i) {
    return i.map(function (item) {
      return item.comments.map(function (inner) {
        return props.commentContainerId == item.id ? /*#__PURE__*/_react.default.createElement(_SingleComment.default, {
          clas: item.id,
          commentIdentity: inner.identifier,
          key: (0, _uniqid.default)(),
          userImage: inner.pic,
          userMessage: inner.msg
        }) : '';
      });
    });
  }) : ''), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: leaveComment,
    className: "user_comment_form"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "user_comment",
    placeholder: "Leave Comment"
  }), /*#__PURE__*/_react.default.createElement("button", {
    className: "post_button ".concat(props.Id, " ").concat(props.owner),
    type: "submit"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-arrow-circle-up"
  })), /*#__PURE__*/_react.default.createElement(_Emoji.default, null)))));
}

var _default = Post;
exports.default = _default;