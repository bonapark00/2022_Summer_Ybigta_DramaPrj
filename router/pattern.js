var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var template = require('../lib/template.js');
var http_request = require('request');
const YouTubeNode = require('youtube-node');
let youtube_key = "AIzaSyAEkXTA3wXvrhQG2IW9q-cus35oHaHmE7I";
let YouTube = new YouTubeNode();
YouTube.setKey(youtube_key);
router.use(express.static('./'));



// emotion pattern page
router.get("/", function(req, res){
res.sendFile(path.join(__dirname, "/../lib/1pattern.html"));
});


router.get("/joy", function(req, res){
res.sendFile(path.join(__dirname, "../lib/1_1joy.html"));
});

router.get("/sad", function(req, res){
res.sendFile(path.join(__dirname, "../lib/1_2sad.html"));
});

router.get("/anxiety", function(req, res){
res.sendFile(path.join(__dirname, "../lib/1_3anxious.html"));
});

router.get("/anger", function(req, res){
res.sendFile(path.join(__dirname, "../lib/1_4anger.html"));
});

module.exports = router;
