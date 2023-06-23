import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapasModule } from './mapas/mapas.module';
import { MenuComponent } from './shared/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
