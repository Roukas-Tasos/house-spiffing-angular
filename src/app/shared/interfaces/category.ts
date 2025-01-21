import { Chore } from "./chore";

export interface Category {
  id: string;
  name: string;
  description: string;
  chores: Chore[];
}

export interface CategoryCreateDTO {

  name: string;
  description: string;
  chores: Chore[];
}

export interface CategoryDeleteDTO {
  id: string;
}