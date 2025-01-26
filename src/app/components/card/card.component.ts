import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
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
