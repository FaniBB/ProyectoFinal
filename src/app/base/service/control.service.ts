import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  
  productList: AngularFireList<any>;
  usersList: AngularFireList<any>;
  pedidosLis:  AngularFireList<any>;
  productSelect: producto;
  userActivo: usuario;
  

  constructor(private firebase: AngularFireDatabase) { 
    this.productList=this.getProducts();
    this.usersList=this.getUsers();
    this.pedidosLis=this.getPedidos();
  }

  getPedidos(){
    return this.firebase.list('Pedidos');
  }
  insertPedido(prod:string[]){
    console.log("PEDIDO HECHO");
    this.pedidosLis.push({
      usuarioMail:this.userActivo.email,
      productos:prod
    })
  }
  deletePedido(key: string){
    this.pedidosLis.remove(key);
  }
  
  getUsers(){
    return this.firebase.list('Users');
  }
  insertUser(usr:usuario){
    
    this.usersList.push({
      email: usr.email,
      nombre: usr.nombre,
      password: usr.password,
      rango: usr.rango
    })
  }
  updateUser(usr:usuario){
    this.usersList.update(usr.$key,{
      email: usr.email,
      nombre: usr.nombre,
      password: usr.password,
      rango: usr.rango
    });
  }
  deleteUser(key: string){
    this.usersList.remove(key);
  }

  getProducts(){
    return this.productList=this.firebase.list('products');
  }
  insertProduct(prod: producto){
    this.productList.push({
      nombre: prod.nombre,
      imagen: prod.imagen,
      precio: prod.precio
    })
  }

  updateProduct(prod: producto){
    this.productList.update(prod.$key,{
      nombre: prod.nombre,
      imagen: prod.imagen,
      precio: prod.precio
    });
  }

  deleteProduct(key: string){
    this.productList.remove(key);
  }

}

export interface producto{
  $key: string;
  nombre: string;
  imagen: string,
  precio: number;
}
export interface usuario{
  $key: string;
  email: string;
  nombre: string;
  password: string;
  rango: number;
}
export interface pedido{
  $key:string;
  usuarioMail:string;
  productos:string[];
}