import { Component, Input } from '@angular/core';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    div {
        width: 100%;
        height: 150px;
        margin: 0px;
        /* background-color: red; */
    }
    `
  ]
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];

  ngAfterViewInit(){
    
    if( !this.lngLat ) throw "LngLat can't be null";
  }

}
