import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ChoreService } from '../../shared/services/chore.service';
import { Chore } from '../../shared/interfaces/chore';

@Component({
  selector: 'app-chore',
  imports: [],
  templateUrl: './chore.component.html',
  styleUrl: './chore.component.css'
})
export class ChoreComponent {

  ChoreService = inject(ChoreService)
  getChore: string = '';
  

  ngOnInit(){
      this.ChoreService.getChore()
      .subscribe((data) => {
        console.log(data)
      })
    }

}

