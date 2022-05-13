import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  nick: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  try {
    // check method of registration
    const user = this;
    if (!user.isModified('password')) next();
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = mongoose.model('user', userSchema);
