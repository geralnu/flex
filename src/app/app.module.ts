import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';
import { AppComponent } from './app.component';
import { PipelineComponent } from './pipeline/pipeline.component';

@NgModule({
  declarations: [
    AppComponent,
    PipelineComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
