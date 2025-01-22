import { createReducer, on } from '@ngrx/store';
import { loadTrips, loadTripsSuccess, 
    loadTripsFailure, updateFilters, loadTripOfTheDay, loadTripOfThedaySuccess, loadTripOfThedayFailure
 } from '../actions/trips.actions';
import { initialTripsState } from '../trips.state';

export const tripsReducer = createReducer(
  initialTripsState,
  on(loadTrips, (state, { filters }) => ({
    ...state,
    filters,
  })),
  on(loadTripsSuccess, (state, { trips }) => ({
    ...state,
    trips,
  })),
  on(loadTripsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateFilters, (state, { filters }) => ({
    ...state,
    filters,
  })),

// Trip of the day

on(loadTripOfTheDay, (state) => ({
    ...state,
  })),
  on(loadTripOfThedaySuccess, (state, { trip }) => ({
    ...state,
    tripOfTheDay: trip,
  })),
  on(loadTripOfThedayFailure, (state, { error }) => ({
    ...state,
    error,
  }))
,
);
