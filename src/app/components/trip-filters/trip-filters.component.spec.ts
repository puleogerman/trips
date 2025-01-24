import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TripFiltersComponent } from './trip-filters.component';
import { loadTrips, updateFilters } from '../../store/actions/trips.actions';


describe('TripFiltersComponent', () => {
  let component: TripFiltersComponent;
  let fixture: ComponentFixture<TripFiltersComponent>;
  let store: MockStore;
  const initialState = {
    trips: {
      trips: [],
      tripOfTheDay: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TripFiltersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch'); // Spy on the store.dispatch method
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTrips action with filters when applyFilters is called', () => {
    component.titleFilter = 'Tokyo';
    component.minPrice = 100;
    component.maxPrice = 1000;
    component.minRating = 4;
    component.tags = 'beach,mountain';
    component.sortOrder = 'ASC';
    component.sortBy = 'price';

    component.applyFilters();

    expect(store.dispatch).toHaveBeenCalledWith(
      loadTrips({
        filters: {
          titleFilter: 'Tokyo',
          minPrice: 100,
          maxPrice: 1000,
          minRating: 4,
          tags: 'beach,mountain',
          sortOrder: 'ASC',
          sortBy: 'price',
        },
      })
    );
  });

  it('should dispatch updateFilters and loadTrips actions when onSortChanged is called', () => {
    const mockEvent = {
      target: { value: 'rating' },
    } as unknown as Event;

    component.sortOrder = 'DESC';
    component.onSortChanged(mockEvent);

    expect(store.dispatch).toHaveBeenCalledWith(
      updateFilters({
        filters: {
          sortBy: 'rating',
          sortOrder: 'DESC',
          titleFilter: '',
          minPrice: undefined,
          maxPrice: undefined,
          minRating: undefined,
          tags: '',
        },
      })
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      loadTrips({
        filters: {
          sortBy: 'rating',
          sortOrder: 'DESC',
          titleFilter: '',
          minPrice: undefined,
          maxPrice: undefined,
          minRating: undefined,
          tags: '',
        },
      })
    );
  });

  it('should toggle sortOrder and call applyFilters when toggleSortOrder is called', () => {
    spyOn(component, 'applyFilters');

    component.sortOrder = 'ASC';
    component.toggleSortOrder();

    expect(component.sortOrder).toBe('DESC');
    expect(component.applyFilters).toHaveBeenCalled();

    component.toggleSortOrder();

    expect(component.sortOrder).toBe('ASC');
    expect(component.applyFilters).toHaveBeenCalledTimes(2);
  });
});
