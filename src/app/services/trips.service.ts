import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  getAllTrips(): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this.apiUrl + this.prefix)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }


  getTripDetails(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${this.prefix}/${id}`)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }

  getRandomTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/${this.prefix}/random/trip-of-the-day`)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }
}
