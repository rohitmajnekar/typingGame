const express = require('express')
const router = express.Router()
const User = require('../Models/userModel')
const Score = require('../Models/scoreModel')
// const News = require('../models/newsModel')
// const Favs = require('../models/favModel')


router.post('/signup',async function(req,res){

    let usermodel = new User(req.body);

    await usermodel.save()
    .then(data=>{
        res.status(200).json(data)
        console.log(data)
    }).catch(err=>{

        throw err;
    })

    // console.log({...req.body,highscore:0, nogame:0})
})

router.post('/login',async function(req,res){
    
    User.find({email:req.body.email})
    .then(data => {
        console.log('email found')
        res.status(200).json({result:data});
        // if (data.password === req.body.password){
        // }else{
        //     res.status(400).json({passwordError:"Incorrect Password"})
        // }
        console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err:err})
    })

    console.log(req.body)
})

router.post('/getuserscore',async function(req,res){
    
    console.log('scores found')
    Score.find({email:req.body.email})
    .then(data => {
        console.log('scores found')
        res.status(200).json({result:data});
        // if (data.password === req.body.password){
        // }else{
        //     res.status(400).json({passwordError:"Incorrect Password"})
        // }
        console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err:err})
    })

    console.log(req.body)
})

router.post('/getalluserscore',async function(req,res){
    
    console.log('scores found')
    User.find({})
    .then(data => {
        console.log('scores found')
        res.status(200).json({result:data});
        // if (data.password === req.body.password){
        // }else{
        //     res.status(400).json({passwordError:"Incorrect Password"})
        // }
        console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({err:err})
    })

    console.log(req.body)
})

router.post('/submitscore',async function(req,res){
    
    let scoremodel = new Score(req.body);

    await scoremodel.save()
    .then(data=>{
        res.status(200).json(data)
        console.log(data)
    }).catch(err=>{

        throw err;
    })
})


router.post('/incrementprofile',async function(req,res){
    console.log("hello")
    User.findOneAndUpdate({email:req.body.email},{$inc : {'matchesplayed' : 1}}, (err, doc)=>{
        if(err){
            console.log("!working");
        }
    })
})

router.post('/updatehighscore',async function(req,res){
    console.log("hello")
    User.findOneAndUpdate({email:req.body.email}, {$set:{highscore:req.body.score}},{$inc : {'matchesplayed' : 1}}, (err, doc)=>{
        if(err){
            console.log("!working");
        }
    })
})


module.exports = router