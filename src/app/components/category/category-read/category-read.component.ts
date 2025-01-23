import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';
import { CategoryService } from '../../../shared/services/category.service';
import { Category,  } from '../../../shared/interfaces/category';
import {ReactiveFormsModule} from '@angular/forms';
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
  categoryId = '';
  
    ngOnInit(){
      this.CategoryService.getCategory()
      .subscribe(
        (data) => {
        console.log(data)
        this.categories = data;
        this.cdr.detectChanges();
      },
      )}

}
