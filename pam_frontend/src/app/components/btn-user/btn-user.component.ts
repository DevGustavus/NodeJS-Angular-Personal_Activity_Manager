import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-btn-user',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './btn-user.component.html',
  styleUrl: './btn-user.component.css'
})
export class BtnUserComponent implements OnInit{
  
  newUser: User = { firstName: '', lastName: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: (data) => {
        console.log('User created successfully:', data);
        this.newUser = { firstName: '', lastName: '' }; // Reset form
      },
      error: (error) => console.error('Error creating user:', error),
      complete: () => console.log('User creation request completed')
    });
  }
}
