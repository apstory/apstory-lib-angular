[![Build status](https://apstory.visualstudio.com/ApStory/_apis/build/status/apstorymq-client-angular)](https://apstory.visualstudio.com/ApStory/_build/latest?definitionId=25)

# Apstory Application Insights Logger

## Installation

To install this package run `npm i apstorylogger-angular`.

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
    ApstoryloggerModule.forRoot('instrument key here')
  ],
  providers: [ApstoryloggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Contact

Please contact Apstory on apstoryza@gmail.com if you have any questions.

## Microsoft Application Insights JavaScript SDK

https://www.npmjs.com/package/applicationinsights-js

