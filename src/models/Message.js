var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        message : {type: String, required: true},
        user_id: {type: mongoose.ObjectId, ref:'User'},
        friend_id: {type: String, required: true},
        readed: Boolean,
        date : {type: Date, default:Date.now}
    }
);

module.exports = mongoose.model('Message', MessageSchema);