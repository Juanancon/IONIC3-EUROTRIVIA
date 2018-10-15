import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams } from 'ionic-angular';
import { ResultsPage } from "../results/results";
import { TranslationProvider } from "../../providers/translation/translation";
import { AlertProvider } from "../../providers/alert/alert";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-starttrivia',
  templateUrl: 'starttrivia.html',
})
export class StarttriviaPage implements OnInit{
  @ViewChild(Slides) slides: Slides;

  private questions: any;
  private answers = [];
  private correct: number = 0;
  private wrong: number = 0;
  private answered: number = 0;
  private results = [];
  private respuestas: any;
  private showQ: string = 'false';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public transS: TranslationProvider,
              private alertS: AlertProvider,
              private storage: Storage) {
    this. questions = this.navParams.get('questions');
  }

  /*
  Lock the slides in each click
   */
  nextSlide(): void{
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  replaceText(text: string): string {
    text = text.replace('&amp;', '"');
    text = text.replace(/&quot;/g, '"');
    text = text.replace('&#039;', '""');
    text = text.replace('/\u201C|\u201D/g', '"');
    return text;
  }

  ngOnInit(): void {
      this.slides.lockSwipes(true);
      this.questions = this.questions.results;
      this.questions.forEach((question, index) => {
        setTimeout(()=>{
          question.question = this.replaceText(question.question);

          this.storage.get('lang').then((lang) => {
            this.transS.getPhrase(lang, question.question).subscribe(trad => {
              question.question = trad;
              console.log(trad);
              const options = [{
                answer: question.correct_answer,
                category: question.category,
                question: question.question,
                correct: true
              }];
              question.incorrect_answers.forEach(incorrect => {
                options.push({
                  answer: incorrect,
                  category: question.category,
                  question: question.question,
                  correct: false
                });
              });
              this.shuffle(options);
              this.answers.push({
                question: question.question,
                category: question.category,
                options: options
              });
            });
          });

          if (index === this.questions.length - 1) {
            this.alertS.dismissLoading();
            this.showQ = 'true';
          }
        }, 1000 * (index + 1));
      });
      console.log('Array formado: ',this.answers)
  }

  shuffle(a): number {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  buttonClick(i): void {
    i.correct === true ? this.correct++ : this.wrong++;
    this.answered++;
    this.results.push({answer: i.answer, category: i.category, correct: i.correct});
    if(this.slides.isEnd()) {
      this.respuestas = {corrects: this.correct, wrongs: this.wrong, answered: this.answered};
      this.navCtrl.setRoot(ResultsPage, {results: this.results, respuestas: this.respuestas});
    }
    this.nextSlide();
  }

}
