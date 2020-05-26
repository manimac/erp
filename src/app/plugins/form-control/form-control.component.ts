import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'erp-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  myFormGroup:FormGroup;
  @Input() formTemplate;
  @Input() formData;
  forms;
  @Output('save') saveForm: EventEmitter<any>= new EventEmitter();
  @Output('cancel') cancelForm: EventEmitter<any>= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    let group={}    
    this.forms = JSON.parse(JSON.stringify(this.formTemplate))
    this.forms = this.forms.filter(element=>(element).ColumnName!='Edit' && element.ColumnName!='Delete')
    this.forms.forEach(input_template=>{
        group[input_template.ColumnName]=new FormControl('');  
    })
    this.myFormGroup = new FormGroup(group);
    if(this.formData){
      this.myFormGroup.patchValue(this.formData);
    }    
  }

  onSubmit(){
    console.log(this.myFormGroup.value);
  }

  checkTextBox(form){
    return (form.DataType==='textBox'||form.DataType==='varchar');
  }
  save(){
    this.saveForm.emit({form: this.myFormGroup});
  }
  cancel(){
    this.cancelForm.emit();
  }
}
