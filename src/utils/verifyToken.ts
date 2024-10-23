/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";

export async function VerifyToken(request: NextRequest) {

    const token = request.cookies.get('token')?.value || '';
    const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
    const { _id } = decodedToken;

    const userDetails = await User.findById(_id).select("-password");

    if (!userDetails) {
        return NextResponse.json({
            error: "Invalid token"
        }, { status: 401 })
    }

    return userDetails
}