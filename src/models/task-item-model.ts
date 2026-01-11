export interface TaskItemModel {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  index: number;
  deliveryDate: Date | null;
  priority: {
    id: number;
    level: string;
  };
  assignedTo: {
    id: string;
    name: string;
    image: string | null;
  } | null;
}
