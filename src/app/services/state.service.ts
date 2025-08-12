import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly _selectedUser = new BehaviorSubject<User | null>(null);
  readonly selectedUser$ = this._selectedUser.asObservable();

  selectUser(user: User | null) {
    this._selectedUser.next(user);
  }
}
