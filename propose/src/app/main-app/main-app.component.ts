import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import * as c3 from 'c3';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  faceAmount = 150000;
  gender='M';
  age=30;
  dataSource
  displayedColumns;// = ['position', 'name', 'weight', 'symbol'];


  chart;
  constructor(private pe:PeService) {
  }

  ngOnInit() {
    this.change();
  }

  change() {
    this.pe.getProjection({
      productId: 'US789',
      faceAmount: this.faceAmount,
      age: this.age,
      gender: this.gender,
    }).subscribe(data => {
      //console.log(data);
      //this.displayedColumns = data.map(d=>d[0]);
      let ds = [];
      data.forEach(
        d => {
          if(d[0] == "Age") {
            this.displayedColumns = d;
          }
          else {
            let rs = {};
            d.forEach(
              (r, i)=> {
                console.log(r, i)
                rs[i] = r;
                //this.displayedColumns.push(i)
              }
            );
            ds.push(rs);
          }
        }
      );

      this.dataSource = new MatTableDataSource(ds);

      let chartData = data;//.filter(x => x[0] != 'Age');
      //console.log(;

      //console.log(data.map((d, i) => d));
      //this.dataSource = new MatTableDataSource();
      if(!this.chart) {
        this.chart = c3.generate({
        bindto: '#chart',
            data: {
                x: 'Age',
                columns: chartData
            }
        });
      } else {
        this.chart.load(
          {x:'Age',
            columns: chartData}
        )
      }
    })
  }

  getSchema() {

  }


}
