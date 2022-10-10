import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";


const User = new mongoose.Schema ( 
    {
        firstname: {
            type: String,
            default: ''

        },
        lastname: {
            type: String,
            default: '',
        },
        facebookId: String,
        admin: {
            type: Boolean,
            default: false
        }
    }
)

User.plugin(passportLocalMongoose);
//modul.export gak pake kurawal
//exports. pake kurawal 
User = mongoose.model("User", User);
export default User;

