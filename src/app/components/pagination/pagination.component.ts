import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number): void {
    this.pageChange.emit(page);
  }

}
