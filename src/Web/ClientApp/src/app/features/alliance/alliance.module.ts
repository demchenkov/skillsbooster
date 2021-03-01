import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceRoutingModule } from './alliance-routing.module';
import { AllianceDetailsPageComponent } from './containers/alliance-details-page/alliance-details-page.component';
import { AllianceAdminPageComponent } from './containers/alliance-admin-page/alliance-admin-page.component';
import { AllianceListPageComponent } from './containers/alliance-list-page/alliance-list-page.component';
import { EditAllianceModalComponent } from './components/edit-alliance-modal/edit-alliance-modal.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AllianceListPageComponent,
    AllianceDetailsPageComponent, 
    AllianceAdminPageComponent, EditAllianceModalComponent
  ],
  imports: [
    CommonModule,
    AllianceRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class AllianceModule { }
