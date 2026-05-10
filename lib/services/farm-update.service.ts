import { FarmUpdate } from '@/lib/models/FarmUpdate';
import dbConnect from '@/lib/mongodb/client';

export async function getLiveFarmUpdates() {
  await dbConnect();

  let updates = await FarmUpdate.find().sort({ createdAt: 1 }).lean(); // Sort chronologically to preserve visual order

  return updates.map(u => ({
    id: String(u._id),
    type: u.type,
    icon: u.icon,
    color: u.color,
    message: u.message,
    time: u.time
  }));
}
