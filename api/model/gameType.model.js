var mongoose = require('mongoose');
const Game = require('./../model/game.model');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var GameType = new Schema({
    type:{
        type:String,
        require: true,
        unique: true
    },
    games:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Game' 
        }
    ]
});

var Model = mongoose.model('GameType', GameType);
module.exports = Model;

