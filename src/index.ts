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
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, // กำหนดให้ชื่อ��ู้ใช้เป็นตัวพิมพ์เล็ก
    trim: true
  }, // กำหนดให้ walletAddress ต้องไม่ซ้ำ
});

const Profile = mongoose.model<IProfile>("profile", ProfileSchema);

// เชื่อมต่อ MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });


// API endpoint สำหรับตรวจสอบโปรไฟล์
app.get("/api/check-profile", async (req: Request, res: Response) => {
  const { walletAddress } = req.query;


  try {
    const profile = await Profile.findOne({ 
      walletAddress: (walletAddress as string).toLowerCase().trim() 
    });

    res.status(200).send({ 
      exists: !!profile,
      profile: profile || null
    });
  } catch (error) {
    console.error('Profile check error:', error);
    res.status(500).send({ 
      exists: false,
      message: "Error checking profile",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
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

// API endpoint สำหรับดึงข้อมูลโปรไฟล์ทั้งหมด
app.get("/api/profile", async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find(); // ดึงข้อมูลทั้งหมดจาก MongoDB
    res.status(200).send(profiles); // ส่งข้อมูลโปรไฟล์ทั้งหมด
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: "Error fetching profiles", error: error.message });
    } else {
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
});

app.get("/api/profile/:walletAddress", async (req: Request, res:Response) => {
  const { walletAddress } = req.params; // รับ id จา�� query parameter
  try {
    const profile = await Profile.findById(walletAddress); // ค้นหา��ปรไ��ล์จา�� MongoDB
    // if (!profile) {
    //   return res.status(404).send({ message: "Profile not found" });
    // }
    res.status(200).send(profile);
  } catch (error : unknown) {
    if(error instanceof Error) {
      res.status(500).send({ message: "Error fetching profile", error: error.message });
    } else {
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
});


// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
