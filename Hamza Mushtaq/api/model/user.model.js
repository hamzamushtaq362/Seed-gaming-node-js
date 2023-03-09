var mongoose = require('mongoose');
const Cryptr = require('cryptr');
const GameType = require('./../model/gameType.model');
const cryptr = new Cryptr('SecretKey');
var Schema = mongoose.Schema;
var User = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    gametype:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'GameType' 
        }
    ]
});

User.pre("save", async function(next){
    const encryptedString = cryptr.encrypt(this.password);
    this.password=encryptedString;
    console.log(encryptedString);
    next();
})

User.post("findOne", async function(req){
    // console.log("findOne Model");
    // console.log(req);
    const decryptedString = cryptr.decrypt(req.password);
    // console.log(decryptedString);
    req.password=decryptedString;
})

var Model = mongoose.model('User', User);
module.exports = Model;

