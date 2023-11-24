import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Retrieves movies from the API and assigns them to the 'movies' array.
   * @param void
   * @returns movies array
   * @memberof MovieCardComponent
   * @see FetchApiDataService.getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog to display details of a genre.
   *
   * @param genre - The genre object containing the title and content to be displayed.
   * @returns void
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  /**
   * Opens a dialog to display details of a director.
   *
   * @param director - The director object containing the title and content to be displayed.
   * @returns void
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: "Directed by " + director.Name,
        content: director.Bio,
      }
    })
  }

  /**
   * Opens a dialog to display description of a movie.
   *
   * @param details - The details object containing the title and content of a movie to be displayed.
   * @returns void
   */
  openSynopsisDialog(details: string): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: "Description",
        content: details,
      }
    })
  }

  /**
   * Checks if the movie with the given id is marked as favorite
   * @param id 
   * @returns A Boolean indicating whether the movie is marked as favorite or not
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  /**
   * Add a movie with the given id to the user's favorite list
   * @param id - The movie id to add to favorites
   */
  addToFavorite(id: string): void {
    this.fetchApiData.addMovieToFavourites(id).subscribe(() => {
      this.snackBar.open('Movie is added to your favorite list', 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * Delete a movie with the given id from the user's favorite list
   * @param id -The movie id to be deleted from the favorites
   */
  deleteFromFavorite(id: string): void {
    this.fetchApiData.deleteMovieFromFavorite(id).subscribe(() => {
      this.snackBar.open('Movie has been removed from your favorite list', 'OK', {
        duration: 2000
      })
    });
  }
}
