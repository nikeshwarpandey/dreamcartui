import React from 'react'
import { getUser } from '../../services/userServices'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginPage from '../authentication/LoginPage'

const ProtectedRoute = () => {
    const location = useLocation()
    console.log(location)
    return getUser() ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />
}

export default ProtectedRoute