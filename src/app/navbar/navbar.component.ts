import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private router: Router,
  ) { }
  ngOnInit(): void { }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  toUserProfile(): void {
    this.router.navigate(['userprofile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
