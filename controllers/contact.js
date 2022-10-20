import { Contact } from '../models/contactModel.js'

const postNewContactForm= async(req, res) => {
    try{
        const createdForm = await new Contact(req.body).save();
        res.status(201).json(createdForm);


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { postNewContactForm};