import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare-sim',
  templateUrl: './compare-sim.component.html',
  styleUrls: ['./compare-sim.component.scss']
})
export class CompareSimComponent implements OnInit {
  @Input() simulations: any;
  constructor() { }

  ngOnInit() {
    
  }

}
