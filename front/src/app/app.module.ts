import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
