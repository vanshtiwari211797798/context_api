import React, { useContext, useEffect } from 'react'
import Context from '../Context/Context';
import { Link } from 'react-router-dom';


const Juice = () => {

    const { product, fetchProduct } = useContext(Context);

    useEffect(() => {

        fetchProduct();


    }, [])

    const juice = product.filter((item) => item.category === 'juice' || item.category === 'Juice' || item.category === 'JUICE');


    return (
        <>
            <h2 className='products'>JUICE</h2>
            <section className="third_section">
                {
                    juice.length > 0 ?

                        juice.map((item) => {
                            return (
                                <div className="third_section_first" key={item._id}>
                                    <div className="third_sect_first_first">
                                        <img src={`${item.image}`} alt="juice" loading='lazy'/>
                                    </div>
                                    <div className="third_sect_first_second">
                                        <h2>{item.name}</h2>
                                        <p>{item.desc}</p>
                                        <h5>{item.quantity}</h5>
                                        <h3><del className='old-price'>RS {item.old_price}</del>, &nbsp; RS {item.offer_price}</h3>
                                        <Link style={{ color: "#000", textDecoration: "none" }} to={`/product_details/` + item._id}> <button>Show</button></Link>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h2 style={{ color: "red" }}>NO JUICE FOUND</h2>
                }

            </section>
        </>
    )
}

export default Juice