import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';

import { State } from 'src/app/common/state';
import { FormService } from 'src/app/services/form.service';
import { Customvalidator } from 'src/app/validators/customvalidator';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  startMonth: number;
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(private formBuilder: FormBuilder,
              private formService: FormService) { }

  ngOnInit(): void {

   
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName : new FormControl('',
        [Validators.required, 
         Validators.minLength(2), 
         Customvalidator.notOnlyWhitespace]
        ),
        'lastName': new FormControl('',
        [Validators.required, Validators.minLength(2), Customvalidator.notOnlyWhitespace]
        ),
        'email': new FormControl('',
        [Validators.required, 
         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        )
      }),  
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.startMonth = new Date().getMonth() + 1;
    console.log("startMonth: "+this.startMonth);
    this.formService.getCreditCardMonths(this.startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+ JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
    
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
    
  }

  onSubmit(){

    console.log(this.checkoutFormGroup.get('customer').value);
    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
     
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //let startMonth: number;
    if(currentYear == selectedYear){
      this.startMonth = new Date().getMonth() + 1;
    }
    else {
      this.startMonth = 1;
    }

    this.formService.getCreditCardMonths(this.startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  getStates(formGroupName : string){

    const formGroup = this.checkoutFormGroup.get(formGroupName)
    const countryCode = formGroup.value.country.code;

    this.formService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName == 'shippingAddress')
        this.shippingAddressStates = data;
        else
        this.billingAddressStates = data;
        formGroup.get('state').setValue(data[0]);
      }
    );

       
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }


}
