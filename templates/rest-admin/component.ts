import { Component, OnInit } from '@angular/core';
import { Api } from '@yca/api';
import { IParams } from '@yca/rest-admin';

@Component({
  selector: 'app-<MODEL>',
  templateUrl: './<MODEL>.component.html',
  styleUrls: ['./<MODEL>.component.scss']
})
export class <MODEL_CAPITALIZED>Component implements OnInit {

  params: IParams = {
    api: `${this.api.root}<ENDPOINT>`,
    title: {
      list: '商品字段列表',
      edit: '编辑商品字段'
    },
    rows: 10,
    cols: [
      {
        field: '_id', header: 'ID', style: { 'text-align': 'center', 'overflow': 'visible', 'width': '280px' },
        display: { type: 'text' },
        filter: {
          placeholder: 'Input ID',
          type: 'text',
          mode: 'id'
        },
        editor: { type: 'text', disabled: true }
      },
      {
        field: 'name', header: 'Name', style: { 'text-align': 'center', 'width': '200px' },
        filter: {
          placeholder: 'Input Name',
          type: 'text',
          mode: 'startsWith'
        },
        editor: { type: 'text' }
      },
    ]
  }
  constructor(
    private api: Api
  ) { }

  ngOnInit() {
  }

}
