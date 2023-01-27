//angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { User } from 'src/app/module/user';
import { UsersService } from 'src/app/services/users.service';

//form
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  constructor(private usersService: UsersService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public userFetch: boolean = false;
  public userError: any = null;
  public userWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: UsersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.userFetch && 
          this.userError === null){
        this.userWaiting = true;  
      }        
    }, 1000);    
    this.usersService.userById(id!).subscribe({
      next: (res) => {
        this.userFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
          showPassword: false,
        }
        this.formComponent!.populateConfig(configure);
        this.userWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.userError = error;
          this.userWaiting = false;
        },
    }); 

  }

  public setFormComponent(formComponent: UsersComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, user: User | null):void{
    
    this.usersService
        .userEdit(id, JSON.stringify(user))    
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

