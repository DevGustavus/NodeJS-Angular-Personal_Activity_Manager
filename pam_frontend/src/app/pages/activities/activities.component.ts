import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../interfaces/activity.interface';
import { BtnActivityComponent } from '../../components/btn-activity/btn-activity.component';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { Subscription } from 'rxjs';

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
  private newActivitySubscription?: Subscription;

  constructor(private activityService: ActivityService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getAllActivities();
    this.newActivitySubscription = this.sharedService.newActivityCreated$.subscribe(() => {
      this.getAllActivities();
    });
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
