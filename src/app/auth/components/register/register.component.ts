import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { registerAction } from 'src/app/auth/store/actions'
import { isSubmittingSelector } from 'src/app/auth/store/selector'
import { RegisterRequestInterface } from '../../types/register-request.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitting$ :Observable<boolean>;

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor( private formBuilder: FormBuilder, private store:Store){ }

  ngOnInit(): void { 
    this.initializeValues();
  }

  //NOTE select fuction from rxjs is important
  initializeValues():void{
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  submit(){ 
    const request:RegisterRequestInterface ={
      user: this.registerForm.getRawValue()
    }
    this.store.dispatch(registerAction({request}));
  }

}
