import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartDetails: {
    type: Object,
    required: true,
  },
  userDetails: {
    type: Object,
    // required: true,
  },
  paymentDetails: {
    type: Object,
    required: true,
  },
  Status: {
    type: String
  },

}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
