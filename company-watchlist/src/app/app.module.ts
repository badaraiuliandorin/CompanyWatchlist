import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { WatchlistService } from './services/watchlist.service';
import { ApiService } from './services/api.service';

export function tokenGetter() {
  return localStorage.getItem('AuthToken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    WatchlistComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:44325"],
        disallowedRoutes: [],
      },
    })
  ],
  providers: [ApiService, AuthService, UserService, RoleService, WatchlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
