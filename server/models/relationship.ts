import mongoose from 'mongoose';

const relationshipSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const relationShipModel = mongoose.model('relationship', relationshipSchema);
