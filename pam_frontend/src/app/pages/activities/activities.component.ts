import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../interfaces/activity.interface';
import { BtnActivityComponent } from '../../components/btn-activity/btn-activity.component';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { Subscription } from 'rxjs';
import { CardActivityComponent } from '../../components/card-activity/card-activity.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule, CardActivityComponent],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  btnActivity = BtnActivityComponent;

  activities: Activity[] = [];
  currentActivity: Activity = { 
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
}
