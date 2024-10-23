/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';
import Note from '@/components/Note'
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function App() {

  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    description: ''
  })

  const onLogout = async () => {
    const response = await axios.get('/api/auth/logout')
    if (response.data) {
      router.push('/auth/login');
      toast.success(response.data.message);
    }

    setIsLogoutModalOpen(false);
  }

  const onCreateNote = async () => {
    const response = await axios.post('/api/note/add-note', newNote)

    if (response.data) {
      toast.success(response.data.message)
      await getNotes()
    }

    setIsCreateNoteModalOpen(false);
  }

  const handleDeleteNote = async (noteId: string) => {
    const response = await axios.post('/api/note/delete-note', { noteId })

    if (response.data) {
      toast.success(response.data.message)
      await getNotes();
    }
  }

  const getNotes = async () => {
    const response = await axios.get('/api/note/get-notes');

    if (response.data) {
      console.log("Notes", response.data);
      setNotes(response.data.notes)
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

  useEffect(() => {
    getNotes()
  }, [isCreateNoteModalOpen])

  return (
    <div className="bg-white w-full max-w-7xl mx-auto min-h-screen flex">
      <Navbar openLogoutModal={() => setIsLogoutModalOpen(true)} />

      <div className='w-full max-h-screen overflow-x-auto'>
        <div className='sticky flex items-center justify-between top-0 py-5 px-5 md:py-6 md:px-10 z-10 bg-white'>
          <h1 className='text-xl md:text-3xl font-semibold'>
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

            <LogOut onClick={() => setIsLogoutModalOpen(true)} className='block lg:hidden p-2 w-9 h-9 rounded-full text-gray-100 bg-gradient-to-r from-purple-700 to-pink-600 hover:scale-105 cursor-pointer' />
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

          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-center'>
            <button onClick={() => setIsCreateNoteModalOpen(true)} className='border border-indigo-200 hover:bg-indigo-50 px-7 py-5 w-full h-full min-h-32 max-h-[15rem] flex items-center justify-center rounded-lg transition-all duration-500 cursor-pointer'>
              <i className='bx bx-plus text-5xl text-indigo-400'></i>
            </button>

            {
              notes.map((note: any) => (
                <Note key={note?._id} noteData={note}
                  deleteNote={handleDeleteNote} />
              ))
            }
          </ul>
        </div>
      </div>

      <Modal isOpen={isCreateNoteModalOpen}>
        <h1 className='text-xl font-semibold'>
          New Note
        </h1>

        <div className='mt-4'>
          <input
            type="text"
            className='w-full py-3 px-1 text-lg bg-transparent outline-none text-gray-600'
            placeholder='Note title'
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            rows={4}
            className='w-full py-3 px-1 text-lg bg-transparent outline-none text-gray-600'
            placeholder='Your note...'
            onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          />
        </div>

        <div className='flex flex-row-reverse gap-4'>
          <button onClick={onCreateNote} className='text-gray-100 bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500'>
            Create Note
          </button>
          <button onClick={() => setIsCreateNoteModalOpen(false)} className='text-gray-500 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200'>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal isOpen={isLogoutModalOpen}>
        <h1 className='text-xl font-semibold'>
          Logout
        </h1>

        <p className='mt-4 text-lg text-gray-600'>
          Are you sure you want to logout ?
        </p>

        <div className='flex flex-row-reverse gap-4 mt-5'>
          <button onClick={onLogout} className='text-gray-100 bg-black px-4 py-2 rounded-md hover:bg-black/90'>
            Logout
          </button>
          <button onClick={() => setIsLogoutModalOpen(false)} className='text-gray-500 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200'>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}
