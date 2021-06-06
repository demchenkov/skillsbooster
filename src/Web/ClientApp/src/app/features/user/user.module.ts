import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule,
    ChartsModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
