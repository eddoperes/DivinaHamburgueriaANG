import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../module/provider';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private url: string = `${environment.url}/providers/${environment.version}`;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    var storage = window.localStorage;
    if (storage) {
      var value = storage.getItem("token");
      if (value === null)
        return "";
      else
        return JSON.parse(value).accessToken;
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

  public providersByName(name: string): Observable<Array<Provider>>{
    if (name===null)
      name = "";

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<Provider>>(`${this.url}/GetByName?name=${name}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public providerById(id: string): Observable<Provider>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Provider>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public providerEdit(id: number, body: string): Observable<Provider>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<Provider>(`${this.url}/${id}`, 
                                   body, 
                                   httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public providerNew(id: number, body: string): Observable<Provider>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<Provider>(this.url, 
                                    body, 
                                    httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public providerDelete(id: number): Observable<Provider>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.delete<Provider>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}

