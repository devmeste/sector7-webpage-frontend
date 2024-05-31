import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParentLoginComponent } from './parent_login.component';
import { catchError } from 'rxjs';



@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class AdminLoginComponent extends ParentLoginComponent {

    constructor(router: Router, auth_service: AuthService) {
        super(router, auth_service);
    }

    override login() { 
        // TODO: maybe here i can to create another token for admin or not
        super.login('/admin-dashboard');

    }
}

