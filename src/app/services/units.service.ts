import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../module/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private url: string = `${environment.url}/units`;

  constructor(private http: HttpClient) { }

  public unidades(): Observable<Array<Unit>>{
    return this.http.get<Array<Unit>>(this.url)
                    .pipe(
                      res => res,
                      error => error,                      
                    );                  
  }

}