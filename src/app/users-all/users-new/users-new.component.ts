//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { User } from 'src/app/module/user';
import { UsersService } from 'src/app/services/users.service';

//form
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-user-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: UsersComponent){    
    var configure:any = {
      disableInputs: false,
      showPassword: true,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, user: User | null):void{
    
    this.usersService
        .userNew(id, JSON.stringify(user))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('users')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}