import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialComponent } from './dial.component';
import { OperatorComponent } from '../operator/operator.component';
import { operatorA, operatorB } from '../../model/operator/operator.pricelists';

describe('DialComponent', () => {
  let component: DialComponent;
  let OpComponent: OperatorComponent;
  let fixture: ComponentFixture<DialComponent>;
  let fixtureOp: ComponentFixture<OperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialComponent, OperatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixtureOp = TestBed.createComponent(OperatorComponent);
    fixture = TestBed.createComponent(DialComponent);
    component = fixture.componentInstance;
    OpComponent = fixtureOp.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a paragraph with "Simply enter so on..."', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toString().startsWith('Simply enter the cellphone number you want to call');
  });

  it('should create a button and an input field', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('button').textContent).toContain('Dial');
    expect(compiled.querySelector('input')).not.toEqual(null);
    expect(component).toBeTruthy();
  });


  it('should get the correct operator and price when dialing (specific phone number cases)', () => {
    component.operators = [{
      pplist: operatorA,
      name: 'OperatorA'
    }, {
      pplist: operatorB,
      name: 'OperatorB'
    }
    ];
    component.cheapestOp = component.calcOperatorWithCheapestPrice(4673212345);
    expect(component.cheapestOp.name).toContain('OperatorA');
    expect(component.cheapestOp.pplist[0].price).toEqual(1.1);
    expect(component.cheapestOp.pplist[0].prefix.toString().length).toEqual(5); // 46732


    component.cheapestOp = component.calcOperatorWithCheapestPrice(4699212345);
    expect(component.cheapestOp.name).toContain('OperatorA');
    expect(component.cheapestOp.pplist[0].price).toEqual(0.17);
    expect(component.cheapestOp.pplist[0].prefix.toString().length).toEqual(2); // 46

    component.cheapestOp = component.calcOperatorWithCheapestPrice(68123456789);
    expect(component.cheapestOp).toEqual(null);

    component.cheapestOp = component.calcOperatorWithCheapestPrice(12344566789);
    expect(component.cheapestOp.name).toContain('OperatorA');
    expect(component.cheapestOp.pplist[0].price).toEqual(0.9);
    expect(component.cheapestOp.pplist[0].prefix.toString().length).toEqual(1); // 1
  });


});
