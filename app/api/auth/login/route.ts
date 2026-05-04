import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/client";
import { User } from "@/lib/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Connect to MongoDB
        if (mongoose.connection.readyState !== 1) {
             const MONGODB_URI = process.env.MONGODB_URI;
             if (!MONGODB_URI) throw new Error("MONGODB_URI is required");
             await mongoose.connect(MONGODB_URI);
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // In a real app we'd set an HttpOnly cookie with JWT here
        // For now, we'll return user info so frontend can route
        return NextResponse.json({ 
            success: true, 
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error("Login API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
