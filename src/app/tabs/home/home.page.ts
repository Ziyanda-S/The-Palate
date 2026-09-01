import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ActionSheetController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from '../../data/menu.service';
import { MenuItem } from '../../models/menu-item.model';
import { AuthService } from '../../auth/auth.service';
import { BookingService } from '../../data/booking.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  categories: Array<MenuItem['category'] | 'All'> = ['All', 'Starters', 'Mains', 'Grill', 'Desserts'];
  activeCategory: MenuItem['category'] | 'All' = 'All';
  menu: MenuItem[] = [];
  searchTerm = '';

  heroSlides = [
    { eyebrow: 'PREMIUM', title: 'Menu', highlight: 'Recipes', subtitle: 'Seasonal plates crafted nightly by our head chef, sourced from the coast and the valley.' },
    { eyebrow: 'TONIGHT', title: "Chef's", highlight: 'Table', subtitle: 'A five-course tasting menu, seated at 7 and 9 PM only.' },
    { eyebrow: 'NEW', title: 'Coastal', highlight: 'Catch', subtitle: 'Fresh seafood specials, changing with the morning market.' }
  ];

  events = [
  { title: 'Kizomba Night', subtitle: 'Live DJ, dance floor opens 9 PM', date: 'Fri, Sep 5' },
  { title: 'Wine Pairing Evening', subtitle: 'Five courses, five wines', date: 'Sat, Sep 13' },
  { title: 'Live Jazz & Tapas', subtitle: 'Small plates, live trio', date: 'Fri, Sep 19' }
];
  activeDot = 0;
  private heroInterval: any;

  constructor(
    private menuService: MenuService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private bookingService: BookingService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.menu$.subscribe(items => (this.menu = items));
    this.heroInterval = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.activeDot = (this.activeDot + 1) % this.heroSlides.length;
  }

  setSlide(index: number): void {
    this.activeDot = index;
    clearInterval(this.heroInterval);
    this.heroInterval = setInterval(() => this.nextSlide(), 5000);
  }

  get filteredMenu(): MenuItem[] {
    let items = this.activeCategory === 'All'
      ? this.menu
      : this.menu.filter(item => item.category === this.activeCategory);

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term)
      );
    }
    return items;
  }

  selectCategory(category: MenuItem['category'] | 'All'): void {
    this.activeCategory = category;
  }

  openMenu(): void {
    this.menuCtrl.open();
  }

  goToFavorites(): void {
    this.router.navigate(['/tabs/favorites']);
  }

  private requireAuth(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/tabs/home' } });
    return false;
  }

  async openItemActions(item: MenuItem): Promise<void> {
    if (!this.requireAuth()) {
      return;
    }

    const sheet = await this.actionSheetCtrl.create({
      header: item.name,
      buttons: [
        {
          text: item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
          icon: 'cart-outline',
          handler: () => this.menuService.toggleFavorite(item.id)
        },
        {
          text: item.isSaved ? 'Unsave' : 'Save for later',
          icon: 'location-outline',
          handler: () => this.menuService.toggleSaved(item.id)
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

  async reserve(): Promise<void> {
  if (!this.requireAuth()) {
    return;
  }

  const alert = await this.alertCtrl.create({
    header: 'Reserve a Table',
    message: 'Please enter your name and surname.',
    inputs: [
      { name: 'firstName', type: 'text', placeholder: 'First name' },
      { name: 'lastName', type: 'text', placeholder: 'Surname' }
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Continue',
        handler: (data) => {
          if (!data.firstName?.trim() || !data.lastName?.trim()) {
            return false;
          }
          this.askOrderPreference(`${data.firstName.trim()} ${data.lastName.trim()}`);
          return true;
        }
      }
    ]
  });
  await alert.present();
}

private async askOrderPreference(fullName: string): Promise<void> {
  const alert = await this.alertCtrl.create({
    header: 'Order Preference',
    message: `Thanks, ${fullName}. Would you like to order food now, or when you arrive?`,
    buttons: [
      {
        text: 'Order in App',
        handler: () => this.confirmReservation(fullName, 'Order in app')
      },
      {
        text: 'Order on Arrival',
        handler: () => this.confirmReservation(fullName, 'Order on arrival')
      }
    ]
  });
  await alert.present();
}

private async confirmReservation(fullName: string, orderPreference: string): Promise<void> {
  const user = this.authService.currentUser!;
  this.bookingService.addBooking(`Chef's Table — ${orderPreference}`, fullName, user.email);

  const alert = await this.alertCtrl.create({
    header: 'Table Reserved',
    message: `Thanks, ${fullName}! Your table is held for tonight (${orderPreference}). You can view or cancel it anytime under My Bookings.`,
    buttons: ['Done']
  });
  await alert.present();
}
}