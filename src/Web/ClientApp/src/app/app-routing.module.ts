import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {ApiAuthorizationModule} from "./core/api-authorization/api-authorization.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: 'problems',
    loadChildren: () =>
      import('./features/exercise/exercise.module').then((m) => m.ExerciseModule)
  },
  {
    path: 'alliances',
    loadChildren: () =>
      import('./features/alliance/alliance.module').then((m) => m.AllianceModule)
  },
  {
    path: 'duels',
    loadChildren: () =>
      import('./features/duel/duel.module').then((m) => m.DuelModule)
  },
  {
    path: 'challenges',
    loadChildren: () =>
      import('./features/challenge/challenge.module').then((m) => m.ChallengeModule)
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    }),
    ApiAuthorizationModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
