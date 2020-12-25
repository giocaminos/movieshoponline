import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginadorHijo: any;
  paginas: number[];
  constructor() { }
  desde: number;
  hasta: number;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
   
      this.initPaginator();
    

  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginadorHijo.number - 4), this.paginadorHijo.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginadorHijo.totalPages, this.paginadorHijo.number + 4), 6);

    if (this.paginadorHijo.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginadorHijo.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }


}
