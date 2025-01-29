import { useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './App.css'
import Header from './assets/components/Header/Header';
import Home from './assets/components/Home';
import Sidebar from './assets/components/Sidebar';
import Login from './assets/components/Login';
import { Outlet } from 'react-router-dom';
import Signup from './assets/components/Signup';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-gray-100'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
