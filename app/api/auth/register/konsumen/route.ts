import { NextResponse } from "next/server";
import { AuthService } from "@/lib/services/auth.service";
import { v2 as cloudinary } from "cloudinary";

export const runtime = 'nodejs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveFileCloudinary(file: File | null, prefix: string): Promise<string | undefined> {
    if (!file || typeof file === 'string') return undefined;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: `freshchain/${prefix}`, resource_type: "auto" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url);
            }
        );
        uploadStream.end(buffer);
    });
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            dob: formData.get("dob") as string,
            address: formData.get("address") as string,
            password: formData.get("password") as string,
            konsumenProfile: {
                phone: formData.get("phone") as string,
                address: formData.get("deliveryAddress") as string,
                provinsi: formData.get("provinsi") as string,
                kota: formData.get("kota") as string,
                kodepos: formData.get("kodepos") as string,
                kycUrl: await saveFileCloudinary(formData.get("kyc") as File, "konsumen_kyc"),
            }
        };

        const newUser = await AuthService.registerKonsumen(data);
        return NextResponse.json({ success: true, user: { id: newUser._id, role: newUser.role } });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}