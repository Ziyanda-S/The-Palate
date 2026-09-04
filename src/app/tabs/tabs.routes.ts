import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'category', loadComponent: () => import('./category/category.page').then(m => m.CategoryPage) },
      { path: 'recipes', loadComponent: () => import('./recipes/recipes.page').then(m => m.RecipesPage) },
      { path: 'save', loadComponent: () => import('./save/save.page').then(m => m.SavePage) },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
];
