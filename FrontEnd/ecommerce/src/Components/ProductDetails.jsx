import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import Context from '../Context/Context';

const ProductDetails = () => {

    const navigate = useNavigate();

    const { profile, fetchProfile } = useContext(Context)

    const [item, setProductDetails] = useState('');

    const { id } = useParams();

    const FetchProduct = async () => {
        try {
            const res = await fetch(`http://localhost:3000/get_product/${id}`, {
                method: "GET"
            });
            if (res.status === 200) {
                const final_res = await res.json();
                setProductDetails(final_res);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    useEffect(() => {
        FetchProduct();

        let token = localStorage.getItem('user_token');

        if (token) {
            fetchProfile();

        }

    }, []);

    const AddToCart = async () => {

        if (item) {
            let Cart = {
                name: item.name,
                desc: item.desc,
                image: item.image,
                category: item.category,
                quantity: item.quantity,
                old_price: item.old_price,
                offer_price: item.offer_price,
                product_id: item.product_id,
                userid: profile.email
            }

            let token = localStorage.getItem('user_token');

            if (Cart.name && Cart.desc && Cart.image && Cart.category && Cart.quantity && Cart.old_price && Cart.offer_price && Cart.product_id && Cart.userid && token) {
                const res = await fetch(`http://localhost:3000/addtocartproduct`, {
                    method: "POST",
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('user_token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Cart)
                })

                if (res.status === 200) {
                    toast.success('Added Successfully')
                    navigate('/mycart')
                }else if (res.status === 202) {
                    toast.info('Allready Added in Cart')
                }else{
                    toast.error('Somethings went wrong')
                }
            }  else {
                toast.info('Please Login')
                navigate('/userlogin')
            }
        } else {
            console.error('No product details available to add to cart');
        }
    };

    return (
        <>
            <br /><br /><br />

            <div className="product-container">
                <div className="product-image">
                    <img src={`${item.image}`} alt={item.name} loading='lazy' />
                </div>
                <div className="product-details">
                    <h1>{item.name}</h1>
                    <p className="category">Category: {item.category}</p>
                    <p className="description">{item.desc}</p>
                    <div className="price">
                        <span className="old-price">RS {item.old_price}</span>
                        <span className="offer-price">RS {item.offer_price}</span>
                    </div>
                    <p className="quantity">Available Quantity: {item.quantity}</p>
                    <div className="buttons">
                        <button id='button' className="add-to-cart" onClick={AddToCart}>Add to Cart</button>
                        <Link style={{ textDecoration: "none" }} id='button' className="order-now" to={`/order-product/${item._id}`}>Order Now</Link>
                    </div>
                </div>
            </div>
            
            <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br />

        </>
    );
};

export default ProductDetails;
