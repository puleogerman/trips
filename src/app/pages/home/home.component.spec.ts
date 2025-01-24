import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { TripFiltersComponent } from '../../components/trip-filters/trip-filters.component';
import { loadTrips, loadTripOfTheDay } from '../../store/actions/trips.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Trip } from '../../models/trip';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let router: Router;

  const initialState = {
    trips: {
      trips: [],
      tripOfTheDay: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFiltersComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTrips on initialization if no trips exist', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    store.setState({ trips: { trips: [], tripOfTheDay: null } });

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadTrips({
        filters: {},
      })
    );
  });

  it('should not dispatch loadTrips if trips already exist', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    store.setState({
      trips: { trips: [{ id: '1', title: 'Trip 1' }], tripOfTheDay: null },
    });

    component.ngOnInit();

    expect(dispatchSpy).not.toHaveBeenCalledWith(
      loadTrips({
        filters: {},
      })
    );
  });

  it('should dispatch loadTripOfTheDay when getTripOfTheDay is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.getTripOfTheDay();

    expect(dispatchSpy).toHaveBeenCalledWith(loadTripOfTheDay());
  });

  it('should navigate to trip detail when navigateToDetail is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.navigateToDetail('123');

    expect(navigateSpy).toHaveBeenCalledWith(['/detail', '123']);
  });

  it('should select trips$ observable from the store', (done) => {
    const mockTrips: Trip[] = [
      {
        id: '1',
        title: 'Mock Trip',
        description: 'Mock Trip Description',
        price: 100,
        rating: 4,
        nrOfRatings: 10,
        tags: ['adventure', 'nature'],
        imageUrl: 'url',
        creationDate: new Date(),
        verticalType: '',
        co2: 0,
        thumbnailUrl: '',
      },
    ];
    store.setState({ trips: { trips: mockTrips, tripOfTheDay: null } });

    component.trips$.subscribe((trips) => {
      expect(trips).toEqual(mockTrips);
      done();
    });
  });

  it('should select tripOfTheDay$ observable from the store', (done) => {
    const mockTripOfTheDay: Trip = {
      id: '2',
      title: 'Trip of the Day',
      description: 'fantastic trip',
      price: 200,
      rating: 4,
      nrOfRatings: 10,
      tags: ['adventure', 'nature'],
      imageUrl: 'url',
      creationDate: new Date(),
      verticalType: '',
      co2: 0,
      thumbnailUrl: '',
    };
    store.setState({ trips: { trips: [], tripOfTheDay: mockTripOfTheDay } });

    component.tripOfTheDay$.subscribe((trip) => {
      expect(trip).toEqual(mockTripOfTheDay);
      done();
    });
  });
});
