import mongoose from 'mongoose';

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  product: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);
