/* eslint-disable @typescript-eslint/no-explicit-any */
import Note from "@/models/note.model";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            return NextResponse.json({
                error: "Token is missing"
            }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);

        if (!decodedToken || !decodedToken._id) {
            return NextResponse.json({
                error: "Invalid or expired token"
            }, { status: 401 });
        }

        const { _id } = decodedToken;
        console.log("Decoded user ID:", _id);

        const objectId = new mongoose.Types.ObjectId(_id);

        // Fetch notes for the user
        const notes = await Note.find({ user: objectId }).sort({ createdAt: -1 });
        console.log("Fetched notes for user:", notes);

        return NextResponse.json({
            message: "Notes fetched successfully",
            success: true,
            notes: notes
        });

    } catch (error: any) {
        console.error("Error fetching notes:", error.message);
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
