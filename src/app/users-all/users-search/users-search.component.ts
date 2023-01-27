//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { User } from '../../module/user';
import { UsersService } from 'src/app/services/users.service';

//search
import { UserFilter } from 'src/app/module/userFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {

  public filter: UserFilter = {
    name: '',
    nameDisabled: false
  }

  public users: Array<User> = [];
  public hasUsersAnswer: boolean = false;
  public usersError: any = null;
  public usersWaiting: boolean = false;

  constructor(private usersService: UsersService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    if (this.localStorageService.get("nameUserDisabled") === ""){
      this.filter.nameDisabled = true;
      return; 
    }

    this.filter.name = this.localStorageService.get("nameUser");
    this.filter.nameDisabled = this.localStorageService.get("nameUserDisabled");
   
    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = this.filter.name;

    this.executeSubmit(name);

  }

  public nameSpecificChange( event: any){
    this.filter.nameDisabled = false;
  }

  public nameAnyChange( event: any){
    this.filter.nameDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("nameUser", this.filter.name);
    this.localStorageService.set("nameUserDisabled", this.filter.nameDisabled);

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = form.value.name;

    this.executeSubmit(name);
    
  }

  private executeSubmit(name: string){

    this.hasUsersAnswer = false;
    setTimeout(() => {
      if (!this.hasUsersAnswer){
        this.usersWaiting = true; 
      }        
    }, 1000); 

    this.usersService.usersByName(name).subscribe({
      next: (res) => {
                        this.users = res;
                        this.usersWaiting = false;
                        this.hasUsersAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.usersError = error;
                          this.usersWaiting = false;
                          this.hasUsersAnswer = true;
                        },
    }); 

  }

}
