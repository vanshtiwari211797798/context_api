const express = require('express');
const router = express.Router();
const UserModel = require('../UserModel/UserModel');
const bcrypt = require('bcrypt'); // for hashing user / admin password
const jwt = require('jsonwebtoken'); // for generating token / verifying token
const ProductModel = require('../AddProductModel/AddProduct');
const CartProductModel = require('../CartProductModel/CartProducts');
const Secret_Key = "hdggbnfbhgygjndkjfhgbhgbhghhnbgjgkjutyghdjgfhfjfjb";
const Customer_review_Model = require('../ReviewModel/ReviewModel');
const OrderModel = require('../OrderProductModel/OrderProductModel');





//middleware for checking current login user;

async function authProfileChecker(req, res, next) {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).json({ msg: "Unauthorized access, token not be provided" })
        } else {
            const jwt_token = token.replace('Bearer', "").trim();
            const isverify = jwt.verify(jwt_token, Secret_Key)
            const userProfile = await UserModel.findOne({ email: isverify.email }).select({ password: 0 });
            req.profile = userProfile
            next()
        }

    } catch (error) {
        console.error('error from user profile middleware', error);
    }
}



//middleware for get order product login users;

async function getcartproductsMiddleware(req, res, next) {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).json({ msg: "Token not provided" });
        } else {
            const jwttoken = token.replace('Bearer', "").trim();
            const decodedToken = jwt.verify(jwttoken, Secret_Key);

            const CartProducts = await CartProductModel.find({ userid: decodedToken.email }).select({ password: 0 });

            req.CartProductsData = CartProducts;
            next();
        }



    } catch (error) {
        console.error('Error from get order cart products middleware', error);
        // return res.status(401).json({ msg: "Token is invalid" });
    }
}


//middleware for getting order product

const getOrderProduct = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(402).json({ msg: "Unauthorized access token not be proided" })
        } else {
            const json_token = token.replace('Bearer', "").trim();
            const isverified = jwt.verify(json_token, Secret_Key);
            const OrderData = await OrderModel.find({ user_id: isverified.email }).select({ password: 0 });
            req.orderData = OrderData;
            next();
        }
    } catch (error) {
        console.error('error in middleware get order', error)
    }
}


//checking token if user is registered and verify user


const AuthTokenChecker = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            res.status(402).send('Unauthorized access, token not be provided')
        } else {
            const jwttoken = token.replace('Bearer', "").trim();
            const isverify = jwt.verify(jwttoken, Secret_Key);

            if (isverify) {
                next();
            }
        }
    } catch (error) {
        console.error('error in middleware verification', error)
    }
}

//for register a new user

router.post(('/register'), async (req, res) => {
    try {
        const { username, email, phone, password, state, district, village, pincode } = req.body;

        if (!username || !email || !phone || !password || !state || !district || !village || !pincode) {
            res.status(402).json({ msg: "All field is required" })
        }
        const UserExist = await UserModel.findOne({ email });
        if (UserExist) {
            res.status(401).json({ msg: "User Allready Exist", Success: false });
        }
        const SortRound = 10;
        const HashPassword = await bcrypt.hash(password, SortRound);
        const newUser = new UserModel({ username, email, phone, password: HashPassword, state, district, village, pincode });
        await newUser.save();
        res.status(200).send('Register Successfully')


    } catch (error) {
        console.error('erroe home root', error)
    }
})

//login api for registered users

router.post(('/userlogin'), async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(402).json({ msg: "All filed is required" })
        } else {
            const userRegistered = await UserModel.findOne({ email: email });

            if (userRegistered) {
                const User = await bcrypt.compare(password, userRegistered.password);

                if (User) {
                    const token = jwt.sign({ email, password }, Secret_Key, { expiresIn: "30d" });
                    userRegistered.token = token;
                    res.status(200).json({ msg: "login successfully", token: token, userId: userRegistered._id.toString() })
                } else {
                    res.status(401).send('Somethings went wrong')
                }
            } else {
                res.status(403).send('User not found')
            }
        }
    } catch (error) {
        console.error('error from user login', error);
    }
})

//api for showing login user details;

router.get(('/user_profile'), authProfileChecker, async (req, res) => {
    try {
        const UserData = req.profile;
        res.status(200).send(UserData)
    } catch (error) {
        console.error('error from user profile', error);
    }
})


//add product api for adding poduct

