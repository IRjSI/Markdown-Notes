import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../../appwrite/auth';
import { logout as authLogout } from '../../../store/authSlice';

function Logout() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        const logout = await authService.logout();
        if (logout) dispatch(authLogout());
    }

    return (
    <button onClick={logoutHandler} className='text-red-500'>
        Logout
    </button>
  )
}

export default Logout