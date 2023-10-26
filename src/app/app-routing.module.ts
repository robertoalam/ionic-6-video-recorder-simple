import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },{
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },{
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)    
  },{
    path: 'awesome',
    loadChildren: () => import('./pages/awesome/awesome.module').then( m => m.AwesomePageModule)
  },{
    path: 'navigator',
    loadChildren: () => import('./pages/navigator/navigator.module').then( m => m.NavigatorPageModule)
  },{
    path: 'capacitor',
    loadChildren: () => import('./pages/capacitor/capacitor.module').then( m => m.CapacitorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
