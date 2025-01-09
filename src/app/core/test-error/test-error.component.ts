import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {

  baseUrl: string = environment.apiUrl;
  validationErrors: any;
  constructor(private http: HttpClient) { }

  get400Error() {
    this.http.get(this.baseUrl + 'Bug/bad-request').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'Bug/bad-request/nolink').subscribe({
      next: (next) => console.info(next),
      error: (err) => this.validationErrors = err.errors
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + 'Bug/notfound').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'Bug/server-error').subscribe({
      next: (next) => console.info(next),
      error: (err) => {console.error(err);}
    });
  }
}
