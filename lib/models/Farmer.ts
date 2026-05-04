import mongoose, { Schema } from 'mongoose';

const FarmerSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    product: { type: String, required: true },
    organizationName: { type: String, default: '' },
    role: { type: String, default: 'petani' },
    dashboardStats: {
      totalFundingReceived: { type: Number, default: 0 },
      fundingGrowthPercent: { type: Number, default: 0 },
      activeProjects: { type: Number, default: 0 },
      salesRevenue: { type: Number, default: 0 },
      salesLabel: { type: String, default: 'YTD' },
    },
  },
  { timestamps: true }
);

export type FarmerDocument = mongoose.InferSchemaType<typeof FarmerSchema>;

const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);

export default Farmer;
