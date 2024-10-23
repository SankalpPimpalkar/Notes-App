/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import Note from "@/models/note.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const req = await request.json();
        const { noteId } = req;
        console.log("NoteId", noteId)

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

        const isNoteDeleted = await Note.findByIdAndDelete(noteId)

        if (!isNoteDeleted) {
            return NextResponse.json({
                error: "Note deletion failed!!"
            }, { status: 400 })
        }

        return NextResponse.json({
            message: "Note Deleted!!",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}