const Friend = require('../models/Friend');
const User = require('../models/User');

exports.getFriends = function(req, res) {
    let userId = req.user.id;
    Friend.find({user_id: userId}, function(err, arr) {
        if(err)
            res.send(err);
        else
            res.json(arr);
    })
}
exports.findOne = function(req, res) {
    let friend_id = req.params.id;
    Friend.findOne({friend_id:friend_id}, function(err, user){
        if(err) return res.status(500).send('Erro nos servidor');
        else {res.status(200).send(user)};
    });
}

exports.createFriend = function(req, res) {
    let newFriend = new Friend(req.body);
    newFriend.user_id = req.user.id;
    User.findOne({user_name: newFriend.friend_name}, function(err, user) {
        if(err) return res.status(500).send('Erro no servidor');
        if(!user) return res.status(200).send({err: 'Usuário não encontrado'});
        newFriend['friend_id'] = user.id;
        newFriend['online'] = user.online;
        if(user.user_image)newFriend['friend_image'] = user.user_image;
        newFriend.save(function(err, friend) {
            if(err)
                res.send(err);
            else
                res.json(friend);
        })

    });

}