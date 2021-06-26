const Message = require('../models/Message');

exports.getMessages = function(req, res) {
    var user = req.user;
    Message.find({$or: [{user_id: user.id}, {friend_id: user.id}]}, function(err, arr) {
        if(err)
            res.send(err);
        else
            res.send(arr);
    })
}

exports.createMessage = function(req, res) {
    var newMessage = new Message(req.body);
    //newMessage.user_id = req.user.id;
    newMessage.save(function(err, msg) {
        if(err){
            res.send(err);
        }
        else {
            res.json(msg);
        }
            

    });
}

exports.getUnreadMessagesQuantity = function(req, res) {
    var user = req.user;
    var friendId = req.params.id;
    Message.countDocuments({ $and: [ 
        { readed: false }, 
        { friend_id: user.id }, 
        { user_id: friendId } ] }, function(err, count) {
            if(err) {
                res.send(err);
            }else {
                res.json({un_m: count});
            }
    })
}