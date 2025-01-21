import { Component, inject } from '@angular/core';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/interfaces/category';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { Chore } from '../../../shared/interfaces/chore';
import { ChoreService } from '../../../shared/services/chore.service';

@Component({
  selector: 'app-category-update',
  imports: [CategoryNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatIcon],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent {

  CategoryService = inject(CategoryService);
  getCategory = '';

  ngOnInit(){
    this.CategoryService.getCategory()
    .subscribe((data) => {
      console.log(data)
    })
  }

  searchForm = new FormGroup({
    search: new FormControl('')
  })

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    chores: new FormArray([
      new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        description: new FormControl(''),
        dueDate: new FormControl('')
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
    const category: Category = {
      id: this.form.get('id')?.value || '',
      name: this.form.get('name')?.value || '',
      description: this.form.get('description')?.value || '',
      chores: this.form.get('chores')?.value || []
    }
    this.CategoryService.registerCategory(category).subscribe({
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
    this.CategoryService.getCategoryByName(searchValue).subscribe((category) => {
      console.log(category)
      this.form.patchValue({
        id: category.id,
        name: category.name,
        description: category.description
      })

      this.chores.clear()

      category.chores.forEach((chore) => {
        this.chores.push(
          new FormGroup({
            id: new FormControl(chore.id, Validators.required),
            name: new FormControl(chore.name, Validators.required),
            description: new FormControl(chore.description),
            dueDate: new FormControl(chore.dueDate, Validators.required)
          })
        )
      })
    }) 
  }

}
