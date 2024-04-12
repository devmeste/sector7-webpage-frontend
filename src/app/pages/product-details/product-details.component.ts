import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  
  private _router:ActivatedRoute = inject(ActivatedRoute);
  id !: number;

  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.id = params['id'];
    })
  }

}
