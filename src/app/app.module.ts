import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
//Firebase
//Loguin y registro
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService} from './auth/service/auth.service';
//base de datos
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ControlService } from './base/service/control.service';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ComprasComponent } from './compras/compras.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductosComponent,
    PedidosComponent,
    ComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthService,
    ControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
