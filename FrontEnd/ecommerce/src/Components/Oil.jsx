import React, { useContext, useEffect } from 'react'
import Context from '../Context/Context';
import { Link } from 'react-router-dom';



const Oil = () => {

    const { product, fetchProduct } = useContext(Context);
    const { profile } = useContext(Context);

    const oil = product.filter((item) => item.category === 'oil' || item.category === 'OIL' || item.category === 'Oil')


    useEffect(() => {

        fetchProduct();

    }, [])

    return (
        <>
            <h2 className='products'>OIL</h2>
            <section className="third_section">
                {
                    oil.length > 0 ?

                        oil.map((item) => {
                            return (
                                <div className="third_section_first" key={item._id}>
                                    <div className="third_sect_first_first">
                                        <img src={`${item.image}`} alt="oil" loading='lazy' />
                                    </div>
                                    <div className="third_sect_first_second">
                                        <h2>{item.name}</h2>
                                        <p>{item.desc}</p>
                                        <h5>{item.quantity}</h5>
                                        <h3><del className='old-price'>RS {item.old_price}</del> &nbsp; RS {item.offer_price}</h3>
                                        <Link to={'/product_details/' + item._id}><button>SHOW</button></Link>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h2 style={{ color: "red", textAlign: "center" }}>NO OIL FOUND</h2>
                }

<h4>{profile.username}</h4>
            </section>
        </>
    )
}

export default Oil