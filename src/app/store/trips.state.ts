import { Trip } from "../models/trip";

export interface TripsState {
  trips: Trip[]; 
  tripOfTheDay: Trip | null;
  filters: {
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
    title: string;
  };
}

export const initialTripsState: TripsState = {
  trips: [],
  tripOfTheDay: null,
  filters: {
    sortBy: '',
    sortOrder: 'ASC',
    title: '',
  },
};
