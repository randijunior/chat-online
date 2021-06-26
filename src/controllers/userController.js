const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

exports.findAllUsers = function(req, res) {
    User.find({}, function(err, users) {
        if(err)
            res.send(err);
        res.json(users);
    });
}

exports.findByName = function(req, res) {
    let name = req.query.name;
    User.findOne({user_name: name}, function(err, user) {
        if(err) return res.send(err);
        if(!user) return res.status(200).send({err: 'Usuário não encontrado'});
        res.status(200).send(user);
    })
}

exports.findOne = function(req, res) {
    let user_id = req.params.id;
    User.findOne({_id:user_id}, function(err, user){
        if(err) return res.status(500).send('Erro nos servidor');
        else {res.status(200).send(user)};
    });
}

exports.userExist = async function(req, res) {
    let user_exist = await User.exists({user_name: req.body.user_name});
    if(user_exist) {
       return res.status(200).send({exists : true});
    }else {
        return res.status(200).send({exists : false});
    }
}

exports.createAUser =  async function(req, res) {
    let user_exist = await User.exists({user_name: req.body.user_name});
    if(user_exist) {
        return res.status(200).send({error :'Nome de usuário indisponivel'});
    }else {
        var newUser = new User({user_name: req.body.user_name,
            user_password:bcrypt.hashSync(req.body.user_password, 8),online:false});
        newUser.save(function(err, user) {
            if(err)
                res.status(500).send('Houve um problema ao registrar a conta');
            else res.status(201).send({user_name: user.user_name, created: true});
        })
    }
}

exports.generateToken = function(req, res) {
    User.findOne({user_name: req.body.user_name}, function(err, user) {
        if(err)return res.status(500).send('Erro no servidor');
        if(!user) return res.status(200).send({error:'auth_fail'});
        let passwordIsValid = bcrypt.compareSync(req.body.user_password, 
            user.user_password);
        if(!passwordIsValid) return res.status(200).send({error:'auth_fail'});//return res.status(401).send({auth: false, token: null});
        let token = jwt.sign({id:user.id},process.env.TOKEN_SECRET/*, {expiresIn: 86400}*/);
        res.status(200).send({auth: true, token: token, user: user});
    });
}