import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParentLoginComponent } from './parent_login.component';
import { MatIcon } from '@angular/material/icon';



@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, MatIcon],
    templateUrl: './admin.login.component.html',
    styleUrl: './login.component.scss'
})

export class AdminLoginComponent extends ParentLoginComponent {

    constructor(router: Router, auth_service: AuthService) {
        super(router, auth_service);
        if(auth_service.isAdminLoggedIn()) {
            router.navigate(['/admin-dashboard']);
        }
    }

    override getSpecialPath(): string {
        return 'admin';
    }
            
    override saveTokenAndRedirect(token: string): void {
        localStorage.setItem('admin_token', token);
        this.router.navigate([`/admin-dashboard`]);
    }


}

