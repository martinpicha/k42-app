import { Route } from '@angular/router';
import { HierarchyTableComponent } from './components/hiearchy-table/hierarchy-table.component';

export const appRoutes: Route[] = [
    {
    path: '', // Výchozí cesta
    redirectTo: 'hierarchy', // Přesměruj na 'hierarchy'
    pathMatch: 'full',
  },
  {
    path: 'hierarchy',
    component: HierarchyTableComponent,
  }
];
