const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');
const GameType = require('./../model/gameType.model');
const Game = require('./../model/game.model');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('SecretKey');

exports.login = async function (req,res){
    let data = req.body;
    let email = data.email;
    let password = data.password;
    let user = await User.findOne({email:email});
    // console.log(user);
    // console.log(user.password);
    if(email===user.email && password===user.password){
        var token = jwt.sign({ email: email }, 'shhhhh');
        return res.status(200).json({
                message:'logged IN !',
                user,
                token
            })
    }
    else{
        return res.status(401).json({
            message:'check your email or password'
        })
    }
}

exports.users = async function (req,res){
    console.log('0------0')
    let users = await User.find();
    return res.status(200).json({
        users
    })
}

exports.user = async function (req,res){
    let email = req.body.email;
    console.log(email);
    let user = await User.findOne({email:email});
    return res.status(200).json({
        user
    })
}

// user Populate
exports.userPopulate = async function (req,res){
    User.find().populate('gametype').exec((req,docs)=>{
        return res.status(200).json({
            docs
        });
    });
}

// gametype Populate
exports.gametypePopulate = async function (req,res){
    GameType.find().populate('games').exec((req,docs)=>{
        return res.status(200).json({
            docs
        });
    });
}

// game Populate
exports.gamePopulate = async function (req,res){
    Game.find().populate('gametype').exec((req,docs)=>{
        return res.status(200).json({
            docs
        });
    });
}

// from user to games Populate
exports.userGPopulate = async function (req,res){
    User.find().populate({
        path: 'gametype',
        populate: {
            path: 'games',
            select: { name: 1 }
        }
    }).exec((req,docs)=>{
        return res.status(200).json({
            docs
        });
    });
}

// addToUser
exports.addToUser = async function (req,res){
    await User.findOneAndUpdate({_id: req.params.id}, {$push: {gametype: req.body.gametypeId}});
    // let user = await GameType.findOne({_id: req.params.id});
    return res.status(200).json({
        message: '---Updated---'
    })
}

// add games To GameType
exports.addToGameType = async function (req,res){
    await GameType.findOneAndUpdate({_id: req.params.id}, {$push: {games: req.body.gameId}});
    // let user = await GameType.findOne({_id: req.params.id});
    return res.status(200).json({
        message: '---Updated---'
    })
}

// add gametype To Game
exports.addToGame = async function (req,res){
    await Game.findOneAndUpdate({_id: req.params.id}, {$push: {gametype: req.body.gametypeId}});
    // let user = await GameType.findOne({_id: req.params.id});
    return res.status(200).json({
        message: '---Updated---'
    })
}

exports.upload = async function (req,res){
    console.log(req.file);
    return res.status(200).json({
        message:'uploaded successfully !'
    })
}

exports.signup = async function (req,res){
    let email=req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let newUser = new User({
        name,
        email,
        password
    })
    await newUser.save();
    return res.status(200).json({
        message:'User Added'
    })
}