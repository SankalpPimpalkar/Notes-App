/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/database/config";
import Note from "@/models/note.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function PATCH(request: NextRequest) {
    try {

        const req = await request.json();
        const { title, description, noteId } = req;

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

        const updatedFields: any = {};

        if (title.trim()) {
            updatedFields.title = title;
        }
        if (description.trim()) {
            updatedFields.description = description;
        }

        const note = await Note.findByIdAndUpdate(noteId, { $set: updatedFields })

        if (!note) {
            return NextResponse.json({
                error: "Note failed to update"
            }, { status: 400 })
        }

        return NextResponse.json({
            message: "Note Updated!!",
            success: true,
            note: note
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}