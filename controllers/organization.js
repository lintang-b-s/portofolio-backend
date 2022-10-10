import { create } from "mquery/lib/utils.js";
import { Organizations } from "../models/organizationModel.js";

const getAllOrganizations = async(req, res) => {
    try{
        const organizations = await Organizations.find({})
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2");
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
        createdOrganization.profile = '6343b21fba14dc2af3697e84';
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
            .populate("activities", "name description date1 date2");
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
        image,
        activities,
        projects
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
        organization.date2 = date2 || organization.date2;
        organization.image = image || organization.image;
        organization.activities = activities || organization.activities;
        organization.projects = projects || organization.projects;
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









