import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';

@Component({
  selector: 'app-category-dashboard',
  imports: [CategoryNavbarComponent],
  templateUrl: './category-dashboard.component.html',
  styleUrl: './category-dashboard.component.css'
})
export class CategoryDashboardComponent {

  CategoryService = inject(CategoryService)
  getCategory: string = '';
  
    ngOnInit(){
        this.CategoryService.getCategory()
        .subscribe((data) => {
          console.log(data)
        })
      }

}
