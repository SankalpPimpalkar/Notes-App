/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {

        const req = await request.json();
        const { username, email, password } = req;

        console.log(req);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}