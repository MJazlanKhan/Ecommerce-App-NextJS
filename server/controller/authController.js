import authModel from "../models/authModel.js"
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import adminModel from "../models/adminModel.js"
import bcryptjs from 'bcryptjs'
import OrderModel from '../models/OrderModel.js'
import jwt from "jsonwebtoken";
class AuthController {
    // static adminLogin = async (req, res) => {
    //     const { email, password } = req.body;
    //     try {
    //         if (email && password) {
    //             const isEmail = await adminModel.findOne({email:email})
    //           if (isEmail) {
    //             if (isEmail.email === email) {
    //               const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
    //                 expiresIn: "2d"
    //               });
    //               return res.status(200).json({
    //                 message: "Login Sucessfully",
    //                 token,
    //                 username: isEmail.nickname,
    //                 type: "admin",
    //                 Id: isEmail._id,
    //                 email: isEmail.email
    //               });
    //             } else {
    //               return res.status(400).json({ message: "Wrong Credentials" })

    //             }
    //           } else {
    //             return res.status(400).json({ message: "Email ID Not Found!!" })
    //           }
    //         } else {

    //           return res.status(400).json({ message: "All Fields are Required" })
    //         }
    //       } catch (error) {
    //         return res.status(400).json({ message: error.message })
    //       }
    //     }
    static userRegisteration = async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body)
        try {
            if (email, password) {
                const isUser = await authModel.findOne({ email: email });
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new authModel({
                        email: email,
                        password: hashPassword,
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return res.status(200).json({ message: "Users Registration Sucessfully" })
                    }
                } else {
                    return res.status(400).json({ message: "Email Already Registered" })
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    static AdminLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await adminModel.findOne({ email: email })
                console.log(isEmail)
               
                if(isEmail && password === isEmail.password){
                    const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                        expiresIn: "2d"
                    })
                    return res.status(200).json({
                        message: "Login Sucessfully",
                        token,
                        Id: isEmail._id,
                        type:"admin"
                    });
                }else {
                    return res.status(400).json({ message: "Wrong Credentials" })
                }

            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({ email: email })
                console.log(isEmail)
                if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                            expiresIn: "2d"
                        });
                        return res.status(200).json({
                            message: "Login Sucessfully",
                            token,
                            username: isEmail.nickname,
                            Id: isEmail._id,
                        });
                    } else {
                        return res.status(400).json({ message: "Wrong Credensitials" })
                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" })

                }


            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }

    static createProductPost = async (req, res) => {
        const { title, description, price, category, featuredImage, moreImages, productSizes, productColors, rating, summary } = req.body;
        if (!title || !description || !price || !category || !featuredImage || !productSizes || !productColors || !rating || !summary || !moreImages) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }
        try {
            // Check if the category exists
            const existingCategory = await CategoryModel.findById(category);
            if (!existingCategory) {
                return res.status(400).json({ message: "Category does not exist" });
            }

            // Create the new product
            const newProduct = new ProductModel({
                title: title,
                summary: summary,
                description: description,
                price: price,
                category: category,
                rating: rating,
                featuredImage: featuredImage,
                moreImages: moreImages,
                productSizes: productSizes,
                productColors: productColors
            });
            const savedProduct = await newProduct.save();

            // Update the category to include the new product
            existingCategory.products.push(savedProduct._id);
            await existingCategory.save();

            return res.status(200).json({ message: "Product Created Successfully", product: savedProduct });
        } catch (error) {
            return res.status(500).json({ message: "Error creating product", error: error.message });
        }
    }

    static getAllUsersDetails = async (req, res) => {
        try {
          const Users = await authModel.find()  
            res.send(Users)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static getAllCompletedOrders = async (req, res) => {
        try {
          const CompletedOrders = await OrderModel.find({Status : "Completed"})  
            res.send(CompletedOrders)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static createCategory = async (req, res) => {
        const { name } = req.body;

        // Check if name and description are provided
        if (!name) {
            return res.status(400).json({ message: "Name are required" });
        }

        // Check if the category name already exists
        try {
            const existingCategory = await CategoryModel.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ message: "Category name already exists" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error checking category existence" });
        }

        // Create the new category
        try {
            const newCategory = new CategoryModel({
                name: name
            });
            const savedCategory = await newCategory.save();
            if (savedCategory) {
                return res.status(200).json({ message: "Category Created Successfully", category: savedCategory });
            } else {
                return res.status(500).json({ message: "Failed to create category" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error creating category", error: error.message });
        }
    }
    static getSingleProduct = async (req, res) => {
        // const {id}
        console.log(req.params.id)
        try {
            const Products = await ProductModel.findById(req.params.id);
            res.send(Products)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static getSingleCategoryProducts = async (req, res) => {
        const categoryId = req.params.Category
        try {
            // const Products = await ProductModel.findById(req.params.id);
            const category = await CategoryModel.findById(categoryId).populate('products');
            // const products = category;
            res.send(category)
            // console.log(products)

        } catch (error) {
            res.status(400).send(error)
        }
    }
    static DeleteCategory = async (req, res) => {
        try {
            const category = await CategoryModel.findByIdAndDelete(req.params.id)
            res.send(category)

        } catch (error) {
            res.status(400).send(error)
        }
    }
    static EditCategory = async (req, res) => {
        const { name } = req.body
        try {
            const category = await CategoryModel.findById(req.params.id)
            category.name = name
            const updatedCategory = await category.save();
            res.send(updatedCategory)

        } catch (error) {
            res.status(400).send(error)
        }
    }
    static editSingleProduct = async (req, res) => {
        const { id } = req.params;
        const { title, summary, description, category, featuredImage, price, productSizes, productColors, rating, moreImages } = req.body;

        try {
            const product = await ProductModel.findById(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            // console.log(title)
            product.title = title;
            product.summary = summary;
            product.description = description;
            product.category = category;
            product.featuredImage = featuredImage;
            product.price = price;
            product.moreImages = moreImages;
            product.productSizes = productSizes;
            product.productColors = productColors;
            product.rating = rating;

            const updatedProduct = await product.save();

            res.json(updatedProduct);
        } catch (error) {
            console.error('Error editing product:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    static removingProductMoreImages = async (req, res) => {
        const productId = req.params.id;
        const { image } = req.body;
        console.log(req.body)
        try {
            // Find the product by ID
            const product = await ProductModel.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Remove the specified image URL from the moreImages array
            product.moreImages = product.moreImages.filter(img => img !== image);

            // Save the updated product
            await product.save();

            return res.status(200).json({ message: 'Image removed successfully' });
        } catch (error) {
            console.error('Error removing image:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    };

    static deleteSingleProduct = async (req, res) => {
        // const {id}
        console.log(req.params.id)
        const productId = req.params.id
        try {
            const DeletedProduct = await ProductModel.findByIdAndDelete(productId);
            if (!DeletedProduct) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const category = await CategoryModel.findOneAndUpdate(
                { products: productId },
                { $pull: { products: productId } },
                { new: true }
            );
            res.status(200).send("Post Has Been Deleted")
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static getProducts = async (req, res) => {
        try {
            const Products = await ProductModel.find();
            res.send(Products)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static getCategories = async (req, res) => {
        try {
            const Categories = await CategoryModel.find();
            res.send(Categories)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static addToCart = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            let cart = await CartModel.findOne({ userId });

            if (!cart) {
                cart = new CartModel({ userId, items: [] });
            }

            // Check if the product already exists in the cart
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
        }
    }
    static getUserDetails = async (req, res) => {
        const { id } = req.params
        try {
            const User = await authModel.findById(id)
            res.send(User)
        } catch (error) {
            res.send(error)
        }
    }
    static getCategoriesProductsByName = async (req, res) => {
        const { id } = req.params
        try {
            const category = await CategoryModel.find({ name: id }).populate('products');

            res.send(category)
        } catch (error) {
            res.send(error)
        }
    }
    static editUserDetails = async (req, res) => {
        const { id } = req.params
        const { firstName, lastName, country, companyName, streetAddress, Apt, city, state, phone, postalCode } = req.body
        try {
            const User = await authModel.findById(id)
            User.firstName = firstName
            User.lastName = lastName
            User.country = country
            User.companyName = companyName
            User.streetAddress = streetAddress
            User.Apt = Apt
            User.city = city
            User.state = state
            User.phone = phone
            User.postalCode = postalCode
            const updatedUser = await User.save();
            res.send(updatedUser)
        } catch (error) {
            res.send(error)
        }
    }
    static UpdateOrderStatus = async (req, res) => {
        const { id } = req.params
        console.log(id)
        try {
            const Order = await OrderModel.findById(id)
            Order.Status = "Completed"
            const updateOrder = await Order.save();
            res.send(updateOrder)
        } catch (error) {
            res.send(error)
        }
    }
    static newOrder = async (req, res) => {
        const { cartDetails, userDetails, paymentDetails } = req.body;

        try {
            // Create a new order instance
            const newOrder = new OrderModel({
                cartDetails,
                // userDetails,
                paymentDetails,
                Status: "Active"
            });

            // Save the order to the database
            await newOrder.save();

            // Respond with a success message
            res.status(201).json({ message: 'Order Placed successfully.' });
        } catch (error) {
            // Handle errors
            console.error('Error saving order:', error);
            res.status(500).json({ message: 'An error occurred while saving the order.' });
        }
    }
    static SingleUserOrder = async (req, res) => {
        const { id } = req.params
        try {
            const userOrders = await OrderModel.find({ 'userDetails._id': id });

            // Send the orders data as the response
            res.status(200).json(userOrders);
        } catch (error) {
            // Handle errors
            console.error('Error fetching user orders:', error);
            res.status(500).json({ message: 'An error occurred while fetching user orders.' });
        }
    }
    static AllOrders = async (req, res) => {
        try {
            const userOrders = await OrderModel.find();

            // Send the orders data as the response
            res.status(200).json(userOrders);
        } catch (error) {
            // Handle errors
            console.error('Error fetching user orders:', error);
            res.status(500).json({ message: 'An error occurred while fetching user orders.' });
        }
    }
    static SearchUser = async (req, res) => {
        const searchWord = req.query.word;

        try {
            const Products = await ProductModel.find({
                name: { $regex: searchWord, $options: 'i' }
            });

            // Log the users' names to the console
            Products.forEach(Product => {
            });

            res.json({ Products });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };




}
export default AuthController