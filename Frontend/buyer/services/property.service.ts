import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../models/property.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = 'http://localhost:8082/api/properties'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getAllApproved(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/approved/incomplete-transactions`);
  }
  
  sendInquiry(data: {
    propertyId: number;
    buyerId: number;
    message: string;
    targetRole: 'SELLER' | 'MANAGER';
  }): Observable<any> {
    const params = {
      propertyId: data.propertyId,
      buyerId: data.buyerId,
      message: data.message,
      targetRole: data.targetRole
    };
  
    return this.http.post('http://localhost:8082/api/inquiries/send', null, { params });
  }
  searchProperties(
    location?: string,
    minPrice?: number,
    maxPrice?: number,
    typeId?: number
  ): Observable<Property[]> {
    const params: any = {};
  
    if (location) params.location = location;
    if (minPrice != null) params.minPrice = minPrice;
    if (maxPrice != null) params.maxPrice = maxPrice;
    if (typeId != null) params.typeId = typeId;
  
    return this.http.get<Property[]>('http://localhost:8082/api/properties/search', { params });
  }
  
  
}
