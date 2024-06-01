import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { ITokenDto } from '../../models/ITokenDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // localhost:8001/auth/admin/login

  baseUrl: string = 'http://localhost:8001/auth';

  private isLoggedInSubject: BehaviorSubject<boolean>;

  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {

    const token = localStorage.getItem('token');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);

  }

  login(username: string, password: string, specialCase?: string): Observable<ITokenDto> {
    let url;
    if (specialCase) {
      url = `${this.baseUrl + '/'}${specialCase + '/'}login`;
    } else {
      url = `${this.baseUrl + '/'}login`;
    }

    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<ITokenDto>(url, body, { headers: headers }).pipe(
      tap((response: ITokenDto) => {
        console.log(response);
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
