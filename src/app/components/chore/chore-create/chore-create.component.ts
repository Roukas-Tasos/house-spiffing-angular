import { Component, inject } from '@angular/core';
import { ChoreNavbarComponent } from '../chore-navbar/chore-navbar.component';
import { ChoreService } from '../../../shared/services/chore.service'; 
import { Chore, ChoreCreateDTO } from '../../../shared/interfaces/chore'; 
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chore-create',
  imports: [ChoreNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './chore-create.component.html',
  styleUrl: './chore-create.component.css'
})
export class ChoreCreateComponent {

  ChoreService = inject(ChoreService);
  
    form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      categoryId: new FormControl('')
    })
  
    onSubmit(value:any) {
        console.log(value);
        const chore: ChoreCreateDTO = {
          name: this.form.get('name')?.value || '',
          description: this.form.get('description')?.value || '',
          dueDate: this.form.get('dueDate')?.value || '',
          categoryId: this.form.get('categoryId')?.value || ''
        }
        this.ChoreService.registerChore(chore).subscribe({
          next: (response) => {
            console.log("No Errors", response)
            this.registrationStatus = {success: true, message: "Chore registered successfully!"}
            this.form.reset();
          },
          error: (response) => {
            console.log("Errors", response)
            this.registrationStatus = {success: false, message: "There was an error registering the chore!"}
          }
        })
      }
  
      registrationStatus: {success: boolean, message: string} = {
        success: false,
        message: "Not attempted yet"
      }

}
