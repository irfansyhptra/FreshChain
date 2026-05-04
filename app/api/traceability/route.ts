import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Traceability } from "@/lib/models/Traceability";
import { AuditLog } from "@/lib/models/AuditLog";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();
        const { batchId, status, location, actorId, metadata, notes, productId, farmerId } = data ?? {};

        if (!batchId || !status || !location) {
            return NextResponse.json(
                { success: false, error: "batchId, status, dan location wajib diisi" },
                { status: 400 }
            );
        }

        const update = {
            ...(productId ? { productId } : {}),
            ...(farmerId ? { farmerId } : {}),
            ...(notes ? { notes } : {}),
            currentStatus: status,
            currentLocation: location,
            $push: {
                history: {
                    status,
                    location,
                    metadata: metadata ?? data,
                    actorId,
                    timestamp: new Date(),
                },
            },
        };

        const trace = await Traceability.findOneAndUpdate(
            { batchId },
            { $setOnInsert: { batchId, currentStatus: status, currentLocation: location, history: [] }, ...update },
            { upsert: true, new: true }
        );

        await AuditLog.create({
            action: "TRACEABILITY_UPSERT",
            entityType: "Traceability",
            entityId: trace._id.toString(),
            actorId,
            metadata: { batchId, status, location },
        });

        return NextResponse.json({
            success: true,
            message: "Batch status tercatat di database (traceability log).",
            recordId: trace._id.toString(),
            batchId: trace.batchId,
            status: trace.currentStatus,
            physicalLocation: trace.currentLocation,
            historyCount: trace.history.length,
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to log traceability event" }, { status: 500 });
    }
}
