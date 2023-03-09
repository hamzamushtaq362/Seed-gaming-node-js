var mongoose = require('mongoose');
const User = require('./../model/user.model');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var Game = new Schema({
    name:{
        type:String,
        require: true,
        unique: true
    },
    rating:{
        type:String,
        require: true,
        unique: true
    },
    publisher:{
        type:String,
        require: true,
        unique: true
    },
    gametype:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'GameType' 
        }
    ]
});

var Model = mongoose.model('Game', Game);
module.exports = Model;

