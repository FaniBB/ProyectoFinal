import { Component, OnInit } from '@angular/core';
import { ControlService, producto, pedido } from './../base/service/control.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  productoList: producto[];
  carrito: producto[]=[];
  pedidos: pedido[];
  delete: producto;

  constructor(public controlServ: ControlService) { }

  ngOnInit(): void {
    
    this.controlServ.getProducts().snapshotChanges().subscribe(item =>{
      this.productoList=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.productoList.push(x as producto);
      });
    });
    this.controlServ.getPedidos().snapshotChanges().subscribe(item =>{
      this.pedidos=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.pedidos.push(x as pedido);
      });
    });

    setTimeout( () => {
      this.selecDell(this.productoList[0]);
    }, 1000);
    
  }

  addCarrito(key:string){
    console.log("AÑADIENDO::::::::...................");
    for(let x of this.productoList){
      if(x.$key==key){
        this.carrito.push(x); 
      }
    }
    console.log(this.carrito);
  }
  selecDell(prod: producto){
    this.delete=prod;
  }
  dellCarrito(){
    let i=0;
    for(let x of this.carrito){
      if(x.$key==this.delete.$key){
        this.carrito.splice(i,1);
      }else{
        i++;
      }
    }
  }
  vaciarCarrito(){
    this.carrito=[];
  }
  pedido(){
    console.log("HACIENDO PEDIDO");
    let prod: string[]=[];
    for(let x of this.carrito){
      console.log(x.$key);
      prod.push(x.$key);
    }
    this.controlServ.insertPedido(prod);
  }

}
