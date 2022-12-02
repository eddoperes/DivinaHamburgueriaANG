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

  public purchaseOrders(): Observable<Array<PurchaseOrder>>{
    return this.http.get<Array<PurchaseOrder>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersByProvider(providerId: number): Observable<Array<PurchaseOrder>>{
    if (providerId===null || providerId === undefined)
      providerId = 0;
    return this.http.get<Array<PurchaseOrder>>(`${this.url}/GetByProvider?providerid=${providerId}`)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersById(id: string): Observable<PurchaseOrder>{
    return this.http.get<PurchaseOrder>(`${this.url}/${id}`)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public purchaseOrdersEdit(id: number, body: string): Observable<PurchaseOrder>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
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
    return this.http.delete<PurchaseOrder>(`${this.url}/${id}`) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }
  
}
