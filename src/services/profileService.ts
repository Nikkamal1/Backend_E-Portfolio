const { Profile } = require('../models/profileModel');

// บันทึกโปรไฟล์ลงฐานข้อมูล
async function saveProfile(profileData) {
  const newProfile = new Profile(profileData);
  await newProfile.save();
}

module.exports = { saveProfile };
