import {Component, Injectable} from '@angular/core';
import {AlertController, LoadingController, Loading, ToastController} from "ionic-angular";

@Component({
  selector: 'page-alert',
  //templateUrl: 'home.html'
})
@Injectable()
export class AlertProvider {
  private loading: Loading;

  constructor(public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  presentToast(string) {
    let toast = this.toastCtrl.create({
      message: string,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Game starts',
      subTitle: 'Answers the questions carefuly',
      cssClass: 'toastclase',
      buttons: ['GO']
    });
    alert.present();
  }

  presentLoadingDefault(message = 'Loading questions...') {
    this.loading = this.loadingCtrl.create({
      content: message,
    });

    this.loading.present();
    /*setTimeout(() => {
      loading.dismiss();
    }, 5000);*/
  }



  dismissLoading() {
    this.loading.dismiss();
  }
}
