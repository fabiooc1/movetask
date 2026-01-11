import { TaskItemModel } from "./task-item-model";
import { TaskStatusModel } from "./task-status-model";

export interface TaskProjectStatusModel extends TaskStatusModel {
  tasks: TaskItemModel[];
}
