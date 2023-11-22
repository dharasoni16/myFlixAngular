import { Component, OnInit, Input } from '@angular/core';

// This import displays notification to user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snakBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {

    this.user = this.fetchApiData.getUserDetails();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthdate;

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: { _id: any; }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.snakBar.open('User data has been successfully updated', 'OK', {
          duration: 2000
        });
      }, error: (error) => {
        this.snakBar.open(error, 'OK', {
          duration: 2000
        });
      }
    });
  }


  deleteUser(): void {
    if (confirm("Are you sure you want to delete your account")) {
      this.fetchApiData.deleteUser().subscribe({
        next: (result) => {
          localStorage.clear();
          this.router.navigate(['welcome']);
          this.snakBar.open('User has been successfully deleted', 'OK', {
            duration: 2000
          });
        }, error: (error) => {
          this.snakBar.open(error, 'OK', {
            duration: 2000
          });
        }
      });
    }
  }
}