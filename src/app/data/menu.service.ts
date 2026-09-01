import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', name: 'Herb-Crusted Chicken', subtitle: 'Rosemary jus, confit lemon', price: 790, category: 'Grill', icon: 'restaurant-outline', accent: 'plate-a', photoUrl: 'assets/images/chicken.jpg' },
  { id: 'm2', name: 'Seared Scallop Duo', subtitle: 'Cauliflower purée, brown butter', price: 750, category: 'Starters', icon: 'restaurant-outline', accent: 'plate-b', photoUrl: 'assets/images/scallop.jpg' },
  { id: 'm3', name: 'Twice-Baked Soufflé', subtitle: 'Gruyère, black truffle shaving', price: 359, category: 'Mains', icon: 'restaurant-outline', accent: 'plate-c', photoUrl: 'assets/images/souffle.jpg' },
  { id: 'm4', name: 'Herb-Crusted Rack of Lamb', subtitle: 'Smoked salt, pickled shallot', price: 320, category: 'Grill', icon: 'restaurant-outline', accent: 'plate-d', photoUrl: 'assets/images/lamb.jpg' },
  { id: 'm5', name: 'Citrus Glazed Salmon', subtitle: 'Fennel slaw, dill oil', price: 610, category: 'Mains', icon: 'restaurant-outline', accent: 'plate-b', photoUrl: 'assets/images/salmon.jpg' },
  { id: 'm6', name: 'Velvet Chocolate Torte', subtitle: 'Sea salt caramel, gold leaf', price: 285, category: 'Desserts', icon: 'restaurant-outline', accent: 'plate-c', photoUrl: 'assets/images/torte.jpg' },
  { id: 'm7', name: 'Pan-Seared Duck Breast', subtitle: 'Cherry reduction, roasted parsnip', price: 540, category: 'Mains', icon: 'restaurant-outline', accent: 'plate-a', photoUrl: 'assets/images/duck.jpg' },
{ id: 'm8', name: 'Lobster Bisque', subtitle: 'Cognac cream, chive oil', price: 410, category: 'Starters', icon: 'restaurant-outline', accent: 'plate-b', photoUrl: 'assets/images/lobster-bisque.jpeg' },
{ id: 'm9', name: 'Grilled Shrimp Skewers', subtitle: 'Chili lime glaze, coriander', price: 385, category: 'Grill', icon: 'restaurant-outline', accent: 'plate-d', photoUrl: 'assets/images/shrimp.jpg' },
{ id: 'm10', name: 'Crème Brûlée', subtitle: 'Vanilla bean, burnt sugar crust', price: 220, category: 'Desserts', icon: 'restaurant-outline', accent: 'plate-c', photoUrl: 'assets/images/brulee.jpg' },
];

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly menuSubject = new BehaviorSubject<MenuItem[]>(INITIAL_MENU);
  readonly menu$ = this.menuSubject.asObservable();

  get snapshot(): MenuItem[] {
    return this.menuSubject.value;
  }

  toggleFavorite(id: string): void {
    this.menuSubject.next(
      this.menuSubject.value.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }

  toggleSaved(id: string): void {
    this.menuSubject.next(
      this.menuSubject.value.map(item =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  }
}
