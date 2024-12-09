import express, { Request, Response, Router, RequestHandler } from "express";
import Profile from "../models/profileModel";

const router: Router = express.Router();


// สร้างโปรไฟล์
router.post("/", async (req: Request, res: Response) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
});

// ดึงข้อมูลโปรไฟล์ทั้งหมด
router.get("/", async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

// ดึงข้อมูลโปรไฟล์ตาม ID
const getProfile: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// แก้ไขโปรไฟล์
const updateProfile: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// ลบโปรไฟล์
const deleteProfile: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

// ใช้ RequestHandler ใน router
router.get("/:id", getProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);


export default router;
