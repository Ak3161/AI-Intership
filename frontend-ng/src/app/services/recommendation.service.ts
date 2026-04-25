import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private recommendationsSubject = new BehaviorSubject<any[]>([]);
  public recommendations$ = this.recommendationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  setRecommendations(data: any[]) {
    this.recommendationsSubject.next(data);
  }

  getRecommendations(): any[] {
    return this.recommendationsSubject.getValue();
  }

  generateRecommendations(payload: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/recommendations/generate', payload);
  }

  getInternships(): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/internships');
  }

  createInternship(payload: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/internships', payload);
  }
}
