import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { StateService } from '../../services/state.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  selectedUser$: Observable<User | null>;

  constructor(private stateService: StateService) {
    this.selectedUser$ = this.stateService.selectedUser$;
  }
}
