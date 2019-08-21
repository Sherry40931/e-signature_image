import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  signature = '';
  pics = '';

  constructor(private screenOrientation: ScreenOrientation,
              public storage: Storage,
              public file: File,
              public platform: Platform) {
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

  saveBase64():Promise<string>{
    return new Promise((resolve, reject)=>{
      // console.log(this.signature)
      var realData = this.signature.split(",")[1]
      let blob=this.b64toBlob(realData, 'image/jpeg')
      let path = this.file.externalRootDirectory;
      if (this.platform.is('ios')){
        path = this.file.documentsDirectory;
      }
      let name = new Date().getTime() + '.jpg';

      this.file.writeFile(path, name, blob)
      .then(()=>{
        resolve(path+name);
      })
      .catch((err)=>{
        console.log('error writing blob')
        reject(err)
      })
    })
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}
