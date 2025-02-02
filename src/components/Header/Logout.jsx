import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout as authLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const logout = await authService.logout();
        if (logout) dispatch(authLogout());
        navigate('/');
    }

    return (
    <button onClick={logoutHandler} className='text-red-500'>
        Logout
    </button>
  )
}

export default Logout