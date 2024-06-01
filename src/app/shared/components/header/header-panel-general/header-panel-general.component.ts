import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-panel-general',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header-panel-general.component.html',
  styleUrls: ['./header-panel-general.component.scss', '../header-panel-common-styles.scss']
})
export class HeaderPanelGeneralComponent {

  // @Output() closePanel = new EventEmitter<void>();
  

  _router: Router = inject(Router);
  goToLoginPage() {
    this._router.navigate(['/auth']);
    // this.closePanel.emit();
  }

}
