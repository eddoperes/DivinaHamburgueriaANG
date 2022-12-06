//angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { LoginService } from '../services/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({  
    email: "",
    password: ""
  });

  public emailError : string = "";
  public passwordError : string = "";

  constructor(private loginService: LoginService,
              private localStorageService : LocalStorageService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  public handleSubmit(){  
    this.emailError = "";
    this.passwordError = "";
    if (this.loginForm.valid) {  
      this.loginService.login(this.loginForm.value)
      .subscribe({
        next: (res) => { 
                          this.localStorageService.set("token", res.token); 
                          this.router.navigateByUrl('');
                      },
        error: (error) => { console.log(error) }
      });         
    }
    else {
      if (this.loginForm.get('email')?.errors?.['required'] !== undefined){
        this.emailError= "* o email é requerido.";
      }
      if (this.loginForm.get('password')?.errors?.['required'] !== undefined){
        this.passwordError= "* a senha é requerida.";
      }
    }
  }  

}
