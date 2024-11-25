import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



const AdminPvtComp = () => {
    const auth = sessionStorage.getItem('admin_token')

  return  auth ? <Outlet /> : <Navigate to={`/`} />

}

export default AdminPvtComp