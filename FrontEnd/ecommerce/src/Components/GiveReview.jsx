import React, { useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const GiveReview = () => {

  let navigate = useNavigate();


  const [Review, setReview] = useState({

    customer_name: "",
    customer_phone: "",
    customer_email: "",
    customer_review: ""

  })


  const HandleChange = (e) => {

    let name = e.target.name
    let value = e.target.value

    setReview({
      ...Review,
      [name]: value
    })

  }


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      if (Review.customer_name && Review.customer_phone && Review.customer_email && Review.customer_review) {
        const res = await fetch(`http://localhost:3000/customer_review`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Review)
        })


        if (res.status === 402) {
          toast.error('All field is required')
        } else if (res.status === 200) {
          toast.success('Review added successfully')
          setReview({customer_name:"", customer_phone:"", customer_email:"", customer_review:""});
          navigate('/')
        } else {
          toast.error('Server Error / Somethings went wrong')
        }
      } else {
        toast.error('All field is required')
      }

    } catch (error) {
      console.error('error from submit review form', error)
    }
  }





  return (
    <div className="review-form-wrapper">
      <div className="form-wrapper">
        <h2 className="form-heading">Please Give Review</h2>
        <form className="review-form">
          <div className="form-group">
            <label htmlFor="customerName">Name:</label>
            <input type="text" id="customerName" name="customer_name" value={Review.customer_name} onChange={HandleChange} placeholder='Enter Your Name' required />
          </div>
          <div className="form-group">
            <label htmlFor="customerPhone">Phone:</label>
            <input type="tel" id="customerPhone" name="customer_phone" value={Review.customer_phone} onChange={HandleChange} placeholder='Enter Your Phone' required />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">Email:</label>
            <input type="email" id="customerEmail" name="customer_email" value={Review.customer_email} onChange={HandleChange} placeholder='Enter Your Email' required />
          </div>
          <div className="form-group">
            <label htmlFor="customerReview">Review:</label>
            <textarea id="customerReview" name="customer_review" rows="4" value={Review.customer_review} onChange={HandleChange} placeholder='Enter Your Review' required></textarea>
          </div>
          <button type="submit" onClick={handleSubmit}>Submit Review</button>
        </form>
      </div>

    </div>
  )
}

export default GiveReview