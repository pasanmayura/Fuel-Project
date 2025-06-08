import { Component } from '@angular/core';
import { RegisterVehicleComponent } from './pages/register-vehicle/register-vehicle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterVehicleComponent], // Import RegisterVehicleComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vehicle-owner-frontend';
}
