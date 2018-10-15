import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class TriviaProvider {

  trivialApi: string = 'https://opentdb.com/api.php?';
  categories: string = 'https://opentdb.com/api_category.php';

  constructor(public http: HttpClient) {
  }

  getQuestions(amount: string = '10', category: string = '', difficulty: string = '', type: string = 'multiple'): Observable<object> {
    let values = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}` ;
    let url = `${this.trivialApi}${values}`;
    console.log(url);
    return this.http.get(`${url}`) as Observable<object>;
  }

  getCategories(): Observable<Object> {
    return this.http.get(`${this.categories}`) as Observable<object>;
  }

}
