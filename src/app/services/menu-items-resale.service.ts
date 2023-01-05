import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemResale } from '../module/menuItemResale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsResaleService {

  private url: string = `${environment.url}/menuitemsresale`;

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

  public menuItemsResale(): Observable<Array<MenuItemResale>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<MenuItemResale>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemsResaleByName(name: string): Observable<Array<MenuItemResale>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<MenuItemResale>>(`${this.url}/GetByName?name=${name}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemResaleById(id: string): Observable<MenuItemResale>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<MenuItemResale>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemResaleEdit(id: number, body: string): Observable<MenuItemResale>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<MenuItemResale>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public menuItemResaleNew(id: number, body: string): Observable<MenuItemResale>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<MenuItemResale>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public menuItemResaleDelete(id: number): Observable<MenuItemResale>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.delete<MenuItemResale>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
