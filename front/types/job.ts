export interface Job {
  id: number;
  title: string;
  description: string;
  status: string;
  clientName: string;
}

export interface CreateJobRequest {
  title: string;
  description: string;
}