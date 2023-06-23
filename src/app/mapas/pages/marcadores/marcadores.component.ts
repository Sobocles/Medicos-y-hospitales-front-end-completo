import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker;
}

interface PlainMaker {
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }
     `
  ]
})
export class MarcadoresComponent implements AfterViewInit {


  @ViewChild('mapa') divMapa?: ElementRef; //El ViewChild sirve para capturar un elemento HTML, en este caso por la referencia local #mapa se captura div.mapa-container y se guarda div.Mapa
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ]

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    if( !this.divMapa ) throw 'El elemento HTML no fue encontrado' //Esto es para validar en el caso de que this.divMapa no sea null o undefined para evitar tener que poner siempre el signo ? cuando se declare
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel //tendra un zoom de 18 en dicha coordenada
      });
      this.readFromLocalStorage();
      /*
      const markerHtml: HTMLElement = document.createElement('div');
      markerHtml.innerHTML = 'Hola Mundo'; //se guarda el string Hola mundo en el div creado en la linea anterior

      new mapboxgl.Marker({ 
        element: markerHtml
      })
        .setLngLat( this.center ) 
        .addTo( this.mapa ); 
        */
  }

  crearMarcador() {
    if ( !this.mapa ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.mapa.getCenter();

    this.agregarMarcador( lngLat, color );
  }

  agregarMarcador( lngLat: mapboxgl.LngLat, color: string ) {
    if ( !this.mapa ) return;

    const marker = new mapboxgl.Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.mapa );

    this.marcadores.push({ color, marker, });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

    // dragend
  }

  borrarMarcador( index: number ) {
    this.marcadores[index].marker.remove();
    this.marcadores.splice( index, 1); //El código this.marcadores.splice(index, 1); elimina un elemento del arreglo marcadores en la posición index. El segundo parámetro indica la cantidad de elementos a eliminar, en este caso solo se elimina un elemento.
  }

  flyTo( marcador: mapboxgl.Marker ) {
    
    this.mapa.flyTo({
      zoom: 14,
      center: marcador.getLngLat()
    });
  }
  //el uso de .map() (que es una funcion propia de javascript)  se utiliza para transformar el array marcadores en un nuevo array plainMarkers con un formato de objeto diferente.
  saveToLocalStorage() {
    const plainMarkers: PlainMaker[] = this.marcadores.map( ({ color, marker }) => { //se desestructura el contenido de marcadores del arreglo marcadores y se guarda en el nuevo array PlainMarker
      return {
        color,
        lngLat: marker.getLngLat().toArray() //El método .getLngLat() devuelve un objeto que representa las coordenadas de longitud y latitud del marcador. El objeto tiene dos propiedades: lng (longitud) y lat (latitud).
                                            // Al utilizar .toArray(), se transforma el objeto de coordenadas de longitud y latitud en un array que contiene dos elementos:
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }


  
    readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'; //Se obtiene plainMarkers del localstorage, si no lo encientra regresa un arreglo vacio
    const plainMarkers: PlainMaker[] = JSON.parse( plainMarkersString ); //! OJO! //La función JSON.parse() se utiliza para analizar una cadena de texto JSON y convertirla en un objeto JavaScript.

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new mapboxgl.LngLat( lng, lat );

      this.agregarMarcador( coords, color );
    })

  }
  


}
