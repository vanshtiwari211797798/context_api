import React from 'react'
import Flower from '../Images/patti.png'
import Features from './Features'
import Products from './Products'
import CustomerReview from './CustomerReview'
import GiveReview from './GiveReview'


const HomePage = () => {
    return (
        <>
            {/* First Section start */}
            <section className="first_section">
                <div className="first_sect_first"></div>
                <div className="first_sect_second">
                    <img src={Flower} alt="flower image" />
                    <h3>Best Quality Product</h3>
                    <p>Join The Organic Movement!</p>
                    <p className="description">Discover endless shopping options and convenient delivery with MyShop, your go-to online marketplace for all needs..</p>
                </div>
            </section>
            {/* First Section End */}

            {/* Second Section Start */}
            <Features />
            {/* Second Section End */}

            {/* Third section start */}
            <Products />
            {/* Third section end */}

            {/* Customer review giving section start */}
            <GiveReview />
            {/* Customer review giving section end */}

            {/* Customer review section start */}
            <CustomerReview />
            {/* Customer review section end */}


        </>
    )
}

export default HomePage