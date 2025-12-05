import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('../home/home').then(m => m.Home)
	},
	{
		path: 'showcases',
		loadComponent: () => import('../showcases/showcases').then(m => m.Showcases)
	},
	{
		path: 'builder',
		loadComponent: () => import('../builder/builder').then(m => m.Builder)
	},
	{
		path: 'docs',
		loadComponent: () => import('../docs/docs').then(m => m.Docs)
	},
	{
		path: '**',
		redirectTo: ''
	}
];