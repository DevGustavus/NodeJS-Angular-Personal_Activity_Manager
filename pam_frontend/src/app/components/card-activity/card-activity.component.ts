import { Component, Input } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { ActivityService } from '../../services/activity/activity.service';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';
import { User } from '../../interfaces/user.interface';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-card-activity',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './card-activity.component.html',
  styleUrl: './card-activity.component.css',
})
export class CardActivityComponent {
  currentActivity: Activity = {
    description: '',
    user: { id: undefined, firstName: '', lastName: '' },
    category: { id: undefined, description: '' },
  };
  @Input() activity!: Activity;

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private categoryService: CategoryService,
    private sharedService: SharedServiceService
  ) {}

  updateActivity(): void {
    const userId = this.currentActivity.user.id;
    const categoryId = this.currentActivity.category.id;

    if (!userId || !categoryId) {
      console.error('User ID or Category ID is undefined or null.');
      return;
    }

    // Obter o usuário pelo ID
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.currentActivity.user = user;
        console.log('User:', user);

        // Obter a categoria pelo ID
        this.categoryService.getCategoryById(categoryId).subscribe({
          next: (category: Category) => {
            this.currentActivity.category = category;
            console.log('Category:', category);

            // Montar o objeto JSON no formato esperado pelo backend
            const activityToSend = {
              description: this.currentActivity.description,
              userId: userId,
              categoryId: categoryId,
            };

            console.log('Activity to send:', activityToSend);

            // Enviar a atividade para o backend
            this.activityService.updateActivity(this.activity.id!, activityToSend).subscribe({
              next: () => {
                console.log('Activity updated successfully');
              },
              error: (error) =>
                console.error('Error updating activity:', error),
              complete: () => console.log('Activity updating completed'),
            });
          },
          error: (error) => console.error('Error fetching category:', error),
        });
      },
      error: (error) => console.error('Error fetching user:', error),
    });
  }

  /*
  updateActivity(): void {
    console.log('Updating activity with data:', this.currentActivity);
    this.activityService
      .updateActivity(this.activity.id!, this.currentActivity)
      .subscribe({
        next: (data) => {
          console.log('Activity updated successfully:', data);
        },
        error: (error) => {
          console.error('Error updating Activity:', error);
          if (error.status === 422) {
            console.error('Validation error:', error.error);
          }
        },
        complete: () => console.log('Activity update request completed'),
      });
  }
  */

  deleteActivity(): void {
    this.activityService.deleteActivity(this.activity.id!).subscribe({
      next: (data) => {
        console.log('Activity deleted successfully:', data);
      },
      error: (error) => console.log('Error deleting Activity:', error),
      complete: () => console.log('Activity deletion request completed'),
    });
  }
}
