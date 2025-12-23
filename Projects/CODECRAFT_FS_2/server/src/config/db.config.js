import mongoose from "mongoose";

export const dbConnect = async() =>{
    try {
        const DB_URL = process.env.DATABASE;
        const response = await mongoose.connect(DB_URL);
        console.log(response.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}