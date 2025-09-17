import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    maxlength: 15,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point',
//     },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       index: '2dsphere',
//     },
//   },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
        type: Date,
        default: Date.now,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationExpires: Date,
},{timestamps:true});

export const Seller=mongoose.model('Seller',sellerSchema);