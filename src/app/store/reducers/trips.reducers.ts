import { createReducer, on } from '@ngrx/store';
import { loadTrips, loadTripsSuccess, 
    loadTripsFailure, updateFilters, loadTripOfTheDay, loadTripOfThedaySuccess, loadTripOfThedayFailure
 } from '../actions/trips.actions';
import { initialTripsState } from '../trips.state';

export const tripsReducer = createReducer(
  initialTripsState,
  on(loadTrips, (state, { page, filters }) => ({
    ...state,
    filters,
    currentPage: page,
  })),
  on(loadTripsSuccess, (state, { trips, currentPage, totalPages, totalItems }) => ({
    ...state,
    trips,
    currentPage,
    totalPages,
    totalItems
  })),
  on(loadTripsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateFilters, (state, { page, filters }) => ({
    ...state,
    filters,
    currentPage: page,
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
