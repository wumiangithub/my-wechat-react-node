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


//io 是全局的请求     socket是当前的请求
io.on('connection',function (socket) {
    // console.log('user login')
    //接收当前请求数据
    socket.on('sendmsg',function (data) {
        console.log(data);
        //发送一个全局的请求
        // io.emit('recvmsg',data.text+1)

        //
        socket.emit('recvmsg',data)
    })
});



app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);


// app.listen(9093,function(){
//     console.log('Node app start at port 9093')
// })
server.listen(9093,function(){
    console.log('Node app start at port 9093')
})
