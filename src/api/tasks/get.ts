import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { CollectionTasks, StatisticsTask } from "@/types/api/tasks/types";

export function apiCollectionTasks(
  active: boolean,
): Promise<ResponseData<CollectionTasks>> {
  return apiGet<CollectionTasks>("/tasks/collection", {
    query: { active },
  });
}

export function apiCollectionStatisticsTask(
  startDate: string,
  endDate: string,
): Promise<ResponseData<StatisticsTask>> {
  return apiGet<StatisticsTask>("/tasks/statistics", {
    query: { start_date: startDate, end_date: endDate },
  });
}
