import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ComprasComponent } from './compras/compras.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ContactoComponent } from './contacto/contacto.component';

import { AngularFireStorageModule } from '@angular/fire/storage';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'preguntas', component: PreguntasComponent},
  {path: 'userPage', component: UserPageComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularFireStorageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
