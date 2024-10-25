import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  postApplicantApi(data: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/register', data)
  }

  postComplaintsApi(data: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/complaint', data)
  }

  getComplaintsApi(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/complaints/')
  }

  deleteComplaintsApi(id: any): Observable<any>{
    return this.http.delete(`http://127.0.0.1:8000/api/complaint/${id}`)
  }

  getApplicantApi(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/students');
  }

  getSingleApplicantApi(id: string): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/user/${id}`)
  }

  deleteApi(id: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/user/${id}`;
    return this.http.delete(url);
  }
  
  putApi(id: any, data: any): Observable<any>{
    const url = `http://127.0.0.1:8000/api/user/${id}`;
    return this.http.put(url, data)
  }
}

