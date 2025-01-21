import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const CHORES_URL = 'http://localhost:8080/api/chores';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {

  http: HttpClient = inject(HttpClient);
  
    getChore() {
      return this.http.get(CHORES_URL, {
        headers: {
          Accept: 'application/json'
        }
      })
    }
}
