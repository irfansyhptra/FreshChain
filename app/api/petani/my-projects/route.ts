import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Campaign } from "@/lib/models/Campaign";
import { Investment } from "@/lib/models/Investment";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Get current farmer (simplified — replace with session-based auth)
    const farmer = await User.findOne({ role: "Petani" });
    if (!farmer) {
      return NextResponse.json({ success: false, message: "Farmer not found" }, { status: 404 });
    }

    // Fetch all published campaigns belonging to this farmer
    const campaigns = await Campaign.find({
      farmerId: farmer._id,
      status: { $in: ["Funding", "In_Progress", "Completed", "Failed"] },
    }).sort({ createdAt: -1 });

    // For each campaign, fetch its investments with investor details
    const campaignsWithInvestors = await Promise.all(
      campaigns.map(async (campaign) => {
        const investments = await Investment.find({ campaignId: campaign._id })
          .populate("investorId", "name email phone")
          .sort({ investedAt: -1 });

        const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
        const investorCount = investments.length;

        return {
          _id: campaign._id,
          title: campaign.title,
          commodity: campaign.commodity,
          landArea: campaign.landArea,
          bannerUrl: campaign.bannerUrl,
          targetAmount: campaign.targetAmount,
          currentAmount: totalInvested || campaign.currentAmount,
          status: campaign.status,
          createdAt: campaign.createdAt,
          investmentTerms: campaign.investmentTerms,
          investorCount,
          investments: investments.map((inv) => ({
            _id: inv._id,
            amount: inv.amount,
            status: inv.status,
            investedAt: inv.investedAt,
            investor: inv.investorId,
          })),
        };
      })
    );

    // Summary stats
    const totalFunded = campaignsWithInvestors.reduce((s, c) => s + (c.currentAmount || 0), 0);
    const totalInvestors = campaignsWithInvestors.reduce((s, c) => s + c.investorCount, 0);
    const activeCount = campaignsWithInvestors.filter((c) => c.status === "Funding").length;
    const completedCount = campaignsWithInvestors.filter((c) => c.status === "Completed").length;

    return NextResponse.json({
      success: true,
      summary: { totalFunded, totalInvestors, activeCount, completedCount },
      data: campaignsWithInvestors,
    });
  } catch (error: any) {
    console.error("myprojects error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
