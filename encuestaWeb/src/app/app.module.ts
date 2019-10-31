import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ServeErrorComponent } from './serve-error/serve-error.component';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ACCESS_TOKEN_NAME } from './shared/constants/constantes';
import { ServerErrorsInterceptor } from './shared/util/server-errors.interceptor';

export function tokenGetter() {
  const tk = sessionStorage.getItem(ACCESS_TOKEN_NAME);
  const token = tk != null ? tk : '';
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    ServeErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['1quo4pmwi0.execute-api.us-east-1.amazonaws.com'],
        blacklistedRoutes: ['https://1quo4pmwi0.execute-api.us-east-1.amazonaws.com/prod/api/security/login']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
