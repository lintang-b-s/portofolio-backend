import { Project } from "../models/projectModel.js"

const getAllProjects = async(req, res) => {
    try{ 
        const projects = await Project.find({});
        if (!projects) {
            res.status(404)
            throw new Error("TIdak ditemukan Projects")
        }
        res.json(projects);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProjectById = async(req, res) => {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404);
            throw new Error("project yang anda cari tidak ditemukan")
        }
        res.json(project)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export {getAllProjects, getProjectById};