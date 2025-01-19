import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
