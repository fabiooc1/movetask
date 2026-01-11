export interface ProjectItemMemberModel {
  user: {
    id: string;
    name: string;
  };
}

export interface ProjectItemModel {
  id: number;
  name: string;
  description?: string | null;
  tasksPendingAmount: number;
  tasksCompletedAmount: number;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: ProjectItemMemberModel[];
}
