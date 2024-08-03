import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-steps-of-the-paths',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './steps-of-the-paths.component.html',
  styleUrl: './steps-of-the-paths.component.scss'
})
export class StepsOfThePathsComponent {

  @Input() show : boolean = true;
  @Output() close = new EventEmitter<void>();

  closeMenu(){
    this.show=false;
    this.close.emit();
  }
}
