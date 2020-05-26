import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  serverLists: any = [
    {
      id: 1,
      name: 'Server 1'
    },
    {
      id: 2,
      name: 'Server 2'
    },
    {
      id: 1,
      name: 'Server 3'
    }
  ];
  currentServer: number;  

  databaseLists: any = [
    {
      id: 1,
      name: 'Database 1'
    },
    {
      id: 2,
      name: 'Database 2'
    },
    {
      id: 1,
      name: 'Database 3'
    }
  ];
  currentDatabase: number;

  tableLists: any = [
    {
      id: 1,
      name: 'Table 1'
    },
    {
      id: 2,
      name: 'Table 2'
    },
    {
      id: 1,
      name: 'Table 3'
    }
  ];
  currentTable: number;

  constructor() { }

  ngOnInit(): void {
  }

}
