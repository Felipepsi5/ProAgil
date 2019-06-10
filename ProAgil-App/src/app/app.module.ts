import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import {HttpClientModule } from "@angular/common/http";
import { NavComponent } from './nav/nav.component';
import {TooltipModule, ModalModule, BsDropdownModule, BsDatepickerModule} from 'ngx-bootstrap'
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { EventoService } from './_services/evento.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';


@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      PalestrantesComponent,
      DashboardComponent,
      ContatosComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastContainerModule,
      ToastrModule.forRoot({positionClass :"toast-top-right"})
   ],
   providers: [
     EventoService
   ],
   bootstrap:[
     AppComponent
   ]

})

// tslint:disable-next-line: align

export class AppModule { }
