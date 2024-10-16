import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongodb connected!!')
        })

        connection.on('error', (err) => {
            console.log('Mongodb connection error', err)
        })

    } catch (error) {
        console.log("Mongodb connection error", error)
    }
}