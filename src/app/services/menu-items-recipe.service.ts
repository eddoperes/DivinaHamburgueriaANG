import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemRecipe } from '../module/menuItemRecipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsRecipeService {

  private url: string = `${environment.url}/menuitemsrecipe`;

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

  public menuItemsRecipe(): Observable<Array<MenuItemRecipe>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<MenuItemRecipe>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemsRecipeByName(name: string): Observable<Array<MenuItemRecipe>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<MenuItemRecipe>>(`${this.url}/GetByName?name=${name}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemRecipeById(id: string): Observable<MenuItemRecipe>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<MenuItemRecipe>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public menuItemRecipeEdit(id: number, body: string): Observable<MenuItemRecipe>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<MenuItemRecipe>(`${this.url}/${id}`, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public menuItemRecipeNew(id: number, body: string): Observable<MenuItemRecipe>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<MenuItemRecipe>(this.url, 
                                         body, 
                                         httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public menuItemRecipeDelete(id: number): Observable<MenuItemRecipe>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.delete<MenuItemRecipe>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
