import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { LineaComponent } from './components/linea/linea.component';
@NgModule({
  declarations: [
    AppComponent,
    LineaComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
