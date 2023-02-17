import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidityAlarmTriggered } from '../module/validityAlarmTriggered';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidityAlarmsTriggeredService {

  private url: string = `${environment.url}/validityalarmstriggered/${environment.version}`;

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

  public validityAlarmsTriggered(): Observable<Array<ValidityAlarmTriggered>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<ValidityAlarmTriggered>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

}






