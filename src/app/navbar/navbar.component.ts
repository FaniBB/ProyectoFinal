import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { ControlService, producto, usuario } from './../base/service/control.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    AuthService
  ]
})
export class NavbarComponent implements OnInit {

  public isAdmin=false;
  public isClient=false;
  public isUser=false;
  public isLogued=false;
  public registroError$:Observable<boolean>;
  public registroError:boolean;
  public user:any;
  public usuariox: usuario;
  public usuariosList: usuario[]=[];

  constructor(private router: Router, private authSvc: AuthService,public controlServ: ControlService) {  }

  async ngOnInit(){
    this.user = await this.authSvc.getCurrentUser();
    this.registroError=this.authSvc.getError();
    if(this.user){
      this.getUser();
    }
  }

  registroForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    pasword: new FormControl(''),
  });
  registroFormAdv = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    pasword: new FormControl(''),
    rango: new FormControl('')
  });
  inicioForm = new FormGroup({
    email: new FormControl(''),
    pasword: new FormControl(''),
  });
  cierreForm = new FormGroup({

  });
  accesForm = new FormGroup({
    color: new FormControl('rgb(151, 20, 10)'),
    size: new FormControl('15'),
    type: new FormControl("'Courier New', Courier, monospace")
  });

  getUser(){
    this.controlServ.usersList.snapshotChanges().forEach(item=>{
      item.forEach(element=>{
        let x = element.payload.toJSON();
        if(x["email"]==this.user.email){
          this.usuariox={
            $key:x["key"],
            email:x["email"],
            nombre:x["nombre"],
            password:x["password"],
            rango:x["rango"]
          }
          if(this.usuariox.rango==1){
            this.isAdmin=true;
          }else if(this.usuariox.rango==2){
            this.isUser=true;
          }else{
            this.isClient=true;
          }
          this.isLogued=true;
          this.controlServ.userActivo=this.usuariox;
        }
      });
    });
  }
  
  onRegister(){
    const {email,nombre,pasword} = this.registroForm.value;
    let usr: usuario={
      $key:"A",
      email:email,
      nombre:nombre,
      password:pasword,
      rango:3
    }
    this.authSvc.register(usr.email,usr.password);
    setTimeout( () => {
      this.registroError=this.authSvc.getError(); 
      if(!this.authSvc.getError()){
        this.authSvc.login(usr.email,usr.password);
        this.controlServ.insertUser(usr);
        window.location.reload();
      }
    }, 500);
  }
  onRegisterPlus(){
    const {email,nombre,pasword,rango} = this.registroFormAdv.value;
    let usr: usuario={
      $key:"A",
      email:email,
      nombre:nombre,
      password:pasword,
      rango:rango
    }
    this.authSvc.register(usr.email,usr.password);
    setTimeout( () => {
      this.registroError=this.authSvc.getError(); 
      if(!this.authSvc.getError()){
        this.authSvc.login(usr.email,usr.password);
        this.controlServ.insertUser(usr);
        window.location.reload();
      }
    }, 500);
  }
  onLogin(){
    const {email,pasword} = this.inicioForm.value;
    this.authSvc.login(email,pasword);

    setTimeout( () => {
      window.location.reload();
    }, 500);
  }
  onLogOut(){
    this.authSvc.logout();
    this.router.navigate(['/home']);
    window.location.reload();
  }
}
