import React from 'react'
import './Styles/GlobalStyle.css'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import ContextProvider from './Context/ContextProvider'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import UserLogin from './Components/UserLogin'
import Register from './Components/Register'
import UserProfile from './Components/UserProfile'
import UserPvtComponent from './Components/UserPvtComponent'
import MyCart from './Components/MyCart'
import Juice from './Components/Juice'
import Oil from './Components/Oil'
import ProductDetails from './Components/ProductDetails'
import CartProductDetails from './Components/CartProductDetails'
import Footer from './Components/Footer'
import OrderPage from './Components/OrderPage'
import AdminPvtComp from './Admin/AdminPvtComp'
import AdminPanel from './Admin/AdminPanel'
import Error404 from './Components/Error404'



const App = () => {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<UserPvtComponent />}>
              <Route path={`/user_profile`} element={<UserProfile />} />
              <Route path={`/mycart`} element={<MyCart />} />
              <Route path={`/order-product/:id`} element={<OrderPage />} />
            </Route>

            <Route path={`/`} element={<HomePage />} />
            <Route path={`/juice`} element={<Juice />} />
            <Route path={`/oil`} element={<Oil />} />
            <Route path={`/userlogin`} element={<UserLogin />} />
            <Route path={`/juice`} element={<HomePage />} />
            <Route path={`/oil`} element={<HomePage />} />
            <Route path={`/register`} element={<Register />} />
            <Route path={`/product_details/:id`} element={<ProductDetails />} />
            <Route path={`/cart_product_details/:id`} element={<CartProductDetails />} />

            <Route element={<AdminPvtComp />}>
              <Route path={`/admin/admin_panel`} element={<AdminPanel />}></Route>
            </Route>

            <Route path={`*`} element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>

    </>
  )
}

export default App