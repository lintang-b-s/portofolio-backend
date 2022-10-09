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
        }


        
    },
    {
      timestamps: true,
    }
)

 const Activites = mongoose.model("Activitie", activitySchema);

export { Activites  };