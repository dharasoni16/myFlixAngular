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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: "Directed by " + director.Name,
        content: director.Bio,
      }
    })
  }

  openSynopsisDialog(details: string): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: "Description",
        content: details,
      }
    })
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  addToFavorite(id: string): void {
    this.fetchApiData.addMovieToFavourites(id).subscribe(() => {
      this.snackBar.open('Movie is added to your favorite list', 'OK', {
        duration: 2000
      })
    });
  }

  deleteFromFavorite(id: string): void {
    this.fetchApiData.deleteMovieFromFavorite(id).subscribe(() => {
      this.snackBar.open('Movie has been removed from your favorite list', 'OK', {
        duration: 2000
      })
    });
  }
}
