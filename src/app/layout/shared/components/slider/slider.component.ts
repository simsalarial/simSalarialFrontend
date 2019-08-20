import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() value: number = 12;
  @Input() options: Options = {
    floor: -100,
    ceil: 500,
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      if (value <= 3) {
          return 'red';
      }
      if (value <= 6) {
          return 'orange';
      }
      if (value <= 9) {
          return 'yellow';
      }
      return '#2AE02A';
    }
  };

}
