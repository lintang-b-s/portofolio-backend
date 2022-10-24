import  mongoose from "mongoose" ;

import { Project } from "./projectModel.js"
import { Activities } from "./activityModel.js" 

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        position: {
            type: String,

        },
        date1: {
            type: Date
        },
        date2: {
            type: Date
        },
        images: {
            type: Object
        },
        activities: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activities",
        }],
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
        
    },
    {
      timestamps: true,
    }
)

const Organizations = mongoose.model("Organizations", organizationSchema);

export { Organizations };




