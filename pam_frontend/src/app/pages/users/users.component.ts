import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { User } from '../../interfaces/user.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BtnUserComponent } from '../../components/btn-user/btn-user.component';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';
import { Subscription } from 'rxjs';
import { CardUserComponent } from "../../components/card-user/card-user.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [HeaderComponent, HttpClientModule, CommonModule, CardUserComponent]
})
export class UsersComponent implements OnInit{
  btnUser = BtnUserComponent;

  users: User[] = [];
  private newUserSubscription?: Subscription;
  currentUser: User = { firstName: '', lastName: '' };

  constructor(private userService: UserService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.newUserSubscription = this.sharedService.newUserCreated$.subscribe(() => {
      this.getAllUsers();
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Error fetching users:', error),
      complete: () => console.log('User fetching completed')
    });
  }
}
