import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuService } from '../../data/menu.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  menu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.menu$.subscribe(items => (this.menu = items));
  }

  get favorites(): MenuItem[] {
    return this.menu.filter(item => item.isFavorite);
  }

  remove(item: MenuItem): void {
    this.menuService.toggleFavorite(item.id);
  }
}
