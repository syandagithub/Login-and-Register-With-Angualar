import { Component, OnInit, ViewChild } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  user={}as User;
  name: any;
  surname: any;
  username: any;
  email: any;
  contact: any;
  password: any;



  /*constructor(private router:Router,private auth:AngularFireAuth, public toastController: ToastController) { }*/
  constructor(private route: Router, private activated: ActivatedRoute,
    private toast: ToastController, public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private load: LoadingController, public fireService: FireserviceService) {
    }
  ngOnInit() {
  }
 /* reg(){

    this.email=((document.getElementById("email") as HTMLInputElement).value);
    this.password=((document.getElementById('password') as HTMLInputElement).value);
  
    this.auth.
    createUserWithEmailAndPassword( this.email,this.password)
    .then(async userCredential => {
        
  
      if(userCredential.user){
       const toast = await this.toastController.create({
          duration: 2000,
          message: 'REGISTERED SUCCESSFULL',
        position:'middle'
          
        });
        toast.present(); 
         this.router.navigateByUrl('/login');
      }
      
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const toast = await this.toastController.create({
        duration: 2000,
        message: errorMessage,
      position:'middle'
        
      });
      toast.present(); 
  
    });

}*/
reg(){
  this.fireService.signup({email:this.user.email,password:this.user.password}).then(res=>{
  if(res.user.uid){
  res.user.sendEmailVerification();
  let data = {
  email:this.user.email,
  password:this.user.password,
  name:this.user.username,
  uid:res.user.uid
  };
  this.fireService.saveD(data).then(res=>{
  window.alert('Account Created!');
  
  },err=>{
  console.log(err);
  });
  }
  },err=>{
  window.alert(err.message);
  
  console.log(err);
  });
  }


}
