import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewedPropertyService {
  constructor(private http: HttpClient) {}

  // Log a property view
  logViewedProperty(view: { buyer: { id: number }, property: { id: number } }): Observable<any> {
    return this.http.post('http://localhost:8082/api/buyer/viewed', view);
  }

  // Fetch all properties viewed by a specific buyer
  getViewedProperties(buyerId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8082/api/buyer/viewed/${buyerId}`);

  }
}
