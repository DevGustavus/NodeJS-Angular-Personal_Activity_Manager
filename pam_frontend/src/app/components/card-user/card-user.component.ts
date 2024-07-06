import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { SharedServiceService } from '../../services/sharedService/shared-service.service';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  currentUser: User = { firstName: '', lastName: '' };
  @Input() user!: User;

  constructor(private userService: UserService, private sharedService: SharedServiceService) {}

  updateUser(): void {
    this.userService.updateUser(this.user.id!, this.currentUser).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);
      },
      error: (error) => console.log('Error updating user:', error),
      complete: () => console.log('User update request completed')
    });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id!).subscribe({
      next: (data) => {
        console.log('User deleted successfully', data);
      },
      error: (error) => console.log('Error deleting user:', error),
      complete: () => console.log('User deletion request completed')
    });
  }
}
