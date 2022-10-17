import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidades } from '../module/unidades';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private url: string = "https://localhost:7024/unidades";

  constructor(private http: HttpClient) { }

  public unidades(): Observable<Array<Unidades>>{
    return this.http.get<Array<Unidades>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

}
