/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const req = await request.json();
        const { email, password } = req;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: "User does not exist"
            }, { status: 404 })
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);

        if (!isCorrectPassword) {
            return NextResponse.json({
                error: "Incorrect Password"
            }, { status: 401 })
        }

        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "30d" })

        const response = NextResponse.json({
            message: "Login successfull",
            success: true
        })

        response.cookies.set('token', token, {
            httpOnly: true
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}