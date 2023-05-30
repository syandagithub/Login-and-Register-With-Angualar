import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { saveConfig } from '@ionic/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  
/*9sendEmailVerifivation(data: {email: string; password: string ; name: uid: string;})
{
  throw new Error ('');
}*/

constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) { 
}
login(data){
  return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

signup(data){
return this.auth.createUserWithEmailAndPassword(data.email, data.password);
}
saveD(data)
{
  return this.firestore.collection("users").doc(data.uid).set(data);
}
getDetails(data)
{
  return this.firestore.collection('users').doc(data.uid).valueChanges();
}

}