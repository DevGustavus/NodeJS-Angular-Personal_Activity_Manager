import { Component } from '@angular/core';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../interfaces/activity.interface';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interfaces/category.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-btn-activity',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './btn-activity.component.html',
  styleUrls: ['./btn-activity.component.css']
})
export class BtnActivityComponent {
  
  newActivity: Activity = { 
    description: '', 
    user: { id: undefined, firstName: '', lastName: '' },
    category: { id: undefined, description: '' }
  };

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  createActivity(): void {
    const userId = this.newActivity.user.id;
    const categoryId = this.newActivity.category.id;

    if (!userId || !categoryId) {
      console.error('User ID or Category ID is undefined or null.');
      return;
    }

    // Obter o usuário pelo ID
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.newActivity.user = user;
        console.log('User:', user);

        // Obter a categoria pelo ID
        this.categoryService.getCategoryById(categoryId).subscribe({
          next: (category: Category) => {
            this.newActivity.category = category;
            console.log('Category:', category);

            // Montar o objeto JSON no formato esperado pelo backend
            const activityToSend = {
              description: this.newActivity.description,
              userId: userId,
              categoryId: categoryId
            };

            console.log('Activity to send:', activityToSend);

            // Enviar a atividade para o backend
            this.activityService.createActivity(activityToSend).subscribe({
              next: () => {
                console.log('Activity created successfully');
                this.resetForm(); // Limpar o formulário após a criação
              },
              error: (error) => console.error('Error creating activity:', error),
              complete: () => console.log('Activity creation completed')
            });
          },
          error: (error) => console.error('Error fetching category:', error)
        });
      },
      error: (error) => console.error('Error fetching user:', error)
    });
  }

  resetForm(): void {
    this.newActivity = {
      description: '',
      user: { id: undefined, firstName: '', lastName: '' },
      category: { id: undefined, description: '' }
    };
  }

}
