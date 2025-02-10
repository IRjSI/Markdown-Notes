import React from 'react'
import { useForm } from 'react-hook-form'
import authService from "../appwrite/auth"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice'

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        try {
            await authService.googleLogin();
        } catch (error) {
            console.log("Google Error::",error);
        }
    };
    
    // In your Login component
    const login = async (data) => {
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate('/');
            }
        } catch (error) {
            console.log('login error::', error);
        }
    }

    return (
    <div className='flex items-center justify-center w-full py-4'>
        <div className='bg-transparent border-[1.5px] border-[#27272a] w-72 p-4 rounded-lg'>
        {/* <button
            onClick={handleGoogleSignIn}
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
        >
            Continue with Google
        </button> */}
        <div className='text-center'>
            Don't have an Account?<Link to='/signup' className='text-blue-500'>Sign Up</Link>
        </div>

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 flex flex-col'>
                <input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className='p-2 rounded-md bg-opacity-50 bg-transparent border-[1.5px] border-[#27272a] text-[#fafafa] focus:outline-none placeholder-[#a1a1aa]'
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
                className='p-2 rounded-md bg-transparent border-[1.5px] border-[#27272a] text-[#fafafa] focus:outline-none placeholder-[#a1a1aa]'
                {...register("password", {
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full bg-[#fafafa] text-black rounded-md p-2"
                >Sign in</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
