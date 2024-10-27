import mongoose from 'mongoose';

let isConnected: boolean = false;

export async function connect() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL!);

        isConnected = true;
        console.log('MongoDB connected!!');

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            isConnected = false;
            connect();
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
