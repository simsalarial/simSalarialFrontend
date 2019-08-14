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
  selectIRS: string;
  selectSS: string;
  selectTA: string;
  selectBE: string;
  selectVAR: string;
  simFields = new SimulationFields();
  newFieldName: string;
  constructor() { }

  ngOnInit() {
    this.selectSS;
    this.selectTA = '';
    this.selectBE = '';
    this.selectVAR = '';
    this.simFields.name = this.name;
  }

  changeSelect(event, type) {
    if(type == "ss") this.selectSS = event.target.value;
    else if(type == "ta") this.selectTA = event.target.value;
    else if(type == "be") this.selectBE = event.target.value;
    else if(type == "var") this.selectVAR = event.target.value;
  }

  saveField() {
    console.log(this.name);
    console.log(this.simFields);
    this.onClose.emit();
  }

  createNewField(){
    this.simFields.name = this.newFieldName;
  }

  
}
