import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-solution-details',
  templateUrl: './solution-details.component.html',
  styleUrls: ['./solution-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
