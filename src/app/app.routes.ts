import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
    { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
    { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
    { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test Error' } },
    //{ path: 'shop', component: ShopComponent, data:{breadcrumb:'Shop'}},
    //{ path: 'shop/:id', component: ProductDetailsComponent, data:{breadcrumb:'Shop/:id'} },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mo => mo.ShopModule), data: { breadcrumb: 'Shop' } },
    { path: 'basket', loadChildren: () => import('./basket/basket.module').then(mo => mo.BasketModule), data: { breadcrumb: 'Basket' } },
    { path: 'checkout', canActivate:[authGuard], loadChildren: () => import('./checkout/checkout.module').then(mo => mo.CheckoutModule), data: { breadcrumb: 'Checkout' } },
    { path: 'account', loadChildren: () => import('./account/account.module').then(mo => mo.AccountModule), data: { breadcrumb: {skip:true} } },
    { path: 'orders', canActivate:[authGuard], loadChildren: () => import('./orders/orders.module').then(mo => mo.OrdersModule), data: { breadcrumb: 'Orders' } },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];