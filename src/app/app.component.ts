import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true, // Make sure this is true
  imports: [
    UserListComponent, // Import child components directly
    UserDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-practice-app';
}
