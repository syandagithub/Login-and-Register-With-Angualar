import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'
import { Toast } from '@awesome-cordova-plugins/toast/ngx'
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { User } from '../model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  user = {} as User;

  //constructor(private auth:AngularFireAuth,private router:Router, public toastController:ToastController) { }
  constructor(private route: Router,
    public fireService: FireserviceService,
    private toast: ToastController,
    private load: LoadingController,
    public afAuth: AngularFireAuth,
    public alertController: AlertController
  ) { }
  ngOnInit() {
  }



  /*log()
 {
 
   this.email=((document.getElementById('email')as HTMLInputElement).value);
   this.password=((document.getElementById('password')as HTMLInputElement).value);
 
  this.auth.log(this.email, this.password)
 .then(async userCredential => {
    if(userCredential.user){
   
     const toast = await this.toastController.create({
       message: 'LOGIN SUCCESSFULL',
     position:'top',
       duration: 2000
     });
     toast.present(); 
  
    this.router.navigateByUrl('/menu');
 
    }
 
   
   })
   .catch(async error => {
     const errorCode = error.code;
     const errorMessage = error.message;
     const toast = await this.toastController.create({
       message: 'ACCESS DENIED.',
       position:'top',
       duration: 2000
     });
     toast.present();
 
   });
 }*/
  log() {
    this.fireService.login({ email: this.user.email, password: this.user.password }).then(res => {
      console.log(res);
      if (res.user.uid) {
        this.fireService.getDetails({ uid: res.user.uid }).subscribe(res => {
          console.log(res);

          window.alert("You are logged in " + res['name']);
         
          this.route.navigateByUrl('/menu');

          //console.log(this.user.username);
          //console.log(this.user.password);


        }, err => {
          console.log(err);
        });
      }
    }, err => {
      window.alert(err.message);
      console.log(err);
    });
  }


  lost() {
    this.route.navigateByUrl('/reset');
  }

}
