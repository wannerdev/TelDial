import { Component, OnInit } from '@angular/core';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { PricePrefixPair, Operator } from '../../model/operator/operator.interfaces';
import { operatorA, operatorB } from '../../model/operator/operator.pricelists';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})

export class OperatorComponent implements OnInit {

  operators: Operator[];
  showOp: boolean;

  constructor() {
  }

  ngOnInit() {
    this.showOp = false;
	
	// Random fact
    // In a certain part of germany beer is considered as an essential food by law and therefore the
    // employer can't forbid it at the workplace.
	
    // get the operator data from the model
    this.operators = [{
      pplist: operatorA,
      name: 'OperatorA'
    }, {
      pplist: operatorB,
      name: 'OperatorB'
    }
    ];
  }

  onClick() {
    this.showOp = !this.showOp;
  }

}
