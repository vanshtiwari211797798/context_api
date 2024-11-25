import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserPvtComponent = () => {

    const auth = localStorage.getItem('user_token')


    return auth ? <Outlet/> : <Navigate to={`/userlogin`}/>
}

export default UserPvtComponent