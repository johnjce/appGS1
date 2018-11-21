import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThreadsProvider } from '../../providers/threads/threads';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-vet-pp',
  templateUrl: 'vet-pp.html',
})
export class VetPpPage {
  id: number;
  title:string="";
  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private threadsProvider: ThreadsProvider,
              public formBuilder: FormBuilder ){
    this.id = navParams.data;
    this.myForm = this.createMyForm();
    this.getAllThreads();
  }

  getAllThreads() {
    return this.threadsProvider.getThreads(this.id).subscribe(
      (data) => {
        this.title = data.title;
        this.id = data.id;
      },
      (error) =>{
        console.error(error);
      }
    );
  }
  saveData(){
    console.log(this.myForm.value);
  }
  private createMyForm(){
    return this.formBuilder.group({
      title: ['', Validators.required],
      parentSubforumId: [this.id, Validators.required],
      description: ['', Validators.required],
      open: ['', Validators.required],
    });
  }

}