const express = require('express');
const auth = require('./../controller/auth.controller');
const authMiddleWare = require('./../middlewares/auth.middleware');
const upload = require('./../middlewares/upload-middleware'); 
const router = express.Router();
router.post('/login',auth.login);
router.post('/user',auth.user);
router.get('/users',auth.users);

// user Populate
router.get('/userPopulate',auth.userPopulate);

// gametype Populate
router.get('/gametypePopulate',auth.gametypePopulate);

// game Populate
router.get('/gamePopulate',auth.gamePopulate);

// from user to game populate
router.get('/userGPopulate',auth.userGPopulate);

// add gametype in user
router.put('/addToUser/:id',auth.addToUser);

// add games in gametype
router.put('/addToGameType/:id',auth.addToGameType);

// 
router.put('/addToGame/:id',auth.addToGame);

// Upload File
router.post('/upload-file', upload.single('uploaded_file'), auth.upload);

router.post('/signup', auth.signup);
module.exports = router;