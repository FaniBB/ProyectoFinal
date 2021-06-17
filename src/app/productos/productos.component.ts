import { Component, OnInit } from '@angular/core';
import { ControlService, producto } from './../base/service/control.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoForm = new FormGroup({
    key: new FormControl('A'),
    name: new FormControl(''),
    imagen: new FormControl(''),
    price: new FormControl(0)
  });
  productoList: producto[];
  edit:string='display:none';
  added:string='';
  editKey='';
  public isLoad=false;

  
  uploadPercent: Observable<number>;    
  urlImage: Observable<string>;

  constructor(public controlServ: ControlService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.isLoad=true;
    this.controlServ.getProducts().snapshotChanges().subscribe(item =>{
      this.productoList=[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.productoList.push(x as producto);
      });
    });
    this.isLoad=false;
  }

  async onChange(e){
    const ID=Math.random().toString(36).substring(2);
    const file=e.target.files[0];
    const filePath='Products/product_'+ID+".jpg";
    const URL=await this.upload(file,filePath);
    this.productoForm.get("imagen").setValue(URL);
  }
  upload(file:any,path:string): Promise<string>{
    return new Promise(resolve =>{
      const ref=this.storage.ref(path);
      const task=ref.put(file);
      task.snapshotChanges().pipe(
        finalize(()=>{
          ref.getDownloadURL().subscribe(res=>{
            resolve(res);
            return;
          });
        })
      ).subscribe();
    });
  }

  onADD(){
      const prod:producto = {
        $key: 'A',
        nombre: this.productoForm.get('name').value,
        imagen: this.productoForm.get('imagen').value,
        precio: this.productoForm.get('price').value
      }
      this.controlServ.insertProduct(prod);
      this.resertForm();
  }
  onEdit(prod: producto){
    this.productoForm.get('name').setValue(prod.nombre);
    this.productoForm.get('imagen').setValue(prod.imagen);
    this.productoForm.get('price').setValue(prod.precio);
    this.editKey=prod.$key;
    this.edit='';
    this.added='display:none';
  }
  onUpdate(){
    const prod:producto = {
    $key: this.editKey,
    nombre: this.productoForm.get('name').value,
    imagen: this.productoForm.get('imagen').value,
    precio: this.productoForm.get('price').value
  }
  this.controlServ.updateProduct(prod);
  this.resertForm();
  }
  onDell(key:string){
    this.editKey=key;
    console.log(this.editKey);
  }
  onDelete(){
    this.controlServ.deleteProduct(this.editKey);
  }

  resertForm(){
    this.productoForm.get('name').setValue('');
    this.productoForm.get('imagen').setValue('');
    this.productoForm.get('color').setValue('');
    this.productoForm.get('price').setValue(0);
  }
  onRestart(){
    this.edit='display:none';
    this.added='';
    this.editKey='';
    this.resertForm();
  }

}
