import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const MyCart = () => {


  const { FetchMyCart, mycart, order, MyOrder } = useContext(Context);

  useEffect(() => {

    let token = localStorage.getItem('user_token');

    if (token) {
      FetchMyCart();
      MyOrder();
    }

  }, []);


  //deleting cart product

  const DeleteCart = async (Deletecart) => {
    try {
      const Confirm = window.confirm('Are you Sure to delete Cart ?')
      if (Confirm) {
        const Delete = await fetch(`http://localhost:3000/delete_product/${Deletecart}`, {
          method: "DELETE"
        })

        if (Delete.status === 200) {
          toast.success('Deleted Successfully')
          FetchMyCart();
        }
      } else {
        toast.error('Please allow and try again')
      }

    } catch (error) {
      console.error('unable to delete cart', error)
    }
  }


  return (
    <>
      <br /><br /><br />
      {mycart.length > 0 ? (
        <div className="cart-container">
          <h2>My Cart Total -&gt; {mycart.length}</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Order</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {mycart.map((item) => (
                <tr key={item._id} className="cart-item">
                  <td><img src={`${item.image}`} alt={item.name} className="cart-item-image" title={item.name} loading='lazy' /></td>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td><del className='old-price'>RS {item.old_price}</del>, RS {item.offer_price}</td>
                  <td><Link style={{ textDecoration: "none" }} to={'/cart_product_details/' + item._id} className="btn-delete">Order</Link></td>
                  <td><button className="btn-delete" onClick={() => DeleteCart(item._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>NO ANY PRODUCT IN THE CART</h2>
      )}

      {/* product order status */}

      <br /><br /><br /><br /><br /><br /><br />
      <div className="cart-container">
        {order.length > 0 ? (
          <div className="cart-section">
            <h2>My Order Total -&gt; {order.length}</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="cart-th">Image</th>
                  <th className="cart-th">Name</th>
                  <th className="cart-th">Description</th>
                  <th className="cart-th">Category</th>
                  <th className="cart-th">Quantity</th>
                  <th className="cart-th">Price</th>
                  <th className="cart-th">Buyer Name</th>
                  <th className="cart-th">Phone</th>
                  <th className="cart-th">State</th>
                  <th className="cart-th">District</th>
                  <th className="cart-th">Village</th>
                  <th className="cart-th">Pin Code</th>
                  <th className="cart-th">Order Date</th>
                  <th className="cart-th">Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => (
                  <tr key={index} className="cart-item">
                    <td><img src={`${item.image}`} alt={item.name} className="cart-item-image" title={item.name} loading='lazy' /></td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td><del className='old-price'>RS {item.old_price}</del>, RS {item.offer_price}</td>
                    <td>{item.username}</td>
                    <td>{item.userphone}</td>
                    <td>{item.userstate}</td>
                    <td>{item.userdistrict}</td>
                    <td>{item.uservillage}</td>
                    <td>{item.userpincode}</td>
                    <td>{item.order_date}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="no-product">NO ANY ORDER FOUND</h2>
        )}
      </div>
    </>
  );
}

export default MyCart;
