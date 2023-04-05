import { ApstoryLoggerService } from './apstory-logger.service';
import { NgModule, ModuleWithProviders } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class ApstoryLoggerModule {
  static forRoot(instrumentationKey: string, loggingLevelConsole: number, ignoreClientErrors: boolean = false): ModuleWithProviders<ApstoryLoggerModule> {
    return {
      ngModule: ApstoryLoggerModule,
      providers: [ApstoryLoggerService, 
        { provide: 'instrumentationKey', useValue: instrumentationKey },
        { provide: 'loggingLevelConsole', useValue: loggingLevelConsole },
        { provide: 'ignoreClientErrors', useValue: ignoreClientErrors },
      ]
    };
  }
}
