import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Context from '../Context/Context'
import { toast } from 'react-toastify'



const OrderPage = () => {

    const navigate = useNavigate()

    const { profile, fetchProfile } = useContext(Context)

    const [item, setProductDetails] = useState('');


    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);

    const FetchProduct = async () => {
        try {
            const res = await fetch(`http://localhost:3000/get_product/${id}`, {
                method: "GET"
            });
            if (res.status === 200) {
                const final_res = await res.json();
                setProductDetails(final_res);
                setQuantity(final_res.quantity)
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    useEffect(() => {

        FetchProduct();

        const token = localStorage.getItem('user_token');

        if (token) {
            fetchProfile();
        }

    }, []);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.info('Minium One product is require')
        }
    };

    const increaseQuantity = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        } else {
            toast.info('Only ten product can select at once')
        }

    };

    const handleOrderNow = async (e) => {

        e.preventDefault();

        try {

            if (item) {
                const Order = {
                    image: item.image,
                    name: item.name,
                    desc: item.desc,
                    category: item.category,
                    quantity: quantity,
                    old_price: oldPrice,
                    offer_price: totalPrice,
                    product_id: item.product_id,
                    user_id: profile.email,
                    username: profile.username,
                    userphone: profile.phone,
                    userstate: profile.state,
                    userdistrict: profile.district,
                    uservillage: profile.village,
                    userpincode: profile.pincode,
                    order_date: Date().slice(0, 15)
                }

                let Confirm = window.confirm('Are you confirm for order')
                if (Confirm) {
                    const res = await fetch(`http://localhost:3000/order-product`, {
                        method: "POST",
                        headers: {
                            Authorization:`Bearer ${localStorage.getItem('user_token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Order)
                    })

                    if (res.status === 200) {
                        toast.success(`Order Places for ${item.name}`)
                        navigate('/mycart')
                    } else {
                        toast.error('Somethings went wrong')
                        navigate('/')
                    }
                } else {
                    toast.error('Please allow and try again')
                }


            }


        } catch (error) {
            console.error('error from order product', error)
        }

    };


    const totalPrice = Number(quantity * item.offer_price); // for calculationg current price based on product quantity

    const oldPrice = Number(quantity * item.old_price)

    return (
        <>
            <br /><br /><br /><br /><br /> <br /><br /><br /><br />
            <div className="product-detail">
                <div className="product-image">
                    <img src={`${item.image}`} alt={item.name} title={item.name} loading='lazy' />
                </div>
                <div className="product-info">
                    <h2>{item.name}</h2>
                    <p><strong>Description: &nbsp; </strong>{item.desc}.</p>
                    <p><strong>Category: &nbsp; </strong> {item.category}</p>
                    <p><strong>Price: &nbsp; <del className='old-price'>RS {oldPrice}</del> &nbsp; </strong> RS {totalPrice}</p>
                    <div className="quantity-control">
                        <button onClick={decreaseQuantity}>-</button>
                        <input type="number" value={quantity} readOnly />
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className="order-button" type='submit' onClick={handleOrderNow}>Order</button>
                </div>
            </div>

            <br /><br /><br /><br /><br /> <br /><br /><br /><br />
        </>
    )
}

export default OrderPage