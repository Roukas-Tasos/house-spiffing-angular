import { Component, inject } from '@angular/core';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';
import { CategoryService } from '../../../shared/services/category.service';
import { Category, CategoryCreateDTO } from '../../../shared/interfaces/category';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-create',
  imports: [CategoryNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

  CategoryService = inject(CategoryService);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    chores: new FormArray([
      new FormGroup({
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dueDate: new FormControl('', Validators.required)
      })
    ])
  })
  
  chores = this.form.get('chores') as FormArray;
  
    removeChore(index:number){
      this.chores.removeAt(index);
    }
  
    addChore(){
      this.chores.push(
        new FormGroup({
          id: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          description: new FormControl(''),
          dueDate: new FormControl('', Validators.required)
        })
      )
    }

  onSubmit(value:any) {
      console.log(value);
      const category: CategoryCreateDTO = {
        name: this.form.get('name')?.value || '',
        description: this.form.get('description')?.value || '',
        chores: this.form.get('chores')?.value || []
      }
      this.CategoryService.registerCategory(category).subscribe({
        next: (response) => {
          console.log("No Errors", response)
          this.registrationStatus = {success: true, message: "Category registered successfully!"}
          this.form.reset();
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
}
