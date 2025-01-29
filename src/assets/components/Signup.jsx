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
    <div className='flex items-center justify-center w-full'>
        <form onSubmit={handleSubmit(signup)} className='mt-8'>
          <div className='space-y-5 flex flex-col'>
              <input
              label="Email: "
              placeholder="Enter your email"
              type="email"
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
              {...register("password", {
                  required: true,
              })}
              />
              <button
              type="submit"
              className="w-full"
              >Sign Up</button>
          </div>
        </form>
    </div>
  )
}

export default Signup
