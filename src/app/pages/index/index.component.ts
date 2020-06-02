import { Component, OnInit } from '@angular/core';
import { serverData } from '../../models/server.model';
import { databaseData } from '../../models/database.model';
import { tableData } from '../../models/table.model';
import { HttpRequestService } from '../../services/http-request/http-request.service';
import { data } from '../../plugins/table/table.model';

@Component({
  selector: 'erp-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  serverLists: any;
  currentServer: number;
  databaseLists: any;
  currentDatabase: number;
  tableLists: any;
  currentTable: number;
  tableDataLists: any;
  loaded = false;

  constructor(private http: HttpRequestService) {
    this.serverLists = serverData;
    this.databaseLists = databaseData;
    this.tableLists = tableData;
    // this.loadServer();
    // this.loadDatabase();
    // this.loadTable();
  }

  ngOnInit(): void {
  }

  loadServer() {
    this.http.get('/api/home/GetServers').subscribe(
      (response: any) => {
        this.serverLists = response;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  loadDatabase() {
    this.http.get('/api/home/GetDatabases?selectedServer=' + this.currentServer).subscribe(
      (response: any) => {
        this.databaseLists = response;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  loadTable() {
    this.http.get('/api/home/GetUserTableList?selectedDatabase=' + this.currentDatabase).subscribe(
      (response: any) => {
        this.tableLists = response;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  select() {
    // this.http.get('test').subscribe(
    //   (response: any)=>{
    //     console.log(response);
    //   },
    //   (error: any)=>{
    //     console.log(error)
    //   }
    // )
  }

  tableLoad() {
    this.tableDataLists = data;
    this.loaded = true;
    // this.http.post('/api/home/GetGenericEntities', this.currentTable).subscribe(
    //   (response: any) => {
    //     this.tableDataLists = response;
    //     this.loaded = true;
    //   },
    //   (error: any) => {
    //     console.log(error)
    //   }
    // )
  }

}
