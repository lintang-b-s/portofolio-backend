import mongoose from  "mongoose" ;
import dotenv from "dotenv";
import path from 'path';
if (process.env.NODE_ENV !== "production") {
const __dirname = path.resolve();
dotenv.config({
    path: path.resolve(__dirname, '.env')
  })
}

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
    try {
        console.log(dbUrl)
        console.log(process.env.DB_URL);
        console.log(process.env.NODE_ENV)
        const conn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
         
            useUnifiedTopology: true,
        
                
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
