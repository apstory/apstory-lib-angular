import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-apstoryloader',
    templateUrl: './apstoryloader.component.html',
    styles: [],
    standalone: false
})
export class ApstoryloaderComponent implements OnInit {
  constructor() { }

  public isBusy = false;
  public busyText: string;

  ngOnInit() {
  }

  async startApstoryloader(msg: string) {
    this.isBusy = true;
    this.busyText = msg;
  }

  async stopApstoryloader() {
    this.isBusy = false;
  }

}
