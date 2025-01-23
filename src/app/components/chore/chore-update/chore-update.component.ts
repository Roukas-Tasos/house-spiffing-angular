import { Component, inject } from '@angular/core';
import { ChoreNavbarComponent } from '../chore-navbar/chore-navbar.component'; 
import { ChoreService } from '../../../shared/services/chore.service'; 
import { ChoreUpdateDTO } from '../../../shared/interfaces/chore';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chore-update',
  imports: [ChoreNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatIcon],
  templateUrl: './chore-update.component.html',
  styleUrl: './chore-update.component.css'
})
export class ChoreUpdateComponent {
  ChoreService = inject(ChoreService);
    getChore = '';
    choreId : string | null = '';
  
    ngOnInit(){
      this.ChoreService.getChore()
      .subscribe((data) => {
        console.log(data)
      })
    }
  
    searchForm = new FormGroup({
      search: new FormControl('')
    })
  
    form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required)
        })
  
    onSubmit(value:any) {
      console.log(value);
      const chore: ChoreUpdateDTO = {
        id: this.choreId,
        name: this.form.get('name')?.value || '',
        description: this.form.get('description')?.value || '',
        dueDate: this.form.get('dueDate')?.value || ''
      }
        this.ChoreService.updateChore(chore).subscribe({
        next: (response) => {
          console.log("No Errors", response)
          this.registrationStatus = {success: true, message: "Category registered successfully!"}
        },
        error: (response) => {
          console.log("Errors", response)
          this.registrationStatus = {success: false, message: "There was an error registering the category!"}
        }
      })
    }
  
    registrationStatus: {success: boolean, message: string} = {
      success: false,
      message: "Not attempted yet"
    }
  
    search(){
      const searchValue = this.searchForm.controls.search.value!
      this.ChoreService.getChoreByName(searchValue).subscribe((chore) => {
        console.log(chore)
        this.choreId = chore.id
        this.form.patchValue({
          name: chore.name,
          description: chore.description,
          dueDate: chore.dueDate
        })       
      }) 
    }

}
