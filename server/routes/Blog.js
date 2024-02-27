import express from "express";
import AuthController from "../controller/authController.js"
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
// import cloudinary from 'cloudinary';
// import BlogPost from '../models/blogPostModel.js'
import mongoose from "mongoose";
// import multer from "multer"
import authModel from "../models/authModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();


// All Routes

router.post('/Signup', AuthController.userRegisteration)
// router.post('/user/companySignup', AuthController.companyRegisteration)
router.post('/Signin', AuthController.userLogin)
router.post('/NewCategory', AuthController.createCategory)
router.get('/Categories', AuthController.getCategories)
router.get('/user/:id', AuthController.getUserDetails)
router.get('/users', AuthController.getAllUsersDetails)
router.put('/user/:id', AuthController.editUserDetails)
router.delete('/Category/:id', AuthController.DeleteCategory)
router.put('/Category/:id', AuthController.EditCategory)
router.get('/Products', AuthController.getProducts)
router.get('/Products/:Category/all', AuthController.getSingleCategoryProducts)
router.get('/Product/:id', AuthController.getSingleProduct)
router.delete('/Product/:id', AuthController.deleteSingleProduct)
router.put('/Product/:id', AuthController.editSingleProduct)
router.put('/Product/:id/images', AuthController.removingProductMoreImages)
router.put('/UpdateOrder/:id', AuthController.UpdateOrderStatus)
router.post('/NewProduct', AuthController.createProductPost)
router.post('/addtocart', AuthController.addToCart)
router.post('/newOrder', AuthController.newOrder)
router.get('/Products/:id/', AuthController.getCategoriesProductsByName)
router.get('/Orders/:id/', AuthController.SingleUserOrder)
router.get('/allOrders', AuthController.AllOrders)
router.get('/allCompletedOrders', AuthController.getAllCompletedOrders)
router.get('/SearchProduct', AuthController.SearchUser)
router.post('/AdminLogin', AuthController.AdminLogin)
// router.post('/user/companyLogin', AuthController.companyLogin)
// router.post('/admin', AuthController.adminLogin)
// router.post('/user/reset', AuthController.userReset)
// router.get('/company/:companyId', AuthController.companyProfile)
// router.get('/user/:userId', AuthController.userProfile)
// router.get('/company/:userId', AuthController.companyProfile)
// router.get('/public/company/:userId', AuthController.PublicCompany)
// router.post('/company/createjobpost', AuthController.createJobPost)
// router.get('/posts', AuthController.allPost)
// router.get('/allCompanies', AuthController.allCompanies)
// router.get('/allUsers', AuthController.allUsers)
// router.get('/adminallPost', AuthController.adminallPost)
// router.put('/updateStatus/:id', AuthController.updateStatus)
// router.put('/CompanyupdateStatus/:id', AuthController.updateCompanyStatus)
// router.put('/UserupdateStatus/:id', AuthController.updateUserStatus)
// router.get('/posts/:Jobid', AuthController.SinglePost)
// router.get('/company/posts/:userId', AuthController.CompanyPosts)
// router.get('/display/company/posts/:userId', AuthController.DisplayCompanyPosts)
// // router.get('/posts/:postId', AuthController.singlePost)
// router.put('/posts/:postId', AuthController.updatePost)
// router.put('/company/:userId', AuthController.updateCompany)
// router.put('/user/:userId', AuthController.updateProfile)
// // router.get('/user/job/Apply', AuthController.ApplyJob)
// router.put('/user/jobapply/:postId', AuthController.ApplyJob)
// router.delete('/posts/:postId', AuthController.deletePost)


  


export default router;
