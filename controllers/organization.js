import { create } from "mquery/lib/utils.js";
import { Organizations } from "../models/organizationModel.js";
import cloudinary from "../config/cloudinary.js"


const getAllOrganizations = async(req, res) => {
    try{
        const organizations = await Organizations.find({})
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2")
            .populate("profile", "name");
        if (!organizations ) {
            res.status(404)
            throw new Error("daftar org tidak ditemukan")
        }
        res.json(organizations);

    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

const postNewOrganization = async(req, res) => {
    try {
        // if (req.file) {
        //     req.body.images = req.file.path
        // }else {
        //     req.body.images = " ";
        // }
        
        //salah
        const createdOrganization = new Organizations(req.body);
        if (req.body.activities){
            createdOrganization.activities.push(req.body.activities)
        }
        if (req.body.projects){
            createdOrganization.projects.push(req.body.projects);
        }

        const uploadedResponse = await cloudinary.uploader.upload(req.body.images, {
            upload_preset: "portofolio"});

        createdOrganization.images= uploadedResponse;
        
        await createdOrganization.save();
        res.status(201).json(createdOrganization)

    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

// adayang lsaah di getorganizationbyid
const getOrganizationById = async(req, res) => {
    try{
        console.log("coba bisa gak ")
        const organization = await Organizations.findById(req.params.id)
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2")
            .populate("profile", "name");
        console.log("kalo keluar berarti bisa querynya")
        if (!organization) {
            res.status(404);
            throw new Error("Organization tidak ditemukan");
        }
        return res.json(organization)


    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

const putOrganizationById = async(req, res) => {
    const {
        name,
        position,
        date1,
        date2,
        images,
        activities,
        projects,
        profile
    } = req.body;
    console.log("reqbody: ",req.body)

    const organization = await Organizations.findById(req.params.id);
    if (!organization) {
        res.status(404);
        throw new Error("Org tidak ditemukan");
    }
    try {
        organization.name = name || organization.name;
        organization.position = position || organization.position;
        organization.date1 = date1 || organization.date1;
        if( date2 ){
            organization.date2 = date2
        }
        organization.date2 =  organization.date2;
        // if (req.file) {
        //     organization.images = req.file.path
        // }else {
        //     organization.images = organization.images;
        // }

        const uploadedResponse = await cloudinary.uploader.upload(req.body.images, {
            upload_preset: "portofolio"});

        organization.images = uploadedResponse;
        if (activities){
            organization.activities.push(activities);
        }
        // organization.activities = activities || organization.activities;
        if (projects){
            organization.projects.push(projects);
        }
        // organization.projects = projects || organization.projects;
        organization.profile = profile || organization.profile;

        console.log("reqbody: ",req.body)
        console.log("namey: ",name)
        console.log("positiony: ",position)
        console.log("date1y: ",date1)
        console.log("date2y: ",date2)
        // console.log("req.file.pathy: ",req.file.path)
        console.log("namey: ",name)
        console.log("activitiesy: ",activities)
        console.log("projectsy: ",projects)
        console.log("profiley: ",profile)

        await organization.save();
        console.log("reqbody: ",req.body)
        res.json(organization);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const deleteOrganizationById = async(req, res) => {
    const organization = await Organizations.findById(req.params.id);

    if (organization) {
        await organization.remove();
        res.json({ messsage: "Org dihapus" });
    } else{
        res.json(404);
        throw new Error("Org tak ditemukan")
    }
}

export { getAllOrganizations,
    postNewOrganization,
    getOrganizationById,
    deleteOrganizationById,
    putOrganizationById };









