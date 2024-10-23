/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import Note from "@/models/note.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const req = await request.json();
        const { title, description } = req;
        console.log(req)

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

        const newNote = await Note.create({
            title,
            description,
            user: _id,
            isStarred: false
        })

        if (!newNote) {
            return NextResponse.json({
                error: "Note creation failed!!"
            }, { status: 400 })
        }

        return NextResponse.json({
            message: "New Note Created!!",
            success: true,
            note: newNote
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}