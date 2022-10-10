import { Project } from "../models/projectModel.js"

const getAllProjects = async(req, res) => {
    try{ 
        const projects = await Project.find({}).populate("affiliation", "name position date1 date2 activities projects");
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
        const project = await Project.findById(req.params.id)
            .populate("affiliation", "name position date1 date2 activities projects");
        if (!project) {
            res.status(404);
            throw new Error("project yang anda cari tidak ditemukan")
        }
        res.json(project)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const postNewProject = async(req, res) => {
    try{
        const newProject = new Project(req.body);
        newProject.profile = '6343b21fba14dc2af3697e84';
        await newProject.save();
        await newProject.populate("affiliation", "name position image")
        res.status(201).json(newProject);

    }
    catch (error) {
        return res.status(500).json({ message: error.message});

    }
}

const deleteProjectById = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if(project){
            await project.remove();
            res.json({ message: "Project dihapus "});
        }else {
            res.json(404);
            throw new Error("Project tidak ditemukan!");
        }

    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

const putProjectById = async(req, res) => {
    const {
        name,
        description,
        date1,
        image,
        technologies,
        affiliation

    } = req.body;

    const project = await Project.findById(req.params.id);
    if(!project) {
        res.status(404)
        throw new Error("Projject tak ditemukan")
    }
    try {
        project.name = req.user._id;
        project.name = name || project.name;
        project.description = description || project.description;
        project.date1 = date1 || project.date1;
        project.image = image || project.image;
        project.technologies = technologies || project.technologies;
        project.affiliation = affiliation || project.affiliation;
        await project.save();
        res.json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}




export {getAllProjects, getProjectById, postNewProject, deleteProjectById, putProjectById};