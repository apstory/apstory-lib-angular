import { Injectable, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApstorydnnNavigationService {
  private subject = new Subject<any>();

  private params: any[];
  private prevPage: any;
  private navStack: any[];
  private componentHolder: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  constructor(private componentFactory: ComponentFactoryResolver) {
    this.navStack = [];
    this.params = [];
  }

  getNavigationEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  private setComponent(type: any): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const factory = this.componentFactory.resolveComponentFactory(type);
    this.componentRef = this.componentHolder.createComponent(factory);
  }

  setup(navHolder: ViewContainerRef) {
    this.componentHolder = navHolder;
  }

  setParam(key: string, value: any) {
    this.params[key] = value;
  }

  getParam(key: string) {
    return this.params[key];
  }

  push(page: any) {
    if (this.prevPage) {
      this.navStack.push(this.prevPage);
    }

    this.setComponent(page);
    this.prevPage = page;
    this.subject.next(this.componentRef);
  }

  canPop() {
    return this.navStack.length > 0;
  }

  popTo(screen: any) {
    while (typeof (screen) != typeof (this.prevPage)) {
      if (this.canPop()) {
        this.prevPage = this.navStack.pop();
      }
    }

    this.setComponent(this.prevPage);
    this.subject.next(this.componentRef);
  }

  popBack(nr: number) {
    for (let i = 0; i < nr; i++) {
      if (this.canPop()) {
        this.prevPage = this.navStack.pop();
      }
    }

    this.setComponent(this.prevPage);
    this.subject.next(this.componentRef);
  }

  pop() {
    if (this.canPop()) {
      this.prevPage = this.navStack.pop();
      this.setComponent(this.prevPage);
      this.subject.next(this.componentRef);
    }
  }

}