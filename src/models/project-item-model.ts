import { ProjectMemberModel } from "./project-member-model";

export interface ProjectItemModel {
  id: number;
  name: string;
  description?: string | null;
  tasksPendingAmount: number;
  tasksCompletedAmount: number;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: ProjectMemberModel[];
}
