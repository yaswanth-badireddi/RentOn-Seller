import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
//   product_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Seller' // Reference to the Seller model
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String
  },
  category: {
    type: String, 
    maxlength: 50
  },
  rental_price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  quantity:{
    type: Number,
    default:1,
    min: 0
  },
  is_available: {
    type: Boolean,
    default: true
  },
  image_url: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model('Product', productSchema);
