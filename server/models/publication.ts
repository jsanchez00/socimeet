import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  emailUser: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const publicationModel = mongoose.model('publication', publicationSchema);

const publicationAnswerSchema = new mongoose.Schema({
  emailUser: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const publicationAnswerModel = mongoose.model('publicationAnswer', publicationAnswerSchema);

const publicationLikeSchema = new mongoose.Schema({
  emailUser: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const publicationLikeModel = mongoose.model('publicationLike', publicationLikeSchema);
