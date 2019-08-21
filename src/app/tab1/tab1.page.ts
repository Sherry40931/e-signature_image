import { NavController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {WebView} from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentImage: any;
  imagePath = '';
  path = this.file.cacheDirectory;

  constructor(private camera: Camera,
              public storage: Storage,
              public webview: WebView,
              private file: File) { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,//FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
      // saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      // this.imagePath = this.webview.convertFileSrc(imageData);
      // console.log(this.imagePath)
      this.storage.set('choosePic', this.currentImage);
      // console.log(this.path + 'tempPic')
      // this.file.writeFile(this.path, 'tempPic', imageData, {replace: true});
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
  }

  // showpicture(){
  //   console.log(this.path + 'tempPic')
  //   this.currentImage = this.file.readAsDataURL(this.path, 'tempPic');
  // }


  //=========================================================================================================
  // imageResponse: any;
  // options: any;
 
  // constructor(private imagePicker: ImagePicker,
  //             public storage: Storage) { }
 
  // getImages() {
  //   console.log("In function")
  //   this.options = {
  //     // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
  //     // selection of a single image, the plugin will return it.
  //     maximumImagesCount: 5,
 
  //     // max width and height to allow the images to be.  Will keep aspect
  //     // ratio no matter what.  So if both are 800, the returned image
  //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
  //     // 800 and height 0 the image will be 800 pixels wide if the source
  //     // is at least that wide.
  //     width: 200,
  //     //height: 200,
 
  //     // quality of resized image, defaults to 100
  //     quality: 25,
 
  //     // output type, defaults to FILE_URIs.
  //     // available options are 
  //     // window.imagePicker.OutputType.FILE_URI (0) or 
  //     // window.imagePicker.OutputType.BASE64_STRING (1)
  //     outputType: 0
  //   };
  //   this.imageResponse = [];
  //   this.imagePicker.getPictures(this.options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       // results[i] = results[i].replace(/^file:\/\//, '');
  //       console.log(results[i]);
  //       // results[i] = normalizeURL(results[i]); 
  //       this.imageResponse.push(results[i]);
  //     }
  //     this.storage.set('choosePic', results[0]);
  //   }, (err) => {
  //     alert(err);
  //   });
  // }
// ====================================================================================
  // items;
  // savedParentNativeURLs = [];
  // currentPath;

  // handleError = error => {
  //   console.log("error reading,", error);
  //   };

  // listDir = (path, dirName) => {
  //   this.file
  //    .listDir(path, dirName)
  //     .then(entries => {
  //       this.items = entries;
  //     })
  //     .catch(this.handleError);
  //     console.log(path, dirName)
  //     this.currentPath = path + dirName;
  //   };

  //   goDown = item => {
  //     const parentNativeURL = item.nativeURL.replace(item.name, "");
  //     this.savedParentNativeURLs.push(parentNativeURL);

  //     this.listDir(parentNativeURL, item.name);
  //   };

  //   // goUp = () => {
  //   //   const parentNativeURL = this.savedParentNativeURLs.pop();
  //   //   this.listDir(parentNativeURL, "");
  //   // };

  //   openLocalPdf(filename) {
  //       // let filePath = this.file.externalRootDirectory + '/Downloads/'
  //        console.log(this.currentPath)
  //       if (this.platform.is('android')) {
  //         let fakeName = 'currentPDF';
  //         this.file.copyFile(this.currentPath, filename, this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
  //           this.fileOpener.open(result.nativeURL, 'image/jpeg')//'application/pdf')
  //             .then(() => console.log('File is opened'))
  //             .catch(e => console.log('Error opening file', e));
  //         })
  //       } 
  //       // else {
  //       //   // Use Document viewer for iOS for a better UI
  //       //   const options: DocumentViewerOptions = {
  //       //     title: 'My PDF'
  //       //   }
  //       //   this.document.viewDocument(`${filePath}/pdf-test.pdf`, 'application/pdf', options);
  //       // }
  //     }
 
  // constructor(private platform: Platform, 
  //              private file: File,
  //              private ft: FileTransfer, 
  //              private fileOpener: FileOpener, 
  //              private document: DocumentViewer,
  //              private screenOrientation: ScreenOrientation) {

  //   // For Android
  //   const ROOT_DIRECTORY = this.file.externalRootDirectory;
  //   this.platform.ready()
  //     .then(() => {
  //       this.listDir(ROOT_DIRECTORY, 'Download');
  //   })

  // }
  // ngOnInit() {}

  // ionViewWillEnter() {
  //   this.screenOrientation.unlock();
  //   this.screenOrientation.lock('portrait-primary');
  // }
}