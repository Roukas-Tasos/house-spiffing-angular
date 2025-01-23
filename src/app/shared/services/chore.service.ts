import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chore, ChoreCreateDTO, ChoreUpdateDTO, ChoreDeleteDTO } from '../interfaces/chore';

const CHORES_URL = 'http://localhost:8080/api/chores';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {

  http: HttpClient = inject(HttpClient);
  
    getChore() {
      return this.http.get<Chore[]>(CHORES_URL, {
        headers: {
          Accept: 'application/json'
        }
      })
    }

    registerChore(chore : ChoreCreateDTO) {
          return this.http.post<{msg:string}>(`${CHORES_URL}/save`, chore)
        }
    
    updateChore(chore : ChoreUpdateDTO) {
      return this.http.put<{msg: string}>(`${CHORES_URL}/update/${chore.id}`, chore)
    }
  
    getChoreByName(name: string){
      return this.http.get<Chore>(`${CHORES_URL}/by-name/${name}`)
    }
  
    deleteChore(id: ChoreDeleteDTO) {
      return this.http.delete(`${CHORES_URL}/delete/${id}`)
    }
}
