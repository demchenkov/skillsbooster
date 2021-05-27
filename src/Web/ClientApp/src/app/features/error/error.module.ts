import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



@NgModule({
  declarations: [NotFoundPageComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
  ]
})
export class ErrorModule { }
