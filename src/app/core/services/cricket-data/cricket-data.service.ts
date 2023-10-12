import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CricketDataService {

  constructor(private http: HttpClient) { 
    
  }

  getMatches(): Observable<any> {
    const url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming';
    const headers = {
      //'X-RapidAPI-Key': 'f89cfa47b9msh274906471364338p1e9fc1jsnb27577521362',
      //'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
    return this.http.get(url, { headers }).pipe(
      tap((response) => {
        console.log('matches:', response);
      }),
      catchError(error => {
        return throwError(null);
      })
    )
  }
}
