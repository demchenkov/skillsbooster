import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { Difficulty } from 'src/app/domain/enums';


// https://www.bootdey.com/snippets/view/profile-with-data-and-skills#css
@Component({
  selector: 'sb-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements OnInit {

  user = {
    id: 1,
    fullName: 'Demchenko Vlad',
    email: 'vdemchenko99@gmail.com',
    position: 'Full Stack Developer',
    photoUrl: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    address: 'Kyiv, Ukaine',
    allianceName: 'Top Alliance',

    solvedTasksCount: {
      [Difficulty.Easy]: {total: 40, solved: 10},
      [Difficulty.Normal]: {total: 25, solved: 0},
      [Difficulty.Hard]: {total: 31, solved: 12},
      [Difficulty.Extreme]: {total: 10, solved: 9},
    }
  }

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

  public pieChartLabels: Label[] = [' Lost', ' Won'];
  public pieChartData: number[] = [5, 10];


  difficulties: string[] = Object.values(Difficulty).filter(x => typeof x === 'string') as string[];

  constructor() { }

  ngOnInit(): void {
  }

  getDifficultyPercentage(name: string, user) {
    const difficulty = Difficulty[name];
    const a = user.solvedTasksCount[difficulty];

    return Math.round(a.solved * 100 / a.total);
  }

  getTotalPercentage(user) {
    const a = Object.values<any>(user.solvedTasksCount).reduce((acc, cur) => {
      acc.solved += cur.solved;
      acc.total += cur.total;
      return acc;
    }, {solved: 0, total: 0});

    return Math.round(a.solved * 100 / a.total);
  }

  getTotalTooltip(user) {
    const a = Object.values<any>(user.solvedTasksCount).reduce((acc, cur) => {
      acc.solved += cur.solved;
      acc.total += cur.total;
      return acc;
    }, {solved: 0, total: 0});

    return `Total: ${a.solved} / ${a.total}`;
  }

  getDifficultyTooltip(name: string, user) {
    const difficulty = Difficulty[name];
    const a = user.solvedTasksCount[difficulty];

    return `Solved: ${a.solved} / ${a.total}`;
  }

  editUser() {

  }

}
