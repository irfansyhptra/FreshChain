import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// Define Schema for Seeding (to avoid issues with importing Next.js specific lib files directly if they have edge-runtime issues)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Added password field for login
    role: {
        type: String,
        required: true,
        enum: ["Petani", "Investor", "Konsumen", "Admin"]
    },
    kycStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Verified", "Rejected"]
    },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI as string);
        console.log("Connected to MongoDB!");

        // Clear existing seeder data (optional, but good for clean slate)
        // await User.deleteMany({});
        
        const saltRounds = 10;
        const defaultPassword = await bcrypt.hash('password123', saltRounds);

        const usersToSeed = [
            {
                name: "Budi Petani",
                email: "petani@freshchain.com",
                password: defaultPassword,
                role: "Petani",
                kycStatus: "Verified"
            },
            {
                name: "Ani Konsumen",
                email: "konsumen@freshchain.com",
                password: defaultPassword,
                role: "Konsumen",
                kycStatus: "Verified"
            },
            {
                name: "Cahyo Investor",
                email: "investor@freshchain.com",
                password: defaultPassword,
                role: "Investor",
                kycStatus: "Verified"
            },
            {
                name: "Admin FreshChain",
                email: "admin@freshchain.com",
                password: defaultPassword,
                role: "Admin",
                kycStatus: "Verified"
            }
        ];

        console.log("Seeding users...");
        for (const userData of usersToSeed) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                await User.create(userData);
                console.log(`✅ Created user: ${userData.role} (${userData.email})`);
            } else {
                console.log(`⏩ User ${userData.email} already exists. Skipping.`);
            }
        }

        console.log("🎉 Seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
        process.exit(0);
    }
}

seed();
