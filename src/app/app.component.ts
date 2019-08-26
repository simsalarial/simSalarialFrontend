import { Observable } from 'rxjs';
import { Component, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simuladorSalarial';

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {}
}
