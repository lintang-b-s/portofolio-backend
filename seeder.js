
import profile from './data/profile.js';
// const profile = require('./data/profile.js');
import organizations from './data/organization.js';
// const organizations = require('./data/organization.js');
import projects from './data/project.js';
// const projects = require('./data/project.js');
import  { Organizations } from './models/organizationModel.js';
import  { Technologies } from './models/profileModel.js';
import  { Profile } from './models/profileModel.js';
import  { Project } from  "./models/projectModel.js";
import  connectDB  from "./config/db.js";
import User  from "./models/userModel.js";
import user from "./data/user.js"

connectDB();

const importData = async () => {
    try {
        await Profile.deleteMany();
        await Project.deleteMany();
        await Organizations.deleteMany();
        await Technologies.deleteMany();
        await User.deleteMany();

        //kalo mau buat uuser harus ubah controlller nya buat tambahin kondisional (req.body.admin)

        // const buatUser = new User({
        //     username: `${user[0].username}`,
        //     password: `${user[0].password}`,
        //     admin: true,
        // })

        // await buatUser.save();

        const sampleTechnologies = profile[0].technologies.map((tech) => {
            return { ...tech};
        })

        const sampleProjects = projects.map((project) => {
            return { ...project }
        })
        await Project.insertMany(sampleProjects);

        const sampleOrganizations = organizations.map((organization) => {
            return { ...organization}
        })
        
        await Organizations.insertMany(sampleOrganizations);
        //jagnan lupa masukin organisasi dan project ke profiles
        let idOrganization = await Organizations.find({}).select("_id");
        let organiz;
        let projt;

        let idProject = await Project.find({}).select("_id");
        for (let i=0; i<idOrganization.length;i++ ) {
            organiz = idOrganization[i]._id;
            projt = idProject[i]._id;
        }
     
        const profiles = new Profile({
            name: `${profile[0].name}`,
            description: `${profile[0].description}`,
            education: `${profile[0].education}`,
            image: `${profile[0].image}`,
            birthDate: `${profile[0].birthDate}`,
            technologies: sampleTechnologies,
            organizations: organiz,
            projects : projt

        })

        await profiles.save();
        let idProf = await Profile.find({})
            .populate("organizations", "name position date1 date2 activities projects")
            .populate("projects", "name description date1 technologies affiliation")    
            ;
        console.log(idProf[0].organizations[0].name)
        console.log(idProf[0].projects)
        process.exit();
       

    }


    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}


importData();


