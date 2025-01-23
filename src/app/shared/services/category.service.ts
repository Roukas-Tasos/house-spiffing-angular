import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryCreateDTO, CategoryDeleteDTO, CategoryUpdateDTO } from '../interfaces/category';
import { environment } from '../../../environments/environment.development';

const CATEGORIES_URL = 'http://localhost:8080/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http: HttpClient = inject(HttpClient);
    
  getCategory() {
    return this.http.get<Category[]>(CATEGORIES_URL, {
      headers: {
        Accept: 'application/json'
      }
    })
  }

  registerCategory(category : CategoryCreateDTO) {
      return this.http.post<{msg:string}>(`${CATEGORIES_URL}/save`, category)
    }

  updateCategory(category : CategoryUpdateDTO) {
    return this.http.put<{msg: string}>(`${CATEGORIES_URL}/update/${category.id}`, category)
  }

  getCategoryByName(name : string){
    return this.http.get<Category>(`${CATEGORIES_URL}/by-name/${name}`)
  }

  deleteCategory(category: CategoryDeleteDTO) {
    return this.http.delete<Category>(`${CATEGORIES_URL}/delete/${category}`)
  }


}
