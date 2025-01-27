import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { IAddress } from '../../shared/Models/Address';


@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CdkStepperModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent {

  @Input() checkoutForm:FormGroup;

  constructor(private accountService:AccountService,private toastr:ToastrService) {  }

  saveUserAddress(){
    let _currentAddress = this.checkoutForm.get('addressForm').value;
    this.accountService.updateUserAddress(_currentAddress).subscribe({
      next:((address:IAddress)=>{
        this.toastr.success('Updated Successfully');
        this.checkoutForm.get('addressForm').reset(address);
      
      }),
      error:((err)=>{this.toastr.error(err.message)})
    })
  }

  get _firstName(){
    return this.checkoutForm.get('addressForm.firstName');
  }

  get _lastName(){
    return this.checkoutForm.get('addressForm.lastName');
  }

  get _street(){
    return this.checkoutForm.get('addressForm.street');
  }

  get _city(){
    return this.checkoutForm.get('addressForm.city');
  }

  get _state(){
    return this.checkoutForm.get('addressForm.state');
  }

  get _zipCode(){
    return this.checkoutForm.get('addressForm.zipCode');
  }
}
