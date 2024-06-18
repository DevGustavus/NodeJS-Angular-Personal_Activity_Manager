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
  
  newActivity: Partial<Activity> = {
    description: '',
    user: undefined, // Inicializa como undefined
    category: undefined // Inicializa como undefined
  };

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  async createActivity(): Promise<void> {
    if (!this.newActivity.description) {
      console.error('Description is missing.');
      return;
    }

    try {
      // Obter o usuário pelo ID
      const userId = this.newActivity.user?.id;
      if (userId) {
        const user: User = await this.userService.getUserById(userId).toPromise();
        this.newActivity.user = user;
      }

      // Obter a categoria pelo ID
      const categoryId = this.newActivity.category?.id;
      if (categoryId) {
        const category: Category = await this.categoryService.getCategoryById(categoryId).toPromise();
        this.newActivity.category = category;
      }

      // Enviar a atividade para o backend
      await this.activityService.createActivity(this.newActivity as Activity).toPromise();

      console.log('Activity created successfully');
      this.newActivity = { description: '', user: undefined, category: undefined }; // Limpar o formulário após a criação
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  }

}
