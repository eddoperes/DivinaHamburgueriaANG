import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../module/provider';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private url: string = `${environment.url}/providers`;

  constructor(private http: HttpClient) { }

  public providers(): Observable<Array<Provider>>{
    return this.http.get<Array<Provider>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }


}
