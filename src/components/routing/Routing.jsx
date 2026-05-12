import React from 'react'
import './Routing.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../home/HomePage'
import SignupPage from '../authentication/SignupPage'
import ProductsPage from '../products/ProductsPage'
import SingleProductPage from '../singleProduct/SingleProductPage'
import LoginPage from '../authentication/LoginPage'
import CartPage from '../cart/CartPage'
import MyOrderPage from '../myorder/MyOrderPage'
import Logout from '../authentication/Logout'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/myorders" element={<MyOrderPage />} />
                <Route path="/logout" element={<Logout />} />
            </Route>
        </Routes>
    )
}

export default Routing