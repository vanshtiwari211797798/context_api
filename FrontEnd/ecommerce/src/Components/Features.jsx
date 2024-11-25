import React from 'react'
import { Link } from 'react-router-dom'


const Features = () => {
    return (
        <>
            <section className="second_section">
                <div className="second_sect_first">
                    <h2>FREE SHIPING</h2>
                    <p>ABOVE 200RS</p>
                </div>
                <div className="second_sect_second">
                    <h2>SAVE MONEY</h2>
                    <p>EVERY PRODUCT</p>
                </div>
                <div className="second_sect_third">
                    <h2>24*7 SUPPORT</h2>
                    <p><Link style={{ textDecoration: "none", color: "rgb(250, 134, 0)" }} to={'tel:+91 8303280240'}>+91 8303280240</Link></p>
                    <p><Link style={{ textDecoration: "none", color: "rgb(250, 134, 0)" }} to={'mailto:vanshtiwari9091@gmail.com'}>vanshtiwari9091@gmail.com</Link></p>
                </div>

            </section>
        </>
    )
}

export default Features