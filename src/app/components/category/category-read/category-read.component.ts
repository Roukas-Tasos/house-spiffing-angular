import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/interfaces/category';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-category-read',
  imports: [CategoryNavbarComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './category-read.component.html',
  styleUrl: './category-read.component.css'
})
export class CategoryReadComponent {

  CategoryService = inject(CategoryService);
  cdr = inject(ChangeDetectorRef);
  categories : Category[] = [];
  isUpdate: boolean = false;
  
    ngOnInit(){
      this.CategoryService.getCategory()
      .subscribe(
        (data) => {
        console.log(data)
        this.categories = data;
        this.cdr.detectChanges();
      },
      )}

    searchForm = new FormGroup({
      search: new FormControl('')
    })

    // search(){
    //   const searchValue = this.searchForm.controls.search.value!
    //   this.CategoryService.getCategoryById(searchValue).subscribe((category) => {
    //     console.log(category)
    //     this.form.patchValue({
    //       id: category.id,
    //       name: category.name,
    //       description: category.description
    //     })
  
    //     this.form.controls.chores.clear()
    //   }) 
    // }

    // onDelete(value:any) {
    //   console.log(value);
    //   const category: Category = {
    //     id: this.form.get('id')?.value || '',
    //     name: this.form.get('name')?.value || '',
    //     description: this.form.get('description')?.value || '',
    //     chores: this.form.get('chores').value || []
    //     }
    //     this.CategoryService.deleteCategory(category).subscribe({
    //       next: (response) => {
    //         console.log("No Errors", response)
    //         this.registrationStatus = {success: true, message: "Category deleted successfully"}
    //       },
    //       error: (response) => {
    //         console.log("Errors", response)
    //         this.registrationStatus = {success: false, message: "Category couldn't be deleted"}
    //       }
    //     })
    // }

    registrationStatus: {success: boolean, message: string} = {
      success: false,
      message: "Not attempted yet"
    }

}
