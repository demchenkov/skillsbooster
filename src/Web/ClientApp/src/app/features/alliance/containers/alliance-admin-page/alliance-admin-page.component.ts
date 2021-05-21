import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { Challenge, ChallengeRequest } from 'src/app/domain/entities';
import { ChallengesService } from 'src/app/features/challenge/services/challenges.service';
import { CreateChallengeModalComponent } from '../../components/create-challenge-modal/create-challenge-modal.component';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-alliance-admin-page',
  templateUrl: './alliance-admin-page.component.html',
  styleUrls: ['./alliance-admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService, NgOnDestroy, ChallengesService]
})
export class AllianceAdminPageComponent implements OnInit {
  users = [{name: 'User 1'}, {name: 'User 2'}, {name: 'User 3'}, {name: 'User 4'}, {name: 'User 5'}];

  challengeRequests$ = new BehaviorSubject<ChallengeRequest[]>([]);
  challengeRequestsLoading$ = this.service.loading$;

  challengeRequestNameGetter = (req: ChallengeRequest) => req.challengeTitle;


  constructor(private dialog: MatDialog,
              private service: AlliancesService,
              private onDestroy$: NgOnDestroy,
              private route: ActivatedRoute,
              private challengeService: ChallengesService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => {
        const id = Number.parseInt(x.get('id'), 10);
        if (Number.isNaN(id)) {
          // todo redirect to not found page
        }
        return id;
      })).subscribe(id => this.loadChallengeRequests(id));
    ;
  }

  loadChallengeRequests(id: number) {
    this.service.getAllianceChallengeRequests(id)
      .subscribe(requests => this.challengeRequests$.next(requests))
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

  usersListClicked(event: AcceptanceListButtonClicked<any>) {
    this[`${event.button}User`](event.row);
  }


  private acceptChallenge(request: ChallengeRequest) {
    const oldRequests = [...this.challengeRequests$.value];
    this.challengeService.respondChallenge(request.challengeId, true);
    this.challengeRequests$.next(oldRequests.filter(x => x.challengeId != request.challengeId));
  }

  private declineChallenge(request: ChallengeRequest) {
    const oldRequests = [...this.challengeRequests$.value];
    this.challengeService.respondChallenge(request.challengeId, false);
    this.challengeRequests$.next(oldRequests.filter(x => x.challengeId != request.challengeId));
  }



  private acceptUser(user: any) {
    this.users = this.users.filter(x => x.name !== user.name);
  }

  private declineUser(user: any) {
    this.users = this.users.filter(x => x.name !== user.name);
  }

  createChallenge() {
    const dialogRef = this.dialog.open<CreateChallengeModalComponent, any, Partial<Challenge>>(CreateChallengeModalComponent,  { disableClose: true });

    dialogRef.afterClosed()
    .pipe(take(1), filter(x => x != null))
    .subscribe(result => {
      this.challengeService.createChallenge(result);
    });
  }
}
