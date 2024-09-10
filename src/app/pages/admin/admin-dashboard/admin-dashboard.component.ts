import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AdminSidePanelComponent } from "../admin-side-panel/admin-side-panel.component";
import { RouterOutlet } from '@angular/router';
import { TopMetricComponent } from "../children_pages/metrics/top-metric/top-metric.component";

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    imports: [MatSidenavModule, MatIconModule, AdminSidePanelComponent, RouterOutlet, TopMetricComponent]
})
export class AdminDashboardComponent {

    // TODO: Get the metrics from Analitycs or Backend
    metrics: any[] = [
        {
            text: "Ventas esta semana",
            value: 2466,
            icon: "shopping_bag",
            color: "#ea580c",
            currency : true
        },
        {
            text: "Ventas del mes",
            value: 3326,
            icon: "store",
            color: "#e8bb1b",
            currency : true
        },
        {
            text: "Total de visitantes",
            value: 5325,
            icon: "group",
            color: "#059669",
            currency : false
        },
        {
            text: "Pedidos restantes",
            value: 103,
            icon: "edit_note",
            color: "#e8401b",
            currency : false
        }
    ];

}
