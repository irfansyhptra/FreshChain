import Farmer from '@/lib/models/Farmer';
import dbConnect from '@/lib/mongodb/client';

const currencyFormatter = new Intl.NumberFormat('id-ID');

export async function getFarmerDashboardData() {
  await dbConnect();

  const farmer = await Farmer.findOne({ role: 'petani' }).sort({ createdAt: -1 }).lean();

  if (!farmer) {
    return null;
  }

  const stats = farmer.dashboardStats || {};

  return {
    id: String(farmer._id),
    name: farmer.name,
    organizationName: farmer.organizationName || farmer.name,
    location: farmer.location,
    product: farmer.product,
    stats: {
      totalFundingReceived: Number(stats.totalFundingReceived || 0),
      totalFundingReceivedLabel: `Rp ${currencyFormatter.format(Number(stats.totalFundingReceived || 0))}`,
      fundingGrowthPercent: Number(stats.fundingGrowthPercent || 0),
      activeProjects: Number(stats.activeProjects || 0),
      salesRevenue: Number(stats.salesRevenue || 0),
      salesRevenueLabel: `Rp ${currencyFormatter.format(Number(stats.salesRevenue || 0))}`,
      salesLabel: stats.salesLabel || 'YTD',
    },
  };
}
