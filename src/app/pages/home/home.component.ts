import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadTripOfTheDay,
  loadTrips,
} from '../../store/actions/trips.actions';
import { TripsState } from '../../store/trips.state';
import { CommonModule } from '@angular/common';
import { WelcomeUserComponent } from '../../components/welcome-user/welcome-user.component';
import { TripFiltersComponent } from '../../components/trip-filters/trip-filters.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, WelcomeUserComponent, TripFiltersComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  trips$: Observable<Trip[]>;
  tripOfTheDay$: Observable<Trip | null>;
  currentPage$!: Observable<number>;
  totalPages$!: Observable<number>;

  constructor(
    private store: Store<{ trips: TripsState }>,
    private router: Router
  ) {
    this.trips$ = this.store.select((state) => state.trips.trips);
    this.tripOfTheDay$ = this.store.select((state) => state.trips.tripOfTheDay);
    this.currentPage$ = this.store.select((state) => state.trips.currentPage);
    this.totalPages$ = this.store.select((state) => state.trips.totalPages);

  }

  ngOnInit(): void {
    this.trips$.subscribe((trips) => {
      if (!trips || trips.length === 0) {
        this.store.dispatch(
          loadTrips({
            page: 1,
            filters: {},
          })
        );
      }
    });
  }

  onPageChange(page: number): void {
    this.store.select((state) => state.trips.filters).subscribe((filters) => {
      this.store.dispatch(loadTrips({ page, filters }));
    });
  }

  getTripOfTheDay(): void {
    this.store.dispatch(loadTripOfTheDay());
  }

  navigateToDetail(tripId: string): void {
    this.router.navigate(['/detail', tripId]);
  }
}
