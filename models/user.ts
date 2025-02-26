import { Model,models,model } from "mongoose";
import { Document,Schema } from "mongoose";

import bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/i.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v); // Check for at least one uppercase letter
      },
      message: 'Password must contain at least one uppercase letter.',
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    required: false,
  },
  verificationCodeExpires: {
    type: Date,
    required: false,
  },
  resetPasswordCode: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // You can add more roles if needed
    default: 'user',
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const generatedPassword =this.password;
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(generatedPassword, salt);
      next();
    } catch (error) {
      throw error;
    }
  });

userSchema.methods.comparePassword = async function (password){
    try{
        return await  bcrypt.compare(password,this.password);
    } catch(err){
        throw err
    }
}

const UserModel = models.User || model('User',userSchema)

export default UserModel