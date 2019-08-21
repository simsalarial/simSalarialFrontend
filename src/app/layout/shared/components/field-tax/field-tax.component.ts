import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimulationFields } from 'src/app/core/models/simulationFields';

@Component({
  selector: 'app-field-tax',
  templateUrl: './field-tax.component.html',
  styleUrls: ['./field-tax.component.scss']
})
export class FieldTaxComponent implements OnInit {
  @Input() name:string;
  @Output() onClose = new EventEmitter<any>();
  newField = false;
  simFields = new SimulationFields();
  newFieldName: string;
  constructor() { }

  ngOnInit() {
    this.simFields.name = this.name;
  }

  changeSelect(event, type) {
    if(type == "irs") this.simFields.IRS = event.target.value === 'yesIRS' ? true : false;
    else if(type == "ss") this.simFields.SS = event.target.value === 'yesSS' ? true : false;
    else if(type == "ta") this.simFields.TA = event.target.value === 'yesTA' ? true : false;
    else if(type == "be") this.simFields.BE = event.target.value === 'yesBE' ? true : false;
    else if(type == "var") this.simFields.varComponent = event.target.value === 'yesVAR' ? true : false;
  }

  saveField() {
    console.log(this.name);
    console.log(this.simFields);
    //this.onClose.emit();
  }

  createNewField(){
    this.simFields.name = this.newFieldName;
  }

  
}
