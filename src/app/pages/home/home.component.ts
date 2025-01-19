import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripsService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => this.trips = data.items,
      error: (err) => console.error('Error fetching trips:', err)
    });
  }

  navigateToDetail(tripId: string): void {
    this.router.navigate(['/detail', tripId]);
  }
}
