import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alarm } from '../module/alarm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  private url: string = `${environment.url}/alarms`;

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

  public alarms(): Observable<Array<Alarm>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<Alarm>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public alarmsByEatable(eatableId: number): Observable<Array<Alarm>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<Alarm>>(`${this.url}/GetByEatable?eatableId=${eatableId}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public alarmById(id: string): Observable<Alarm>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Alarm>(`${this.url}/${id}`, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

  public alarmEdit(id: number, body: string): Observable<Alarm>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.put<Alarm>(`${this.url}/${id}`, 
                                   body, 
                                   httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public alarmNew(id: number, body: string): Observable<Alarm>{

    const httpOptions = {
      headers: new HttpHeaders()
                   .set('content-type', 'application/json')
                   .set('Authorization', `Bearer ${this.getToken()}`)      
    }

    return this.http.post<Alarm>(this.url, 
                                    body, 
                                    httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

  public alarmDelete(id: number): Observable<Alarm>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.delete<Alarm>(`${this.url}/${id}`, httpOptions) 
                    .pipe(
                      res => res,
                      error => error,                      
                    );       
  }

}
