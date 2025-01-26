import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TripsService } from '../../services/trips.service';
import { loadTrips, loadTripsSuccess, loadTripsFailure, loadTripOfTheDay, loadTripOfThedaySuccess, loadTripOfThedayFailure } from '../actions/trips.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TripsEffects {
  constructor(private actions$: Actions, private tripsService: TripsService) {}

  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      mergeMap(({ page, filters }) =>
        this.tripsService.getAllTrips(page, filters.sortBy, filters.sortOrder, filters.titleFilter, filters.minPrice, filters.maxPrice, filters.minRating, filters.tags).pipe(
          map((data) => loadTripsSuccess({ 
            trips: data.items,
            currentPage: data.page,
            totalPages: Math.ceil(data.total / data.limit),
            totalItems: data.total
          })),
          catchError((error) => of(loadTripsFailure({ error: error.message })))
        )
      )
    )
  );

  loadTripOfTheDay$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadTripOfTheDay),
    mergeMap(() =>
      this.tripsService.getTripOfTheDay().pipe(
        map((trip) => loadTripOfThedaySuccess({ trip: trip })),
        catchError((error) => of(loadTripOfThedayFailure({ error: error.message })))
      )
    )
  )
);
}
