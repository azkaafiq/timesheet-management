import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetManagementComponent } from './timesheet-management/timesheet-management.component';

const routes: Routes = [
  {
    path: 'timesheet-management',
    component: TimesheetManagementComponent
  },
  { path: '',
   redirectTo: '/timesheet-management',
   pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
