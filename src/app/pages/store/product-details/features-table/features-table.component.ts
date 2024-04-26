import { Component } from '@angular/core';


interface Feature {
  'id': string;
  'name': string;
  'value': string;
}	

@Component({
  selector: 'app-features-table',
  standalone: true,
  imports: [],
  templateUrl: './features-table.component.html',
  styleUrl: './features-table.component.scss'
})
export class FeaturesTableComponent {


  features : Feature [] =  [
    { 'id': '1', 'name': 'Velocidad de reloj', 'value': '3.5 GHz' },
    { 'id': '2', 'name': 'Número de núcleos', 'value': '8' },
    { 'id': '3', 'name': 'Tecnología de fabricación', 'value': '7 nm' },
    { 'id': '4', 'name': 'Cache', 'value': '12 MB' },
    { 'id': '5', 'name': 'Arquitectura', 'value': 'x86-64' },
    { 'id': '6', 'name': 'Soporte para instrucciones SIMD', 'value': 'Sí' },
    { 'id': '7', 'name': 'Consumo energético', 'value': '95 W' },
    { 'id': '8', 'name': 'Tecnologías de ahorro de energía', 'value': 'AMD Cool n Quiet, Intel SpeedStep' },
    { 'id': '9', 'name': 'Tamaño del socket', 'value': 'LGA 1200' },
    { 'id': '10', 'name': 'Soporte para virtualización', 'value': 'Sí' }
  ]
}
