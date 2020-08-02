export type Scan = {
  id: number;
  fileId: number;
  uuid: string;
  source: string;
  payload: string;
  error: string;
  seen: boolean;
  queuedAt: number;
  finishedAt: number;
};
