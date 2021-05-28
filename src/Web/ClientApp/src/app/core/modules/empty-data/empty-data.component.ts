import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sb-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyDataComponent implements OnInit {
  @Input() text = 'No Results Found';

  constructor() { }

  ngOnInit(): void {
  }

}
