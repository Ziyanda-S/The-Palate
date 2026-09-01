import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import {
  homeOutline, home,
  searchOutline, search,
  addOutline,
  cartOutline, cart,
  locationOutline, location,
  menuOutline,
  ellipsisHorizontalOutline,
  heartOutline,
  restaurantOutline,
  star,
  person,
  closeOutline,
  calendarOutline,
  logOutOutline
} from 'ionicons/icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

addIcons({
  'home-outline': homeOutline,
  'home': home,
  'search-outline': searchOutline,
  'search': search,
  'add-outline': addOutline,
  'cart-outline': cartOutline,
  'cart': cart,
  'location-outline': locationOutline,
  'location': location,
  'menu-outline': menuOutline,
  'ellipsis-horizontal-outline': ellipsisHorizontalOutline,
  'heart-outline': heartOutline,
  'restaurant-outline': restaurantOutline,
  'star': star,
  'person': person,
  'close-outline': closeOutline,
  'calendar-outline': calendarOutline,
  'log-out-outline': logOutOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(BrowserModule, IonicModule.forRoot({ mode: 'ios' })),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));