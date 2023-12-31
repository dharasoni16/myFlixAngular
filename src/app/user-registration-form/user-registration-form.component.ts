import { Component, OnInit, Input } from '@angular/core';

// This import is use to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  //This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        // Logic for a successful user registration goes here!
        this.dialogRef.close();// This will close the modal on success!
        // console.log(result);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000
        });
      }, error: (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    })
  }
}