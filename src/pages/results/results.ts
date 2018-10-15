import {Component, Input, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage implements OnInit {
  private results: any;
  private respuestas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private translateService: TranslateService) {

    this.results = this.navParams.get('results');
    this.respuestas = this.navParams.get('respuestas');

  }


  ngOnInit() {
  }

  startAgain() {
    this.navCtrl.setRoot(HomePage);
  }

}
