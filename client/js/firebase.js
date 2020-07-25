"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyAjsYjBi70seSKENP03EGZqLm8lJOMKIP0",
  authDomain: "gossip-ca35d.firebaseapp.com",
  databaseURL: "https://gossip-ca35d.firebaseio.com",
  projectId: "gossip-ca35d",
  storageBucket: "gossip-ca35d.appspot.com",
  messagingSenderId: "818496013910",
  appId: "1:818496013910:web:b67daee44a0b799f1c1df7",
  measurementId: "G-Y6ME1GNJK3"
};

_firebase.default.initializeApp(firebaseConfig);

var _default = _firebase.default;
exports.default = _default;