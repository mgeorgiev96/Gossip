const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    name:{
        required: true,
        type: String
    },
    thumbnail: String,
    dateOfBirth: String,
    posts: Array,
    friends: Array,
    chats: Array,
    address: String,
    gender: String,
    online: String,
    added: Array
})

const User = mongoose.model('gossip',UserSchema)

module.exports = User