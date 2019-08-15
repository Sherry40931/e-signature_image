import { NavController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // letterObj = {
  //   to: '',
  //   from: '',
  //   text: ''
  // }
 
  // pdfObj = null;
 
  // constructor(public navCtrl: NavController, 
  //             private plt: Platform, 
  //             private file: File, 
  //             private fileOpener: FileOpener) { }
 
  // createPdf() {
  //   var docDefinition = {
  //     content: [
  //       { text: 'REMINDER', style: 'header' },
  //       { text: new Date().toTimeString(), alignment: 'right' },
 
  //       { text: 'From', style: 'subheader' },
  //       { text: this.letterObj.from },
 
  //       { text: 'To', style: 'subheader' },
  //       this.letterObj.to,
 
  //       { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
  //       {
  //         ul: [
  //           'Bacon',
  //           'Rips',
  //           'BBQ',
  //         ]
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //       },
  //       subheader: {
  //         fontSize: 14,
  //         bold: true,
  //         margin: [0, 15, 0, 0]
  //       },
  //       story: {
  //         italic: true,
  //         alignment: 'center',
  //         width: '50%',
  //       }
  //     }
  //   }
  //   this.pdfObj = pdfMake.createPdf(docDefinition);
  // }
 
  // downloadPdf() {
  //   if (this.plt.is('cordova')) {
  //     this.pdfObj.getBuffer((buffer) => {
  //       var blob = new Blob([buffer], { type: 'application/pdf' });
 
  //       // Save the PDF to the data Directory of our App
  //       this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
  //         // Open the PDf with the correct OS tools
  //         this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
  //       })
  //     });
  //   } else {
  //     // On a browser simply use download!
  //     this.pdfObj.download();
  //   }
  // }
  items;
  savedParentNativeURLs = [];
  currentPath;

  handleError = error => {
    console.log("error reading,", error);
    };

  listDir = (path, dirName) => {
    this.file
     .listDir(path, dirName)
      .then(entries => {
        this.items = entries;
      })
      .catch(this.handleError);
      console.log(path, dirName)
      this.currentPath = path + dirName;
    };

    goDown = item => {
      const parentNativeURL = item.nativeURL.replace(item.name, "");
      this.savedParentNativeURLs.push(parentNativeURL);

      this.listDir(parentNativeURL, item.name);
    };

    // goUp = () => {
    //   const parentNativeURL = this.savedParentNativeURLs.pop();
    //   this.listDir(parentNativeURL, "");
    // };

    openLocalPdf(filename) {
        // let filePath = this.file.externalRootDirectory + '/Downloads/'
         console.log(this.currentPath)
        if (this.platform.is('android')) {
          let fakeName = 'currentPDF';
          this.file.copyFile(this.currentPath, filename, this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
            this.fileOpener.open(result.nativeURL, 'image/jpeg')//'application/pdf')
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
          })
        } 
        // else {
        //   // Use Document viewer for iOS for a better UI
        //   const options: DocumentViewerOptions = {
        //     title: 'My PDF'
        //   }
        //   this.document.viewDocument(`${filePath}/pdf-test.pdf`, 'application/pdf', options);
        // }
      }
 
  constructor(private platform: Platform, 
               private file: File,
               private ft: FileTransfer, 
               private fileOpener: FileOpener, 
               private document: DocumentViewer,
               private screenOrientation: ScreenOrientation) {

    // For Android
    const ROOT_DIRECTORY = this.file.externalRootDirectory;
    this.platform.ready()
      .then(() => {
        this.listDir(ROOT_DIRECTORY, 'Download');
    })

  }
  ngOnInit() {}

  ionViewWillEnter() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock('portrait-primary');
  }
}