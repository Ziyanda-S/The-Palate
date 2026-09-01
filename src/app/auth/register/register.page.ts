import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  error = '';
  loading = false;
  private returnUrl = '/tabs/home';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/tabs/home';
  }

  async submit(): Promise<void> {
    this.error = '';
    this.loading = true;
    const result = await this.authService.register(this.name, this.email, this.password);
    this.loading = false;
    if (result.success) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.error = result.error || 'Something went wrong.';
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}