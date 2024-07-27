import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-button-return',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './top-button-return.component.html',
  styleUrl: './top-button-return.component.scss'
})
export class TopButtonReturnComponent {


  @Input({ required: true }) path: string = '';
  _router : Router = inject(Router);

  goBack() {
    this._router.navigate([this.path]);
  }
}
