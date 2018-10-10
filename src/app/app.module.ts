import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TriviaProvider } from '../providers/trivia/trivia';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { StarttriviaPage } from "../pages/starttrivia/starttrivia";
import { AlertProvider } from '../providers/alert/alert';
import { TranslationProvider } from '../providers/translation/translation';
import { ResultsPage } from "../pages/results/results";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StarttriviaPage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StarttriviaPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TriviaProvider,
    AlertProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TranslationProvider,
  ]
})
export class AppModule {}
