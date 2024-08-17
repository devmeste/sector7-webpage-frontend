import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'app/core/environments/environment';
import { IBanner } from 'app/core/models/IBanner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  
  private baseUrl: string = environment.apiUrl;
  _httpClient: HttpClient = inject(HttpClient);


  getBanner(option:string) : Observable<IBanner>{
    return this._httpClient.get<IBanner>(`${this.baseUrl}banners/category/${option}`);
  }

}

