import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApstoryloggerService } from './apstorylogger.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class ApstoryloggerModule {
  static forRoot(instrumentationKey: string): ModuleWithProviders {
    return {
      ngModule: ApstoryloggerModule,
      providers: [ApstoryloggerService, { provide: 'instrumentationKey', useValue: instrumentationKey }]
    };
  }
}
