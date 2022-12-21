//angular
import { Component, OnInit } from '@angular/core';

//data
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  public hasToken(){
    var token = this.localStorageService.get("token");
    if (token !== "")
      return true;
    else
      return false;
  }

  public handleLogout(){
    this.localStorageService.set("token","")
  }

  ngOnInit(): void {
  }

}
