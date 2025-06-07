import { Component } from '@angular/core';
import { VehicleOwnerService } from '../../services/vehicle-owner.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-vehicle',
  standalone: true,
  imports: [FormsModule], // Import FormsModule for ngForm and ngModel
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent {
  vehicle = {
    ownerName: '',
    nic: '',
    vehicleNumber: '',
    vehicleType: '',
    fuelType: '',
  };

  constructor(private vehicleService: VehicleOwnerService) {}

  onSubmit() {
    this.vehicleService.registerVehicle(this.vehicle).subscribe({
      next: () => alert('✅ Vehicle registered successfully!'),
      error: () => alert('❌ Failed to register vehicle!')
    });
  }
}
