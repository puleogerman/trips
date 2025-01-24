import { Trip } from "../models/trip";

export interface TripsState {
  trips: Trip[]; 
  tripOfTheDay: Trip | null;
  filters: {
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    titleFilter?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tags?: string;
  };
}

export const initialTripsState: TripsState = {
  trips: [],
  tripOfTheDay: null,
  filters: {
    sortBy: '',
    sortOrder: 'ASC',
    titleFilter: '',
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    tags: '',

  },
};
