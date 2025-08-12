import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // The "source of truth" for our user list, initialized with mock data.
  private readonly _users = new BehaviorSubject<User[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', joinDate: new Date('2023-01-15'), isActive: true },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', joinDate: new Date('2022-07-20'), isActive: true },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', joinDate: new Date('2023-05-10'), isActive: false },
  ]);

  // Public observable that components will subscribe to.
  readonly users$: Observable<User[]> = this._users.asObservable();

  constructor(private stateService: StateService) {}

  // Method to add a new user to the list.
  addUser(user: { name: string; email: string }) {
    const currentUsers = this._users.getValue();
    const newUser: User = {
      id: Math.max(...currentUsers.map(u => u.id)) + 1, // Generate a new ID
      name: user.name,
      email: user.email,
      joinDate: new Date(),
      isActive: true,
    };
    this._users.next([...currentUsers, newUser]);
  }

  // Method to delete a user by their ID.
  deleteUser(userId: number) {
    const currentUsers = this._users.getValue();
    const updatedUsers = currentUsers.filter(user => user.id !== userId);
    this._users.next(updatedUsers);
    this.stateService.selectUser(null);
  }
}
