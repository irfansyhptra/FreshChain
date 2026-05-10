import Farmer from '@/lib/models/Farmer';
import dbConnect from '@/lib/mongodb/client';

const currencyFormatter = new Intl.NumberFormat('id-ID');

export async function getFarmerDashboardData() {
  await dbConnect();

  const farmer = await Farmer.findOne({ role: 'petani' }).sort({ createdAt: -1 }).lean();

  if (!farmer) {
    // Return empty structure instead of null to avoid 404 errors
    return {
      id: "new",
      name: "Petani",
      organizationName: "Petani",
      location: "-",
      product: "-",
      stats: {
        totalFundingReceived: 0,
        totalFundingReceivedLabel: "Rp 0",
        fundingGrowthPercent: 0,
        activeProjects: 0,
        salesRevenue: 0,
        salesRevenueLabel: "Rp 0",
        salesLabel: "-",
      },
    };
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
