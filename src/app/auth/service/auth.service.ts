import { first } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public errorA=false;
  public User

  constructor(public afAuth: AngularFireAuth, private router: Router) { }
  getError():boolean{
    return this.errorA;
  }
  async login(email: string, pasword: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, pasword);

    }catch(error){
      console.log(error);
    }
  }
  async register(email: string, pasword: string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email, pasword);
      const result2 = await this.afAuth.signInWithEmailAndPassword(email, pasword);

      this.errorA=false;
    }catch(error){
      this.errorA=true;
    }
  }
  async logout(){
    try{
      await this.afAuth.signOut();
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}


