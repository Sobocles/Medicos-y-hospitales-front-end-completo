import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        height: 100%;
        width: 100%
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  contructor() {}

  ngOnInit(): void {
  
    var map = new mapboxgl.Map({ //Aquí se crea una nueva instancia del objeto Map de Mapbox GL. El objeto map se inicializa con la configuración proporcionada dentro de las llaves { ... }.
    container: 'mapa', //container: 'mapa',: Esto define el elemento HTML que actuará como contenedor del mapa. En este caso, el mapa se mostrará dentro de un elemento con el ID "mapa".
    style: 'mapbox://styles/mapbox/streets-v11', // Esto establece el estilo del mapa. En este caso, se utiliza el estilo "mapbox://styles/mapbox/streets-v11", que es un estilo predefinido de Mapbox GL que muestra calles.
    center: [ -75.921029433568, 45.28719674822362 ], //Aquí se establece el centro del mapa. Los números [-75.921029433568, 45.28719674822362] representan la longitud y latitud, respectivamente. Estos valores indican las coordenadas del centro del mapa.
    zoom: 18 //Esto establece el nivel de zoom inicial del mapa. Un valor mayor indica un zoom más cercano.
    });
  }

}
