/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import Note from "@/models/note.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function PATCH(request: NextRequest) {
    try {

        const req = await request.json();
        const { noteId, isStarred } = req;
        console.log("NoteId", noteId)

        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            return NextResponse.json({
                error: "Token is missing"
            }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);

        if (!decodedToken) {
            return NextResponse.json({
                message: "Invalid token",
                success: false
            })
        }

        const note = await Note.findByIdAndUpdate(noteId, {
            $set: {
                isStarred: !isStarred
            }
        });

        return NextResponse.json({
            message: isStarred ? "Note removed from starred!!" : "Note Added as starred!!",
            success: true,
            note
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}