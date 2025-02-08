import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar({$id,title}) {

  return (
    <div className='flex'>
        <div className='w-full'>
            <div className='flex flex-col w-full'>
              <Link to={`/edit-note/${$id}`} className={`text-[#fafafa] p-1 pl-2 hover:rounded-md hover:cursor-pointer hover:bg-[#27272a] w-full truncate`}>
                {title}
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
