import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';

import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';



@NgModule({
  declarations: [
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent,
    MiniMapComponent,
   
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
