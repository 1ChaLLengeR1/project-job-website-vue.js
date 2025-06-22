export interface OneTask {
  id: string;
  description: string;
  time: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type CollectionTasks = Array<OneTask>;
