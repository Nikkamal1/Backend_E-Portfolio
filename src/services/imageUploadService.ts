const path = require('path');
const fs = require('fs');

// ฟังก์ชันสำหรับอัปโหลดไฟล์ภาพ
function uploadProfileImage(file) {
  const uploadPath = path.join(__dirname, '../uploads', file.filename);
  
  // เก็บไฟล์ลงในโฟลเดอร์ uploads
  fs.renameSync(file.path, uploadPath);
  
  return uploadPath;  // ส่งที่อยู่ของไฟล์ที่อัปโหลด
}

module.exports = { uploadProfileImage };
