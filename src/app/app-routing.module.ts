import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'form',
  component: ProfileComponent
}, {
  path: '', redirectTo: 'form', pathMatch: 'full' ,
}, {
  path: '**', redirectTo: 'form'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
