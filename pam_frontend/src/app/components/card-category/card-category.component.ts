import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { CategoryService } from '../../services/category/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.css'
})
export class CardCategoryComponent {
  @Input() category!: Category;
  currentCategory: Category = { description: '' };

  constructor(private categoryService: CategoryService, private sharedService: SharedServiceService) {}

  updateCategory(): void {
    this.categoryService.updateCategory(this.category.id!, this.currentCategory).subscribe({
      next: (data) => {
        console.log('Category updated successfully:', data);
      },
      error: (error) => console.error('Error updating Category:', error),
      complete: () => console.log('Category update request completed')
    });
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.category.id!).subscribe({
      next: () => {
        console.log('Category deleted successfully');
      },
      error: (error) => console.error('Error deleting Category:', error),
      complete: () => console.log('Category deletion request completed')
    });
  }
}
