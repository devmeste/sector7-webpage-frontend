import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [FooterComponent]
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
