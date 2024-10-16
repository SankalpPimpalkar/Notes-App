'use client';
import React, { useState } from 'react'

export default function Note() {

    const [isStarred, setIsStarred] = useState(false)

    return (
        <div className='bg-gray-200 px-7 py-5 w-full lg:max-w-[22rem] max-h-[17.5rem] rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer'>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-medium text-gray-500'>
                    Note title
                </h3>

                <button onClick={() => setIsStarred(!isStarred)}>
                    {
                        isStarred ?
                            (
                                <i className='bx bxs-star text-2xl text-gray-400' />

                            ) :
                            (
                                <i className='bx bx-star text-2xl text-gray-400' />
                            )
                    }
                </button>
            </div>

            <p className='mt-5 text-base text-gray-400 text-pretty'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aut ipsam nisi fuga blanditiis eum veritatis quas optio, nesciunt eos ducimus maxime neque nobis cupiditate soluta quidem facilis odio aliquid.
            </p>

            <div className='mt-5 flex items-center justify-between'>
                <h6 className='text-lg text-gray-700 text-pretty'>
                    October 23, 2024
                </h6>

                <i className='bx bxs-pencil text-2xl text-gray-400' />
            </div>
        </div>
    )
}
