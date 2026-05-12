import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/lib/models/User";

const connectDB = async () => {
    if (mongoose.connection.readyState !== 1) {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) throw new Error("MONGODB_URI is required");
        await mongoose.connect(MONGODB_URI);
    }
};

export async function GET(request: Request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "all";
        
        let query: any = {};
        if (status !== "all") {
            query.kycStatus = status;
        }
        
        const users = await User.find(query).sort({ createdAt: -1 }).select("-password");
        
        return NextResponse.json({ success: true, data: users });
    } catch (error: any) {
        console.error("GET /api/admin/users error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
