import React, { useEffect } from 'react'
import { logout } from '../../services/userServices';

const Logout = () => {
    useEffect(() => {
        logout();
        // localStorage.removeItem('token')
        window.location = '/';
    }, [])

    return null;
}

export default Logout