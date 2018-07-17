import { Component, Input, OnInit } from '@angular/core';
import { send } from 'q';
import { sendRequest } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})

@Injectable()
export class ConfigurationComponent implements OnInit {

  @Input()
  interval: number;

  constructor(private http: HttpClient) { }

  setInterval() {
    var input = document.getElementById('interval-input') as any;
    this.interval = input.value;
    return this.http.post('http://localhost:8081/interval', {interval: this.interval}).toPromise().then((data) => {console.log(data)}).catch((error) => {console.log(error)})
  }

  ngOnInit() {
  }

}
