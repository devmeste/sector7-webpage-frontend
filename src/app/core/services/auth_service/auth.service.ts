import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  baseUrl : string = 'localhost:8080/auth';

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) : Observable<any> { // TODO: use interface
    const url = `localhost:8080/auth/login`;
    console.log(username);
    console.log(password);
    const body = { 
      'username': username, 
      'password': password };
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this._http.post<any>(url, body);
  }

}
