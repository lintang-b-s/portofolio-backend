import { Profile } from "../models/profileModel.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import passport from "passport";
import bodyParser from "body-parser";
import { getToken, jwtPassport, verifyUser, verifyAdmin } from "../authenticate.js";
import Users from "../models/userModel.js";
import mongoose from "mongoose";
import {Technologies} from "../models/profileModel.js"
import cloudinary from "../config/cloudinary.js"


const getProfile = async(req, res) => {
    try{
        const profile = await Profile.find({})
            .populate("organizations", "images name position date1 date2 activities projects")
            .populate("projects", "name description date1 technologies affiliation")
            .populate("activities", "name description date1 date2")
            ;
      
        res.json(profile);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const postProfile = async (req, res) => {
    try{  
       
        const createdProfile = new Profile(req.body);
        if (req.body.organizations){
            createdProfile.organizations.push(req.body.affiliation)
        }
        if (req.body.projects){
            createdProfile.projects.push(req.body.projects)
        }
        if (req.body.activities){
            createdProfile.activities.push(req.body.activities)
        }


    
        await createdProfile.save();
        res.status(201).json(createdProfile)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProfileById = async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id)
        .populate("organizations", "name position date1 date2 activities projects")
        .populate("projects", "name description date1 technologies affiliation")
        .populate("activities", "name description date1 date2")
        ;


        res.json(profile)
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const putProfile = async(req, res) => {
    const {
        name,
        description,
        education,
        birthDate,
        technologies,
        organizations,
        projects,
        activities,

    } = req.body;

    const profile = await Profile.findById(req.params.id);
    if(!profile) {
        res.status(404);
        console.log("tidak ditemukan profilenya")
        throw new Error("Profile tidak ditemukan");
        
    } 
    try {
        profile.name = name || profile.name;
        profile.description = description ||profile.description;
        profile.education = education || profile.education;
       
        profile.birthDate = birthDate || profile.birthDate;
        profile.technologies = technologies || profile.technologies;
        const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
            upload_preset: "portofolio"});
 
        profile.image = uploadedResponse;

        console.log("uploadded image: " ,uploadedResponse)
        if (req.body.organizations){
            profile.organizations.push(req.body.organizations)
        }else{
            profile.organizations = profile.organizations;
        }
        if (req.body.projects){
            profile.projects.push(req.body.projects)
        }else{
            profile.projects =  profile.projects;
        }
        if (req.body.activities){
            profile.activities.push(req.body.activities)
        }else{
            profile.activities =  profile.activities;
        }
        console.log(uploadedResponse)
        await profile.save();
        console.log("akan save profile")
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


//@desc menambah technologies
//@route POST /api/adins/profile/:id/technologies
const createProfileTechnologies = async(req, res) => {
    const error = {
        message:"user not found"
    }
    const serverError  ={
        message: "server error"
    }
    const userId=  mongoose.Types.ObjectId(req.params.id);

    const profiles= await Profile.find();
  
    const profile = await Profile.findById(userId);
    if (!profile){
        res.sendStatus(404);
        return;
    }
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    

        const uploadedResponse = await cloudinary.uploader.upload(dataURI, {
            upload_preset: "portofolio"});
        const newTech = new Technologies({
            profileId: profile._id,
            name: req.body.name,
            images: uploadedResponse
        });
        console.log("profile id: ", profile._id);
        console.log("name tech: ", req.body.name);
        console.log("file path: ", uploadedResponse)
        profile.technologies.push(newTech);
        profile.save();
        res.json(profile);
    } catch (error) {
        res.sendStatus(500);
    }
}

//@desc menghapus technologies
//@route POST /api/admins/profile/:id/:technologies_id
const deleteProfileTechnologies = async(req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found.")
    }
    profile.technologies.id(req.params.technologies_id).remove();
    profile.save();
    res.send({ msg: "tech removed", profile });
}


export {getProfile, putProfile, getProfileById, postProfile, createProfileTechnologies, deleteProfileTechnologies};


