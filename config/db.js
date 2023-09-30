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
        const conn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
         
            useUnifiedTopology: true,
        
                
        });

        console.log(`MongoDB Connected!!!`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
