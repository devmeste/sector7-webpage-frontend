import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';


interface Feature {
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


  @Input() fieldJSON !: string;
  features: Feature[] = [];
  
  
  ngOnInit(): void {
    if (this.fieldJSON) {
      this.features = Object.entries(JSON.parse(this.fieldJSON)).map(([key , value]) => ({  'name': key, 'value': value as string }));
    }
  }


}
