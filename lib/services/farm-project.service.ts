import { FarmProject } from '@/lib/models/FarmProject';
import dbConnect from '@/lib/mongodb/client';

export async function getActiveFarmProjects() {
  await dbConnect();

  let projects = await FarmProject.find().sort({ createdAt: -1 }).lean();

  return projects.map(p => ({
    id: String(p._id),
    projectId: p.projectId,
    title: p.title,
    status: p.status,
    fundingGoal: p.fundingGoal,
    currentFunding: p.currentFunding,
    progress: p.progress,
    harvestDate: p.harvestDate,
    traceabilityId: p.traceabilityId
  }));
}
