import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itensdoestoque } from '../module/itensdoestoque';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensdoestoqueService {

  private url: string = `${environment.url}/inventoryitems`;

  constructor(private http: HttpClient) { }
  
  public itensDoEstoque(): Observable<Array<Itensdoestoque>>{
    return this.http.get<Array<Itensdoestoque>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public itensDoEstoqueById(id: string): Observable<Itensdoestoque>{
    return this.http.get<Itensdoestoque>(`${this.url}/${id}`)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public itensDoEstoqueEdit(id: number, body: string): Observable<Itensdoestoque>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.put<Itensdoestoque>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public itensDoEstoqueNew(id: number, body: string): Observable<Itensdoestoque>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<Itensdoestoque>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public itensDoEstoqueDelete(id: number): Observable<Itensdoestoque>{
    return this.http.delete<Itensdoestoque>(`${this.url}/${id}`) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
