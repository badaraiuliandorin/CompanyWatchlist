import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { Constants } from './constants';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Constants.LOGIN,
    component: LoginComponent
  }, {
    path: Constants.LOGOUT,
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Constants.ADMIN,
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Constants.WATCHLIST,
    component: WatchlistComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
