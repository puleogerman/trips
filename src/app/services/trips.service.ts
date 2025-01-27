import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment.development';

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

  private readonly apiUrl = environment.apiUrl;
  private readonly prefix = "v1/trips"

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
    ) {}

    getAllTrips(
      page: number,
      sortBy?: string,
      sortOrder?: 'ASC' | 'DESC',
      titleFilter: string = '',
      minPrice?: number,
      maxPrice?: number,
      minRating?: number,
      tags?: string
    ): Observable<JsonResponse> {
      let params = new HttpParams().set('page', page.toString());
    
      if (sortBy && sortOrder) {
        params = params.set('sortBy', sortBy).set('sortOrder', sortOrder);
      }
    
      if (titleFilter) {
        params = params.set('titleFilter', titleFilter);
      }
    
      if (minPrice != null) {
        params = params.set('minPrice', minPrice.toString());
      }
    
      if (maxPrice != null) {
        params = params.set('maxPrice', maxPrice.toString());
      }
    
      if (minRating != null) {
        params = params.set('minRating', minRating.toString());
      }
    
      if (tags) {
        params = params.set('tags', tags);
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
