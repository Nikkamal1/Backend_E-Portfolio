"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { saveProfile } = require('../services/profileService');
const { uploadProfileImage } = require('../services/imageUploadService');
const profileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bio, education, workExperience, skills, portfolio, awards, walletAddress } = req.body;
        const image = req.file ? yield uploadProfileImage(req.file) : null;
        const profileData = {
            name,
            bio,
            education,
            workExperience,
            skills,
            portfolio,
            awards,
            walletAddress,
            image,
        };
        yield saveProfile(profileData);
        res.status(200).json({ message: 'Profile saved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving profile', error });
    }
});
module.exports = profileController;
