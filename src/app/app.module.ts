import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AngularMaterialsModule } from './angular-material/angular-materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule } from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { IndexComponent } from './pages/index/index.component';
import { LocksComponent } from './pages/locks/locks.component';
import { TableComponent } from './plugins/table/table.component';
import { KeysPipe } from './pipes/keys.pipe';
import { FormControlComponent } from './plugins/form-control/form-control.component';
import { DeleteModelComponent } from './plugins/delete-model/delete-model.component';
import { ExportDirective } from './directive/export/export.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    LocksComponent,
    TableComponent,
    KeysPipe,
    FormControlComponent,
    DeleteModelComponent,
    ExportDirective
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule
    // AngularMaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
