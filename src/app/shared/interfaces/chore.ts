export interface Chore {
  id: string | null;
  name: string | null;
  description: string | null;
  dueDate: string | null;
}

export interface ChoreCreateDTO {
  name: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface ChoreDeleteDTO {
  id: string;
  name: string;
  description: string;
  chores: Chore[];
}

export interface ChoreUpdateDTO {
  id: string | null;
  name: string;
  description: string;
  dueDate: string;
}
