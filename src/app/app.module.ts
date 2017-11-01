import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BuilderComponent } from './builder/builder.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChartsModule } from 'ng2-charts';
import {UserService } from './services/user.service';
import {DrinkService } from './services/drinks.service';

const appRoutes: Routes = [
  { path: 'build', component: BuilderComponent},
  { path: '', component: LandingComponent},
  { path: 'analytics', component: AnalyticsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    LandingComponent,
    AnalyticsComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  providers: [UserService, DrinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
