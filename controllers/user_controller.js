const User  = require('../models/user');
let session = require('express-session'); 

// for listing all users
module.exports.index = async function(req,res){
    try{
        let user= await User.find({}).sort({ '_id' : -1 } );
        return res.render('../view/user/index',{data:user});
        //console.log(user);
    }
    catch(err){
        return res.status(500).json({
        message:'Internal Server Error'
      })
    }
};

// for create user form 
module.exports.register = function(req,res){
    res.render('../view/user/add-user')
};

//for creating new user
module.exports.create = async function(req,res){
    try {
        
        let user = await User.findOne({$or: [{email: req.body.email},{phone:req.body.phone}]});
        if(!user){
            if(req.file){
                req.body.avatar = req.file.filename;
            }
            let userAdded = await User.create(req.body);
            req.flash('success','User Created Successfully !');
            return res.redirect('/');
        }else {
            if(user.email == req.body.email){
                req.flash('error','Email Already Exist !');
                return res.redirect('/');
            }
            if(user.phone == req.body.phone){
                req.flash('error','Phone Number Already Exist !');
                return res.redirect('/');
            }
        }
    } catch {
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}

// for update user form
module.exports.show = async function(req,res){
    try {
        var id = await new require('mongodb').ObjectID(req.params.id);
        let user = await User.findOne({'_id':id});
        console.log(user);
        if(user){
            return res.render('../view/user/edit-user',{user:user,id:id});
        }
    } catch {
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
    
};

 //update existing user
 module.exports.updateUser = async function(req,res){
    try {
        let id = await req.params.id;
        let data = await req.body;
        if(req.file){
            data.avatar = req.file.filename;
        }
        let updated = await User.findByIdAndUpdate(id,data);
        req.flash('success','User Updated Successfully !');
        return res.redirect('/');
    } catch {
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
 }

 //remove user
 module.exports.destroy = async function(req,res){
    try {
        let uid = await req.params.id;
        let destroy = await User.findByIdAndDelete(uid);
        req.flash('success','User Deleted Successfully !');
        return res.redirect('/');
    } catch {
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
 }

