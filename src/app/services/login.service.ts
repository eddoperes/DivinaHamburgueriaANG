import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../module/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.url}/Tokens/LoginUser`;

  constructor(private http: HttpClient) { }

  public login(body: string): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<Login>(this.url, 
                                 body, 
                                 httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
