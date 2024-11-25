import React, {useContext, useEffect} from 'react';
import Context from '../Context/Context';




const CustomerReview = () => {

  const {fetchReview, review } = useContext(Context)

  useEffect(() => {

    fetchReview();

  }, [])


  return (
    <>
    <div className="review-wrapper">
          <h2 className="review-heading">Customer Reviews</h2>
    {
      review.length > 0 ?
      review.slice(0, 6).map((item) => {
        return(
          
          <div className="review-card" key={item._id}>
            <div className="customer-info">
              <h3 className="customer-name">{item.customer_name}</h3>
              <p className="customer-review"><q>{item.customer_review}</q></p>
            </div>
          </div>
     
        )
      })
      : <h2 style={{color:"red", textAlign:"center"}}>NOT REVIEW YET, GIVE REVIEW</h2>
    }
   </div>

    </>
   
  );
}

export default CustomerReview;
