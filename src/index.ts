import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// โหลดค่าตัวแปรจากไฟล์ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// เพิ่มขนาดข้อมูลที่รับได้ (สำหรับข้อมูลขนาดใหญ่ เช่น การอัปโหลดไฟล์)
app.use(bodyParser.json({ limit: '10mb' })); // ปรับขนาดให้เหมาะสมตามต้องการ
app.use(cors());

// สร้าง Schema และ Model สำหรับ Profile
interface IProfile {
  name: string;
  bio: string;
  //image?: string;
  education?: string;
  workExperience?: string;
  skills?: string;
  portfolio?: string;
  awards?: string;
  walletAddress: string; // เพิ่มฟิลด์ walletAddress
 
}

const ProfileSchema = new mongoose.Schema<IProfile>({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  //image: { type: String },
  education: { type: String },
  workExperience: { type: String },
  skills: { type: String },
  portfolio: { type: String },
  awards: { type: String },
  walletAddress: { type: String, required: true, unique: true }, // กำหนดให้ walletAddress ต้องไม่ซ้ำ
});

const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

// เชื่อมต่อ MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

// API endpoint สำหรับบันทึกข้อมูลโปรไฟล์
app.post("/api/profile", async (req: Request, res: Response) => {
  const { name, bio, image, education, workExperience, skills, portfolio, awards, walletAddress } = req.body;

  try {
    const profile = new Profile({
      name,
      bio,
      //image,
      education,
      workExperience,
      skills,
      portfolio,
      awards,
      walletAddress, // บันทึก walletAddress
    });
    await profile.save();
    res.status(201).send({ message: "Profile saved successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error saving profile", error });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
