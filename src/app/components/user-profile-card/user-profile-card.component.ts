import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { User } from '../../models/user.model';
import { LoggerService } from '../../services/logger.service';
import { StateService } from '../../services/state.service';
import { Subscription } from 'rxjs';

// 1. Import CommonModule for *ngIf, *ngFor, date pipe, etc.
import { CommonModule } from '@angular/common';
// 2. Import your custom pipe
import { InitialsPipe } from '../../pipes/initials.pipe';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-profile-card',
  standalone: true, // This confirms it's a standalone component
  imports: [
    CommonModule,   // 3. Add CommonModule here
    InitialsPipe,
    HighlightPipe
  ],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css'] // Make sure this file exists!
})
export class UserProfileCardComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  @Input() searchTerm: string = '';
  // The deleteRequest Output is no longer needed here since we call the service directly
  // @Output() deleteRequest = new EventEmitter<number>();

  isSelected = false;
  private selectionSubscription!: Subscription;

  constructor(
    private stateService: StateService,
    private userService: UserService // Keep other injected services
  ) {}

  ngOnInit() {
    // This subscription's only job is to listen for changes from the service
    // and update the local 'isSelected' flag accordingly.
    this.selectionSubscription = this.stateService.selectedUser$.subscribe(
      (selectedUser) => {
        this.isSelected = selectedUser?.id === this.user.id;
      }
    );
  }

  ngOnDestroy() {
    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }
  }

  // This method now contains the toggle logic.
  onUserSelect() {
    // If this card is already selected, clicking it again should de-select it.
    if (this.isSelected) {
      this.stateService.selectUser(null); // Clear the selection
    } else {
      // Otherwise, select this user.
      this.stateService.selectUser(this.user);
    }
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation(); // Keep this to prevent the select from firing
    this.userService.deleteUser(this.user.id);
  }
}
