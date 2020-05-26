import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../pages/index/index.component';
import { LocksComponent } from '../pages/locks/locks.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: IndexComponent
  },
  {
    path: 'lock', component: LocksComponent
  },
  {
    path: '**', component: IndexComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] 
})
export class RoutingModule { }
