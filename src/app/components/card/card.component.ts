import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() trip!: Trip;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick(): void {
    this.cardClick.emit(this.trip.id);
  }
}
