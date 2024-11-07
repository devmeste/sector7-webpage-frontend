import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.scss'
})
export class PurchaseSuccessComponent {

  message: string = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {
    if(history.state.message){
      this.message = history.state.message || 'No message available';
    }else{
      this._router.navigate(['']);
    }
  }

}
