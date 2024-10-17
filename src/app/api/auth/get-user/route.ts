/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
    try {

        const token = request.cookies.get('token')?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
        const { _id } = decodedToken;

        const userDetails = await User.findById(_id).select("-password");

        if (!userDetails) {
            return NextResponse.json({
                error: "Invalid token"
            }, { status: 401 })
        }

        return NextResponse.json({
            message: "User details fetched!!",
            success: true,
            user: userDetails
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}