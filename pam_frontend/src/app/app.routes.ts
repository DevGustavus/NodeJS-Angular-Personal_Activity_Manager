import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'categories', component: CategoriesComponent}
];