router.post(('/addproduct'),  async (req, res) => {
    try {
        const { name, desc, image, category, quantity, old_price, offer_price, product_id } = req.body;

        if (!name || !desc || !image || !category || !quantity || !old_price || !offer_price || !product_id) {
            res.status(402).send('All field is required')
        } else {
            const productExist = await ProductModel.findOne({ product_id: product_id });

            if (productExist) {
                res.status(401).send('Product allready exist')
            } else {
                const newProduct = new ProductModel({ name, desc, image, category, quantity, old_price, offer_price, product_id });
                await newProduct.save();
                res.status(200).send('Added successfully')
            }
        }
    } catch (error) {
        console.error('error from add product', error);
    }
})

//api for get all products;

router.get(('/getall_product'), async (req, res) => {
    try {
        const Products = await ProductModel.find();
        res.status(200).send(Products)
    } catch (error) {
        console.error('error from get product', error);
    }
})


//api for order product;

router.post(('/addtocartproduct'), AuthTokenChecker, async (req, res) => {
    try {
        const { name, desc, image, category, quantity, old_price, offer_price, product_id, userid } = req.body;


        if (!name || !desc || !image || !category || !quantity || !old_price || !offer_price || !product_id || !userid) {
            res.status(402).send('All field is required')
        } else {

            const Cart_Exist = await CartProductModel.findOne({ userid: userid, product_id: product_id });



            if (Cart_Exist) {

                // Cart_Exist.old_price += Number(old_price)
                // Cart_Exist.offer_price += Number(offer_price);
                // Cart_Exist.quantity += Number(1)
                // await Cart_Exist.save();
                // res.status(200).send('Added successfully')

                res.status(202).send('Allready added to cart')
            } else {
                await CartProductModel.create({ name, desc, image, category, quantity, old_price, offer_price, product_id, userid });
                res.status(200).send('Added successfully')
            }


        }


    } catch (error) {
        console.error('error from order product', error);
    }
})



//api for get order products of login user;

router.get(('/getcartproducts'), getcartproductsMiddleware, async (req, res) => {
    try {
        const CartProductsData = req.CartProductsData;

        res.status(200).send(CartProductsData)
    } catch (error) {
        console.error('error from get order product', error);
    }
})


//get product data with id;

router.get(('/get_product/:id'), async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id) ;
        res.status(200).send(product)
    } catch (error) {
        console.error('error from get product with id', error);
    }
})

//delete product by id;

router.delete(('/delete_product/:id'), async (req, res) => {
    try {
        const id = req.params.id;
        await CartProductModel.findByIdAndDelete(id);
        res.status(200).send("Deleted successfully")
    } catch (error) {
        console.error('error from delete product with id', error);
    }
})

//add review by customer;

router.post(('/customer_review'), async (req, res) => {
    try {
        const { customer_name, customer_phone, customer_email, customer_review } = req.body;

        if (!customer_name || !customer_phone || !customer_email || !customer_review) {
            res.status(402).json({ msg: "all field is required" })
        } else {
            const Customer_Review = new Customer_review_Model({ customer_name, customer_phone, customer_email, customer_review });
            await Customer_Review.save();
            res.status(200).send('Review added successfully')
        }

    } catch (error) {
        console.error('error from customer review', error);
    }
})

//show all review in home page;

router.get(('/show-review'), async (req, res) => {
    try {
        const Review = await Customer_review_Model.find();
        res.status(200).send(Review);
    } catch (error) {
        console.error('error from show customer review', error);
    }
})


// for order a product

router.post(('/order-product'), AuthTokenChecker, async (req, res) => {
    try {
        const { image, name, desc, category, quantity, old_price, offer_price, product_id, user_id, username, userphone, userstate, userdistrict, uservillage, userpincode, order_date } = req.body;

        if (image && name && desc && category && quantity && old_price && offer_price && product_id && user_id && username && userphone && userstate && userdistrict && uservillage && userpincode && order_date) {
            await OrderModel.create({ image, name, desc, category, quantity, old_price, offer_price, product_id, user_id, username, userphone, userstate, userdistrict, uservillage, userpincode, order_date });
            res.status(200).send('Order successfully')
        } else {
            res.status(402).send('All field is required')
        }

    } catch (error) {
        console.error('error from order a product', error);
    }
})


//getting order product 

router.get(('/get-order'), getOrderProduct, async (req, res) => {
    try {
        const OrderData = req.orderData;
            res.status(200).json({ Order: OrderData })
    } catch (error) {
        console.error('error from get order a product', error);
    }
})

//deleting order product by id

router.delete(('/delete-order-product/:id'), async (req, res) => {
    try {
        const id = req.params.id;
        const product = await OrderModel.findByIdAndDelete(id);
        res.status(200).send(product);
    } catch (error) {
        console.error('error from deleting order product', error);
    }
})



module.exports = router;