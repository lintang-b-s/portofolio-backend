import  mongoose from "mongoose" ;
import { Organizations } from "./organizationModel.js";
import { Project } from "./projectModel.js"
import { Activities } from "./activityModel.js" 

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
        image: {
            type: String
        },
        activities: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activities",
        },
        projects: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
        
    },
    {
      timestamps: true,
    }
)

const Organizations = mongoose.model("Organizations", organizationSchema);

export { Organizations };




