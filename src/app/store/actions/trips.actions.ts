import { createAction, props } from '@ngrx/store';
import { Trip } from '../../models/trip';

export const loadTrips = createAction(
  '[Trips] Load Trips',
  props<{
    filters: {
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
      titleFilter?: string;
      minPrice?: number;
      maxPrice?: number;
      minRating?: number;
      tags?: string;
    };
  }>()
);

export const loadTripsSuccess = createAction(
  '[Trips] Load Trips Success',
  props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips] Load Trips Failure',
  props<{ error: string }>()
);

export const updateFilters = createAction(
  '[Trips] Update Filters',
  props<{
    filters: {
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
      titleFilter?: string;
      minPrice?: number;
      maxPrice?: number;
      minRating?: number;
      tags?: string;
    };
  }>()
);

// trip of the day actions

export const loadTripOfTheDay = createAction('[Trips] Load Trip of the Day');

export const loadTripOfThedaySuccess = createAction(
  '[Trips] Load Trip of the Day Success',
  props<{ trip: Trip }>()
);

export const loadTripOfThedayFailure = createAction(
  '[Trips] Load Trip of the Day Failure',
  props<{ error: string }>()
);
