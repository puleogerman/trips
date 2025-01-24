import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TripsState } from '../../store/trips.state';
import { loadTrips, updateFilters } from '../../store/actions/trips.actions';

@Component({
  selector: 'app-trip-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './trip-filters.component.html',
  styleUrl: './trip-filters.component.scss',
})
export class TripFiltersComponent {
  constructor(private store: Store<{ trips: TripsState }>) {}

  titleFilter: string = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minRating: number | undefined;
  tags: string = '';

  sortOrder: 'ASC' | 'DESC' = 'ASC';
  sortBy: string = '';

  applyFilters(): void {
    this.store.dispatch(
      loadTrips({
        filters: {
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          titleFilter: this.titleFilter,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          minRating: this.minRating,
          tags: this.tags,
        },
      })
    );
  }

  onSortChanged(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.store.dispatch(
      updateFilters({
        filters: {
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          titleFilter: this.titleFilter,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          minRating: this.minRating,
          tags: this.tags,
        },
      })
    );
    this.store.dispatch(
      loadTrips({
        filters: {
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          titleFilter: this.titleFilter,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          minRating: this.minRating,
          tags: this.tags,
        },
      })
    );
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.applyFilters();
  }
}
