import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = 'nodejs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        
        if (!file) {
            return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadUrl = await new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "freshchain/campaigns", resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url || "");
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ success: true, url: uploadUrl });
    } catch (error: any) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json({ success: false, message: error.message || "Upload failed" }, { status: 500 });
    }
}
