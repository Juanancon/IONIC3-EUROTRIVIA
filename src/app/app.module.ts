// Basic imports
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChooselangPage } from "../pages/chooselang/chooselang";
import { ResultsPage } from "../pages/results/results";
import { StarttriviaPage } from "../pages/starttrivia/starttrivia";

// Providers
import { TriviaProvider } from '../providers/trivia/trivia';
import { IonicStorageModule } from "@ionic/storage";
import { AlertProvider } from '../providers/alert/alert';
import { TranslationProvider } from '../providers/translation/translation';

// Angular plugins
import { ChartsModule } from "ng2-charts";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


// Components
import { DoughnutComponent } from "../components/doughnut/doughnut";
import { BarchartComponent } from "../components/barchart/barchart";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StarttriviaPage,
    ResultsPage,
    ChooselangPage,
    DoughnutComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StarttriviaPage,
    ResultsPage,
    ChooselangPage
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
