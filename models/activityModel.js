import  mongoose from "mongoose" ;

const activitySchema = new mongoose.Schema(
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
        date2: {
            type: Date
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        affiliation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        },


        
    },
    {
      timestamps: true,
    }
)

 const Activities = mongoose.model("Activities", activitySchema);

export { Activities  };