export interface Task {
  id: string;
  orgId: string;
  ownerId: string;
  title: string;
  description?: string;
  status?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}
