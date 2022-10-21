import { Project } from "../models/projectModel.js"
import formidable from 'formidable'
import fs from 'fs'
import { Organizations } from "../models/organizationModel.js";
import { Profile } from "../models/profileModel.js"


const getAllProjects = async(req, res) => {
    try{ 
        const projects = await Project.find({}).populate("affiliation", "_id name position date1 date2 activities projects")
           
            .populate("profile", "_id name");
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
            .populate("affiliation", "name position ")
            .populate("profile", "name")
            
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
     
        if (req.file) {
            req.body.images = req.file.path
        }else{
            req.body.images = " ";
        }

        
        
        const newProject = new Project(req.body);
     
        
        await newProject.save();

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
        images,
        technologies,
        affiliation,
        profile

    } = req.body;
    console.log("reqbody: ",req.body)
    const project = await Project.findById(req.params.id);
    if(!project) {
        res.status(404)
        throw new Error("Projject tak ditemukan")
    }
    try {

     
       
        

        
        project.name = name || project.name;
        project.description = description || project.description;
        project.date1 = date1 || project.date1;
        if (req.file) {
            project.images = req.file.path
        }else{
            project.images = project.images;
        }
        project.technologies = technologies || project.technologies;

        project.affiliation = affiliation || project.affiliation;
        project.profile = profile || project.profile;

    
       


       

        console.log("reqbody: ",req.body)
        // console.log("req.file.path: ", req.file.path)
        
      
        await project.save();
        res.json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}


//@route POST /api/projects/:id/images
//@desk membuat gambar projects

const createProjectImages = async(req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error("Project tak ditemukan");
    }

    try {
        const newImages = new ProjectImage({
            projectId: project._id,
            image: req.body.image
        });
        project.images.push(newImages);
        project.save();
        res.json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message});

    }
}


//@desc     menghapus project images
//@route    DELETE /api/projects/:id/:images_id

const deleteProjectImages = async(req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error("Project not found.");
      }
    try {
        project.images.id(req.params.images_id).remove();
        project.save();
        res.send({ msg: "gambar project dihapus", project});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

//@desc     edit gambar project 
//@route    PUT /api/projects/:id/:images_id/edit
const updateProjectImages = async(req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error("Project not found.");
      }
    const imageObj = project.images.find( ({ id }) => id ===req.params.images_id );

    if (imageObj === undefined) {
        res.status(500);
        throw new Error("Images project tak ditemukan")
    }

    if (req.body.image === "") {
        imageObj.image = "";
    }
    imageObj.image = req.body.image || imageObj.image;

    project.save();
    res.send({ msg: "Gambar Project diperbarui "});

}

export {getAllProjects, getProjectById, postNewProject, deleteProjectById, putProjectById, createProjectImages, updateProjectImages, deleteProjectImages}
