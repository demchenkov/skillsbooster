import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';

@Component({
  selector: 'sb-alliance-admin-page',
  templateUrl: './alliance-admin-page.component.html',
  styleUrls: ['./alliance-admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceAdminPageComponent implements OnInit {
  users = [{name: 'User 1'}, {name: 'User 2'}, {name: 'User 3'}, {name: 'User 4'}, {name: 'User 5'}];
  challenges = [{name: 'Challenge 1'}, {name: 'Challenge 2'}, {name: 'Challenge 3'}, {name: 'Challenge 4'}, {name: 'Challenge 5'}];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getUsername(row: any) {
    return row.name;
  }

  getChallengeName(row: any) {
    return row.name;
  }

  challengesListClicked(event: AcceptanceListButtonClicked<any>) {
    this[`${event.button}Challenge`](event.row); 
  } 

  acceptChallenge(challenge: any) {
    this.challenges = this.challenges.filter(x => x.name !== challenge.name);
  }

  declineChallenge(challenge: any) {
    this.challenges = this.challenges.filter(x => x.name !== challenge.name);
  }

  usersListClicked(event: AcceptanceListButtonClicked<any>) {
    this[`${event.button}User`](event.row);    
  }

  acceptUser(user: any) {
    this.users = this.users.filter(x => x.name !== user.name);
  }

  declineUser(user: any) {
    this.users = this.users.filter(x => x.name !== user.name);
  }

  createChallenge() {
    const dialogRef = this.dialog.open(EditAllianceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
