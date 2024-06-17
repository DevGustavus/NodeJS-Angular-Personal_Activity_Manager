import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HeaderComponent } from '../../components/header/header.component';
import { User } from '../../interfaces/user.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BtnUserComponent } from '../../components/btn-user/btn-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  btnUser = BtnUserComponent;

  users: User[] = [];
  newUser: User = { firstName: '', lastName: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Error fetching users:', error),
      complete: () => console.log('User fetching completed')
    });
  }

  updateUser(id: number, user: any): void {
    this.userService.updateUser(id, user).subscribe({
      next: (data) => {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = data;
        }
        console.log('User updated successfully:', data);
      },
      error: (error) => console.error('Error updating user:', error),
      complete: () => console.log('User update request completed')
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        console.log('User deleted successfully');
      },
      error: (error) => console.error('Error deleting user:', error),
      complete: () => console.log('User deletion request completed')
    });
  }
}
