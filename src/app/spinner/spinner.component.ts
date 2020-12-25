import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from '../servicios/spinner.service';

@Component({
  selector: 'mi-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  isLoading: Subject<boolean> = this.spinnerService.isLoading;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
