import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  signature = '';
  isDrawing = false;

  constructor(public navController: NavController, 
              public storage: Storage, 
              public toastCtrl: ToastController,
              public platform: Platform,
              private screenOrientation: ScreenOrientation) {
    // this.screenOrientation.unlock();
    // this.screenOrientation.lock('landscape-primary');
  }

 
  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;
  public signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 1,
    'canvasWidth': this.platform.width(),//400,
    'canvasHeight': this.platform.height()-200,//200,
    'backgroundColor': '#f6fbff'
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.fromDataURL('assets/imgs/test.jpg');
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });

  }

  ionViewWillEnter() {
    // this.screenOrientation.unlock();
    // this.screenOrientation.lock('landscape-primary');
  }
 
  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
 
  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // }).then(toast=> toast.present());
  }
 
  clearPad() {
    this.signaturePad.clear();
  }

}
