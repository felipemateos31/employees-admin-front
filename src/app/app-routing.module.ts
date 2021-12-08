import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: 'app', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
