import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../module/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private url: string = `${environment.url}/customers/${environment.version}`;

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

  public customers(): Observable<Array<Customer>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<Customer>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public customersByName(name: string): Observable<Array<Customer>>{
    if (name===null)
      name = "";

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<Customer>>(`${this.url}/GetByName?name=${name}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public customerById(id: string): Observable<Customer>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Customer>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public customerEdit(id: number, body: string): Observable<Customer>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<Customer>(`${this.url}/${id}`, 
                                   body, 
                                   httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public customerNew(id: number, body: string): Observable<Customer>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<Customer>(this.url, 
                                    body, 
                                    httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public customerDelete(id: number): Observable<Customer>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.delete<Customer>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
