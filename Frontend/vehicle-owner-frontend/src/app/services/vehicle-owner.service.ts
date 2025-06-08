import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {
  constructor(private http: HttpClient) { }

  registerVehicle(data: any) {
    console.log('Sending vehicle registration data:', data); // Debugging log
    return this.http.post('http://localhost:8080/vehicle-service/api/vehicles/register', data);
  }
}
