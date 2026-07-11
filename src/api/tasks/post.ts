import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { OneTask } from "@/types/api/tasks/types";
import type { CreateTaskBody } from "@/types/tasks/type";

export function apiCreateTask(
  body: CreateTaskBody,
): Promise<ResponseData<OneTask>> {
  return apiPost<OneTask>("/tasks/create", body);
}
