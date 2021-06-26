module.exports = function(app) {
    var friend = require('../controllers/friendController');
    app.use('/friends',require('../middleware/authenticateToken.js'));

    app.route('/friends')
    .post(friend.createFriend); //ok

    app.route('/friends/:id').get(friend.findOne); //ok

    app.route('/friends')
    .get(friend.getFriends) //ok
}