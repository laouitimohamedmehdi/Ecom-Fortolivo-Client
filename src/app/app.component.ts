import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { BasketService } from './basket/basket.service';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './account/account.service';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => errorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => loadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => jwtInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBasket();
      this.loadCurrentUser();
    }
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
      if (basketId) {
        this.basketService.getBasket(basketId).subscribe({
          next: () => { console.log("InitialBasket") },
          error: (err) => { console.error(err) }
        })
      }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe({
      next: () => { console.log('loaded Succeffuly')},
      error: (err) => { console.error(err)}
    })
  }
}
