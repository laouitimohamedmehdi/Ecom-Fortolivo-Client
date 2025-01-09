import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data:{breadcrumb:'Home'}},
    { path: 'not-found', component: NotFoundComponent, data:{breadcrumb:'Not Found'}},
    { path: 'server-error', component: ServerErrorComponent, data:{breadcrumb:'Server Error'}},
    { path: 'test-error', component: TestErrorComponent , data:{breadcrumb:'Test Error'}},
    { path: 'shop', component: ShopComponent, data:{breadcrumb:'Shop'}},
    //{ path: 'shop/:id', component: ProductDetailsComponent, data:{breadcrumb:'Shop/:id'} },
    { path: 'shop', loadChildren:()=>import('./shop/shop.module').then(mo=> mo.ShopModule)},
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];