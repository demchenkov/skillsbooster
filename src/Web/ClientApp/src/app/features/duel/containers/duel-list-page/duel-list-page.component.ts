import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AcceptanceListButton, AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { CreateDuelModalComponent } from '../create-duel-modal/create-duel-modal.component';

@Component({
  selector: 'sb-duel-list-page',
  templateUrl: './duel-list-page.component.html',
  styleUrls: ['./duel-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelListPageComponent implements OnInit {
  duels = [{name: 'Challenge 1'}, {name: 'Challenge 2'}, {name: 'Challenge 3'}, {name: 'Challenge 4'}, {name: 'Challenge 5'}];
  duelsLoading = false;

  challenges = [{name: 'Challenge 1'}, {name: 'Challenge 2'}, {name: 'Challenge 3'}, {name: 'Challenge 4'}, {name: 'Challenge 5'}];
  challengesLoading = false;

  listButtons: AcceptanceListButton[] = [{iconName: 'check', color: 'accent', button: 'accept'},]

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createDuel() {
    const dialogRef = this.dialog.open(CreateDuelModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  redirectToDuel(event: AcceptanceListButtonClicked<any>) {
    // todo: redirect;
  }
}
