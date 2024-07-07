import { ProfileModel } from "../models/profiles.models.js"


export const createProfileUSer = async (profile) => {
    const { name, lastName, birthdate, about, url, owner} = profile
    console.log(profile)
    try {
       const res = await ProfileModel.insert(name, lastName, birthdate, about, url, owner);
       console.log(res)
       return res
    } catch (error) {
        console.log(error)
    }
};

export const getAllProfiles = async() => {
    try {
        const res =  await ProfileModel.getAll();
        return res;
    } catch (error) {
        console.log(error)
    }
};

export const getOneProfile = async(id) => {
    try {
        const res = await ProfileModel.getOne(id);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deleteOneProfile = async (id) => {
    try {
        const res = await ProfileModel.deleteOne(id);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateOneProfile = async(id , profile) => {
    try {
        const res =  await ProfileModel.updateOne(id, profile);
        return res
    } catch (error) {
        console.log(error)
    }
}