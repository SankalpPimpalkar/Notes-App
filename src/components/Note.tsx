/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import formatMongoDate from '@/utils/formatDate';
import React, { useState, useEffect } from 'react';

export default function Note({ noteData, deleteNote }: any) {
    const [isStarred, setIsStarred] = useState(false);
    const [bgColor, setBgColor] = useState('');

    console.log("Note data", noteData)

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

    useEffect(() => {
        setIsStarred(noteData?.isStarred)
    }, [noteData])

    return (
        <div className={`${bgColor} px-7 py-5 w-full flex flex-col items-start justify-between md:min-h-[15rem] rounded-lg cursor-pointer`}>

            <div className='flex flex-col items-center justify-between w-full'>
                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-xl font-medium text-gray-700'>
                        {noteData?.title}
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

                <p className='mt-5 w-full text-pretty truncate text-base text-gray-500'>
                    {
                        noteData?.description
                    }
                </p>
            </div>


            <div className='mt-5 w-full flex items-center justify-between'>
                <h6 className='text-lg text-gray-600 text-pretty'>
                    {formatMongoDate(noteData?.createdAt)}
                </h6>

                <div className='flex items-center gap-4'>
                    <i className='bx bxs-pencil text-2xl text-gray-500' />

                    <button onClick={() => deleteNote(noteData?._id)}>
                        <i className='bx bxs-trash text-2xl text-gray-500'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
