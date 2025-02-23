import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux';

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData)) // if user found
      } else {
        dispatch(logout()) // if not found
      }
    })
    .finally(setLoading(false))
  }, [])

  return (
    <div className='flex flex-col min-h-screen bg-[#09090b] text-[#fafafa] font-outfit'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
