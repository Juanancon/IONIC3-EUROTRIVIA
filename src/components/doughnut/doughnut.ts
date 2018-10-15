import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {Subject} from "rxjs";


@Component({
  selector: 'doughnut',
  templateUrl: 'doughnut.html'
})
export class DoughnutComponent implements OnInit {


  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  @Input() result : any;


  constructor() {
    console.log('Hello DoughnutComponent Component');
  }

  ngOnInit() {
    console.log(this.result);
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Correct", "Wrongs"],
        datasets: [{
          label: '# of Votes',
          data: [this.result.corrects, this.result.wrongs],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#FF6384",

          ]
        }]
      }

    });

  }

}
