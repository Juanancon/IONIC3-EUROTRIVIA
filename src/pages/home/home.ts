import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TriviaProvider } from "../../providers/trivia/trivia";
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StarttriviaPage } from "../starttrivia/starttrivia";
import { AlertProvider } from "../../providers/alert/alert";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  categories: object;
  private form : FormGroup;
  options: number = 50;

  constructor(public navCtrl: NavController,
              public triviaP : TriviaProvider,
              private storage: Storage,
              private formBuilder: FormBuilder,
              private alertS: AlertProvider,
              private translateService: TranslateService,) {

    this.storage.set('language', 'es');

    this.form = this.formBuilder.group({
      amount: [10],
      categories: [''],
      difficulty: [''],
      type: [''],
    });

  }

  ngOnInit() {

    this.triviaP.getCategories().subscribe((data: any) => {
      console.log('Categorias: ', data.trivia_categories);
      this.categories = data.trivia_categories;
    }, (error) => {
      console.log(error);
    });
  }

  formSubmitted(): void {
    this.alertS.presentLoadingDefault();
    this.triviaP.getQuestions(this.form.value.amount, this.form.value.categories, this.form.value.difficulty, this.form.value.type).subscribe((data: any)=>{
      console.log('Api call: ', data);
      data.response_code == 1 ? this.alertS.presentToast('Error, try again please') : this.navCtrl.setRoot(StarttriviaPage, {questions: data});
    }, (error) => {
      this.alertS.dismissLoading();
      this.alertS.presentToast(error);
    });
  }

}
