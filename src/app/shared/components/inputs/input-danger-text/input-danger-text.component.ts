import { Component, Input, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-input-danger-text',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './input-danger-text.component.html',
  styleUrl: './input-danger-text.component.scss'
})
export class InputDangerTextComponent {

  @Input({ required: true }) text!: string;

}
