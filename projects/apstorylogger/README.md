# Apstory Application Insights Logger

## Installation

To install this package run `npm i @apstory/logger-angular`.

## Usage

Add the following to `app.module.ts`

```javascript
import { ApstoryloggerModule, ApstoryloggerService } from 'apstorylogger-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApstoryloggerModule.forRoot('YOUR_instrumentationKey_GOES_HERE')
  ],
  providers: [ApstoryloggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Contact

Please contact Apstory on apstoryza@gmail.com if you have any questions.

## Microsoft Application Insights JavaScript SDK

https://www.npmjs.com/package/@microsoft/applicationinsights-web

