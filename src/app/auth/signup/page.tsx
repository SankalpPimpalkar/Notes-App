'use client';

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {

    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        username: ""
    })

    const handleInputChange = (event: { target: HTMLInputElement }) => {

        const { name, value } = event.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const onSignup = async (event: FormEvent) => {

        event.preventDefault();
        try {

            const response = await axios.post("/api/auth/signup", userDetails);

            if (response.data) {
                console.log(response.data);
                router.push('/auth/login');
            }

        } catch (error) {
            console.log("User signup failed!!", error);
        }
    }

    return (
        <div className="w-full max-h-screen flex items-center justify-center bg-white sm:bg-gray-100">
            <div className="w-full max-w-md bg-white rounded sm:shadow p-8">
                <h1 className="text-3xl font-medium text-start mb-8">Sign Up</h1>

                <form onSubmit={onSignup} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={userDetails.username}
                            onChange={(e) => handleInputChange(e)}
                            id="username"
                            name="username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

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

                    {/* Signup button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Link to login */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
