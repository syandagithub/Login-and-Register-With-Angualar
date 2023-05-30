import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
em:any;
  constructor(private auth:AngularFireAuth, private router:Router, public toastController : ToastController ) { }

  ngOnInit() {
  }

 sent()
{
this.em=((document.getElementById('em')as HTMLInputElement).value);

this.auth.sendPasswordResetEmail(this.em)
.then(async ress=>
  {
    const toast = await this.toastController.create({
      message: 'EMAIL IS SENT!.',
    position:'middle',
      duration: 2000
    });
    toast.present();
   
  
})
.catch(async error=>{
  const errorCode = error.code;

  const errorMessage=error.message;
  const toast = await this.toastController.create({
    message: errorMessage,
  position:'top',
    duration: 2000
  });
  toast.present();
});
  
}
back()
{
  this.router.navigateByUrl('/login');
}

}
