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

//gak tau ni bisa gak . harusnya Users dijadiin const 
export default mongoose.model("User", User);

