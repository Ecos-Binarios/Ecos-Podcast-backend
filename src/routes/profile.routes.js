import { Router } from "express";
import { createProfile, deleteProfile, getProfile, getProfiles, updateProfile } from "../controllers/profile.controllers.js";
import { checkSession } from "../middlewares/session.js";

const router = Router();

router.get('/', checkSession ,getProfiles);
router.post('/', createProfile);
router.get('/:id',checkSession ,getProfile);
router.delete('/delete/:id',checkSession ,deleteProfile);
router.put('/update/:id',checkSession , updateProfile);

export {router};

