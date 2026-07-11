import { apiPatch } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { OneTask } from "@/types/api/tasks/types";
import type { UpdateActiveTaskBody, UpdateTaskBody } from "@/types/tasks/type";

export function apiUpdateActiveTask(
  task_id: string,
  body: UpdateActiveTaskBody,
): Promise<ResponseData<OneTask>> {
  return apiPatch<OneTask>(`/tasks/update/active/${task_id}`, body);
}

export function apiUpdateTask(
  task_id: string,
  body: UpdateTaskBody,
): Promise<ResponseData<OneTask>> {
  return apiPatch<OneTask>(`/tasks/update/${task_id}`, body);
}
