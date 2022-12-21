import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../module/purchaseOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  private url: string = `${environment.url}/purchaseorders`;

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

  public purchaseOrders(): Observable<Array<PurchaseOrder>>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<Array<PurchaseOrder>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersByProvider(providerId: number): Observable<Array<PurchaseOrder>>{
    if (providerId===null || providerId === undefined)
      providerId = 0;
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<Array<PurchaseOrder>>(`${this.url}/GetByProvider?providerid=${providerId}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersById(id: string): Observable<PurchaseOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.get<PurchaseOrder>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersEdit(id: number, body: string): Observable<PurchaseOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<PurchaseOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public purchaseOrdersPatch(id: number, body: string): Observable<PurchaseOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.patch<PurchaseOrder>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public purchaseOrdersNew(id: number, body: string): Observable<PurchaseOrder>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<PurchaseOrder>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public purchaseOrdersDelete(id: number): Observable<PurchaseOrder>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }
    return this.http.delete<PurchaseOrder>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }
  
}
