const express = require('express');
// 新建app
const app = express();
//接收post请求参数数据
const bodyParser = require('body-parser');
//解析cookie
const cookieParser = require('cookie-parser');
//work with express
const server = require('http').Server(app);//http 自带的
const io = require('socket.io')(server);
const userRouter = require('./user');







app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);


app.listen(9093,function(){
    console.log('Node app start at port 9093')
})
