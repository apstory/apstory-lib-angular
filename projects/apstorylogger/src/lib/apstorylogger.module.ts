import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApstoryLoggerService } from './apstorylogger.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class ApstoryLoggerModule {
  static forRoot(instrumentationKey: string): ModuleWithProviders<ApstoryLoggerModule> {
    return {
      ngModule: ApstoryLoggerModule,
      providers: [ApstoryLoggerService, { provide: 'instrumentationKey', useValue: instrumentationKey }]
    };
  }
}
