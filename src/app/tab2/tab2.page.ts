import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  signature = '';
  isDrawing = false;
  photo = '';
  w = 0;
  h = 0;

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
    'canvasWidth': window.innerWidth*0.9,//this.platform.width(),//400,
    'canvasHeight': window.innerHeight*0.9,//this.platform.height(),//200,
    'backgroundColor': '#ffffff'
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    // this.storage.get('choosePic').then((data) => {
    //   this.signaturePad.fromDataURL(data);
    // });
    // this.signaturePad.fromDataURL(this.photo);//this.photo);
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });
  }

  ionViewDidEnter() {
    // this.screenOrientation.unlock();
    // this.screenOrientation.lock('landscape-primary');
    // this.storage.get('choosePic').then((data) => {
    //   this.signaturePad.fromDataURL(data);
    // });
    // this.signaturePad.fromDataURL(this.photo);
    this.storage.get('choosePic').then((data) => {
      if(data != null){
        this.signaturePad.fromDataURL(data);
      }
    });
  }
 
  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
 
  savePad() {
    this.signature = this.signaturePad.toDataURL("image/jpeg");
    this.storage.set('savedSignature', this.signature);
    // this.signaturePad.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // }).then(toast=> toast.present());
  }
 
  clearPad() {
    this.signaturePad.clear();
    this.storage.get('choosePic').then((data) => {
      if(data != null){
        this.signaturePad.fromDataURL(data);
      }
    });
    // this.signaturePad.fromDataURL(this.photo);
    // console.log(this.photo)
  }

}
