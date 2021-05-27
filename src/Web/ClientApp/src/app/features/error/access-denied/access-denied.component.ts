import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
