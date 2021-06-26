var mongoose = require('mongoose');
//mongoose.set('debug', true);

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        user_name: {type: String, required: true},
        user_password: {type:String, required:true},
        user_image: String,
        online: Boolean
    }

);

module.exports = mongoose.model('User', UserSchema);