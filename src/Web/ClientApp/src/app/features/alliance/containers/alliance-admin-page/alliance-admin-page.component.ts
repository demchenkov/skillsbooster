import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-alliance-admin-page',
  templateUrl: './alliance-admin-page.component.html',
  styleUrls: ['./alliance-admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceAdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
