import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'erp-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent implements OnInit {

  @Output('delete') deleteModel: EventEmitter<any>= new EventEmitter();
  @Output('cancel') cancelModel: EventEmitter<any>= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    this.deleteModel.emit();
  }

  cancel(){
    this.cancelModel.emit();
  }

}
