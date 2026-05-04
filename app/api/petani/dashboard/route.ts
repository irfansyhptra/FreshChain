import { NextResponse } from "next/server";
import { PetaniDashboardService } from "@/lib/services/petani.service";
import { User } from "@/lib/models/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const farmerIdParam = searchParams.get("farmerId");

        // Wait for DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        let farmerId = farmerIdParam;

        if (!farmerId) {
            // Find a mock farmer for demonstration
            const mockFarmer = await User.findOne({ role: "Petani" }).select("_id");
            if (mockFarmer) {
                farmerId = mockFarmer._id.toString();
            } else {
                return NextResponse.json({ error: "No farmer found in database" }, { status: 404 });
            }
        }

        const data = await PetaniDashboardService.getDashboardData(farmerId!);
        
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
