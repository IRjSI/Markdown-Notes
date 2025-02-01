import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

function Header() {
  const { status } = useSelector((state) => (state.auth));
  console.log(status);
  
  const [isLoggedIn, setIsLoggedIn] = useState(status);

  useEffect(() => {
    setIsLoggedIn(status); // Update local state when Redux state changes
  }, [status]);

  return (
    <div>
        <header className='p-4'>
          <nav className="bg-gray-800 p-4 rounded-md flex justify-between items-center backdrop-blur-md text-white">
          <Link to="/">Home</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <Logout />
          )}
        </nav>
        </header>
    </div>
  )
}

export default Header
