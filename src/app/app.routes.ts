import { Routes } from '@angular/router';

enum Pages {
    Home = 'home',
    Detail = 'detail'
}

export const routes: Routes = [
    {
        path: Pages.Home,
        loadComponent: () => import('./pages/home/home.component').then((page) => page.HomeComponent)
    },
    {
        path: Pages.Detail,
        loadComponent: () => import('./pages/detail/detail.component').then((page) => page.DetailComponent)
    },
    {
        path: '**',
        redirectTo: Pages.Home,
        pathMatch: 'full'
    }
];
