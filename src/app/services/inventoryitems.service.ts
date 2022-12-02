import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItem } from '../module/inventoryItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemsService {

  private url: string = `${environment.url}/inventoryitems`;

  constructor(private http: HttpClient) { }
  
  public itensDoEstoque(): Observable<Array<InventoryItem>>{
    return this.http.get<Array<InventoryItem>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public itensDoEstoqueByNameAndOrType(name: string, type: string): Observable<Array<InventoryItem>>{
    if (name===null)
      name = "";
    if (type===null)
      type = "";
    return this.http.get<Array<InventoryItem>>(`${this.url}/GetByNameAndOrType?name=${name}&type=${type}`)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public itensDoEstoqueById(id: string): Observable<InventoryItem>{
    return this.http.get<InventoryItem>(`${this.url}/${id}`)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public itensDoEstoqueEdit(id: number, body: string): Observable<InventoryItem>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.put<InventoryItem>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public itensDoEstoqueNew(id: number, body: string): Observable<InventoryItem>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<InventoryItem>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public itensDoEstoqueDelete(id: number): Observable<InventoryItem>{
    return this.http.delete<InventoryItem>(`${this.url}/${id}`) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
