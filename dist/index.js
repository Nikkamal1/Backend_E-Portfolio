"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const db_1 = __importDefault(require("./config/db"));
// โหลดตัวแปรจากไฟล์ .env
dotenv_1.default.config();
// เชื่อมต่อฐานข้อมูล MongoDB
(0, db_1.default)();
// สร้างแอป Express
const app = (0, express_1.default)();
// ตั้งค่า middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files (สำหรับอัปโหลด)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// เส้นทางสำหรับ Profile
app.use("/api/profile", profileRoutes_1.default);
// ตั้งค่าพอร์ต
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
