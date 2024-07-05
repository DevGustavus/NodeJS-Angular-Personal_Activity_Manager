import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category/category.service';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';

@Component({
  selector: 'app-btn-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './btn-category.component.html',
  styleUrl: './btn-category.component.css'
})
export class BtnCategoryComponent {
  newCategory: Category = { description: '' };

  constructor(private categoryService: CategoryService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
  }

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (data) => {
        console.log('Category created successfully:', data);
        this.newCategory = { description: '' };
        this.sharedService.notifyCategoryCreated();
      },
      error: (error) => console.error('Error creating category:', error),
      complete: () => console.log('Category creation request completed')
    });
  }
}
