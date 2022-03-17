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
    phoneNumber: ['', Validators.compose([Validators.required,Validators.pattern("09(1[0-9]|3[1-9]|2[1-9])[0-9]{8}")])],
  });
  smsForm = this.formBuilder.group({
    phoneNumber: ['0', Validators.required],
    smsCode: ['', [Validators.required, Validators.minLength(10)]]
  });
  ngOnInit(): void {
  }
  isLoading = false;
  level: number = 1;
}
