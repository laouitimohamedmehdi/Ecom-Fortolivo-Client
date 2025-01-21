import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmPassword } from '../../shared/Validators/password.validator';
import { EmailValidator } from '../../shared/Validators/validateEmailNotToken.validate';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {

  errors:string;
  registerForm: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder, private emailValidator:EmailValidator) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
      this.registerForm = this.fb.group({
        displayName:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')],[this.emailValidator.ValidateEmailNotToken()]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },{validators:[ConfirmPassword]})
    }

    get _displayName(){
      return this.registerForm.get('displayName');
    }

    get _email() {
      return this.registerForm.get('email');
    }

    get _password() {
      return this.registerForm.get('password');
    }

    get _confirmPassword() {
      return this.registerForm.get('confirmPassword');
    }

    onSubmit(){
      this.accountService.register(this.registerForm.value).subscribe({
        next:(()=>{this.router.navigateByUrl('/shop')}),
        error:(err)=>{this.errors=err.errors}
      })
    }
}
