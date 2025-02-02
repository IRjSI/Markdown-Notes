import React from 'react'
import { useForm } from 'react-hook-form'
import authService from "../../appwrite/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice'

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const login = async (data) => {
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            console.log('login error::', error);
        }

    }

    return (
    <div className='flex items-center justify-center w-full py-4'>
        <div className='bg-gray-500 bg-opacity-40 w-72 p-4 rounded-lg'>

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 flex flex-col'>
                <input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className='p-2 rounded-sm bg-opacity-50 bg-gray-500 text-white focus:outline-none'
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                className='p-2 rounded-sm bg-opacity-50 bg-gray-500 text-white focus:outline-none'
                {...register("password", {
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full bg-violet-500 p-2"
                >Sign in</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
