import { User } from '@/lib/models/User';
import { Investment } from '@/lib/models/Investment';
import { Campaign } from '@/lib/models/Campaign';
import dbConnect from '@/lib/mongodb/client';

const currencyFormatter = new Intl.NumberFormat('id-ID');

export async function getInvestorDashboardData() {
  await dbConnect();

  // Find a konsumen user to get data for. In reality, this will come from session.
  const konsumen = await User.findOne({ role: "Konsumen" }).lean();
  
  let investments: any[] = [];
  if (konsumen) {
      investments = await Investment.find({ investorId: konsumen._id })
        .populate('campaignId', 'title targetAmount currentAmount bannerUrl investmentTerms status')
        .sort({ investedAt: -1 })
        .lean();
  }

  // Calculate stats
  let totalPortfolioValue = 0;
  let totalROI = 0;
  let activeAssetsCount = 0;

  investments.forEach((inv: any) => {
      totalPortfolioValue += inv.amount;
      if (inv.status === 'Active') activeAssetsCount += 1;
      if (inv.status === 'ProfitPaid') {
          // just simulating ROI payment
          totalROI += (inv.amount * 0.12);
      }
  });

  return {
    id: konsumen ? String(konsumen._id) : "new",
    name: konsumen ? konsumen.name : "Konsumen",
    walletBalance: 42500000, // mock wallet balance
    stats: {
        portfolioValue: totalPortfolioValue,
        portfolioValueLabel: `Rp ${totalPortfolioValue ? currencyFormatter.format(totalPortfolioValue) : '0'}`,
        roiReceived: totalROI,
        roiReceivedLabel: `Rp ${totalROI ? currencyFormatter.format(totalROI) : '0'}`,
        activeAssets: activeAssetsCount,
        averageAnnualYield: 12.8, // this could be calculated based on terms
        estimatedRunningROI: Math.round(totalPortfolioValue * 0.12),
        estimatedRunningROILabel: `Rp ${totalPortfolioValue ? currencyFormatter.format(Math.round(totalPortfolioValue * 0.12)) : '0'}`,
    },
    investments: investments.map((inv: any) => ({
        id: String(inv._id),
        amount: inv.amount,
        amountLabel: `Rp ${currencyFormatter.format(inv.amount)}`,
        status: inv.status,
        investedAt: inv.investedAt.toISOString(),
        campaign: inv.campaignId ? {
            id: String(inv.campaignId._id),
            title: inv.campaignId.title,
            imageUrl: inv.campaignId.bannerUrl || "https://images.unsplash.com/photo-1592650073507-6c2e3ca914a8?auto=format&fit=crop&q=80&w=200&h=200",
            targetAmount: inv.campaignId.targetAmount,
            currentAmount: inv.campaignId.currentAmount,
            campaignStatus: inv.campaignId.status,
            roi: inv.campaignId.investmentTerms?.profitSharing || 12,
            deadline: inv.campaignId.investmentTerms?.fundingDeadline?.toISOString() || null
        } : null
    }))
  };
}
