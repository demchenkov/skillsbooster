import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { AboutRoutingModule } from './about-routing.module';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, MatButtonModule]
})
export class AboutModule {}
