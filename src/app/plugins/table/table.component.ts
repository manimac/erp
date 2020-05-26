import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../../services/export/export.service';
import { data } from './table.model';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'erp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  closeResult: string;
  currentPage: number = 1;  
  table: any = data;
  tableData: any = [
    {
      Id: 1,
      SourceDate: 2,
      Status: 'Inprogress',
      IsReady: true,
      Notes: 'Test note',
      SourceName: 'Test source',
      AccountNumber: 1234,
      ClassificationCode: 12345,
      AccountOpenDate: 'Apr 26, 2019',
      Currency: 'INR',
      HoldingID: 3
    },
    {
      Id: 2,
      SourceDate: 2,
      Status: 'Completed',
      IsReady: true,
      Notes: 'Test note',
      SourceName: 'Test source',
      AccountNumber: 1234,
      ClassificationCode: 12345,
      AccountOpenDate: 'Apr 26, 2019',
      Currency: 'INR',
      HoldingID: 3
    },
    {
      Id: 3,
      SourceDate: 2,
      Status: 'Delivered',
      IsReady: true,
      Notes: 'Test note',
      SourceName: 'Test source',
      AccountNumber: 1234,
      ClassificationCode: 12345,
      AccountOpenDate: 'Apr 26, 2019',
      Currency: 'INR',
      HoldingID: 3
    }
  ];
  
  displayedColumns: Array<string> = this.table.ColumnDefinition.map(c => c.ColumnName);
  public mattabledataSource:  MatTableDataSource<any>;
  public displaycolumndefs: any;
  public peopledata;
  currentrowId: any;
  formData: any;
  
  constructor(private modalService: NgbModal, private excel: ExportService) {
    let obj1 = {ColumnName: 'Delete'};
    let obj2 = {ColumnName: 'Edit'};
    this.table.ColumnDefinition.unshift(obj1);
    this.table.ColumnDefinition.unshift(obj2);
    this.displayedColumns.unshift('Delete');
    this.displayedColumns.unshift('Edit');    
    this.table.ColumnDefinition.forEach(item => {
      item.cell = (element)=>`${element[item.ColumnName]}`;    
    });
    this.displaycolumndefs = this.table.ColumnDefinition;
    this.mattabledataSource = new MatTableDataSource<any>();
    this.mattabledataSource.data =this.tableData;
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mattabledataSource.sort = this.sort;
  }

  openModel(content, index=null, rowData=null) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.currentrowId = index;
    this.formData = rowData;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  export(){
    this.excel.exportAsExcelFile(this.tableData, 'Download');
  }

  saveForm(ev){
    if(ev.form){
      this.tableData.push(ev.form.value);
      this.mattabledataSource.data = this.tableData;
    }
    this.modalService.dismissAll();
  }

  updateForm(ev){
    if(ev.form){
      for(let i = 0;i < this.tableData.length;i++){
        if(i==this.currentrowId){
          this.tableData[i] = ev.form.value;
        }
      }
      this.mattabledataSource.data = this.tableData;
    }
    this.modalService.dismissAll();
  }

  cancel(){
    this.modalService.dismissAll();
  }

  delete(){
    this.tableData.splice(this.currentrowId, 1);
    this.mattabledataSource.data = this.tableData;
    this.modalService.dismissAll(); 
  }

}