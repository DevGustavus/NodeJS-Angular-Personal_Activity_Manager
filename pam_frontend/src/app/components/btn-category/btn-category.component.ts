import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-btn-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './btn-category.component.html',
  styleUrl: './btn-category.component.css'
})
export class BtnCategoryComponent {
  newCategory: Category = { description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
  }

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (data) => {
        console.log('Category created successfully:', data);
        this.newCategory = { description: '' }; // Reset form
      },
      error: (error) => console.error('Error creating category:', error),
      complete: () => console.log('Category creation request completed')
    });
  }
}
