import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user:any;
  public isLoged=false;;

  constructor(private authSvc: AuthService) { }

  async ngOnInit(){
    this.user = await this.authSvc.getCurrentUser();
    if(this.user){
      this.isLoged=true;
    }
  }

}
