import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorComponent } from './operator.component';
import { timeout } from 'q';
import { destroyView } from '@angular/core/src/view/view';
import { DialComponent } from '../dial/dial.component';

describe('OperatorComponent', () => {
  let component: OperatorComponent;
  let fixture: ComponentFixture<OperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorComponent, DialComponent]
    })
      .compileComponents();
  }));


  it('should create itself', () => {
    fixture = TestBed.createComponent(OperatorComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create the "Show Operators" button', () => {
    fixture = TestBed.createComponent(OperatorComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[1].textContent).toEqual('Show Operators');
  });

  it('should create the "Available Operators" headline', () => {
    fixture = TestBed.createComponent(OperatorComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.showOp = true;
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toEqual('Available Operators');
  });

  it('should create a table of Operators', () => {
    fixture = TestBed.createComponent(OperatorComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.showOp = true;
    fixture.detectChanges();
    expect(compiled.querySelector('table').textContent).not.toEqual(null);
    expect(component).toBeTruthy();
  });

});
