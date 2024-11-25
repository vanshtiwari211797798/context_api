import React from 'react'

const AddProduct = () => {
  return (
    <>
         <div className="container">
      <form className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea id="desc" name="desc" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" required />
        </div>
        <div className="form-group">
          <label htmlFor="old_price">Old Price</label>
          <input type="number" id="old_price" name="old_price" required />
        </div>
        <div className="form-group">
          <label htmlFor="offer_price">Offer Price</label>
          <input type="number" id="offer_price" name="offer_price" required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" required />
        </div>
        <div className="form-group">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" id="product_id" name="product_id" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  )
}

export default AddProduct