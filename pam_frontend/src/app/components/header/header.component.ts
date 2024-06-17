import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnUserComponent } from '../btn-user/btn-user.component';
import { NgComponentOutlet } from '@angular/common';
import { BtnCategoryComponent } from '../btn-category/btn-category.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, BtnUserComponent, BtnCategoryComponent, NgComponentOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()
  btnComponent: any;
}
