import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { WelcomeUserComponent } from '../../components/welcome-user/welcome-user.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [WelcomeUserComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private tripService: TripsService,) {}
  trip!: Trip;

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.getSelectedTripDetails(tripId)
  }

  getSelectedTripDetails(id: string) {
    this.tripService.getTripDetails(id).subscribe({
      next: (data) => this.trip = data,
      error: (err) => console.error('Error fetching trip detail:', err)
    })
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  onBookTrip(): void {
    alert('Successfully booked this trip!');
  }
  
  onSaveToFavorites(): void {
    alert('Successfully saved this trip to favorites!');
  }
  

}
