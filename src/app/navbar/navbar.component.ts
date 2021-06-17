import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { ControlService, usuario } from './../base/service/control.service';

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
  public isLoad=false;
  public registroError:boolean;
  public loguinError:boolean;
  public user:any;
  public usuariox: usuario;
  public usuariosList: usuario[]=[];

  

  constructor(private router: Router, private authSvc: AuthService,public controlServ: ControlService) {  }

  async ngOnInit(){
    this.isLoad=true;
    this.user = await this.authSvc.getCurrentUser();
    this.registroError=this.authSvc.getErrorA();
    this.loguinError=this.authSvc.getErrorB();
    if(this.user){
      this.getUser();
      let datos:string[]=JSON.parse(localStorage.getItem(this.user.email));
      this.accesForm.get('color').setValue(datos[0]);
      this.accesForm.get('size').setValue(datos[1]);
      this.accesForm.get('type').setValue(datos[2]);
    }
    this.isLoad=false;
  }

  registroForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    direc: new FormControl(''),
    pasword: new FormControl(''),
    pasword2: new FormControl('')
  });
  registroFormAdv = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    direc: new FormControl(''),
    rango: new FormControl(''),
    pasword: new FormControl(''),
    pasword2: new FormControl('')
  });
  inicioForm = new FormGroup({
    email: new FormControl(''),
    pasword: new FormControl(''),
  });
  accesForm = new FormGroup({
    color: new FormControl('rgb(243, 160, 232)'),
    size: new FormControl('15'),
    type: new FormControl("'Courier New', Courier, monospace")
  });
  onChange(){
    console.log("change");
    let datos:string[]=[
      this.accesForm.get('color').value,
      this.accesForm.get('size').value,
      this.accesForm.get('type').value
    ];
    let auxStr:string=JSON.stringify(datos);
    localStorage.setItem(this.user.email,auxStr);
    window.location.reload();
  }

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
            direc:x["direc"],
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
    const {email,nombre,direc,pasword} = this.registroForm.value;
    let usr: usuario={
      $key:"A",
      email:email,
      nombre:nombre,
      password:pasword,
      direc: direc,
      rango:3
    }
    this.authSvc.register(usr.email,usr.password);
    setTimeout( () => {
      this.registroError=this.authSvc.getErrorA(); 
      if(!this.authSvc.getErrorA()){
        this.authSvc.login(usr.email,usr.password);
        this.controlServ.insertUser(usr);
        window.location.reload();
      }
    }, 500);
  }
  onRegisterPlus(){
    const {email,nombre,direc,rango,pasword} = this.registroFormAdv.value;
    let usr: usuario={
      $key:"A",
      email:email,
      nombre:nombre,
      password:pasword,
      direc: direc,
      rango:rango
    }
    this.authSvc.register(usr.email,usr.password);
    setTimeout( () => {
      this.registroError=this.authSvc.getErrorA(); 
      if(!this.authSvc.getErrorA()){
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
      this.loguinError=this.authSvc.getErrorB();
      if(!this.authSvc.getErrorB()){
        window.location.reload();
      }
    }, 500);
  }
  onLogOut(){
    this.authSvc.logout();
    this.router.navigate(['/home']);
    window.location.reload();
  }
}
