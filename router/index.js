const express=require('express');
const router= express.Router();

router.get('/',(req,res)=>{
    res.render('Welcome');
})

router.get('/dashboard',(req,res)=>{
    res.sendFile('../msg/index');
})


module.exports=router;