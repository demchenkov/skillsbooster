import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionRoutingModule } from './solution-routing.module';
import { SolutionDetailsComponent } from './solution-details/solution-details.component';



@NgModule({
  declarations: [SolutionDetailsComponent],
  imports: [
    CommonModule,
    SolutionRoutingModule,
  ]
})
export class SolutionModule { }
