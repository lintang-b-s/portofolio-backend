import { Profile } from "../models/profileModel.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import passport from "passport";
import bodyParser from "body-parser";
import { getToken, jwtPassport, verifyUser, verifyAdmin, facebookPassport } from "../authenticate.js";
import Users from "../models/userModel.js";
import mongoose from "mongoose";




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

const putProfile = async(req, res) => {
    const {
        name,
        description,
        education,
        image, 
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
        profile.image = image || profile.image;
        profile.birthDate = birthDate || profile.birthDate;
        profile.technologies = technologies || profile.technologies;
        profile.organizations = organizations || profile.organizations;
        profile.projects = projects || profile.projects;
        profile.activities = activities || profile.activities;
        await profile.save();
        console.log("akan save profile")
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


export {getProfile, putProfile};