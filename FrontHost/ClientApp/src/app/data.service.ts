import { Injectable } from '@angular/core';
import { getNameOf, timeDiff, timeDiffFromNow } from '../../../../../Santel/ClientApp/src/app/services/utils';

function toTreeHelper(list: any[], key: any, parentKey: any, parentValue: any, condition = (d: any) => true) {
  let temp: any = list.filter(c => c[parentKey] == parentValue && condition).map(c => ({ title: c.Title, key: c.Id, data: c }));
  for (var i = 0; i < temp.length; i++) {
    temp[i].children = toTreeHelper(list, key, parentKey, temp[i].data[key], condition);
    if (temp[i].children.length == 0) {
      temp[i].isLeaf = true;
    } else {
      temp[i].isLeaf = false;
    }
  }
  return temp;
}


@Injectable()
export class DataService {
  ClearAll() {
    //idk
    this.load({ Token: '' }, new Date(), true);
  }

  constructor() {
    //houres
    this.expirations[getNameOf(c => DataService.prototype.Token)] = 1;
    this.expirations[getNameOf(c => DataService.prototype.Invoices)] = 1;
    this.expirations[getNameOf(c => DataService.prototype.Categories)] = 1;
    this.expirations[getNameOf(c => DataService.prototype.Vendee)] = 1;

    //min
    this.refreshInterval[getNameOf(c => DataService.prototype.Token)] = 1;
    this.refreshInterval[getNameOf(c => DataService.prototype.Invoices)] = 1;
    this.refreshInterval[getNameOf(c => DataService.prototype.Categories)] = 1;
    this.refreshInterval[getNameOf(c => DataService.prototype.Vendee)] = 1;
  }
  expirations: any = {}
  refreshInterval: any = {}

  save() {
    this.lastUpdateDates['this'] = new Date();
    localStorage.setItem(DataService.name, JSON.stringify(this))
  }

  lastUpdateDates: any = {};
  firstLoad() {
    let d = JSON.parse(localStorage.getItem(DataService.name)!);
    if (d) {
      this.load({ Invoices: d.Invoices }, d.lastUpdateDates[getNameOf(c => DataService.prototype.Invoices)], false);
      this.load({ Vendee: d.Vendee }, d.lastUpdateDates[getNameOf(c => DataService.prototype.Vendee)], false);
      this.load({ Categories: d.Categories }, d.lastUpdateDates[getNameOf(c => DataService.prototype.Categories)], false);
      this.load({ Token: d.Token }, d.lastUpdateDates[getNameOf(c => DataService.prototype.Token)], false);
    }
  }
  isOkToFetch(prop: string) {
    if (this.lastUpdateDates[prop] && timeDiffFromNow(new Date(this.lastUpdateDates[prop]), 'sec') <  this.refreshInterval[prop] * 60) return false;
    return true;
  }
  isValid(prop: string, time: Date) {
    if (!time) return false;
    if (timeDiffFromNow(new Date(time), 'hour') > this.expirations[prop]) return false;
    return true;
  }
  load(d: Partial<DataService>, time: Date = new Date(), save: boolean = true) {
    let saveFlag = false;
    if (d.Invoices && this.isValid(getNameOf(c => DataService.prototype.Invoices), time)) {
      this.Invoices = d.Invoices
      this.Invoices.forEach(c => {
        c.InvoiceDetailsPrice = c.InvoiceDetails.reduce((p: number, d: any) => p + d.Price, 0)
        c.InvoiceDetailsDiscount = c.InvoiceDetails.reduce((p: number, d: any) => p + d.Discount, 0)
        c.Price = c.InvoiceDetailsPrice - c.InvoiceDetailsDiscount - c.Discount + c.PostCost;
      });
      this.lastUpdateDates[getNameOf(c => DataService.prototype.Invoices)] = time;
      saveFlag = true;
    }
    if (d.Vendee && this.isValid(getNameOf(c => DataService.prototype.Vendee), time)) {
      this.Vendee = d.Vendee;
      this.lastUpdateDates[getNameOf(c => DataService.prototype.Vendee)] = time;
      saveFlag = true;
    }
    if (d.Token != undefined) {
      this.Token = d.Token;
      this.lastUpdateDates[getNameOf(c => DataService.prototype.Token)] = time;
      saveFlag = true;
    }
    if (d.Categories) {
      this.Categories = d.Categories
      this.CategoryNodesAs = toTreeHelper(this.Categories, 'Id', 'ParentCategoryId', null);
      this.lastUpdateDates[getNameOf(c => DataService.prototype.Token)] = time;
      saveFlag = true;
    }
    saveFlag && save && this.save();
  }
  Token: string = '';
  Statics: any = {};
  Invoices: any[] = [];
  Vendee: any = {};
  Categories: any[] = [];
  CategoryNodesAs: any[] = [];
  CategorySearchValue = "";
  selectedMenu = 0;
}
