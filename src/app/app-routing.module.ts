import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { FriendListComponent } from './friend-list/friend-list.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home',        component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }