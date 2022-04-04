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


@Injectable({
  providedIn: 'root'
})
export class DataService {
  CategoryNodes :any[]= [];
  CategoryNodesAs :any[]= [];
  CategorySearchValue = "";
  init(d:any) {
    this.CategoryNodes = d.Categories;
    this.CategoryNodesAs = toTreeHelper(this.CategoryNodes, 'Id', 'ParentCategoryId', null);
    console.log(this.CategoryNodesAs)
  }
}
