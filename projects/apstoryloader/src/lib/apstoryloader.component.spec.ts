import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApstoryloaderComponent } from './apstoryloader.component';

describe('ApstoryloaderComponent', () => {
  let component: ApstoryloaderComponent;
  let fixture: ComponentFixture<ApstoryloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApstoryloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApstoryloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
