import {Component, Input, OnInit, ViewChild} from "@angular/core";
import { Chart } from 'chart.js';
import {TriviaProvider} from "../../providers/trivia/trivia";


@Component({
  selector: 'barchart',
  templateUrl: 'barchart.html'
})
export class BarchartComponent implements OnInit{

  @ViewChild('barCanvas') barCanvas;
  @Input() genres : any;
  barChart: any;
  countGenres: { text: string, count: number }[] = [];
  quizs: string[];
  counts: number[];

  constructor(private triviaS: TriviaProvider) {
  }



  ngOnInit(){
    this.genres.forEach((genreanswered) => {
      const found = this.countGenres.find(item => item.text === genreanswered.category);
      if (found) {
        found.count++;
      } else {
        this.countGenres.push({ text: genreanswered.category, count: 1} );
      }
    });

    var numbers = [];
    var genres = [];

    this.countGenres.forEach((data) => {
      numbers.push(data.count);
      genres.push(data.text);
    });

    console.log(genres);

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: genres,
        datasets: [{
          label: '# of Votes',
          data: numbers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }

    });
  }

}
