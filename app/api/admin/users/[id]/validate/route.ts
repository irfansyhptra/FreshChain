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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await request.json();
        const { kycStatus } = body;

        if (!kycStatus || !["Pending", "Verified", "Rejected", "Unverified"].includes(kycStatus)) {
            return NextResponse.json({ success: false, message: "kycStatus tidak valid" }, { status: 400 });
        }

        const user = await User.findByIdAndUpdate(id, { kycStatus }, { new: true }).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error: any) {
        console.error("PATCH /api/admin/users/[id]/validate error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
