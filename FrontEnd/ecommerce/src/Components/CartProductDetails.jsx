import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const CartProductDetails = () => {

    const navigate = useNavigate();

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

    }, []);

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
                        <button id='button' className="add-to-cart" onClick={() => navigate('/mycart')}>Go Back</button>
                        <Link style={{ textDecoration: "none" }} id='button' className="order-now" to={`/order-product/${id}`}>Order Now</Link>
                    </div>
                </div>
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </>
    );
};

export default CartProductDetails;
