import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  transmitter: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const chatMessageModel = mongoose.model('message', chatMessageSchema);
