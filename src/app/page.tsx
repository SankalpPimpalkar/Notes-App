'use client';

import Navbar from '@/components/Navbar';
import Note from '@/components/Note'
import React from 'react'

export default function App() {
  return (
    <div className="bg-white w-full max-w-7xl mx-auto min-h-screen flex">
      <Navbar />

      <div className='w-full max-h-screen overflow-x-auto'>
        <div className='sticky top-0 py-5 px-5 md:py-6 md:px-10 z-10 bg-white'>
          <h1 className='text-3xl font-medium'>
            Notes App
          </h1>
        </div>

        <div className='px-5 pb-10 md:px-10'>
          <span className='bg-gray-200 w-full px-5 py-3 mt-4 flex items-center rounded-xl'>
            <i className='bx bx-search text-3xl text-gray-400'></i>
            <input
              className='bg-transparent text-xl pl-4 outline-none w-full text-gray-400'
              placeholder='Search Note...'
              type="text"
              autoFocus
            />
          </span>

          <ul className='flex flex-wrap gap-6 mt-8 items-center'>
            <li className='border border-gray-200 hover:bg-gray-50 px-7 py-5 w-full h-full min-h-[17.5rem] lg:max-w-[22rem] flex items-center justify-center rounded-lg transition-all duration-500 cursor-pointer'>
              <i className='bx bx-plus text-5xl text-gray-400'></i>
            </li>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(note => (
                <Note key={note} />
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
