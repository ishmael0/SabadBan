import { Injectable, Inject, Optional} from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HTTPStatusCodes, HTTPTypes, NZNotificationTypes, RequestPlus, ResponsePlus } from '../../../../../Santel/ClientApp/src/app/services/utils';
import { VendeeAuthService } from './vendee/vendee-auth';

 

@Injectable({ providedIn:'root' })
export class HttpRequestService extends HttpClient {
  public apiPrefix = "/api/";
  constructor(
    handler: HttpHandler,
    public auth: VendeeAuthService,
    public ns: NzNotificationService
  //    @Inject('wsAuthKey') @Optional() public wsAuthKey?: string
  ) {
    super(handler);
  }
  getHeader() {
    let headers: HttpHeaders;
    let token: string = this.auth.token;
    headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + token
      }
    );
    return { headers: headers };
  }
  createNotification(type: NZNotificationTypes, title: string, contents: string | string[], nzPlacement: any = 'bottomLeft'): void {
    let all = [];
    if (Array.isArray(contents)) {
      all = contents as string[];
    }
    else {
      all.push(contents as string)
    }
    all.forEach(content =>
      this.ns.create(
        type,
        title,
        content,
        //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
        { nzPlacement: nzPlacement, nzDuration: 1000 }
      )
    )
  }
  buildRequest(req: RequestPlus) {
    if (req.observable) return;
    if (req.type === HTTPTypes.DELETE) {
      let h: any = (req.tokenNeeded ? this.getHeader() : {});
      h.body = req.formData;
      req.observable = this.delete(req.getURL(this.apiPrefix), h);
    }
    else if (req.type === HTTPTypes.GET) {
      req.observable = this.get(req.getURL(this.apiPrefix), (req.tokenNeeded ? this.getHeader() : {}));
    }
    else if (req.type === HTTPTypes.POST) {
      req.observable = this.post(req.getURL(this.apiPrefix), req.formData, (req.tokenNeeded ? this.getHeader() : {}));
    }
  }
  async AddAndTry(req: RequestPlus) {
    if (req.tokenNeeded && !this.auth.isLoggedIn()) {
      this.auth.logOut();
      return null;
    }
    this.buildRequest(req);
    return await this.try(req);
  }
  handleError(e: ResponsePlus) {

    if (e && e.StatusCode) {
      if (e.StatusCode === HTTPStatusCodes.Unauthorized) {
        this.auth.logOut();
      }
      else if (e.Message && e.Message.length > 0)
      {
        e.Message.
          forEach(c => {
            this.ns.create(
              NZNotificationTypes.error,
              'خطا',
              c,
              //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
              { nzPlacement: 'topRight', nzDuration: 1000 }
            )
          });
      }
      else if (e.StatusCode === HTTPStatusCodes.NotFound) {
        this.ns.create(
          NZNotificationTypes.error,
          'خطا',
          "مشکلی در اتصال به اینترنت پیش آمده است",
          //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
          { nzPlacement: 'topRight', nzDuration: 1000 }
        );
      }
      else if (e.StatusCode === HTTPStatusCodes.Forbidden) {
        this.ns.create(
          NZNotificationTypes.error,
          'خطا',
          "دسترسی غیر مجاز",
          { nzPlacement: 'topRight', nzDuration: 1000 }
        );
      }
    }
    else {
      this.ns.create(
        NZNotificationTypes.error,
        'خطا',
        "مشکل نامشخصی رخ داده است",
        { nzPlacement: 'topRight', nzDuration: 1000 }
      );
    }
  }
  public async try(req: RequestPlus) {
    this.buildRequest(req);
    await req.observable.toPromise().then((r: any) => {
      var response = r as ResponsePlus;
      if (response && response.StatusCode === HTTPStatusCodes.OK) {
        if (req.onSuccess) {
          req.onSuccess(response.Message, response.Data);
        }
      }
      else if (response.StatusCode !== HTTPStatusCodes.OK) {
        req.onError(response.Message, response.Data);
        this.handleError(response)
      }
      else {
        throw new Error();
      }
    }).catch((error: any) => {
      if (req.onError) {
        req.onError((error?.error?.message ?? ""), error?.error?.data ?? null);
      }
      error.StatusCode = error.status;
      this.handleError(error);

    });
  }
}
