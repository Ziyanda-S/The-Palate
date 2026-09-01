import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  async go(path: string): Promise<void> {
    await this.menuCtrl.close();
    this.router.navigateByUrl(path);
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.menuCtrl.close();
    this.router.navigateByUrl('/tabs/home');
  }
}