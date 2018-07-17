import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { send, Promise } from 'q';
import { sendRequest } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
@Injectable()
export class ChartComponent implements OnInit, AfterViewInit {

  canvas: any;
  ctx: any;
  values: any;
  interval: number;
  myChart: Chart;

  ngAfterViewInit() {
    var xset = this.values['xAxis']
    var yset = this.values['yAxis']
    console.log(xset)
    console.log(yset)
    console.log(this.values)

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: xset,
        datasets: [{
            label: 'Random pairs',
            data: yset,
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
        responsive: true,
        display:true
      }
    });
    
  }
  constructor(private http: HttpClient) {
    this.interval = 1000
  }

  sendY(value: string) {
    return this.http.post('http://localhost:8081/command', {axis: "yAxisCommand", command: value}).toPromise().then((data) => {console.log(data)}).catch((error) => {console.log(error)})
  }

  sendX(value: string) {
    return this.http.post('http://localhost:8081/command', {axis: "xAxisCommand", command: value}).toPromise().then((data) => {console.log(data)}).catch((error) => {console.log(error)})
  }

  ngOnInit() {
    this.values = this.http.get('http://localhost:8081/data');
    
    setInterval(() => {
      this.ngAfterViewInit()
    }, this.interval);
  }
  
  ngOnDestroy() {
    if (this.myChart) {
      clearInterval(this.myChart);
    }
  }

}
