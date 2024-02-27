import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  moreImages: {
    type: [String],
    default: []
  },
  price:{
    type:String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  productSizes: {
    type: [String],
    default: [],
    required: true

  },
  productColors: {
    type: [String],
    default: [],
    required: true

  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel
