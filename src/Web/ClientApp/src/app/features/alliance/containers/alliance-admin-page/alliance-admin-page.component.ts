import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize, map, take, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { AcceptanceListButtonClicked } from 'src/app/core/modules/acceptance-list/acceptance-list.component';
import { Challenge, ChallengeRequest, JoinRequest } from 'src/app/domain/entities';
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
  challengeRequests$ = new BehaviorSubject<ChallengeRequest[]>([]);
  challengeRequestsLoading$ = new BehaviorSubject<boolean>(true);

  joinRequests$ = new BehaviorSubject<JoinRequest[]>([]);
  joinRequestsLoading$ = new BehaviorSubject<boolean>(true);


  challengeRequestNameGetter = (req: ChallengeRequest) => req.challengeTitle;
  joinRequestNameGetter = (req: JoinRequest) => req.userFullName;

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
      })).subscribe(id => this.loadRequests(id));
    ;
  }

  loadRequests(id: number) {
    this.challengeRequestsLoading$.next(true);
    this.joinRequestsLoading$.next(true);

    this.service.getAllianceChallengeRequests(id)
      .pipe(
        finalize(() => this.challengeRequestsLoading$.next(false)))
      .subscribe(requests => this.challengeRequests$.next(requests));

    this.service.getAllianceJoinRequests(id)
      .pipe(
        finalize(() => this.joinRequestsLoading$.next(false)))
      .subscribe(requests => this.joinRequests$.next(requests));
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


  private acceptUser(request: JoinRequest) {
    const oldRequests = [...this.joinRequests$.value];
    this.service.respondJoinRequest(request.allianceId, request.userId, true);
    this.joinRequests$.next(oldRequests.filter(x => x.userId != request.userId));
  }

  private declineUser(request: JoinRequest) {
    const oldRequests = [...this.joinRequests$.value];
    this.service.respondJoinRequest(request.allianceId, request.userId, false);
    this.joinRequests$.next(oldRequests.filter(x => x.userId != request.userId));
  }

  createChallenge() {
    const dialogRef = this.dialog.open<CreateChallengeModalComponent, any, Partial<Challenge>>(CreateChallengeModalComponent,  { disableClose: true });

    dialogRef.afterClosed()
    .pipe(take(1), filter(x => !!x))
    .subscribe(result => {
      this.challengeService.createChallenge(result);
    });
  }
}
