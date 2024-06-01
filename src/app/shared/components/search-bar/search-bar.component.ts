import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input({ required: true }) place !: string;
  @Input ({ required: true }) height !: number;
  @Input ({ required: false}) width !: number;
  @Input ({required:true}) classForSpace !: string;

  @ViewChild('searchContainer', { static: true }) searchContainer!: ElementRef;

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    if (this.searchContainer) {
      if(this.classForSpace){
        this.searchContainer.nativeElement.classList.add(this.classForSpace);
      }
    }
  }
}
