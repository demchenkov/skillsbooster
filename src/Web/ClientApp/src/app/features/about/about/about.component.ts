import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'sb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = '';

  @ViewChild('blockAnimation') wrapper: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.wrapper.nativeElement.classList.remove('start');
      setTimeout(() => {
          this.wrapper.nativeElement.classList.add('start');
      }, 50)
    }, 30000);
  }
}
