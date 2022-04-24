import { Injectable } from '@angular/core';

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
  save() {
    localStorage.setItem(DataService.name, JSON.stringify(this))
  }
  load(d: any = null) {
    if (d == null) {
      d = JSON.parse(localStorage.getItem(DataService.name)!)
    }
    if (d.Invoices) {
      this.Invoices = d.Invoices;
      this.Invoices.forEach(c => {
        c.InvoiceDetailsPrice = c.InvoiceDetails.reduce((p: number, d: any) => p + d.Price, 0)
        c.InvoiceDetailsDiscount = c.InvoiceDetails.reduce((p: number, d: any) => p + d.Discount, 0)
        c.Price = c.InvoiceDetailsPrice - c.InvoiceDetailsDiscount - c.Discount + c.PostCost;
      });
    }
    if (d.Vendee) {
      this.Vendee = d.Vendee;
    }
    this.save();
  }
  Invoices: any[] = [];
  Vendee: any = {};
  CategoryNodes :any[]= [];
  CategoryNodesAs :any[]= [];
  CategorySearchValue = "";
  selectedMenu = 0;
  init(d:any) {
    this.CategoryNodes = d.Categories;
    this.CategoryNodesAs = toTreeHelper(this.CategoryNodes, 'Id', 'ParentCategoryId', null);
    this.save();
  }
}
