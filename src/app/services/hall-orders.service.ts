import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HallOrder } from '../module/hallOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallOrdersService {

  private url: string = `${environment.url}/hallorders`;

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

  public hallOrders(): Observable<Array<HallOrder>>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<Array<HallOrder>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public hallOrdersByCode(code: string): Observable<Array<HallOrder>>{
    if (code===null || code === undefined)
      code = "";
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }  
    return this.http.get<Array<HallOrder>>(`${this.url}/GetByCode?code=${code}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public hallOrdersById(id: string): Observable<HallOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<HallOrder>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public hallOrdersEdit(id: number, body: string): Observable<HallOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<HallOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public hallOrdersPatch(id: number, body: string): Observable<HallOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.patch<HallOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public hallOrdersNew(id: number, body: string): Observable<HallOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<HallOrder>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public hallOrdersDelete(id: number): Observable<HallOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.delete<HallOrder>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }
  
}
