import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from "@ngx-translate/core";
import {HomePage} from "../home/home";
import {AlertProvider} from "../../providers/alert/alert";



@Component({
  selector: 'page-chooselang',
  templateUrl: 'chooselang.html',
})
export class ChooselangPage {

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private translateService: TranslateService,
              private alertS: AlertProvider) {

    this.translateService.setDefaultLang('en');

  }

  lang(lang) : void {
    console.log('Setted language to: ', lang);
    this.translateService.use(lang);
    this.storage.set('lang', lang);
    console.log();
    this.translateService.get('HELLO').subscribe(
      value => {
        // value is our translated string
        let alertTitle = value;
        this.alertS.presentToast(alertTitle);
      }
    );
    this.navCtrl.setRoot(HomePage);
  }

}
