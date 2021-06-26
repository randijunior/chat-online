var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = new Schema(
    {
        friend_name: {type: String, required: true},
        friend_id: {type: mongoose.ObjectId, ref: 'User'},
        user_id: { type : mongoose.ObjectId, ref: 'User' },
        friend_image: String,
        online : Boolean
    }
);

module.exports = mongoose.model('Friend', FriendSchema)