import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = "https://movie-api-0fqq.onrender.com/";

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }


  /**
   * Registers a new user - Making the api call for the user registration endpoint
   * @param userDetails - The details of the user to be registered.
   * @returns An Observable that emits the response from the server.
   */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user - Making the api call for the user login endpoint
   * @param userDetails - The details of the user to be logged in.
   * @returns An Observable that emits the response from the server.
   */
  public userLogin(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** 
    * Retrieves all Movies - Making the api call for the get all movies endpoint
    * @returns An Obsrvable with an array of movie objects
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single movie by title - Making the api call for the get one movie endpoint 
   * @param title 
   * @returns An Observable with a movie object
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves director data by director name - Making the api call for the get details about a director endpoint
   * @param directorName 
   * @returns An Observable with a director object
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves genre data by genre name - Making the api call for the get details about a genre endpoint
   * @param genreName 
   * @returns An Observable with a genre object
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves user data 
   * @returns An Observable with a user object
   */
  getUserDetails(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
    // const token = localStorage.getItem('token');
    // Making the api call for the get a user endpoint
    // return this.http.get(apiUrl + 'users/' + user.Username, {
    //   headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    // }).pipe(
    //   map(this.extractResponseData),
    //   catchError(this.handleError)
    // );
  }

  /**
   * Retrieves favoritemovies - Making the api call for the get the favorite movies of a user endpoint 
   * @returns An Observable with a user favorite movies array
   */
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Add movie to user's favorite list - Making the api call for the add the movie to the favorite Movies endpoint
   * @param movieId 
   * @returns An Observable with a user object
   */
  addMovieToFavourites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Checks whether the user contains the movie in their favoritemovies
   * @param movieId 
   * @returns Boolean value
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.FavoriteMovies.includes(movieId);
    }
    return false;
  }

  /**
   * updates user data - Making the api call for the update user endpoint
   * @param userDetails 
   * @returns An Observable with a user object
   */
  updateUser(userDetails: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http.put(apiUrl + 'users/' + user.Username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete user - Making the api call for the delete user endpoint
   * @returns An Observable that emits the response from the server.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + "users/" + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete movie from user's favorite list - Making the api call for the delete movie from the user's favorite movies endpoint
   * @param movieId 
   * @returns An Observable with a user object
   */
  deleteMovieFromFavorite(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem('token');

    const index = user.FavoriteMovies.indexOf(movieId);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      ),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * Non-typed response extraction - Extracts the response data from the given input.
 *
 * @param res - The input response object.
 * @returns The extracted response data as an object, or an empty object if no data is found.
 */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
  * Handles HTTP errors.
  * @param error - The HttpErrorResponse object representing the error.
  * @returns An Observable that emits an error message.
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}