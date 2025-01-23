import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ChoreNavbarComponent } from '../chore-navbar/chore-navbar.component'; 
import { ChoreService } from '../../../shared/services/chore.service';
import { Chore, ChoreDeleteDTO } from '../../../shared/interfaces/chore';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-chore-read',
  imports: [ChoreNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './chore-read.component.html',
  styleUrl: './chore-read.component.css'
})
export class ChoreReadComponent {

   ChoreService = inject(ChoreService);
    cdr = inject(ChangeDetectorRef);
    chores : Chore[] = [];
  
    
      ngOnInit(){
        this.ChoreService.getChore()
        .subscribe(
          (data) => {
          console.log(data)
          this.chores = data;
          this.cdr.detectChanges();
        },
        )} 

}
