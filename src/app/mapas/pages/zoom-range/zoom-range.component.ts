import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  //Tamaño de mapa, El .mapa-container  es para que se establesca todo en pantalla completa
  styles: [ 
    `
    .mapa-container {
      height: 100%;
      width: 100%
    } 

    .row {
      background-color: white;
      border-radius: 5;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Se deben destruir los eventos que emiten valores de manera constante ya que si se cambia de ruta o se destruye le componente estos seguiran emitiendose lo que puede relantizar la aplicacion
  ngOnDestroy(): void { 
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  //AL TRABAJAR CON EL VIEW CHILD NOOS VA A PERMITIR TENER MULTIPLES INSTANCIAS DE MIS MAPAS QUE NO DEPENDAN D EUN SOLO ID (ESTO ES UTIL CUANDOSE TRABAJA CON MUCHOS MAPAS YA QUE CON UN ID SOLO REFERENCIA A 1 MAPA) CON EL VIEWCILD ANGULAR SE ENCARGA DE PONERLE IN ID UNICO Y YO SOLO LE HAGO UNA REFERENCIA AL ELEMENTO HTML
  @ViewChild('mapa') divMapa!: ElementRef; //El ViewChild sirve para capturar un elemento HTML, en este caso por la referencia local #mapa se captura div.mapa-container y se guarda div.Mapa
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ]

  contructor() {
    console.log('constructor', this.divMapa);
  }

  ngAfterViewInit(): void { //en el ngOnInit no se puede capturar ya que no esta listo para mostrar el contenido de divMapa con un console.log( entonces por eso se usa el AfterViewInit)

    console.log('OnInit', this.divMapa );
  
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel //tendra un zoom de 18 en dicha coordenada
    });
    //Para crear un listener osea que este pendiente los cambios es con el metodo on, en este caso queremos que este pendiente del evento zoom (en todo momento) por eso se pone el 'zoom' entre comillas
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom(); //se obtiene el zoom (getZoom es una funcion propia de mapa) cada vez que se haga un movimiento con zoom y se le asigna a zoom level para mostralo en pantalla
    })

    this.mapa.on('zoomend', (ev) => { //zoomend es cuando se termina de hacer el zoom
      if( this.mapa.getZoom() > 18 ) { //Si el mapa se pasa de 18
        this.mapa.zoomTo( 18 ); //llega hasta 18 no mas
      }
    });

    //Captura el Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target; //se captura el movimietno
      const { lng, lat } = target.getCenter(); //se desestructura la latitud y longitud en lng y lat
      this.center = [lng, lat]; //ambas se guardar en this.center para que aparescan dicho valores en la pantalla
    })

  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom(); //get zoom es un metodo propio de mapboxgl  

  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();   
  }

  zoomCambio( valor: string ) { //Metodo para que cuando disminuyamos o aumentemos el zoom en el range se vea reflejado en el mapa
    this.mapa.zoomTo( Number(valor) )
  }

}
