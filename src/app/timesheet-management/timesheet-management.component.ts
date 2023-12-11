// timesheet-management.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timesheet-management',
  templateUrl: './timesheet-management.component.html',
  styleUrls: ['./timesheet-management.component.scss'],
})
export class TimesheetManagementComponent implements OnInit {
  timesheets: any[] = [];
  displayedColumns: string[] = ['project', 'task', 'assignedTo', 'fromDate', 'toDate', 'status'];
  timesheet: any;
  users: any[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadTimesheets();
    this.loadUsers();
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  loadTimesheets() {
    this.http.get<any[]>('http://localhost:8080/api/timesheets').subscribe(
      (data) => {
        this.timesheets = data;
      },
      (error) => {
        console.error('Error loading timesheets', error);
      }
    );
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  createTimesheet() {
    const newTimesheet = {
      project: 'New Project',
      task: 'New Task',
      assignedTo: 'New User',
      fromDate: '2023-01-01',
      toDate: '2023-01-03',
      status: 'Open',
    };

    this.http.post('http://localhost:8080/api/timesheets', newTimesheet).subscribe(
      () => {
        this.loadTimesheets();
      },
      (error) => {
        console.error('Error creating timesheet', error);
      }
    );
  }

  saveTimesheet(form: any) {
    // Perform any additional validation or processing here
    if (form.valid) {
      // If the form is valid, create or update the timesheet
      this.createTimesheet();
      form.resetForm(); // Reset the form after submission
    }
  }

  editTimesheet(timesheet: any) {
    // Add logic to handle editing a timesheet
    console.log('Edit timesheet:', timesheet);
  }

  deleteTimesheet(timesheet: any) {
    // Add logic to handle deleting a timesheet
    console.log('Delete timesheet:', timesheet);
  }
}
