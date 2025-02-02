import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar({$id,title}) {

  return (
    <div className='flex'>
        <div className=''>
            {/* <div className='mx-24'>
                <p>All Notes</p>
            </div> */}
            <div className='flex flex-col w-[180px]'>
              <Link to={`/edit-note/${$id}`} className={`text-[#9ca3af] p-1 my-2 hover:rounded-md hover:cursor-pointer hover:bg-[#1f2937] w-full`}>
                {title}
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
