import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-alliance-list-page',
  templateUrl: './alliance-list-page.component.html',
  styleUrls: ['./alliance-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceListPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
