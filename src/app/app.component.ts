import { Component } from '@angular/core';
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

  public title = 'app-cep';
  public cepFound!: Cep;
  input = new FormControl('');

  public notFound = false;

  constructor(
    private http: HttpClient
  ) {
    this.input.valueChanges.subscribe(valor => {
      console.log('-------valor--------', valor)
      if (valor.length < 8) return;

      this.pesquisa(valor).subscribe(cep => {

        this.notFound = false;
        if (cep?.erro) {
          let initVariable!: Cep;
          this.cepFound = initVariable;
          this.notFound = true;
          return;
        }
        this.cepFound = cep;
        console.log('----- cep retornado -------', this.cepFound);
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

  cepFormated(cep: string) {
    const cepPart1 = cep.substring(0, 5);
    const cepPart2 = cep.substring(5);

    return cepPart1 + '-' + cepPart2;
  }
}
