import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound() {

  return (
    <div className='flex justify-center items-center flex-col h-[80vh]'>
          <h1>PageNotFound</h1>
          <NavLink to='/' className='text-blue-600'>Home</NavLink>
    </div>
  )
}
