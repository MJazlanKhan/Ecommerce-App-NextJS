import express from "express";
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  country: {
    type: String,
  },
  companyName: {
    type: String,
  },
  streetAddress: {
    type: String,
  },
  Apt: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  phone: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  deliveryInstruction: {
    type: String,
  },

  Status: {
    type: String,
  }
})

const authModel = mongoose.model("users", authSchema);

export default authModel