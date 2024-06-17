import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interfaces/category.interface';
import { BtnCategoryComponent } from '../../components/btn-category/btn-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  btnCategory = BtnCategoryComponent;

  categories: Category[] = [];
  newCategory: Category = { description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.error('Error fetching categories:', error),
      complete: () => console.log('Categories fetching completed')
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (data) => {
        this.categories.push(data);
        this.newCategory = { description: '' }; // Limpa o formulário
        console.log('Category created successfully:', data);
      },
      error: (error) => console.error('Error creating category:', error)
    });
  }

  updateCategory(id: number, category: any): void {
    this.categoryService.updateCategory(id, category).subscribe({
      next: (data) => {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
          this.categories[index] = data;
        }
        console.log('Category updated successfully:', data);
      },
      error: (error) => console.error('Error updating category:', error)
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== id);
        console.log('Category deleted successfully');
      },
      error: (error) => console.error('Error deleting category:', error)
    });
  }
}
