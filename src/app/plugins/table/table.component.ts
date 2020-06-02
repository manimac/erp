import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../../services/export/export.service';
import { data } from './table.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
@Component({
  selector: 'erp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  actualPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) 
  set paginator(value: MatPaginator) {
    this.actualPaginator = value;
  }

  closeResult: string;
  currentPage: number = 1;
  @Input() table: any;
  @Input() selectedTable: any;
  tableData: any;

  displayedColumns: Array<string>;
  public mattabledataSource: MatTableDataSource<any>;
  public displaycolumndefs: any;
  public peopledata;
  currentrowId: any;
  formData: any;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  
  constructor(private modalService: NgbModal, private excel: ExportService, private http: HttpRequestService) {
    
  }

  ngOnInit(): void {
    console.log(new Date());
    this.tableData = this.table.lstData;
    this.displayedColumns = this.table.lstTblColumnConfig.map(c => c.ColumnName);
    let obj1 = { ColumnName: 'Delete' };
    let obj2 = { ColumnName: 'Edit' };
    this.table.lstTblColumnConfig.unshift(obj1);
    this.table.lstTblColumnConfig.unshift(obj2);
    this.displayedColumns.unshift('Delete');
    this.displayedColumns.unshift('Edit');
    console.log(new Date());
    this.table.lstTblColumnConfig.forEach(item => {
      item.cell = (element) => `${element[item.ColumnName]}`;
    });
    console.log(new Date());
    this.displaycolumndefs = this.table.lstTblColumnConfig;
    this.mattabledataSource = new MatTableDataSource<any>();
    // this.mattabledataSource.data = this.tableData;
    this.actualPaginator.pageIndex = Math.ceil(this.tableData.length/this.pageSize) - 1;

 let nextPageData: any[] = [];
 nextPageData = this.tableData.slice((this.actualPaginator.pageSize * this.actualPaginator.pageIndex),(this.actualPaginator.pageSize * (this.actualPaginator.pageIndex + 1)));
 this.mattabledataSource.data = nextPageData;
  }
  ngAfterViewInit(): void {
    this.mattabledataSource.sort = this.sort;
    // this.mattabledataSource.paginator = this.paginator;
  }

  openModel(content, index = null, rowData = null, isRequestNeed = false) {
    if (isRequestNeed) {
      let col = this.table.lstTblColumnConfig.find(element => {
        return (element.IsPrimary == true)
      })
      let recordId = rowData[col.ColumnName];
      this.http.get('/api/home/HasLock?recordId=' + recordId + '&tableId=' + this.selectedTable.id).subscribe(
        (response: any) => {
          if (response) {
            this.http.get('/api/home/AddLock?recordId=' + recordId + '&tableId=' + this.selectedTable.id).subscribe(
              (response: any) => {
              },
              (error: any) => {
              }
            )
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            this.currentrowId = index;
            this.formData = rowData;
          }
        },
        (error: any) => {
          this.modalService.dismissAll();
          console.log(error)
        }
      )
    }
    else {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.currentrowId = index;
      this.formData = rowData;
    }

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

  export() {
    this.excel.exportAsExcelFile(this.tableData, 'Download');
  }

  saveForm(ev) {
    if (ev.form) {
      this.http.post('/api/home/Insert? selectedTableId=' + this.selectedTable.id, ev.form.value).subscribe(
        (response: any) => {
          this.tableData.unshift(ev.form.value);
          this.mattabledataSource.data = this.tableData;
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.modalService.dismissAll();
          console.log(error)
        }
      )
    }

  }

  updateForm(ev) {
    if (ev.form) {
      this.http.post('/api/home/Update? selectedTableId=' + this.selectedTable.id, ev.form.value).subscribe(
        (response: any) => {
          for (let i = 0; i < this.tableData.length; i++) {
            if (i == this.currentrowId) {
              this.tableData[i] = ev.form.value;
            }
          }
          this.mattabledataSource.data = this.tableData;
          this.modalService.dismissAll();
          this.removeLock();
        },
        (error: any) => {
          this.modalService.dismissAll();
          console.log(error)
        }
      )
    }
  }

  cancel() {
    this.modalService.dismissAll();
  }

  delete() {
    this.http.post('/api/home/Delete', this.formData).subscribe(
      (response: any) => {
        this.tableData.splice(this.currentrowId, 1);
        this.mattabledataSource.data = this.tableData;
        this.modalService.dismissAll();
        this.removeLock();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  removeLock() {
    let col = this.table.lstTblColumnConfig.find(element => {
      return (element.IsPrimary == true)
    })
    let recordId = this.formData[col.ColumnName];
    this.http.get('/api/home/HasLock?recordId=' + recordId + '&tableId=' + this.selectedTable.id).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}