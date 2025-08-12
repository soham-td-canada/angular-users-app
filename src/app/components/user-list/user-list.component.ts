import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserProfileCardComponent } from '../user-profile-card/user-profile-card.component';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { User } from '../../models/user.model';

// Define the shape of our view model for clarity
interface UserListViewModel {
  users: User[];
  searchTerm: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserProfileCardComponent, AddUserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // A single observable for the entire view's state
  vm$!: Observable<UserListViewModel>;
  showAddUserForm = false;

  private showActiveOnly = new BehaviorSubject<boolean>(false);
  private searchTerm = new BehaviorSubject<string>('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // We build the entire stream here
    this.vm$ = combineLatest([
      this.userService.users$,
      this.showActiveOnly,
      this.searchTerm.pipe(startWith(''), debounceTime(300), distinctUntilChanged()),
    ]).pipe(
      map(([users, isActive, term]) => {
        // --- This is our filtering logic ---
        const filteredUsers = users
          .filter(user => (isActive ? user.isActive : true))
          .filter(user => user.name.toLowerCase().includes(term.toLowerCase()));

        // --- Return a single object for the template ---
        return { users: filteredUsers, searchTerm: term };
      })
    );
  }

  onFilterChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.showActiveOnly.next(isChecked);
  }

  onSearchChange(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.next(term);
  }

  onSearchInputClear(inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.searchTerm.next('');
  }

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
  }
}
