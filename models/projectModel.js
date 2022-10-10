import mongoose from  "mongoose" ;

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,

        },
        date1: {
            type: Date
        },
        image: {
            type: String,
        },
        technologies: {
            type: String,
        },
        affiliation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizations"
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
          }


        
    },
    {
      timestamps: true,
    }
)

const Project = mongoose.model("Project", projectSchema);

export {Project}
