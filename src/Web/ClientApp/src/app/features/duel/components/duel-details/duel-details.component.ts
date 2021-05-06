import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

interface Data {
  title: string,
  startDate: Date;
  finishDate: Date;

}

@Component({
  selector: 'sb-duel-details',
  templateUrl: './duel-details.component.html',
  styleUrls: ['./duel-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelDetailsComponent implements OnInit {

  startDate = new Date('2021-04-19T06:00:00Z');
  finishDate =  new Date('2021-04-21T20:05:00Z');
  title = 'Challenge title';

  timeLeft$: Observable<string>;
  durationString: string;

  constructor() { }

  ngOnInit(): void {
    const utcDate = new Date()
    const challengeDuration = (this.finishDate.getTime() - this.startDate.getTime()) / 1000;
    this.durationString = this.matSecondsToString(challengeDuration);

    const secondsLeft = (this.finishDate.getTime() - utcDate.getTime()) / 1000;
    this.timeLeft$ = timer(0, 1000).pipe(
      map(i => secondsLeft - i),
      takeWhile(i => i >= 0),
      map(i => this.matSecondsToString(i))
    )
  }


  private matSecondsToString(diff: number): string {
    const days = Math.floor(diff / (60 * 60 * 24));
    const hours = Math.floor(diff / (60 * 60)) - (days * 24);
    const minutes = Math.floor(diff / (60)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return `${days} (days) ${this.toTimeFormat(hours)}:${this.toTimeFormat(minutes)}:${this.toTimeFormat(seconds)}`;
  }

  private toTimeFormat(num: number) {
    return `${num < 10 ? '0' : ''}${num}`;
  }

}
