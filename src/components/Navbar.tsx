import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='bg-white border-r p-4 hidden lg:block'>
            <Link href={'/'}>
                <div
                    className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-700 to-pink-600'
                />
            </Link>
        </div>
    )
}
