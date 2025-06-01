import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';

import { HIERARCHY_FEATURE_KEY, hierarchyReducer, HierarchyEffects } from '@k42-app/hierarchy/data-access';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideState({ name: HIERARCHY_FEATURE_KEY, reducer: hierarchyReducer }),
    provideEffects([HierarchyEffects]), // Registrace efektů
    provideStoreDevtools({ maxAge: 25, logOnly: false }), // process.env.NODE_ENV !== 'production'
  ],
};
