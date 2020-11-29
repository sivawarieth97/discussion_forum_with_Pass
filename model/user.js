const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    }
    
});

const user=mongoose.model('User',schema);

module.exports= user;
