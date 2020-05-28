import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimplecellComponent } from './simplecell/simplecell.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LevelhardComponent} from './levelhard/levelhard.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplecellComponent,
      LevelhardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
