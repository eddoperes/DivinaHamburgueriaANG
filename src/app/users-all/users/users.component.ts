//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { User } from '../../module/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "", 
    email: "",
    password: "",
    type: 1,
    state: 1,
  });

  @Input() sendData: (id: number, user: User | null) => void = () => {};
  @Input() setFormComponent : (formComponent: UsersComponent) => void = () => {};

  public nameError : string = "";
  public emailError : string = "";
  public passwordError : string = "";

  public showPassword: boolean = true;
  public newOrEdit: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFormComponent(this);
  }

  public populateData(item: User){
    this.userForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      email: [item.email],
      password: [item.password],
      type: [item.type],
      state: [item.state],
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.userForm.controls['name'].disable(); 
      this.userForm.controls['email'].disable(); 
      this.userForm.controls['password'].disable(); 
      this.userForm.controls['type'].disable(); 
      this.userForm.controls['state'].disable();  
      this.newOrEdit = false;
    }
    if (!configure.showPassword){
      this.userForm.controls['password'].disable(); 
      this.showPassword = false;
    }
  }

  public isDependecyReady() : boolean{
    //if (this.units.length === 0)
    //  return false;
    return true;
  }

  public handlePersistence(){  

    if (!this.newOrEdit){
      this.sendData(this.userForm.controls['id'].value, 
                    null);
      return;
    }

    var isValid: boolean = true;

    this.nameError = "";
    this.emailError = "";
    this.passwordError = "";

    if (!this.userForm.valid) {     
      if (this.userForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError = "* o nome é requerido.";
      }   
      if (this.userForm.get('email')?.errors?.['required'] !== undefined){
        this.emailError = "* o e-mail é requerido.";
      }  
      if (this.userForm.get('password')?.errors?.['required'] !== undefined){
        this.passwordError = "* a senha é requerida.";
      }  
      if (this.userForm.get('password')?.errors?.['minlength'] !== undefined){
        this.passwordError = "* a senha deve ter pelo menos 8 digitos.";
      } 
      isValid = false;
    }

    if (!isValid){      
      return;
    }

    var user : User = this.userForm.value;
    user.state ? user.state = 1 : user.state = 0;    
    this.sendData(this.userForm.controls['id'].value, 
                  user)

  }  

}

