import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadTripOfTheDay, loadTrips, updateFilters } from '../../store/actions/trips.actions';
import { TripsState } from '../../store/trips.state';
import { CommonModule } from '@angular/common';
import { WelcomeUserComponent } from '../../components/welcome-user/welcome-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule, WelcomeUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  trips$: Observable<Trip[]>;
  tripOfTheDay$: Observable<Trip | null>; 

  sortBy: string = '';
  sortOrder: 'ASC' | 'DESC' = 'ASC';
  titleFilter: string = '';
  constructor(
    private store: Store<{ trips: TripsState }>,
    private router: Router
  ) {
    this.trips$ = this.store.select((state) => state.trips.trips);
    this.tripOfTheDay$ = this.store.select((state) => state.trips.tripOfTheDay)
  }

  ngOnInit(): void {
    this.trips$.subscribe((trips) => {
      if (!trips || trips.length === 0) {
        this.store.dispatch(
          loadTrips({ filters: { sortBy: this.sortBy , sortOrder: this.sortOrder, title: this.titleFilter } })
        );
      }
    });
  }

  fetchTrips(): void {
    this.store.dispatch(
      loadTrips({ filters: { sortBy: this.sortBy , sortOrder: this.sortOrder, title: this.titleFilter }  })
    );
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.store.dispatch(
      updateFilters({ filters: { sortBy: this.sortBy , sortOrder: this.sortOrder, title: this.titleFilter }  })
    );
    this.store.dispatch(
      loadTrips({ filters: { sortBy: this.sortBy , sortOrder: this.sortOrder, title: this.titleFilter }  })
    );
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.fetchTrips();
  }

  getTripOfTheDay(): void {
    this.store.dispatch(loadTripOfTheDay());

  }

  navigateToDetail(tripId: string): void {
    this.router.navigate(['/detail', tripId]);
  }
}
