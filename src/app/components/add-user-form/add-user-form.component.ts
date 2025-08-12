import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent {
  // This event will tell the parent to close the form.
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return; // Don't submit if the form is invalid
    }
    // Call the service to add the user
    this.userService.addUser(form.value);
    // Reset the form and emit the event
    form.reset();
    this.formSubmitted.emit();
  }
}
