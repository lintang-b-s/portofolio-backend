import  mongoose from "mongoose" ;

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
            ref: "Activity",
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




