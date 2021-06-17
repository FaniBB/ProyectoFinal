import { Component } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Código QR';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value = 'https://www.facebook.com/';
  //

  /*
•	Element Type: Es el tipo de elemento, hay 3 tipos (URL, Imagen, y Canva)
•	Value: Es el valor de nuestro QR Code.
•	cssClass: Si aplicamos CSS, es aquí donde especificamos la clase
•	errorCorrectionLevel: Que nivel de corrección de error esperamos
*/
}


