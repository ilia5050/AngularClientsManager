import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { ClientsResolverGuard } from './guards/clients-resolver.guard';
import { ClientsFilterComponent } from './components/pages/clients/clients-filter/clients-filter.component';
import { ClientsResultsComponent } from './components/pages/clients/clients-results/clients-results.component';
import { ClientsInfoWidgetComponent } from './components/pages/clients/clients-info-widget/clients-info-widget.component';
import { ClientsDetailComponent } from './components/pages/clients/clients-detail/clients-detail.component';
import { ClientsDetailInfoComponent } from './components/pages/clients/clients-detail/clients-detail-info/clients-detail-info.component';
import { ClientsDetailAccountsComponent } from './components/pages/clients/clients-detail/clients-detail-accounts/clients-detail-accounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAccountModalComponent } from './components/pages/clients/clients-detail/clients-detail-accounts/add-account-modal/add-account-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageGeneratorPipe } from './pipes/message-generator.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateClientModalComponent } from './components/shared/create-client-modal/create-client-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    ClientsComponent,
    ClientsFilterComponent,
    ClientsResultsComponent,
    ClientsInfoWidgetComponent,
    ClientsDetailComponent,
    ClientsDetailInfoComponent,
    ClientsDetailAccountsComponent,
    AddAccountModalComponent,
    MessageGeneratorPipe,
    CreateClientModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ClientsResolverGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
