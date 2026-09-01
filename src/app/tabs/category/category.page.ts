import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuService } from '../../data/menu.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage implements OnInit {
  categories: Array<MenuItem['category']> = ['Starters', 'Mains', 'Grill', 'Desserts'];
  activeCategory: MenuItem['category'] = 'Starters';
  menu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.menu$.subscribe(items => (this.menu = items));
  }

  get filtered(): MenuItem[] {
    return this.menu.filter(item => item.category === this.activeCategory);
  }

  select(cat: MenuItem['category']): void {
    this.activeCategory = cat;
  }
}
