import { createProfileUSer, deleteOneProfile, getAllProfiles, getOneProfile, updateOneProfile } from "../services/profiles.services.js"

export const getProfiles = async (_, res) => {
  try {
    const response = await getAllProfiles();
    res.status(200).json({message: "ok", response})
  } catch (error) {
    res.status().json({message: error})
  }
}

export const getProfile = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    try {
        const response = await getOneProfile(id);
        res.status(200).json({message: "ok", response})
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const createProfile = async (req, res) => {
   const profile = req.body
   try {
    const response = await createProfileUSer(profile);
    res.json(response)
   } catch (error) {
    res.json(error)
   }
}

export const updateProfile = async (req, res) => {
    const id = req.params.id;
    const profile = req.body
    try {
        const response = await updateOneProfile(id, profile);
        res.status(200).json({message: "ok", response});
    } catch (error) {
        res.status(400).json({message: error});
    }
}

export const deleteProfile = async (req, res) => {
   const id = parseInt(req.params.id);
  try {
    const response = await deleteOneProfile(id);
    res.status(200).json({message: "ok"});
  } catch (error) {
    res.status(400).json({message: error});
  }
}