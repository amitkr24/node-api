const mongoose   = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{
        type     : String,
        required : true,
    },
    lastname:{
        type     : String,
        required : true,
    },
    email:{
        type     : String,
        required : true,
        unique   :true,

    }, 
    //phone number of the agency, it must be a 10 digit number and unique
    phone: {
        type: Number,
        unique: true,
        required: true,
        maxlength: 10
    },
    username:{
        type : String,
    },
    password:{
        type : String,
    },
    status:{
        type: Number,
    },
    avatar:{
        type :String
    },
},{
    timestamps : true
}); 


const User = mongoose.model('user',userSchema);
module.exports = User;