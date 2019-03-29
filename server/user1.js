const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require("utility");
const _filter = {"pwd":0,"__v":0};


Router.get('/list',function (req,res) {
    // User.remove({},function (e,d) {});//删除所有
    User.find({},function (err,doc) {
        return res.json(doc)
    })
})


//{pwd:0}   不反回密码
Router.post('/login',function (req,res) {
    const {user,pwd} = req.body;
    User.findOne({user,pwd:utils.md5(pwd)},_filter,function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie("userid",doc._id);
        return res.json({code:0,data:doc})
    })
});




Router.post('/register',function (req,res) {
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({user,type,pwd:utils.md5(pwd)},function (e,d) {
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }

            return res.json({code:0})
        })
    })
});



Router.get('/info',function (req,res) {
    const {userid} = req.cookies;
    if(!userid){
        return res.json(
            {code:1}
        )
    }

    User.findOne({_id:userid},_filter,function(err,doc) {
        if(err){
            return res.json(
                {code:1,msg:'后端出错了'}
            )
        }
        if(doc){
            return res.json(
                {code:0,data:doc}
            )
        }
    });

});

function md5Pwd(pwd) {
    const salt = 'imooc_is_good_552342!`*&ashfj'
    return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router;