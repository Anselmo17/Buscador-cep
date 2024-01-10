import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import { Cep } from './models/cep.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('search') search: any;

  public title = 'app-cep';
  public cepFound!: Cep;
  input = new FormControl('');

  public notFound = false;
  public loading = false;

  constructor(
    private http: HttpClient
  ) {
    this.input.valueChanges.subscribe(valor => {
      let initVariable!: Cep;
      this.cepFound = initVariable;

      if (valor.length < 8) {
        return;
      }

      this.loading = true;

      this.pesquisa(valor).subscribe(cep => {

        this.notFound = false;
        this.loading = false;
        if (cep?.erro) {
          this.notFound = true;
          return;
        }
        this.cepFound = cep;
      });
    }
    );
  }

  pesquisa(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  allowOnlyNumbers(event:any){
    let txt = event.target.value;
    let number = txt.replace(/\D/g,'');
    this.search.value = number;

    console.log('-------------------', this.search.value);
  }

  cepFormated(cep: string) {
    const cepPart1 = cep.substring(0, 5);
    const cepPart2 = cep.substring(5);

    return cep ? cepPart1 + '-' + cepPart2 : '';
  }
}
