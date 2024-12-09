const { saveProfile } = require('../services/profileService');
const { uploadProfileImage } = require('../services/imageUploadService');

const profileController = async (req, res) => {
  try {
    const { name, bio, education, workExperience, skills, portfolio, awards, walletAddress } = req.body;
    const image = req.file ? await uploadProfileImage(req.file) : null;

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

    await saveProfile(profileData);
    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
};

module.exports = profileController;
