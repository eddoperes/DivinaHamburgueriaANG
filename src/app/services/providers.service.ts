import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../module/provider';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private url: string = `${environment.url}/providers`;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    var storage = window.localStorage;
    if (storage) {
      var value = storage.getItem("token");
      if (value === null)
        return "";
      else
        return JSON.parse(value);
    }
    return "";
  }

  public providers(): Observable<Array<Provider>>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<Array<Provider>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }


}
