import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../interfaces/activity.interface';
import { BtnActivityComponent } from '../../components/btn-activity/btn-activity.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  btnActivity = BtnActivityComponent;

  activities: Activity[] = [];
  newActivity: Activity = { 
    description: '', 
    user: { firstName: '', lastName: '' },
    category: { description: '' }
  };

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (data) => {
        console.log(data); // Adicione isso para verificar os dados
        this.activities = data;
      },
      error: (error) => console.error('Error fetching activities:', error),
      complete: () => console.log('Activities fetching completed')
    });
  }

  createActivity(): void {
    this.activityService.createActivity(this.newActivity).subscribe({
      next: (data) => {
        this.activities.push(data);
        this.newActivity = { 
          description: '', 
          user: { firstName: '', lastName: '' },
          category: { description: '' }
        };
        console.log('Activity created successfully:', data);
      },
      error: (error) => console.error('Error creating activity:', error)
    });
  }

  updateActivity(id: number | undefined, activity: Activity): void {
    if (id !== undefined) {
      this.activityService.updateActivity(id, activity).subscribe({
        next: (data) => {
          const index = this.activities.findIndex(a => a.id === id);
          if (index !== -1) {
            this.activities[index] = data;
          }
          console.log('Activity updated successfully:', data);
        },
        error: (error) => console.error('Error updating activity:', error)
      });
    }
  }

  deleteActivity(id: number | undefined): void {
    if (id !== undefined) {
      this.activityService.deleteActivity(id).subscribe({
        next: () => {
          this.activities = this.activities.filter(a => a.id !== id);
          console.log('Activity deleted successfully');
        },
        error: (error) => console.error('Error deleting activity:', error)
      });
    }
  }
}
