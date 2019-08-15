import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';
// import { mergeImages } from 'merge-images';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  signature = '';
  pics = '';

  constructor(private screenOrientation: ScreenOrientation,
              public storage: Storage) {
   }

  ionViewWillEnter() {
    if(this.screenOrientation.type == 'landscape-primary'){
      this.screenOrientation.unlock();
      this.screenOrientation.lock('portrait-primary');
    }
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });
  }

  ngAfterViewInit() {
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });
  }

  // mergeImages([
  //     { src: 'currentPDF.jpg', x: 0, y: 0 },
  //     { src: this.signature, x: 32, y: 0 },
  //     { src: 'mouth.png', x: 16, y: 0 }
  // ])
  //     .then((data) => {
  //         this.pics = data;
  //     });

  // mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
  // .then(b64 => document.querySelector('img').src = b64);
}
