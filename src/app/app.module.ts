import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonApp } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { Camera } from '@ionic-native/camera/ngx';

import {WebView} from '@ionic-native/ionic-webview/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
  			IonicModule.forRoot(), 
  			AppRoutingModule,
  			SignaturePadModule,
    		IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    ScreenOrientation,
    ImagePicker,
    WebView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
