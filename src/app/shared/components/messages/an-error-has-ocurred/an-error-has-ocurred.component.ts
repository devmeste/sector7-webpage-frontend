import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-an-error-has-ocurred',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './an-error-has-ocurred.component.html',
  styleUrl: './an-error-has-ocurred.component.scss'
})
export class AnErrorHasOcurredComponent {

  @Input () message: string = '';
  
}
