import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Trip } from '../../models/trip';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

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
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind trip input correctly', () => {
    component.trip = mockTrip;
    fixture.detectChanges();

    expect(component.trip).toEqual(mockTrip);
  });

  it('should emit trip ID on card click', () => {
    spyOn(component.cardClick, 'emit'); 
    component.trip = mockTrip;
    fixture.detectChanges();

    component.onCardClick();

    expect(component.cardClick.emit).toHaveBeenCalledWith(mockTrip.id);
  });

  it('should trigger onCardClick when card is clicked in the template', () => {
    spyOn(component, 'onCardClick');
    component.trip = mockTrip;
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('div'));
    cardElement.triggerEventHandler('click', null);

    expect(component.onCardClick).toHaveBeenCalled();
  });
});
