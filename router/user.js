const express=require('express');
const router= express.Router();
const User = require('../models/User')
const bcrypt=require('bcryptjs');
const passport=require('passport');
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{
    const {name , email,password,password2} =req.body;
    let errors=[];

    if(!name || !email || !password ||!password2){
        errors.push({ msg : 'Please Fill All the Fields'});
    }

    if(password2!=password) errors.push({ msg : 'Passwords do no Match'});

    if(password2.length<4) errors.push({ msg : 'Passwords length should be at least 4'});


    if(errors.length>0){
        res.render('register',{
            errors,name , email,password,password2
        })
    }else {
        User.findOne({
            email:email
        })
        .then(user=>{
            const newuser=new User({
                name, email, password
            });

            bcrypt.genSalt(10,(err,salt)=> bcrypt.hash(newuser.password,salt , (err , hash)=>{
                if(err) throw err;
                newuser.password=hash;
                newuser.save()
                .then(user =>{
                    res.redirect('/users/login')
                })
                .catch(err => console.log(err));
            }))
            console.log(newuser);
            return res.redirect('/user/login');
        })
    }

})

//login handle

router.post('/login', function(req, res, next) {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect : '/user/login'
    })(req,res,next);
  });


module.exports=router;