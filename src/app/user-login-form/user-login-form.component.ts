import { Component, OnInit, Input } from '@angular/core';
// This import is use to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }
  ngOnInit(): void { }

  // This is the function responsible for checking the user crendentials and storing it in local storage
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for successful user login goes here!
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        localStorage.setItem('Username', result.user.Username);

        this.dialogRef.close();// This will close the modal on success!
        this.snackBar.open(' You are Logged In Successfully', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      }, error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    })
  }
}
