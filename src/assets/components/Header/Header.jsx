import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

function Header() {
  const { status } = useSelector((state) => (state.auth));

  return (
    <div>
        <header className='p-4'>
            <ul className='bg-gray-800 p-4 rounded-md flex justify-between gap-5 backdrop-blur-md'>
                <Link to={'/'}>Home</Link>
                {!status ? <Link to={'/login'}>Login</Link> : null}
                {!status ? <Link to={'/signup'}>Signup</Link> : null}
                {status ? <Logout /> : null}
            </ul>
        </header>
    </div>
  )
}

export default Header
