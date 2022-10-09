import { Profile } from "../models/profileModel.js"

const getProfile = async(req, res) => {
    try{
        const profile = await Profile.find({})
            .populate("organizations", "name position date1 date2 activities projects")
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2")
            ;
      
        res.json(profile);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export {getProfile};