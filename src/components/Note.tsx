'use client';
import React, { useState, useEffect } from 'react';

export default function Note() {
    const [isStarred, setIsStarred] = useState(false);
    const [bgColor, setBgColor] = useState('');

    const bgColors = [
        'bg-red-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-200',
        'bg-purple-200',
        'bg-pink-200',
        'bg-indigo-200',
        'bg-teal-200',
        'bg-orange-200',
        'bg-lime-200',
        'bg-rose-200',
        'bg-amber-200',
        'bg-cyan-200',
        'bg-fuchsia-200',
        'bg-violet-200',
        'bg-sky-200',
        'bg-emerald-200',
    ];

    useEffect(() => {
        const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        setBgColor(randomColor);
    }, []);

    return (
        <div className={`${bgColor} px-7 py-5 w-full max-h-[19rem] rounded-lg cursor-pointer`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-medium text-gray-700'>
                    Note title
                </h3>

                <button onClick={() => setIsStarred(!isStarred)}>
                    {
                        isStarred ? (
                            <i className='bx bxs-star text-2xl text-gray-500' />
                        ) : (
                            <i className='bx bx-star text-2xl text-gray-500' />
                        )
                    }
                </button>
            </div>

            <p className='mt-5 text-base text-gray-500 text-pretty'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aut ipsam nisi fuga blanditiis eum veritatis quas optio, nesciunt eos ducimus maxime neque nobis cupiditate soluta quidem facilis odio aliquid.
            </p>

            <div className='mt-5 flex items-center justify-between'>
                <h6 className='text-lg text-gray-600 text-pretty'>
                    October 23, 2024
                </h6>

                <i className='bx bxs-pencil text-2xl text-gray-500' />
            </div>
        </div>
    );
}
