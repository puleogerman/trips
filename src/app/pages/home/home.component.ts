import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trips: Trip[] = [];
  tripOfTheDay!: Trip;
  sortBy: string = '';
  sortOrder: 'ASC' | 'DESC' = 'ASC';
  titleFilter: string = '';

  constructor(
    private tripService: TripsService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripService.getAllTrips(this.sortBy, this.sortOrder, this.titleFilter).subscribe({
      next: (data) => this.trips = data.items,
      error: (err) => console.error('Error fetching trips:', err)
    });
  }

  getTripOfTheDay(): void {
    this.tripService.getTripOfTheDay().subscribe({
      next: (data) => this.tripOfTheDay = data,
      error: (err) => console.error('Error fetching trip of the day:', err)
    });
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    this.getAllTrips();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.getAllTrips();
  }

  navigateToDetail(tripId: string): void {
    this.router.navigate(['/detail', tripId]);
  }
}
