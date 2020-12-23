export type Project = {
  id: number;
  title: string;
  description: string;
}

export type ProjectDetail = {
  project: Project;
  categories: Category[];
  tags: Tag[];
  milestones: Milestone[];
  tasks: Task[];
}

export type Category = {
  id: number;
  content: string;
  project_id: number;
}

export type Tag = {
  id: number;
  content: string;
  project_id: number;
}

export type Milestone = {
  id: number;
  title: string;
  description: string;
  deadline: number;
  project_id: number;
}

export type Account = {
  id: number;
  username: string;
  icon: string;
  password: string;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  milestone_id: number;
  creator_id: number;
  project_id: number;
}