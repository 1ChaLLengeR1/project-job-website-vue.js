import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { OneTask } from "@/types/api/tasks/types";

export function apiDeleteTask(
  task_id: string,
): Promise<ResponseData<OneTask>> {
  return apiDelete<OneTask>(`/tasks/delete/${task_id}`);
}
