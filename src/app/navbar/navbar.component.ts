import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

/**
 * Represents the NavbarComponent class.
 * This component is responsible for displaying the navigation bar and handling navigation actions.
 */
export class NavbarComponent {

  /**
   * Creates an instance of NavbarComponent.
   * @param router - The router service used for navigation.
   */
  constructor(
    private router: Router,
  ) { }

  /**
   * Initializes the component.
   */
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
