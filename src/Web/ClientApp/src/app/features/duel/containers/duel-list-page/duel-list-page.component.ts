import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { CreateDuelModalComponent } from '../create-duel-modal/create-duel-modal.component';


interface Duel {
  id: number;
  title: string;
}

@Component({
  selector: 'sb-duel-list-page',
  templateUrl: './duel-list-page.component.html',
  styleUrls: ['./duel-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelListPageComponent implements OnInit {
  duelsMock: Duel[] = [
    {id: 1, title: 'Challenge 1'},
    {id: 2, title: 'Challenge 2'},
    {id: 3, title: 'Challenge 3'},
    {id: 4, title: 'Challenge 4'},
    {id: 5, title: 'Challenge 5'}
  ];

  duels$: Observable<Duel[]> = new BehaviorSubject<Duel[]>(this.duelsMock);
  duelsLoading$ = new BehaviorSubject<boolean>(false);

  requests$: Observable<Duel[]> = new BehaviorSubject<Duel[]>(this.duelsMock);
  requestsLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createDuel() {
    const dialogRef = this.dialog.open(CreateDuelModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  actionBtnClick(e: AcceptanceListButtonClicked<Duel>) {
    if (e.button === 'accept') {

      return;
    }

    if (e.button === 'decline') {

      return;
    }
  }

  redirectToDuel(data: Duel) {
    this.router.navigate(['..', data.id], {relativeTo: this.route})
  }

  titleGetter = (row: Duel) => row.title
}
