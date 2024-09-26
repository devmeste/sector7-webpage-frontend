import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-side-panel',
  standalone: true,
  imports: [MatExpansionModule,RouterLink],
  templateUrl: './admin-side-panel.component.html',
  styleUrl: './admin-side-panel.component.scss'
})
export class AdminSidePanelComponent {
  panelOpenState = false;

  isAdmin(){
    let adminCategory = localStorage.getItem('admin_category');

    return (adminCategory != null && adminCategory === 'admin') ? true: false;
  }
}
