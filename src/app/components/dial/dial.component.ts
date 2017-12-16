import { Component, OnInit, Input } from '@angular/core';
import { PricePrefixPair, Operator } from '../../model/operator/operator.interfaces';
import { operatorA } from '../../model/operator/operator.pricelists';

@Component({
  selector: 'app-dial',
  templateUrl: './dial.component.html',
  styleUrls: ['./dial.component.css']
})
export class DialComponent implements OnInit {
  showPrice: boolean;
  showWarn: boolean;
  disableBtn: boolean;
  phonenumber: number;;
  cheapest: number;
  validHint: string;

  @Input() operators: Operator[];

  cheapestOp: Operator;

  constructor() {
  }

  ngOnInit() {
    // flags
    this.showWarn = true;
    this.showPrice = false;
    this.disableBtn = true;
    console.log(this.operators);

  }

  validateNumber(e) {
    // validate correctly
    // https://stackoverflow.com/questions/3350500/international-phone-number-max-and-min
    // https://github.com/ruimarinho/google-libphonenumber

    const inputPhone: number = e.target.value;

    if (inputPhone.toString().length < 7) {
      this.disableBtn = true;
      this.validHint = 'Number too short';
    } else if (inputPhone.toString().length > 15) {
      this.validHint = 'Number too long';
      this.disableBtn = true;
    } else {
      this.validHint = '';
      // enable button if number is valid
      this.disableBtn = false;
      this.phonenumber = inputPhone;
    }

  }

  onClick() {
    console.log('clicked');
    this.cheapestOp = this.calcOperatorWithCheapestPrice(this.phonenumber);
    if (this.cheapestOp == null) {
      this.validHint = 'We found no matching operator';
      this.showPrice = false;
    } else {
      this.showPrice = true;
    }
  }

  calcOperatorWithCheapestPrice(phonenumber: number) {
    if (this.operators == null) {
      throw Error('Operators Null');
    }

    let operatornames: string[] = [];
    let prefixMatches: PricePrefixPair[] = [];
    console.log('Input phonenumber:' + phonenumber);

    // get all matching prefixpars
    for (const operator of this.operators) {
      for (const entry of operator.pplist) {
        // Phonenumber starts with the prefix
        if (phonenumber.toString().startsWith(entry.prefix.toString())) {
          // If it is empty add the first matching prefix
          if (prefixMatches.length === 0) {
            prefixMatches.push(entry);
            operatornames.push(operator.name);
          } else {

            // If the matched prefix is of the same length as the new matched prefix add it
            if (prefixMatches[0].prefix.toString().length === entry.prefix.toString().length) {
              prefixMatches.push(entry);
              operatornames.push(operator.name);

              // If the matched prefix is longer than the old matched delete all old ones and add only the longest
            } else if (prefixMatches[0].prefix.toString().length < entry.prefix.toString().length) {
              operatornames = [];
              prefixMatches = [];
              prefixMatches.push(entry);
              operatornames.push(operator.name);
            }// If the new matched prefix is smaller do nothing

          }

        }
      }
    }
    // No matching prefixes -> no Operator
    if (prefixMatches.length === 0) {
      return null;
    }

    // If there is only one matching prefix this is the solution already
    let op1: Operator = {
      pplist: [prefixMatches[0]],
      name: operatornames[0]
    };

    // Get the cheapest price
    // if there are multiple prefixes
    if (prefixMatches.length > 1) {
      let cheapPair = prefixMatches[0];
      let nameIndex = 0;
      for (let i = 1; i < prefixMatches.length - 1; i++) {
        if (cheapPair.price > prefixMatches[i].price) {
          cheapPair = prefixMatches[i];
          nameIndex = i;
        }
      }
      // remove inital value
      op1.pplist.pop();

      op1.pplist.push(cheapPair);
      op1.name = operatornames[nameIndex];
    }

    console.log('Cheapest Operator:' + op1);
    return op1;
  }


}
