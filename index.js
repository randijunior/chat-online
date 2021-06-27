"use strict";
const app = require('express')();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const { performance } = require('perf_hooks')
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Friend = require('./src/models/Friend');
const Message = require('./src/models/Message');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    allowEIO3: true,
  cors: {
    origin: "https://chatonline-f2f1d.web.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const multer = require("multer");
var path = require('path');
var cloudinary = require("cloudinary").v2;
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')


this.users = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

const uri = process.env.MONGO_URI;//'mongodb://localhost:27017/chat_app';
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify:false});
require('./src/models/User');
require('./src/models/Message');
require('./src/models/Friend');

require('./src/routers/index')(app);
require('./src/routers/users')(app);
require('./src/routers/messages')(app);
require('./src/routers/friends')(app);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'erro na conexao:'));
db.once('open', function() {
    //console.log(Object.keys(db.collections));
    console.log('Conectado ao Banco de dados');
});

io.on('connection', (socket) => {
      socket.on('user connected', async(userId)=>{
        console.log('um usuario conectou');
        await User.findOneAndUpdate({_id: userId},{online : true},{
          returnOriginal: false
        });
        await Friend.findOneAndUpdate({friend_id: userId},{online : true},{
          returnOriginal: false
        });
        this.users.push({id: socket.id, userId: userId});
        io.emit('userList',this.users[this.users.length-1].userId);
        /*friendOnlineList(userId, this.users).then(res => {
          for(let y = 0; y < res.length; y++)
            io.to(res[y].id).emit('userList',this.users[this.users.length-1].userId);
        });*/
        
      });
      
      socket.on('disconnect', async ()=>{
          let found = this.users.find(element => element.id == socket.id);
          console.log('um usario desconectou');
          this.users = this.users.filter((user) => {
            return user.id !== socket.id
          });
          if(found){
            await User.findOneAndUpdate({_id: found.userId},{online : false},{
              returnOriginal: false
            });
            await Friend.findOneAndUpdate({friend_id: found.userId},{online : false});
            io.emit('exit', found.userId);
            /*friendOnlineList(found.userId,this.users).then(res=> {
              for(let y = 0; y < res.length; y++) {
                io.to(res[y].id).emit('exit', found.userId);
              }
            });*/
            
          }
          
      })
      socket.on('chat message', async (obj)=> {
        //console.log('messagem: ' + JSON.stringify(obj, null, 2));
        let user = await User.findById(obj.user_id).exec();
        let found = this.users.find(element => element.userId == obj.friend_id);
        let message = await Message.create(obj);
        if(found)io.to(found.id).emit('messageReceived',message,user);
      })

      socket.on('message read', async (ids) => {
        await Message.updateMany({ $and : [ {user_id: ids.friendId}, 
          {friend_id: ids.userId}] }, {readed: true});
          let found = this.users.find(element => element.userId == ids.userId);
          if(found)io.to(found.id).emit('friendReadMsg', ids.friendId);
      })

      socket.on('user disconnect', async () => {
        return socket.disconnect();
      })
  });

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');
  app.use('/profile',require('./src/middleware/authenticateToken.js'));
  app.post('/profile', upload, (req, res) => {
    if(req.file) {
      const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content;
      return cloudinary.uploader.upload(file,{public_id:req.user.id}).then(async (result)=> {
        const image = result.url;
        await User.findOneAndUpdate({_id: req.user.id},{user_image : image});
        await Friend.updateMany({friend_id: req.user.id}, {friend_image: image});
        return res.status(200).json({ image: image/*+"?"+performance.now()*/});
      })
    }
  //
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

http.listen(process.env.PORT || 3000, ()=> {
    console.log('Servidor ON')
})