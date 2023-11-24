import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})

/**
 * Represents the MovieDetailComponent class.
* This component is responsible for displaying the details of a movie.
*/
export class MovieDetailComponent implements OnInit {
  /**
   * Creates an instance of MovieDetailComponent.
   * @param data - The data object containing the title and content of the movie.
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    content: string,
  }) { }
  /**
   * Initializes the component.
   */
  ngOnInit(): void {
  }
}
