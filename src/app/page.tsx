/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Navbar from '@/components/Navbar';
import Note from '@/components/Note'
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function App() {

  const router = useRouter();
  const [userData, setUserData] = useState<any>(null)

  const onLogout = async () => {

    const response = await axios.get('/api/auth/logout')
    if (response.data) {
      router.push('/auth/login');
      toast.success(response.data.message);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/auth/get-user')

      if (response.data) {
        console.log(response.data);
        setUserData(response.data.user)
      }
    })();
  }, [])

  return (
    <div className="bg-white w-full max-w-7xl mx-auto min-h-screen flex">
      <Navbar />

      <div className='w-full max-h-screen overflow-x-auto'>
        <div className='sticky flex items-center justify-between top-0 py-5 px-5 md:py-6 md:px-10 z-10 bg-white'>
          <h1 className='text-3xl font-medium'>
            Notes App
          </h1>

          <div className='flex items-center gap-4'>
            <p className='text-lg text-gray-600 hidden sm:block'>
              Welcome,
              {
                " " +
                String(userData?.username).toLocaleUpperCase()[0] +
                String(userData?.username).slice(1)
              }
            </p>

            <LogOut onClick={onLogout} className='block lg:hidden p-2 w-9 h-9 rounded-full text-gray-100 bg-gradient-to-r from-purple-700 to-pink-600 hover:scale-105 cursor-pointer' />
          </div>
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

          <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-center'>
            <li className='border border-gray-200 hover:bg-gray-50 px-7 py-5 w-full h-full min-h-[17.5rem] flex items-center justify-center rounded-lg transition-all duration-500 cursor-pointer'>
              <i className='bx bx-plus text-5xl text-gray-400'></i>
            </li>

            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(note => (
                <Note key={note} />
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
