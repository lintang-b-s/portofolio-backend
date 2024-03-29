import mongoose from  "mongoose" ;



// const imagesSchema = new mongoose.Schema(

//     {
//         projectId: {
//             type: mongoose.Schema.Types.ObjectId,
           
//             ref: "Project",
//         },

//         image: {
//             type: String,
//         }
  
//       },
//       {
//         timestamps: true,
//       }
//     );


const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
           
        },
        description: {
            type: String,

        },
        date1: {
            type: Date
        }, 
        images : { type: Object},
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

// const ProjectImage = mongoose.model("ProjectImage", imagesSchema);

const Project = mongoose.model("Project", projectSchema);

export {Project};
