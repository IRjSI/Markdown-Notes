import React from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from '../../store/authSlice'

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/")
      }
    } catch (error) {
      console.log('signup error::', error);
    }
  }
 
  return (
    <div className='flex items-center justify-center w-full py-4'>
      <div className='bg-gray-500 bg-opacity-40 w-72 p-4 rounded-lg'>

        <form onSubmit={handleSubmit(signup)} className='mt-8'>
          <div className='space-y-5 flex flex-col'>
              <input
              label="Name: "
              placeholder="Enter your name"
              type="text"
              className='p-2 rounded-sm bg-opacity-50 bg-gray-500 text-white focus:outline-none'
              {...register("name", {
                required: true,
              })}
              />
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
              >Sign Up</button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default Signup
