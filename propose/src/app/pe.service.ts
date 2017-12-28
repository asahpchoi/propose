import { Component, OnInit,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import {Observable} from 'rxjs';

@Injectable()
export class PeService {

  constructor(
    private http: HttpClient
  ) {
  }

  getSchema() {
    let code = 'RE100';
    let url = `https://product-engine-nodejs.herokuapp.com/api/v1/product/readSchema/${code}/01`;
    console.log(url);
    this.http.get(url)
    .first()
    .subscribe(data => {
      console.log(data);
    });
  }

  getRow(columns, colName) {
      return [colName, ...columns.filter(x => x.Name == colName)[0].Values.map(x => x.value)];
  }

  getProjection: Observable<any>(
    input
  )
  {
      let dataSet = [];
      let url = 'https://product-engine-nodejs.herokuapp.com/api/v1/product/project';

      let params = {
          "reference": "",
          "policyYearDate": "20170228024534",
          "policyExcludeSOS": "Y",
          "sortRider": "Y",
          "channel": "BANK",
          "coverageInfo": {
            "product": {
              "productKey": {
                "primaryProduct": {
                  "productPK": {
                    "productId": input.productId
                  }
                },
                "associateProduct": {
                  "productPK": {
                    "productId": "--"
                  }
                },
                "basicProduct": {
                  "productPK": {
                    "productId": "--"
                  }
                },
                "valueDate": "20170228024534",
                "location": "PH"
              }
            },
            "currency": {
              "currencyPK": {
                "currencyId": "PHP"
              }
            },
            "faceAmount": input.faceAmount,
            "options": {
              "billingMethod": "SINGLE",
              "dbLevel": "Increase",
              "paymentMode": "A",
              "fundWithdrawalsByPercentage": "Y",
              "calculateSinglePremiumBand": "Y"
            },
            "otherOptions": null,
            "startAnnuityAge": "0",
            "parties": {
              "party": {
                "insuredId": "aaa aaa",
                "insuredAge": input.age,
                "insuredSex": input.gender,
                "smokingStatus": "ST",
                "type": "BASIC"
              }
            },
            "extraRating": {
              "flatExtra": "0.0",
              "percentageExtra": "1.0",
              "tempFlat": "0.0",
              "tempFlatDuration": "0",
              "tempPercentage": "0.0",
              "tempPercentageDuration": "0"
            },
            "band": "0",
            "ipoLayer": "0",
            "noOfInstallmentYear": "0",
            "prepayYear": "0",
            "withdrawPercent": "0.0",
            "plannedPremium": "0.0",
            "compropPremium": "0.0",
            "refundPremium": "0.0",
            "topUpPremium": "0.0",
            "initialDumpIn": "100000.0",
            "basicIncreasingPremiumPercentage": "0.0",
            "topUpIncreasingPremiumPercentage": "0.0",
            "fundInt": "5.0",
            "fixedAmount": "0",
            "dividendWithdrawals": ""
          },
          "riders": null,
          "funds": {
            "fundRecord": [
              {
                "allocation": "60.00",
                "returnRate": "4.0000",
                "returnRateMedium": "8.0000",
                "returnRateHigh": "10.0000",
                "guaranteedPercentage": "0.0000",
                "targetPayoutRate": "0.0000",
                "_code": "SECURE"
              },
              {
                "allocation": "40.00",
                "returnRate": "4.0000",
                "returnRateMedium": "8.0000",
                "returnRateHigh": "10.0000",
                "guaranteedPercentage": "0.0000",
                "targetPayoutRate": "0.0000",
                "_code": "DIVERSIFIED"
              }
            ]
          },
          "fundActivities": {
            "fundActivity": [
              {
                "attainAge": "40",
                "topupPremium": "20000.0",
                "withdrawal": "10000.0"
              },
              {
                "attainAge": "41",
                "topupPremium": "20000.0",
                "withdrawal": "10000.0"
              },
              {
                "attainAge": "42",
                "topupPremium": "20000.0",
                "withdrawal": "10000.0"
              },
              {
                "attainAge": "43",
                "topupPremium": "20000.0",
                "withdrawal": "10000.0"
              },
              {
                "attainAge": "44",
                "withdrawal": "10000.0"
              },
              {
                "attainAge": "45",
                "withdrawal": "10000.0"
              }
            ]
          }
        }

      return this.http.post(url, params)

     .map(
        data => {
          let row = this.getRow((<any>data).projections[0].columns, 'Age');
          dataSet.push(row);
          row = this.getRow((<any>data).projections[0].columns, 'Account Value (LOW)');
          dataSet.push(row);
          row = this.getRow((<any>data).projections[0].columns, 'Account Value (HIGH)');
          dataSet.push(row);

          return dataSet;
        }
      );
  }


}
