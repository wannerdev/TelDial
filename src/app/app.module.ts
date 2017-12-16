import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { OperatorComponent } from './components/operator/operator.component';
import { DialComponent } from './components/dial/dial.component';


@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    DialComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
