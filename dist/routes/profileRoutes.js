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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const router = express_1.default.Router();
// สร้างโปรไฟล์
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileModel_1.default.create(req.body);
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating profile", error });
    }
}));
// ดึงข้อมูลโปรไฟล์ทั้งหมด
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield profileModel_1.default.find();
        res.status(200).json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error });
    }
}));
// ดึงข้อมูลโปรไฟล์ตาม ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileModel_1.default.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
}));
// แก้ไขโปรไฟล์
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
}));
// ลบโปรไฟล์
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileModel_1.default.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: "Profile deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting profile", error });
    }
}));
exports.default = router;
