import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { Duel } from 'src/app/domain/entities';
import { DuelsService } from '../../services/duels.service';
import { CreateDuelModalComponent } from '../create-duel-modal/create-duel-modal.component';


interface DuelRequest {
  allianceId: number;
  duelId: number;
  duelTitle: string;
}

@Component({
  selector: 'sb-duel-list-page',
  templateUrl: './duel-list-page.component.html',
  styleUrls: ['./duel-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DuelsService]
})
export class DuelListPageComponent implements OnInit {
  duelRequests$ = new BehaviorSubject<DuelRequest[]>([]);
  duelRequestsLoading$ = new BehaviorSubject<boolean>(true);

  duels$: Observable<Duel[]> = new BehaviorSubject<Duel[]>([]);
  duelsLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private duelService: DuelsService) { }

  ngOnInit(): void {
  }

  createDuel() {
    const dialogRef = this.dialog.open(CreateDuelModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  duelsListClicked(event: AcceptanceListButtonClicked<Duel>) {
    this[`${event.button}Duel`](event.row);
  }

  private acceptDuel(request: DuelRequest) {
    const oldRequests = [...this.duelRequests$.value];
    this.duelService.respondDuel(request.duelId, true);
    this.duelRequests$.next(oldRequests.filter(x => x.duelId != request.duelId));
  }

  private declineDuel(request: DuelRequest) {
    const oldRequests = [...this.duelRequests$.value];
    this.duelService.respondDuel(request.duelId, false);
    this.duelRequests$.next(oldRequests.filter(x => x.duelId != request.duelId));
  }

  redirectToDuel(data: Duel) {
    this.router.navigate(['..', data.id], {relativeTo: this.route})
  }

  titleGetter = (row: Duel) => row.title
}
