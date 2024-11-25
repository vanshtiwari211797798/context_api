import React, { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Context from '../Context/Context';



const NavBar = () => {

    const { FetchMyCart, mycart, order, MyOrder } = useContext(Context);

    useEffect(() => {

        let token = localStorage.getItem('user_token');

        if (token) {
            FetchMyCart();
            MyOrder();
        }
    }, [])

    const navigate = useNavigate();
    const auth = localStorage.getItem('user_token')

    //for Logout User
    const Logout = () => {

        const Confirm = window.confirm('Are you sure to Logout');

        if (Confirm) {
            localStorage.removeItem('user_token');
            navigate('/')
            toast.success('Logout Successfully');
        } else {
            toast.error('Please allow and try again')
        }



    }


    return (
        <>
            <nav className="navbar">
                <div className="navbar_first">
                    <h1>My<span>Shop</span></h1>
                    <Link className='NavLink' to={'/'}>HOME</Link>
                    <Link className='NavLink' to={'/juice'}>JUICE</Link>
                    <Link className='NavLink' to={'/oil'}>OIL</Link>
                </div>
                <div className="navbar_second"></div>
                <div className="navbar_third">
                    <Link className='NavLink' to={'/mycart'}>🛒<sup>{mycart.length} / {order.length}</sup></Link>
                    <Link className='NavLink' to={'/user_profile'}>👤</Link>
                    {auth ? <button style={{ background: "transparent", border: "none", cursor: "pointer" }} className='NavLink' onClick={Logout}>LOGOUT</button> : <Link className='NavLink' to={'/userlogin'}>LOGIN</Link>}
                </div>
            </nav>
        </>
    )
}

export default NavBar