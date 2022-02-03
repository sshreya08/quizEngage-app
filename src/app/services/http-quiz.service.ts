import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestionAPI } from '../model/questions';
import { Option } from '../model/options';

@Injectable({
  providedIn: 'root',
})
export class HttpQuizService {
  difficultyLevel = 'Easy';
  questionNumber = 1;
  currentScore = 0;

  constructor(private http: HttpClient) {}

  configUrlForOpt = 'https://us-central1-quizengage.cloudfunctions.net';

  getRandomQuestions(): Observable<QuizQuestionAPI> {
    return this.http.get<QuizQuestionAPI>(
      `${this.configUrlForOpt}/getRandomQuestion`
    );
  }

  getQuestionOptions(category: string): Observable<Option[]> {
    return this.http.get<Option[]>(
      `${this.configUrlForOpt}/getAnswers?cat=${category}`
    );
  }
}
