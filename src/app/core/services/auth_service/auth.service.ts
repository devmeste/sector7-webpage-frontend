import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, tap, throwError } from 'rxjs';
import { ITokenDto } from '../../models/ITokenDto';
import { Router } from '@angular/router';
import { IUser } from 'app/core/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 



  baseUrl: string = 'http://localhost:8001/api/v1/es/';

  //TODO: Verificar luego el del Usuario normal

  private isLoggedInSubject: BehaviorSubject<boolean>;
  private isAdminLoggedInSubject: BehaviorSubject<boolean>;

  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {

    const token = localStorage.getItem('token');
    const admin_token = localStorage.getItem('admin_token');

    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.isAdminLoggedInSubject = new BehaviorSubject<boolean>(!!admin_token);
  }

  login(username: string, password: string, specialCase?: string): Observable<ITokenDto> {

    this.logout();

    let url;
    if (specialCase) {
      url = `${this.baseUrl}${specialCase + '/'}login`;
    } else {
      url = `${this.baseUrl + 'account/'}login`;
    }

    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<ITokenDto>(url, body, { headers: headers }).pipe(
      tap((response: ITokenDto) => {

        if (response && response.token && specialCase == 'admin') {
          this.isAdminLoggedInSubject.next(true);
        }
        else if (response && response.token) {
          this.isLoggedInSubject.next(true);
        }
        else {
          this.isLoggedInSubject.next(false);
          this.isAdminLoggedInSubject.next(false);
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
    localStorage.removeItem('admin_token');
    this.isLoggedInSubject.next(false);
    this.isAdminLoggedInSubject.next(false);
    this._router.navigate(['/']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  //return an observable
  isAdminLoggedIn$(): Observable<boolean> {
    return this.isAdminLoggedInSubject.asObservable();
  }

  //return just a boolean
  isAdminLoggedIn(): boolean {
    return this.isAdminLoggedInSubject.getValue();
  }

  verifyToken(token: string): Observable<ITokenDto> {
    return this._http.post<ITokenDto>(
      this.baseUrl + 'account/validate',
      { token: token },
      { headers: new HttpHeaders({ 'skip': 'true' }) }
    )
  }

  // register
  register(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post(this.baseUrl + 'account/register', user, { headers, responseType: 'text' });
  }


  // recover user

  recoverUser(emailOrPhone: string) {

    return this._http.post(this.baseUrl + 'account/recover-user', { email: emailOrPhone }).pipe(
      tap(() => console.log())
    );

  }

  recoverPassword(username: string, email: string) {
    return this._http.post(this.baseUrl + 'account/recover-password', { username, email } , { responseType: 'text' }).pipe(
      tap(() => console.log())
    );
  }

}
