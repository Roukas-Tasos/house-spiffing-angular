import { Component, inject } from '@angular/core';
import { ChoreService } from '../../../shared/services/chore.service';
import { ChoreNavbarComponent } from '../chore-navbar/chore-navbar.component';

@Component({
  selector: 'app-chore-dashboard',
  imports: [ChoreNavbarComponent],
  templateUrl: './chore-dashboard.component.html',
  styleUrl: './chore-dashboard.component.css'
})
export class ChoreDashboardComponent {

  ChoreService = inject(ChoreService)
    getChore: string = '';
    
  
    ngOnInit(){
        this.ChoreService.getChore()
        .subscribe((data) => {
          console.log(data)
        })
      }

}
