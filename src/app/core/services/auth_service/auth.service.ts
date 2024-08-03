import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, tap, throwError } from 'rxjs';
import { ITokenDto } from '../../models/ITokenDto';
import { Router } from '@angular/router';
import { IUser } from 'app/core/models/IUser';
import { environment } from 'app/core/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  private baseUrl: string = environment.apiUrl;

  //TODO: Verificar luego el del Usuario normal

  private isUserLoggedInSubject: BehaviorSubject<boolean>;
  private isAdminLoggedInSubject: BehaviorSubject<boolean>;

  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {

    const token = localStorage.getItem('token');
    const admin_token = localStorage.getItem('admin_token');

    this.isUserLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.isAdminLoggedInSubject = new BehaviorSubject<boolean>(!!admin_token);
  }

  login(username: string, password: string, specialCase?: string): Observable<ITokenDto> {

    this.resetTokens();

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
          this.isUserLoggedInSubject.next(true);
        }
        else {
          this.isUserLoggedInSubject.next(false);
          this.isAdminLoggedInSubject.next(false);
        }

      }),
      catchError(err => {
        this.isUserLoggedInSubject.next(false);
        throw err;
      })
    );
  }

  logout() {
    this.resetTokens();
    this._router.navigate(['/']);
  }

  resetTokens(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
    this.isUserLoggedInSubject.next(false);
    this.isAdminLoggedInSubject.next(false);
  }

  isUserLoggedIn$(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
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

  recoverUser(email: string) {
    console.log(email);
    return this._http.post(this.baseUrl + 'account/recover-user', { email }, { responseType: 'text' }).pipe(
      tap(() => console.log()),
      catchError(error => this.transformTextResponseToJson(error))
    );

  }

  recoverPassword(username: string, email: string) {
    let body= { username, email };
    console.log(body);
    return this._http.post(this.baseUrl + 'account/recover-password', body , { responseType: 'text' }).pipe(
      tap(() => console.log()),
      catchError(error => this.transformTextResponseToJson(error))
    );
  }

  private transformTextResponseToJson(error: any): Observable<ParsedError> {
    let parsedError : ParsedError;
    try {
      parsedError = JSON.parse(error.error);
    } catch (jsonError) {
      parsedError = { message: 'Error parsing response to JSON', originalError: error.error };
    }
    return throwError(() => parsedError);
  }


  change_user_password(body: any) : Observable<ChangePasswordSuccessDTO> {
    return this._http.patch<ChangePasswordSuccessDTO>(this.baseUrl + 'account/change-password', body);
  }
}


interface ParsedError {
  message: string;
  originalError ?: string;
}

export interface ChangePasswordSuccessDTO{
  message: string
}
