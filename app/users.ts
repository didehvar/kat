import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/');
    });
  }

  activate() {
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}
