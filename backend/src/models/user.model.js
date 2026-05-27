const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/config")


const userSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:[true,"full name is required"],
        trim:true,
        minlength:[3,"minimum 3 length character required in fullname"],
        maxlength:[30,"maximum 30 length character allowed in fullname"],
        match: [ /^[a-zA-Z\s.'-]+$/,"Invalid full name"],
        set: v => v.replace(/\s+/g, ' ')
    },
    username:{
        type:String,
        required:[true,"username must be required"],
        lowercase:true,
        trim:true,
        unique:true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username cannot exceed 20 characters"],
        match: [/^(?!.*[_.]{2})[a-z0-9._]+$/,"Only lowercase letters, numbers, . and _ allowed"],
       set: v => v.replace(/\s+/g, '')
    },
    email:{
        type:String,
        required:[true,"email is required"],
        lowercase:true,
        trim:true,
        unique:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
      },
    profilePhoto:{
      type:String,
      default:"https://ik.imagekit.io/a490stdk4/profile.webp?updatedAt=1775487922189",
    },
    coverPhoto:{
        type:String,
        default:"https://ik.imagekit.io/a490stdk4/banner%20image.webp"
    },
    bio:{
        type:String,
        default:"",
        maxlength: [100, "Bio cannot exceed 100 characters"],
        trim: true,
    },

},{timestamps:true});


userSchema.pre("save",async function(){
 if (!this.isModified("password")) return;
 const SALT_ROUNDS =  Number(config.BCRYPT_SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
  };


userSchema.methods.toJSON = function() {
    const obj = this.toObject();

    delete obj.password;
    delete obj.__v;

    return obj;
  }


const userModel = mongoose.model("User", userSchema);


module.exports = userModel