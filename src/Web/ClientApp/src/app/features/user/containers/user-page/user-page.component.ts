import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { Difficulty } from 'src/app/domain/enums';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/domain/entities';


@Component({
  selector: 'sb-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersService]
})
export class UserPageComponent implements OnInit {
  difficulties: string[] = Object.values(Difficulty).filter(x => typeof x === 'string') as string[];
  loading$ = this.service.loading$;
  user$ = this.service.user$;

  pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1,
    legend: {
      display: true,
      align: 'center',
      position: 'bottom',
      labels: {
        padding: 25,
        usePointStyle: true,
      },
    },
  };

  constructor(private service: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'me') {
      this.service.getMe();
    } else {
      this.service.getUserById(parseInt(id));
    }

    this.user$.subscribe(x => console.log(x))
  }

  getDifficultyPercentage(name: string, user: User) {
    const a = user.solvedTasks[name];

    return Math.round(a.solved * 100 / a.total);
  }

  getTotalPercentage(user: User) {
    const a = Object.values<any>(user.solvedTasks).reduce((acc, cur) => {
      acc.solved += cur.solved;
      acc.total += cur.total;
      return acc;
    }, {solved: 0, total: 0});

    return Math.round(a.solved * 100 / a.total);
  }

  getTotalTooltip(user: User) {
    const a = Object.values<any>(user.solvedTasks).reduce((acc, cur) => {
      acc.solved += cur.solved;
      acc.total += cur.total;
      return acc;
    }, {solved: 0, total: 0});

    return `Total: ${a.solved} / ${a.total}`;
  }

  getDifficultyTooltip(name: string, user: User) {
    const a = user.solvedTasks[name];

    return `Solved: ${a.solved} / ${a.total}`;
  }

  getStatLabels(user: User) {
    return Object.entries(user.duelStats)
      .map(([x]) => ` ${x}`)
  }

  getStatValues(user: User) {
    return Object.values(user.duelStats)
  }


  editUser() {

  }

}
