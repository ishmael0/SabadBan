import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HTTPTypes, RequestPlus } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { FrontBaseComponent } from '../layout/layout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends FrontBaseComponent {


  phoneForm = this.formBuilder.group({
    PhoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
  });
  smsForm = this.formBuilder.group({
    PhoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
    smsCode: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])]
  });
  ngOnInit(): void {
  }
  async goToNext() {
    if (this.isLoading) return;
    this.isLoading = true;
    if (this.level == 1) {
      this.phoneForm.markAsDirty();
      if (this.phoneForm.valid) {
        await this.http.AddAndTry(new RequestPlus(HTTPTypes.POST, 'account', {
          tokenNeeded: false,
          action: 'login', formData: this.phoneForm.value,
          onSuccess: (m, d) => {
            this.smsForm.controls['PhoneNumber'].setValue(this.phoneForm.controls['PhoneNumber'].value)
            this.smsForm.controls['SMSCode'].setValue('');
            this.level = 2;
          },
          onError: (m, d) => { }
        }))


         

      }
    }
    else if (this.level == 1) {

    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  isLoading = false;
  level: number = 1;
}
