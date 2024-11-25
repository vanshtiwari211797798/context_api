import React, { useEffect, useState } from 'react';
import Context from './Context';

const ContextProvider = ({ children }) => {
  // fetching API for showing current login user details
  const [profile, setProfile] = useState('');

  const [product, setProduct] = useState([])

  const [mycart, setMyCart] = useState([]);

  const [review, setReview] = useState([]);

  const [order, setOrder] = useState([])





  //fetch product data;

  const fetchProduct = async () => {
    try {
      const product = await fetch(`http://localhost:3000/getall_product`, {
        method: "GET"
      })

      if (product.status === 200) {
        const final_product = await product.json();
        setProduct(final_product);
      }
    } catch (error) {
      console.error('fetching product', error)
    }
  }



  //fetch mycart data;

  const FetchMyCart = async () => {

    try {

      const res = await fetch(`http://localhost:3000/getcartproducts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }
      })

      if (res.status === 200) {
        const final_res = await res.json();
        setMyCart(final_res);
      }


    } catch (error) {
      console.error('fetching my cart data', error)
    }
  }


  //fetching user review;

  const fetchReview = async () => {
    try {
      const res = await fetch(`http://localhost:3000/show-review`, {
        method: "GET"
      })

      if (res.status === 200) {
        const final_res = await res.json();
        setReview(final_res)
      }
    } catch (error) {
      console.error('fetching my review data', error)

    }
  }


  //fetching user order products

  const MyOrder = async () => {
    try {
      const res = await fetch(`http://localhost:3000/get-order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }
      })

      if (res.status === 200) {
        const final_response = await res.json();
        setOrder(final_response.Order)
      }

    } catch (error) {
      console.error('unable to fetch user order products', error);
    }
  }


  const fetchProfile = async () => {

    try {
      const res = await fetch('http://localhost:3000/user_profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      });

      if (res.status === 200) {
        const finalRes = await res.json();
        setProfile(finalRes);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      fetchProfile();
    }


  }, [])

  return (
    <Context.Provider value={{ profile, fetchProfile, product, fetchProduct, FetchMyCart, mycart, setMyCart, fetchReview, review, order, MyOrder }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
