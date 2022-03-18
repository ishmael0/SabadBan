import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  phoneForm = this.formBuilder.group({
    phoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
  });
  smsForm = this.formBuilder.group({
    phoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
    smsCode: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])]
  });
  ngOnInit(): void {
  }
  goToNext() {
    if (this.level == 1) {
      this.phoneForm.markAsDirty();
      if (this.phoneForm.valid) {
        this.smsForm.controls['phoneNumber'].setValue(this.phoneForm.controls['phoneNumber'].value)
        this.smsForm.controls['smsCode'].setValue('');
        this.level = 2;
      }
    }
    else if (this.level == 1) {

    }
  }
  isLoading = false;
  level: number = 1;
}
