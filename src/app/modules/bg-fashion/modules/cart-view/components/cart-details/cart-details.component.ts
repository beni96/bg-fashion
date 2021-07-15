import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartDetails } from 'src/app/common/interfaces/cart-details';
import { getFormErrorMessages } from 'src/app/modules/bg-fashion/common/utils';

type FIELD_NAME_TYPE = 'name' | 'email' | 'phone' | 'address' | 'notes';

const ERRORS_MESSAGES = {
  email: { pattern: 'Invalid email' },
  phone: { pattern: 'Invalid phone' },
};

const EMAIL_FORMAT = '^[\\w]+(([\\w-+\\.]+[\\w])*)+@([\\w-]+\\.)+[\\w-]+[\\w-]*$';
const PHONE_FORMAT = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  form: FormGroup;
  formControls: { [key: string]: FormControl };
  fieldNames: FIELD_NAME_TYPE[] = ['name', 'email', 'phone', 'address', 'notes'];
  errorMessages: { [key: string]: string } = {};

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.generateControls();
    this.form = this.formbuilder.group(this.formControls);
  }

  generateControls() {
    this.formControls = {
      name: this.formbuilder.control('', Validators.required),
      email: this.formbuilder.control('', [Validators.required, Validators.pattern(EMAIL_FORMAT)]),
      phone: this.formbuilder.control('', [Validators.required, Validators.pattern(PHONE_FORMAT)]),
      address: this.formbuilder.control('', [Validators.required]),
      notes: this.formbuilder.control('', []),
    };
  }

  validateForm(): boolean {
    this.errorMessages = getFormErrorMessages(this.fieldNames, this.formControls, ERRORS_MESSAGES);

    return this.form.valid;
  }

  getCartDetailsValues(): Partial<CartDetails> {
    const fields = {};
    this.fieldNames.forEach((fieldsName) => (fields[fieldsName] = this.formControls[fieldsName].value));
    return fields;
  }
}
