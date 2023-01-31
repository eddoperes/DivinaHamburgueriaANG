import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryOrder } from '../module/deliveryOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrdersService {

  private url: string = `${environment.url}/deliveryorders`;

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

  public deliveryOrders(): Observable<Array<DeliveryOrder>>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<Array<DeliveryOrder>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public deliveryOrdersByCode(code: string): Observable<Array<DeliveryOrder>>{
    if (code===null || code === undefined)
      code = "";
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }  
    return this.http.get<Array<DeliveryOrder>>(`${this.url}/GetByCode?code=${code}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public deliveryOrdersById(id: string): Observable<DeliveryOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<DeliveryOrder>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public deliveryOrdersEdit(id: number, body: string): Observable<DeliveryOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<DeliveryOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public deliveryOrdersPatch(id: number, body: string): Observable<DeliveryOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.patch<DeliveryOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public deliveryOrdersNew(id: number, body: string): Observable<DeliveryOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<DeliveryOrder>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public deliveryOrdersDelete(id: number): Observable<DeliveryOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.delete<DeliveryOrder>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }
  
}
