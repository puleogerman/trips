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

  currentPage: number = 1;

  applyFilters(): void {
    this.currentPage = 1; // Reset to the first page when filters are applied
    this.dispatchFilters();
  }

  onSortChanged(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.currentPage = 1; // Reset to the first page when sort changes
    this.dispatchFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.currentPage = 1; // Reset to the first page when sort order changes
    this.dispatchFilters();
  }

  private dispatchFilters(): void {
    const filters = {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      titleFilter: this.titleFilter,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating,
      tags: this.tags,
    };

    // Update filters in the store
    this.store.dispatch(updateFilters({ page: this.currentPage, filters }));

    // Load trips with the current filters and pagination
    this.store.dispatch(
      loadTrips({
        filters: { ...filters },
        page: this.currentPage,
      })
    );
  }
}
