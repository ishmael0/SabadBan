import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HTTPTypes, RequestPlus } from '../../../../../../../Santel/ClientApp/src/app/services/utils';
import { FrontBaseComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends FrontBaseComponent {
  back = false;
  next = true;
  timer = {
    countDown: 0,
    min: 0,
    sec: 0
  }
  phoneForm = this.formBuilder.group({
    PhoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
  });
  smsForm = this.formBuilder.group({
    PhoneNumber: ['', Validators.compose([Validators.minLength(11), Validators.required, Validators.pattern("09[0-9]{9}")])],
    SMSCode: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
    MelliCode: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required, Validators.pattern("[0-9]{10}")])],
  });
  showMelli = false;
  goToPrev() {
    if (this.level == 2) {
      this.back = false;
      this.next = true;
    }
    this.level = this.level - 1;
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
            if (d) {
              this.smsForm.controls['MelliCode'].setValue('0000000000')
              this.showMelli = false;
            }
            else {
              this.smsForm.controls['MelliCode'].setValue('')
              this.showMelli = true;
            }
            this.smsForm.controls['SMSCode'].setValue('');
            this.timer.countDown = 120;
            this.back = false;
            let intervalId = setInterval(() => {
              this.timer.countDown = this.timer.countDown - 1;
              this.timer.min = Math.floor(this.timer.countDown / 60);
              this.timer.sec = this.timer.countDown - this.timer.min * 60;
              if (this.timer.countDown === 0) {
                clearInterval(intervalId);
                this.back = true;
                this.next = false;
              }
              this.cdr.detectChanges();
            }, 1000);

            this.level = 2;
          },
          onError: (m, d) => { }
        }))
      }
    }
    else if (this.level == 2) {
      this.smsForm.markAsDirty();
      if (this.smsForm.valid) {
        await this.http.AddAndTry(new RequestPlus(HTTPTypes.POST, 'account', {
          tokenNeeded: false,
          action: 'verify', formData: this.smsForm.value,
          onSuccess: (m, d) => {
            this.auth.login(d.Token);
            this.ds.load(d)
            this.level = 3;
            this.back = false;
            this.next = false;
          },
          onError: (m, d) => {

          }
        }))
      }
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  isLoading = false;
  level: number = 1;
}
