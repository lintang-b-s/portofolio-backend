import { Activities } from "../models/activityModel.js";
import { Organizations } from "../models/organizationModel.js";

const getAllActivities = async(req, res) => {
    const activities = await Activities.find({});
    if(!activities) {
        res.status(404) ;
        throw new Error("Activities tak ditemukan");
    }
    res.json(activities);
}

//di formnya ditampilin jg list affiliationnnya agar bisa dipilih di req.bodynya postNewActivities
const postNewActivities = async(req, res) => {
    try {
        const createdActivities = new Activities(req.body);
        createdActivities.profile = '6343b21fba14dc2af3697e84';
        await createdActivities.populate("affiliation", "_id name image position");

        await createdActivities.save();
        res.status(201).json(createdActivities)
    } catch (error) {
        return res.status(500).json({ message: error.message }) ;
    }
}

const getActivitesById = async(req, res) => {
    try{ 
        const activities= await Activities.findById(req.params.id);
        if (!activities){
            res.status(404);
            throw new Error("Activities tidak ditemukan")
        }
        return res.json(activities);

    } catch(error) {
        return res.status(500).json({ message: error.message }) ;
    }
}

const deleteActivitiesById = async(req, res) => {
    try{ 
        const activities = await Activities.findById(req.params.id);

        if (activities){
            await activities.remove();
            res.json({ message: "Activities diihapus"});
        }else {
            res.json(404);
            throw new Error("Activities tak ditemukan");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message }) ;
    }
}

const putActivitiesById = async(req, res) => {
    const affiliationList = Organizations.find({}).select("_id")

    const {
        name,
        description,
        date1,
        date2,
        affiliation

    } = req.body;

    const activities = await Activities.findById(req.params.id);
    if (!activities) {
        res.status(404);
        throw new Error("Proyek tak ditemukan");
    }
    
    try{
        activities.name = name || activities.name
        activities.description = description || activities.description;
        activities.date1 = date1 || activities.date1;
        activities.date2 = date2 || activities.date2;
        activities.profile = '6343b21fba14dc2af3697e84';
        activities.affiliation = affiliation || activities.affiliation;
        await activities.save();
        res.json(activities);
    }
    catch (error) {
        return res.status(500).json({ message: error.message }) ;
    }
}


export { getAllActivities, postNewActivities, getActivitesById, deleteActivitiesById, putActivitiesById };