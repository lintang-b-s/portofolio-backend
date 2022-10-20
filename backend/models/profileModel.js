import  mongoose from "mongoose" ;

import bcrypt   from "bcryptjs"

import { Organizations } from "./organizationModel.js";
import { Project } from "./projectModel.js"
import { Activities } from "./activityModel.js" 

const technologiesSchema = new mongoose.Schema(

    {
        name: {
          type: String,
          required: true,
        },
        image: {
            type: String,
        }
  
      },
      {
        timestamps: true,
      }
    );


const profileSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      education: {
        type: String,
      },
      image: {
        type: String,
      },
      birthDate: {
        type: Date,
      },
      technologies: [technologiesSchema],

      organizations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizations"
      }],
      projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }],
      activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activities",
    }],


    },
    {
      timestamps: true,
    }
  );


const Technologies = mongoose.model("Technologie", technologiesSchema);
const Profile = mongoose.model("Profile", profileSchema);

export {Technologies, Profile}
