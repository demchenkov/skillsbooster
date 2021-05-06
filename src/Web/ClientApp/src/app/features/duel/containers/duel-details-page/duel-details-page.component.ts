import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-duel-details-page',
  templateUrl: './duel-details-page.component.html',
  styleUrls: ['./duel-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelDetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
