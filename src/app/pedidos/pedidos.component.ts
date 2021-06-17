import { Component, OnInit } from '@angular/core';
import { ControlService, producto, pedido, usuario} from './../base/service/control.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  productoList: producto[]=[];
  pedidos: pedido[]=[];
  usuarios: usuario[]=[];
  pedidosList: pedidoCompleto[]=[];
  completPed: pedidoCompleto;

  constructor(public controlServ: ControlService) { }

  async ngOnInit(){
    await this.controlServ.getProducts().snapshotChanges().subscribe(item =>{
      this.productoList=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.productoList.push(x as producto);
      });
    });
    await this.controlServ.getUsers().snapshotChanges().subscribe(item =>{
      this.usuarios=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.usuarios.push(x as usuario);
      });
    });
    await this.controlServ.getPedidos().snapshotChanges().subscribe(item =>{
      this.pedidos=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.pedidos.push(x as pedido);
      });
    });
    for(let x of this.pedidos){
      this.pedidosList.push(this.getPedido(x));
    }
    this.onComplet(this.pedidosList[0]);
      
      for(let x of this.pedidosList){
        console.log("pedidos");
      }
    
  }

  getPedido(ped:pedido): pedidoCompleto{
    let user:usuario;
    let prod:producto[]=[];
    let costo:number=0;

    console.log(ped.productos[1]?true:false);
    let x=0;
    while(ped.productos[x]){
      for(let y of this.productoList){
        if(ped.productos[x]==y.$key){
          costo+=y.precio;
          prod.push(y);
        }
      }
      x++;
    }
    
    for(let x of this.usuarios){
      if(x.email==ped.usuarioMail){
        user=x;
      }
    }
    const pedidoC: pedidoCompleto={
      key: ped.$key,
      usuario: user,
      productos: prod,
      costoTotal: costo
    }
    return pedidoC;
  }

  complet(key: string){
    this.controlServ.deletePedido(key);
    window.location.reload();
  }
  onComplet(ped: pedidoCompleto){
    this. completPed=ped;
  }

}
export interface pedidoCompleto{
  key: string;
  usuario: usuario;
  productos: producto[];
  costoTotal: number;
}
