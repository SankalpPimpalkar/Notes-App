'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event: { target: HTMLInputElement }) => {

        const { name, value } = event.target;

        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    console.log(userDetails)

    return (
        <div className="w-full max-h-screen flex items-center justify-center bg-white sm:bg-gray-100">
            <div className="w-full max-w-md bg-white rounded sm:shadow p-8">
                <h1 className="text-3xl font-medium text-start mb-8">Log In</h1>

                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={userDetails.email}
                            onChange={(e) => handleInputChange(e)}
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={userDetails.password}
                            onChange={(e) => handleInputChange(e)}
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Login button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {/* Link to signup */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
