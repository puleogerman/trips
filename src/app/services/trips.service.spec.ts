import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TripsService } from './trips.service';
import { ErrorService } from './error.service';
import { Trip } from '../models/trip';

describe('TripsService', () => {
  let service: TripsService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/';
  const mockPrefix = 'v1/trips';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TripsService,
        { provide: 'apiUrl', useValue: mockApiUrl },
        { provide: 'prefix', useValue: mockPrefix },
        ErrorService,
      ],
    });

    service = TestBed.inject(TripsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all trips with parameters', () => {
    service
      .getAllTrips('price', 'ASC', 'test', 50, 200, 4, 'tag1,tag2')
      .subscribe((response) => {
        expect(response.items.length).toBe(1);
        expect(response.items[0]).toEqual(mockTrip);
      });

    const req = httpMock.expectOne(
      `${mockApiUrl}${mockPrefix}?sortBy=price&sortOrder=ASC&titleFilter=test&minPrice=50&maxPrice=200&minRating=4&tags=tag1,tag2`
    );
    expect(req.request.method).toBe('GET');

    req.flush({ items: [mockTrip], limit: 10, page: 1, total: 1 });
  });

  it('should fetch trip details by ID', () => {
    service.getTripDetails('1').subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/${mockPrefix}/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTrip);
  });

  it('should fetch trip of the day', () => {
    service.getTripOfTheDay().subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/${mockPrefix}/random/trip-of-the-day`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTrip);
  });
});
