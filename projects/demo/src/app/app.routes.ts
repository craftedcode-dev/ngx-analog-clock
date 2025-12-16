import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home').then(m => m.Home)
	},
	{
		path: 'showcases',
		loadComponent: () => import('./pages/showcases/showcases').then(m => m.Showcases)
	},
	{
		path: 'playground',
		loadComponent: () => import('./pages/playground/playground').then(m => m.Playground)
	},
	{
		path: 'docs',
		loadComponent: () => import('./pages/docs/docs').then(m => m.Docs)
	},
	{
		path: '**',
		redirectTo: ''
	}
];