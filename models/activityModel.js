import  mongoose from "mongoose" ;

const activitySchema = new mongoose.Schema(
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
        date2: {
            type: Date
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        affiliation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizations"
        },


        
    },
    {
      timestamps: true,
    }
)

 const Activities = mongoose.model("Activities", activitySchema);

export { Activities  };