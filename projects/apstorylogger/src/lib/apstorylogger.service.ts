import { Injectable, Inject } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';

@Injectable({
  providedIn: 'root'
})
export class ApstoryloggerService {

  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: this.instrumentationKey
  };

  constructor(@Inject('instrumentationKey') private instrumentationKey: string) {
    if (!AppInsights.config) {
      AppInsights.downloadAndSetup(this.config);
    }
  }

  logTrace(message: string, properties?: any, severityLevel?: any) {
    console.log('logTrace: ' + message + ', severityLevel: ' + LoggerSeverityEnum.Informational);
    AppInsights.trackTrace(message, properties, severityLevel);
  }

  async logTraceSeverity(message: string, loggerSeverity: LoggerSeverityEnum) {
    console.log('logTrace: ' + message + ', severityLevel: ' + LoggerSeverityEnum);
    this.logTrace(message, null, loggerSeverity);
  }

  logPageView(name?: string, url?: string, measurements?: any, properties?: any, duration?: number) {
    console.log('logPageView: ' + name + ', url: ' + url);
    AppInsights.trackPageView(name, url, properties, measurements, duration);
    this.logEvent(name, 'Initialize page');
    this.logTrace(name);
  }

  logEvent(name: string, properties?: any, measurements?: any) {
    console.log('logEvent: ' + name);
    AppInsights.trackEvent(name, properties, measurements);
    this.logTrace(name);
  }

  logException(exception: Error, handledAt?: string, properties?: any, measurements?: any) {
    console.log('logAppException: ' + exception.name + ', message: ' + exception.message + ', stackTrace: ' + exception.stack);
    AppInsights.trackException(exception, handledAt, properties, measurements);
    this.logTrace(name, null, LoggerSeverityEnum.Error);
  }

}
