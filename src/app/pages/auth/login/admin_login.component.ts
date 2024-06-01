import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParentLoginComponent } from './parent_login.component';



@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './admin-login.component.html',
    styleUrl: './login.component.scss'
})

export class AdminLoginComponent extends ParentLoginComponent {

    constructor(router: Router, auth_service: AuthService) {
        super(router, auth_service);
    }


            
    override saveTokenAndRedirect(token: string): void {
        localStorage.setItem('admin_token', token);
        this.router.navigate([`/admin-dashboard`]);
    }
}

