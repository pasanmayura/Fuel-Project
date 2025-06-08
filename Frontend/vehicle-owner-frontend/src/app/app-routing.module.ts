import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVehicleComponent } from './pages/register-vehicle/register-vehicle.component';

const routes: Routes = [
  { path: 'register-vehicle', component: RegisterVehicleComponent },
  { path: '', redirectTo: 'register-vehicle', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
