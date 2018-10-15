import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Storage } from '@ionic/storage';



@Injectable()
export class TranslationProvider {
  apiUrl: string = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=';

  constructor(public http: HttpClient, public storage: Storage) {

  }

  getPhrase(translate: string, phrase: string){
    let petition = `${this.apiUrl}${translate}&dt=t&q=${phrase}`;
    console.log(petition);
    return this.http.get(petition).pipe(map(resp => resp[0][0][0]));
  }

}
