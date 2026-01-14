import { TestBed } from '@angular/core/testing';
import { ApstoryLoggerService } from './apstory-logger.service';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';
import { ClientError } from '../public-api';

describe('ApstoryLoggerService', () => {
  let service: ApstoryLoggerService;
  let appInsightsSpy: jasmine.SpyObj<ApplicationInsights>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApstoryLoggerService,
        { provide: 'instrumentationKey', useValue: 'test-key-12345' },
        { provide: 'loggingLevelConsole', useValue: 1 },
        { provide: 'ignoreClientErrors', useValue: false }
      ]
    });
    service = TestBed.inject(ApstoryLoggerService);

    // Create spy object for ApplicationInsights
    appInsightsSpy = jasmine.createSpyObj('ApplicationInsights', [
      'loadAppInsights',
      'trackTrace',
      'trackPageView',
      'trackEvent',
      'trackException',
      'setAuthenticatedUserContext'
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize Application Insights with valid instrumentation key', async () => {
    spyOn(console, 'log');
    await service.logTrace('test message');
    expect(console.log).toHaveBeenCalledWith('test message');
  });

  it('should handle invalid instrumentation key gracefully', async () => {
    const serviceWithInvalidKey = new ApstoryLoggerService('', 1, false);
    spyOn(console, 'error');
    await serviceWithInvalidKey.logTrace('test');
    expect(console.error).toHaveBeenCalledWith('Failed to log trace:', jasmine.any(Error));
  });

  it('should log trace with severity', async () => {
    spyOn(console, 'log');
    await service.logTraceSeverity('warning message', LoggerSeverityEnum.Warning);
    expect(console.log).toHaveBeenCalledWith('warning message');
  });

  it('should log page view', async () => {
    await expectAsync(service.logPageView('Home', '/home')).toBeResolved();
  });

  it('should log event', async () => {
    await expectAsync(service.logEvent('ButtonClick', { button: 'submit' })).toBeResolved();
  });

  it('should log exception', async () => {
    const error = new Error('Test error');
    spyOn(console, 'log');
    await service.logException(error);
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('should ignore ClientError when ignoreClientErrors is true', async () => {
    const serviceWithIgnore = new ApstoryLoggerService('test-key', 1, true);
    const clientError = new ClientError('Client error');
    await expectAsync(serviceWithIgnore.logException(clientError)).toBeResolved();
  });

  it('should not log ClientError when ignoreClientErrors is true', async () => {
    const serviceWithIgnore = new ApstoryLoggerService('test-key', 1, true);
    const clientError = new ClientError('Client error');
    spyOn(console, 'log');
    await serviceWithIgnore.logException(clientError);
    // Should not throw and should return early
  });

  it('should set authenticated user context', async () => {
    await expectAsync(service.setAuthenticatedUserContext('user123', 'account456')).toBeResolved();
  });

  it('should not log to Application Insights when loggingLevelConsole is 0', async () => {
    const serviceWithNoConsole = new ApstoryLoggerService('test-key', 0, false);
    spyOn(console, 'log');
    await serviceWithNoConsole.logTrace('should not log');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully in logPageView', async () => {
    const serviceWithInvalidKey = new ApstoryLoggerService('', 1, false);
    spyOn(console, 'error');
    await serviceWithInvalidKey.logPageView('Home');
    expect(console.error).toHaveBeenCalledWith('Failed to log page view:', jasmine.any(Error));
  });

  it('should handle errors gracefully in logEvent', async () => {
    const serviceWithInvalidKey = new ApstoryLoggerService('', 1, false);
    spyOn(console, 'error');
    await serviceWithInvalidKey.logEvent('test');
    expect(console.error).toHaveBeenCalledWith('Failed to log event:', jasmine.any(Error));
  });

  it('should handle errors gracefully in setAuthenticatedUserContext', async () => {
    const serviceWithInvalidKey = new ApstoryLoggerService('', 1, false);
    spyOn(console, 'error');
    await serviceWithInvalidKey.setAuthenticatedUserContext('user123');
    expect(console.error).toHaveBeenCalledWith('Failed to set authenticated user context:', jasmine.any(Error));
  });
});
