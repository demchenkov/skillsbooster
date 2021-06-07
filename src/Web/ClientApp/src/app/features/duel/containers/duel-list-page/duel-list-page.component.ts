import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { Duel } from 'src/app/domain/entities';
import { DuelsService } from '../../services/duels.service';
import { CreateDuelModalComponent } from '../create-duel-modal/create-duel-modal.component';


@Component({
  selector: 'sb-duel-list-page',
  templateUrl: './duel-list-page.component.html',
  styleUrls: ['./duel-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DuelsService]
})
export class DuelListPageComponent implements OnInit {
  duelRequests$ = new BehaviorSubject<Duel[]>([]);
  duelRequestsLoading$ = new BehaviorSubject<boolean>(true);

  duels$ = new BehaviorSubject<Duel[]>([]);
  duelsLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private duelService: DuelsService) { }

  ngOnInit(): void {
    this.duelService.getActiveMyDuels()
      .pipe(finalize(() => this.duelsLoading$.next(false)))
      .subscribe(x => this.duels$.next(x));

    this.duelService.getMyRequestedDuels()
      .pipe(finalize(() => this.duelRequestsLoading$.next(false)))
      .subscribe(x => this.duelRequests$.next(x));
  }

  createDuel() {
    const dialogRef = this.dialog.open<CreateDuelModalComponent, any, Partial<Duel>>(
      CreateDuelModalComponent,  { disableClose: true });

      dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(x => !!x),
        switchMap(x => this.duelService.createDuel(x))
      )
      .subscribe(result => {
        this.redirectToDuel(result);
      });
  }

  duelsListClicked(event: AcceptanceListButtonClicked<Duel>) {
    this[`${event.button}Duel`](event.row);
  }

  private acceptDuel(duel: Duel) {
    const oldRequests = [...this.duelRequests$.value];

    this.duelRequestsLoading$.next(true);
    this.duelService.respondDuel(duel.id, true).subscribe(() => {
      this.duelRequestsLoading$.next(false);
      this.duelRequests$.next(oldRequests.filter(x => x.id != duel.id));
      this.duels$.next([...this.duels$.value, duel]);
    });
  }

  private declineDuel(duel: Duel) {
    const oldRequests = [...this.duelRequests$.value];
    this.duelRequestsLoading$.next(true);
    this.duelService.respondDuel(duel.id, false).subscribe(() => {
      this.duelRequestsLoading$.next(false);
      this.duelRequests$.next(oldRequests.filter(x => x.id != duel.id));
    });
  }

  redirectToDuel(data: Duel) {
    this.router.navigate(['..', data.id], {relativeTo: this.route})
  }

  titleGetter = (row: Duel) => row.title
}
