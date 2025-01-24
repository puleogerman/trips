import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { TripsService } from '../../services/trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Trip } from '../../models/trip';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let tripsServiceSpy: jasmine.SpyObj<TripsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockTrip: Trip = {
    id: '1',
    title: 'Test Trip',
    description: 'A test trip description',
    price: 100,
    rating: 4.8,
    nrOfRatings: 25,
    tags: ['test', 'mock'],
    imageUrl: 'image-url',
    creationDate: new Date(),
    verticalType: '',
    co2: 0,
    thumbnailUrl: ''
  };

  beforeEach(async () => {
    tripsServiceSpy = jasmine.createSpyObj('TripsService', ['getTripDetails']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: TripsService, useValue: tripsServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null),
              },
            },
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trip details on init', () => {
    tripsServiceSpy.getTripDetails.and.returnValue(of(mockTrip));

    component.ngOnInit();

    expect(tripsServiceSpy.getTripDetails).toHaveBeenCalledWith('1');
    expect(component.trip).toEqual(mockTrip);
  });

  it('should log error if fetching trip details fails', () => {
    const consoleSpy = spyOn(console, 'error');
    tripsServiceSpy.getTripDetails.and.returnValue(throwError(() => new Error('Failed')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching trip detail:', jasmine.any(Error));
  });

  it('should navigate to home', () => {
    component.navigateToHome();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
