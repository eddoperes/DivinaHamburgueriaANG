import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuantityAlarmTriggered } from '../module/quantityAlarmTriggered';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuantityAlarmsTriggeredService {

  private url: string = `${environment.url}/quantityalarmstriggered/${environment.version}`;

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

  public quantityAlarmsTriggered(): Observable<Array<QuantityAlarmTriggered>>{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${this.getToken()}`})
    }

    return this.http.get<Array<QuantityAlarmTriggered>>(this.url, httpOptions)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

}
