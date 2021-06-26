module.exports = function(app) {
    var user = require('../controllers/userController');
    app.use('/users', require('../middleware/authenticateToken.js'))
    app.route('/create_account')
    .post(user.createAUser);
    app.route('/users').get(user.findByName);
    app.route('/users/:id').get(user.findOne);
    app.route('/auth')
    .post(user.generateToken);
};