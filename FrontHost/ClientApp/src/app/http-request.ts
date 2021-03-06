import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HTTPStatusCodes, HTTPTypes, NZNotificationTypes, RequestPlus, ResponsePlus, sleep } from '../../../../../Santel/ClientApp/src/app/services/utils';
import { VendeeAuthService } from './vendee/vendee-auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
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
    headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + this.auth.ds.Token
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
    try {
      this.loading.next(true);
      if (req.tokenNeeded && !this.auth.isLoggedIn()) {
        this.auth.logOut();
        return null;
      }
      this.buildRequest(req);
      return await this.try(req);
    } catch (e) {

    }
    finally {
      await sleep(1000);
      this.loading.next(false);
    }
  }
  public loading = new BehaviorSubject<boolean>(false);

  handleError(e: ResponsePlus) {
    if (e && e.StatusCode) {
      if (e.StatusCode === HTTPStatusCodes.Unauthorized) {
        this.auth.logOut();
      }
      else if (e.Message && e.Message.length > 0) {
        e.Message.
          forEach(c => {
            this.ns.create(
              NZNotificationTypes.error,
              '??????',
              c,
              //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
              { nzPlacement: 'topRight', nzDuration: 1000 }
            )
          });
      }
      else if (e.StatusCode === HTTPStatusCodes.NotFound) {
        this.ns.create(
          NZNotificationTypes.error,
          '??????',
          "?????????? ???? ?????????? ???? ?????????????? ?????? ???????? ??????",
          //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
          { nzPlacement: 'topRight', nzDuration: 1000 }
        );
      }
      else if (e.StatusCode === HTTPStatusCodes.Forbidden) {
        this.ns.create(
          NZNotificationTypes.error,
          '??????',
          "???????????? ?????? ????????",
          { nzPlacement: 'topRight', nzDuration: 1000 }
        );
      }
    }
    else {
      this.ns.create(
        NZNotificationTypes.error,
        '??????',
        "???????? ?????????????? ???? ???????? ??????",
        { nzPlacement: 'topRight', nzDuration: 1000 }
      );
    }
  }
  public async try(req: RequestPlus) {
    this.buildRequest(req);
    await req.observable.toPromise().then((r: any) => {
      var response = r as ResponsePlus;
      if (response && response.StatusCode === HTTPStatusCodes.OK) {
        if (req.defaultMessageNotification?.length == 2) {
          this.ns.create(
            NZNotificationTypes.success,
            '????????',
            req.defaultMessageNotification[0],
            //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
            { nzPlacement: 'topRight', nzDuration: 1000 }
          )

        }

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
      if (req.defaultMessageNotification?.length == 2) {
        this.ns.create(
          NZNotificationTypes.error,
          '??????',
          req.defaultMessageNotification[1],
          //'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
          { nzPlacement: 'topRight', nzDuration: 1000 }
        )
      }
      if (req.onError) {
        req.onError((error?.error?.message ?? ""), error?.error?.data ?? null);
      }
      error.StatusCode = error.status;
      this.handleError(error);

    });
  }

}
