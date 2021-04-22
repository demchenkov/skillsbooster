import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-challenge-details-page',
  templateUrl: './challenge-details-page.component.html',
  styleUrls: ['./challenge-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeDetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
