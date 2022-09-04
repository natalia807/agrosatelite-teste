import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Farm } from './../models/Farm'
import { map, first } from 'rxjs/operators';
import { Owner } from '../models/Owner';


@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor(private http: HttpClient) {}

  
  create(farm: Farm) {
    return this.http.post<Farm>('http://localhost:3000/farms', farm);
  }

  read(id: number): Observable<Farm> {
    // return {} as any
    return this.http.get<Farm>(`http://localhost:3000/farms/${id}`);
  }

  list(): Observable<Farm[]> {
    return this.http.get<Farm[]>('http://localhost:3000/farms');
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/farms/${id}`)
  }

  editFarm(id: number, farm: Farm): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/farms/${id}`, farm)
  }

  // Owners
  getOwner(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/owners/${id}`)
  }

  listOwners(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/owners')
  }

  createOwner(owner: Owner): Observable<any> {
    return this.http.post<Owner>('http://localhost:3000/owners', owner)
  }
}
