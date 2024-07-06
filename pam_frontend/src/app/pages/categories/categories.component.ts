import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interfaces/category.interface';
import { BtnCategoryComponent } from '../../components/btn-category/btn-category.component';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { CardCategoryComponent } from '../../components/card-category/card-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule, CardCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  btnCategory = BtnCategoryComponent;

  categories: Category[] = [];
  private newCategorySubscription?: Subscription;
  currentCategory: Category = { description: '' };

  constructor(private categoryService: CategoryService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.newCategorySubscription = this.sharedService.newCategoryCreated$.subscribe(() => {
      this.getAllCategories();
    });
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.error('Error fetching categories:', error),
      complete: () => console.log('Categories fetching completed')
    });
  }

}
