import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.page.html',
  styleUrls: ['./uploadimage.page.scss'],
})
export class UploadimagePage implements OnInit {

  fileName:string;
  fileSize:string;
  isLoading:boolean;
  isLoaded:boolean;
  private imageCollection: AngularFirestoreCollection<imageData>;
  imagefile: Observable<imageData[]>;
  imageUpload: AngularFireUploadTask;

  constructor(private database: AngularFirestore, private storage: AngularFireStorage, 
    private router : Router, private loading :LoadingController) { 
    this.isLoading = false;
    this.isLoaded = false;
    this.imageCollection = this.database.collection<imageData>('loginUploads');
    this.imagefile = this.imageCollection.valueChanges();
  }

  ngOnInit() {
  }

  async uploadImagetoFirebase(event : any){

    // const load = await this.loading.create({
    //   spinner:'dots',
    // })
    //   load.present();

    const file = event.target.files;
    console.log(file);
    var fileName = file[0];
    console.log(fileName);

    if(fileName.type.split('/')[0] !== "image"){
      console.error("File is not Image");
      return;
    }

    const path = `loginUploads/${new Date().getTime()}_${fileName.name}`;

    var fileRef = this.storage.ref(path); 
 
    this.imageUpload = this.storage.upload(path, fileName);
    // this.loading.dismiss();

  }

  goToNextPage(){
    this.router.navigate(['tabs']);
  }

}
