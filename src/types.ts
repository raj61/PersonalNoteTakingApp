export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Note {
  id: string;
  projectId: string;
  content: string;
  date: string;
}