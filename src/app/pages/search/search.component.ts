import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private _router:ActivatedRoute = inject(ActivatedRoute);
  category !: number;

  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.category = params['category'];
    })
  }
}
