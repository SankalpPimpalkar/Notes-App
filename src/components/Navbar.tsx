import axios from 'axios'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Navbar() {

    const router = useRouter();

    const onLogout = async () => {

        const response = await axios.get('/api/auth/logout')

        if (response.data) {
            router.push('/auth/login');
            toast.success(response.data.message);
        }
    }

    return (
        <div className='h-full min-h-screen flex-col items-center justify-between bg-white border-r p-4 hidden lg:flex'>
            <Link href={'/'}>
                <div
                    className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-700 to-pink-600'
                />
            </Link>

            <LogOut onClick={onLogout} className='mb-5 p-3 w-11 h-11 rounded-full text-gray-100 bg-gradient-to-r from-purple-700 to-pink-600 hover:scale-105 cursor-pointer' />
        </div>
    )
}
