import { ApstoryLoggerService } from './apstory-logger.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [ApstoryLoggerService]
})
export class ApstoryLoggerModule {
  static forRoot(instrumentationKey: string, loggingLevelConsole: number, ignoreClientErrors: boolean = false): ModuleWithProviders<ApstoryLoggerModule> {
    return {
      ngModule: ApstoryLoggerModule,
      providers: [
        { provide: 'instrumentationKey', useValue: instrumentationKey },
        { provide: 'loggingLevelConsole', useValue: loggingLevelConsole },
        { provide: 'ignoreClientErrors', useValue: ignoreClientErrors },
      ]
    };
  }
}
