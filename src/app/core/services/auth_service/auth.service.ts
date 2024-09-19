import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, tap, throwError } from 'rxjs';
import { ITokenDto } from '../../models/ITokenDto';
import { Router } from '@angular/router';
import { IUser, UserData } from 'app/core/models/IUser';
import { environment } from 'app/core/environments/environment';
import {IUserResponse} from '../../models/IUserResponse';
import { OneMessageResponse } from 'app/core/models/OneMessageResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  private baseUrl: string = environment.apiUrl;

  //TODO: Verificar luego el del Usuario normal

  private isUserLoggedInSubject: BehaviorSubject<boolean>;
  private isAdminLoggedInSubject: BehaviorSubject<boolean>;
  private isAnyUserOrAdminLoggedInSubject: BehaviorSubject<boolean>;

  private _router: Router = inject(Router);

  constructor(private _http: HttpClient) {

    const token = localStorage.getItem('token');
    const admin_token = localStorage.getItem('admin_token');

    this.isUserLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.isAdminLoggedInSubject = new BehaviorSubject<boolean>(!!admin_token);
    this.isAnyUserOrAdminLoggedInSubject = new BehaviorSubject<boolean>(!!token || !!admin_token);

  }

  login(username: string, password: string, specialCase?: string): Observable<ITokenDto> {

    this.resetTokens();

    let url;
    if (specialCase) {
      url = `${this.baseUrl}${specialCase + '/'}login`;
    } else {
      url = `${this.baseUrl + 'user/'}login`;
    }

    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<ITokenDto>(url, body, { headers: headers }).pipe(
      tap((response: ITokenDto) => {

        if (response && response.token && specialCase == 'admin') {
          this.isAdminLoggedInSubject.next(true);
          this.updateAnyUserOrAdminLoggedIn();
        }
        else if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isUserLoggedInSubject.next(true);
          this.updateAnyUserOrAdminLoggedIn();
        }
        else {
          localStorage.setItem('admin_token', response.token);
          this.isUserLoggedInSubject.next(false);
          this.isAdminLoggedInSubject.next(false);
          this.updateAnyUserOrAdminLoggedIn();
        }

      }),
      catchError(err => {
        this.isUserLoggedInSubject.next(false);
        this.updateAnyUserOrAdminLoggedIn();
        throw err;
      })
    );
  }

  logout() {
    console.log("hola");
    this.resetTokens();
    this._router.navigate(['/']);
  }

  resetTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_token');
    this.isUserLoggedInSubject.next(false);
    this.isAdminLoggedInSubject.next(false);
    this.updateAnyUserOrAdminLoggedIn();
  }

  //
  private updateAnyUserOrAdminLoggedIn(): void {
    const isAnyUserLoggedIn = this.isUserLoggedIn() || this.isAdminLoggedIn();
    this.isAnyUserOrAdminLoggedInSubject.next(isAnyUserLoggedIn);
  }

  isUserLoggedIn$(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.getValue();
  }

  isAnyUserOrAdminLoggedIn(): boolean {
    return this.isUserLoggedIn() || this.isAdminLoggedIn();
  }

  isAnyUserOrAdminLoggedIn$(): Observable<boolean> {
    return this.isAnyUserOrAdminLoggedInSubject.asObservable();
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
      this.baseUrl + 'user/validate',
      { token: token },
      { headers: new HttpHeaders({ 'skip': 'true' }) }
    )
  }

  // register
  register(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post(this.baseUrl + 'user/register', user, { headers, responseType: 'text' });
  }


  // recover user

  recoverUser(email: string) {
    return this._http.post(this.baseUrl + 'user/recover-user', { email }, { responseType: 'text' }).pipe(
      catchError(error => this.transformTextResponseToJson(error))
    );

  }

  recoverPassword(username: string, email: string) {
    let body = { username, email };
    return this._http.post(this.baseUrl + 'user/recover-password', body, { responseType: 'text' }).pipe(
      catchError(error => this.transformTextResponseToJson(error))
    );
  }

  private transformTextResponseToJson(error: any): Observable<ParsedError> {
    let parsedError: ParsedError;
    try {
      parsedError = JSON.parse(error.error);
    } catch (jsonError) {
      parsedError = { message: 'Error parsing response to JSON', originalError: error.error };
    }
    return throwError(() => parsedError);
  }


  change_user_password(body: any): Observable<ChangePasswordSuccessDTO> {
    return this._http.patch<ChangePasswordSuccessDTO>(this.baseUrl + 'user/change-password', body);
  }



  getUser(): Observable<IUserResponse> {
    return this._http.get<IUserResponse>(this.baseUrl + 'user/data');
  }

  updateUser( userData: UserData): Observable<OneMessageResponse> {
    return this._http.put<OneMessageResponse>(this.baseUrl + 'user/edit', userData);
   
  }

}



interface ParsedError {
  message: string;
  originalError?: string;
}

export interface ChangePasswordSuccessDTO {
  message: string
}
