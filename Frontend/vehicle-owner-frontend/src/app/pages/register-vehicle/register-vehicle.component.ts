import { Component } from '@angular/core';
import { VehicleOwnerService } from '../../services/vehicle-owner.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent {
  vehicle = {
    firstName: '',
    lastName: '',
    nic: '',
    vehicleNumber: '',
    vehicleType: '',
    fuelType: ''
  };

  account = {
    username: '',
    email: '',
    password: '',
    cpassword: ''
  };

  constructor(private vehicleService: VehicleOwnerService) {}

  onSubmit() {
    if (this.account.password !== this.account.cpassword) {
      alert('Passwords do not match!');
      return;
    }

    const requestData = {
      vehicle: this.vehicle,
      account: {
        username: this.account.username,
        email: this.account.email,
        password: this.account.password
      }
    };

    this.vehicleService.registerVehicle(requestData).subscribe({
      next: () => alert('✅ Vehicle registered successfully!'),
      error: () => alert('❌ Failed to register vehicle!')
    });
  }
}
