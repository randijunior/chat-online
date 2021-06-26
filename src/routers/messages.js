module.exports = function(app) {
    var message = require('../controllers/messageController');
    app.use('/messages',require('../middleware/authenticateToken.js'));
    app.use('/unr_messages',require('../middleware/authenticateToken.js'));
    app.route('/messages')
    .post(message.createMessage)

    app.route('/messages')
    .get(message.getMessages)

    app.route('/unr_messages/:id')
    .get(message.getUnreadMessagesQuantity)
}