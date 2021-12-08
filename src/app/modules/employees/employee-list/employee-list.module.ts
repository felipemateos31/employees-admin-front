import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NoInfoModule } from 'src/app/core/components/no-info/no-info.module';

const routes: Routes = [
  { path: '', component: EmployeeListComponent }
]

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NoInfoModule
  ]
})
export class EmployeeListModule { }
