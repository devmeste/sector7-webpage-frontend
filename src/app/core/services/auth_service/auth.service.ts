import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { ITokenDto } from '../../models/ITokenDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl: string = 'http://localhost:8080/auth';
  private isLoggedInSubject: BehaviorSubject<boolean>;

  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {

    const token = localStorage.getItem('token');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);

   }

  login(username: string, password: string): Observable<ITokenDto> { 

    const url = `${this.baseUrl}/login`;

    const body = { username, password };
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const response = this._http.post<ITokenDto>(url, body, { headers: headers });

    return this._http.post<ITokenDto>(url, body, { headers: headers }).pipe(
      tap((response: ITokenDto) => {
        console.log("response en auth service: "+response);
        if (response && response.token) {
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError(err => {
        this.isLoggedInSubject.next(false);
        throw err;
      })
    );
  }

  logout() {

    localStorage.removeItem('token');
    // localStorage.removeItem('tokenRefresh'); 
    this.isLoggedInSubject.next(false);
    this._router.navigate(['/'])
    ;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  



}
