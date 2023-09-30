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

        const createdOrganization = new Organizations(req.body);
     
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    

        const uploadedResponse = await cloudinary.uploader.upload(dataURI, {
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
        const organization = await Organizations.findById(req.params.id)
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2")
            .populate("profile", "name");
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
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
        const uploadedResponse = await cloudinary.uploader.upload(dataURI, {
            upload_preset: "portofolio"});

        organization.images = uploadedResponse;
       
        organization.profile = profile || organization.profile;
        await organization.save();
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









