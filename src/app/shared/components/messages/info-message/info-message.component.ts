import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss',
})
export class InfoMessageComponent {

  @Input() title: string = '';
  @Input({ required: true }) text: string = '';
  @Input() link: string = '';
  @Input() linkText: string = '';
 }
