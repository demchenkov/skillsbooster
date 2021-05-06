import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alliance, Alliances } from 'src/app/domain/entities';

@Component({
  selector: 'sb-alliance-details-page',
  templateUrl: './alliance-details-page.component.html',
  styleUrls: ['./alliance-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceDetailsPageComponent implements OnInit {
  isAllianceManager$: Observable<boolean>
  isAllianceParticipant$: Observable<boolean>
  allianceDetails$: Observable<Alliance>

  constructor() { }

  ngOnInit(): void {
    this.isAllianceManager$ = new BehaviorSubject(true).asObservable();
    this.isAllianceParticipant$ = new BehaviorSubject(true).asObservable();
    this.allianceDetails$ = new BehaviorSubject(Alliances[0]).asObservable();
  }

}
