import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { ErrorService } from './error.service';

interface JsonResponse {
  items: Trip[],
  limit: number,
  page: number,
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private readonly apiUrl = "https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/"; // Base URL for trips
  private readonly prefix = "v1/trips"

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
    ) {}

  // getAllTrips(): Observable<JsonResponse> {
  //   return this.http.get<JsonResponse>(this.apiUrl + this.prefix)
  //     .pipe(
  //       catchError(this.errorService.handleError)
  //     );
  // }

  getAllTrips(
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC',
    titleFilter: string = ''
  ): Observable<JsonResponse> {
    let params = new HttpParams();

    if (sortBy && sortOrder) {
      params = params.set('sortBy', sortBy).set('sortOrder', sortOrder);
    }
  
    if (titleFilter) {
      params = params.set('titleFilter', titleFilter);
    }

    return this.http.get<JsonResponse>(`${this.apiUrl}${this.prefix}`, { params }).pipe(
      catchError(this.errorService.handleError)
    );
  }


  getTripDetails(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${this.prefix}/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }

  getTripOfTheDay(): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${this.prefix}/random/trip-of-the-day`)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }
}
