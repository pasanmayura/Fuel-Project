import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterVehicleComponent } from './pages/register-vehicle/register-vehicle.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppComponent, 
    RegisterVehicleComponent 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
