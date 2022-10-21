import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidades } from '../module/unidades';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private url: string = `${environment.url}/units`;

  constructor(private http: HttpClient) { }

  public unidades(): Observable<Array<Unidades>>{
    return this.http.get<Array<Unidades>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

}
