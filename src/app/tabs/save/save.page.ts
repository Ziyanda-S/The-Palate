import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuService } from '../../data/menu.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss']
})
export class SavePage implements OnInit {
  menu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.menu$.subscribe(items => (this.menu = items));
  }

  get saved(): MenuItem[] {
    return this.menu.filter(item => item.isSaved);
  }

  remove(item: MenuItem): void {
    this.menuService.toggleSaved(item.id);
  }
}
